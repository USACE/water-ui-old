const validateData = (data) => !!data && data.length > 0;

const getValidatedData = (data) => (validateData(data) ? data : []);

const filter = ({ typeFilter, data }) => {
  const leafNodes = [];

  const isMatch = ( /** @type {a2w.models.LocationSummary} */ node ) => {
    switch( typeFilter ) {
      case "STREAM_LOCATION":
        return node.sub_location_type === typeFilter;
      case "DAMS":
        return node.dam_indicator === "T"
      case "LAKES":
        return node.dam_indicator !== "T" && node.lake_indicator === "T"
      default:
        return node.location_type === typeFilter;
    }
  }

  const getLeafNodes = ( leafNodes, obj ) => {
    if ( !obj.is_leaf ) {
      obj.nodes.forEach(function (child) {
        getLeafNodes(leafNodes, child);
      });
    } else if ( isMatch( obj ) ) {
      leafNodes.push( obj );
    }
    return leafNodes;
  };

  if (data && data[0]) {
    return getLeafNodes( leafNodes, data[0] );
  }
  return [];
};

export const walk = ({ data, typeFilter, ...props }) => {
  let treeData;
  typeFilter ? ( treeData = filter({ typeFilter, data }).sort((a, b) => a.label.trim().localeCompare(b.label.trim())) ) : ( treeData = data );
  const validatedData = getValidatedData( treeData );
  const propsWithDefaultValues = { parent: "", level: 0, ...props };
  const handleArray = (dataAsArray) =>
    dataAsArray.reduce((all, node, index) => {
      const branchProps = {
        node,
        index,
        nodeName: node.key,
        ...propsWithDefaultValues,
      };
      const branch = generateBranch(branchProps);
      return [...all, ...branch];
    }, []);

  const handleObject = (dataAsObject) =>
    Object.entries(dataAsObject)
      .sort((a, b) => a[1].index - b[1].index) // sorted by index
      .reduce((all, [nodeName, node]) => {
        const branchProps = { node, nodeName, ...propsWithDefaultValues };
        const branch = generateBranch(branchProps);
        return [...all, ...branch];
      }, []);

  return Array.isArray(validatedData) ? handleArray(validatedData) : handleObject(validatedData);
};

const defaultMatchSearch = ({ label, searchTerm }) => {
  const processString = (text) => text.trim().toLowerCase();
  return processString(label).includes(processString(searchTerm));
};

const defaultLocale = ({ label }) => label;

const generateBranch = ({
  node,
  nodeName,
  matchSearch = defaultMatchSearch,
  locale = defaultLocale,
  ...props
}) => {
  const { parent, level, openNodes, searchTerm } = props;

  const { nodes, label: rawLabel = "unknown", ...nodeProps } = node;
  const key = [parent, nodeName].filter((x) => x).join("/");
  const hasNodes = validateData(nodes);
  const isOpen = hasNodes && (openNodes.includes(key) || !!searchTerm);

  const label = locale({ label: rawLabel, ...nodeProps });
  const isVisible = !searchTerm || matchSearch({ label, searchTerm, ...nodeProps });
  const currentItem = { ...props, ...nodeProps, label, hasNodes, isOpen, key };

  const data = getValidatedData(nodes);
  const nextLevelItems = isOpen
    ? walk( /** @type {any} */ ({
        data,
        locale,
        matchSearch,
        ...props,
        parent: key,
        level: level + 1,
      }))
    : [];

  return isVisible ? [currentItem, ...nextLevelItems] : nextLevelItems;
};

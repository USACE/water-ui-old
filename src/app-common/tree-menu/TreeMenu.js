import React from "react";
import { debounce } from "lodash";
import { walk } from "./walk";
import { defaultChildren } from "./renderProps";
import KeyDown from "./KeyDown";
import "./treeMenu.scss";

const defaultOnClick = (props) => console.log(props);

class TreeMenu extends React.Component {
  constructor(props) {
    super(props);
    const { data, locale } = this.props;
    const openNodes = this.props.initialOpenNodes || [];
    const searchTerm = "";
    this.state = {
      openNodes,
      searchTerm,
      activeKey: this.props.initialActiveKey || "",
      focusKey: this.props.initialFocusKey || "",
      items: walk({ data, locale, openNodes, searchTerm }),
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { data, locale, initialOpenNodes, resetOpenNodesOnDataUpdate } = this.props;
    const { searchTerm, openNodes } = this.state;
    // if the data, locale, searchTerm, or openNodes changes, then recompute the tree menu items
    if (prevProps.data !== data || prevProps.locale !== locale || prevState.searchTerm !== searchTerm || prevState.openNodes !== openNodes) {
      const items = walk({ data, locale, searchTerm, openNodes });
      this.setState({ items });
    }
    if (prevProps.data !== data && resetOpenNodesOnDataUpdate) {
      const openNodes = initialOpenNodes || [];
      this.setState({ openNodes });
    }
  }

  resetOpenNodes = (newOpenNodes, activeKey, focusKey) => {
    const { initialOpenNodes } = this.props;
    const openNodes = (Array.isArray(newOpenNodes) && newOpenNodes) || initialOpenNodes || [];
    this.setState({
      openNodes,
      activeKey: activeKey || "",
      focusKey: focusKey || activeKey || "",
      searchTerm: "",
    });
  };

  debounceSearch = debounce(searchTerm => this.setState({ searchTerm }), 500);

  search = (newTerm) => {
    const searchTerm = newTerm.length < this.props.minSearchLength ? "" : newTerm;
    this.debounceSearch(searchTerm);
  }

  toggleNode = (node) => {
    if (!this.props.openNodes) {
      const { openNodes } = this.state;
      const newOpenNodes = openNodes.includes(node)
        ? openNodes.filter((openNode) => openNode !== node)
        : [...openNodes, node];
      this.setState({ openNodes: newOpenNodes });
    }
  };

  generateItems = () => {
    const { onClickItem } = this.props;
    const { items } = this.state;
    const activeKey = this.props.activeKey || this.state.activeKey;
    const focusKey = this.props.focusKey || this.state.focusKey;

    return items.map((item) => {
      const focused = item.key === focusKey;
      const active = item.key === activeKey;
      const onClick = () => {
        const newActiveKey = this.props.activeKey || item.key;
        this.setState({ activeKey: newActiveKey, focusKey: newActiveKey });
        onClickItem && onClickItem(item);
      };

      const toggleNode = item.hasNodes
        ? () => this.toggleNode(item.key)
        : undefined;
      return { ...item, focused, active, onClick, toggleNode, node_type: item.location_type };
    });
  };

  getKeyDownProps = (items) => {
    const { onClickItem } = this.props;
    const { focusKey, activeKey } = this.state;

    const focusIndex = items.findIndex(
      (item) => item.key === (focusKey || activeKey)
    );
    const getFocusKey = (item) => {
      const keyArray = item.key.split("/");

      return keyArray.length > 1
        ? keyArray.slice(0, keyArray.length - 1).join("/")
        : item.key;
    };

    return {
      up: () => {
        this.setState(({ focusKey }) => ({
          focusKey: focusIndex > 0 ? items[focusIndex - 1].key : focusKey,
        }));
      },
      down: () => {
        this.setState(({ focusKey }) => ({
          focusKey:
            focusIndex < items.length - 1
              ? items[focusIndex + 1].key
              : focusKey,
        }));
      },
      left: () => {
        const item = items[focusIndex];
        if (item) {
          this.setState(({ openNodes, ...rest }) => {
            const newOpenNodes = openNodes.filter((node) => node !== item.key);
            return item.isOpen
              ? { ...rest, openNodes: newOpenNodes, focusKey: item.key }
              : { ...rest, focusKey: getFocusKey(item) };
          });
        }
      },
      right: () => {
        const { hasNodes, key } = items[focusIndex];
        if (hasNodes)
          this.setState(({ openNodes }) => ({
            openNodes: [...openNodes, key],
          }));
      },
      enter: () => {
        this.setState(({ focusKey }) => ({ activeKey: focusKey }));
        onClickItem && onClickItem(items[focusIndex]);
      },
    };
  };

  render() {
    const { children, disableKeyboard } = this.props;
    const { searchTerm } = this.state;

    const search = this.search;
    const items = this.generateItems();
    const resetOpenNodes = this.resetOpenNodes;

    /** @type any **/
    const childComponent = children || defaultChildren;

    const renderProps = { items, resetOpenNodes, searchTerm, search };

    return disableKeyboard
      ? childComponent(renderProps)
      : <KeyDown {...this.getKeyDownProps(items)}>{childComponent(renderProps)}</KeyDown>;
  }
}

TreeMenu.defaultProps = {
  data: {},
  onClickItem: defaultOnClick,
  children: defaultChildren,
  resetOpenNodesOnDataUpdate: false,
  disableKeyboard: false,
  initialOpenNodes: [],
  minSearchLength: 3, // the minimum searchTerm length in order for the search to work
};

export default TreeMenu;

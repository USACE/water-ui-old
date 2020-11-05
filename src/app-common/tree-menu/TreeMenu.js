import React from "react";
import "./treeMenu.scss";

import { slowWalk } from "./walk";
import { defaultChildren } from "./renderProps";
import { KeyDown } from "../../functions";

const defaultOnClick = (props) => console.log(props);

class TreeMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openNodes: this.props.initialOpenNodes || [],
      activeKey: this.props.initialActiveKey || "",
      focusKey: this.props.initialFocusKey || "",
    };
  }

  componentDidUpdate(prevProps) {
    const { data, initialOpenNodes, resetOpenNodesOnDataUpdate } = this.props;
    if (
      prevProps.data !== data &&
      resetOpenNodesOnDataUpdate &&
      initialOpenNodes
    ) {
      this.setState({ openNodes: initialOpenNodes });
    }
  }

  resetOpenNodes = (newOpenNodes, activeKey, focusKey) => {
    const { initialOpenNodes } = this.props;
    const openNodes =
      (Array.isArray(newOpenNodes) && newOpenNodes) || initialOpenNodes || [];
    this.setState({
      openNodes,
      activeKey: activeKey || "",
      focusKey: focusKey || activeKey || "",
    });
  };

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
    const { data, onClickItem, locale } = this.props;
    const openNodes = this.props.openNodes || this.state.openNodes;
    const activeKey = this.props.activeKey || this.state.activeKey;
    const focusKey = this.props.focusKey || this.state.focusKey;
    const defaultSearch = slowWalk;
    const items = data ? defaultSearch({ data, openNodes, locale }) : [];

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
      preventDefault: true,
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

    const items = this.generateItems();
    const resetOpenNodes = this.resetOpenNodes;

    /** @type any **/
    const childComponent = children || defaultChildren;

    const renderProps = { items, resetOpenNodes };

    return disableKeyboard ? (
      childComponent(renderProps)
    ) : (
      <KeyDown {...this.getKeyDownProps(items)}>{childComponent(renderProps)}</KeyDown>
    );
  }
}

TreeMenu.defaultProps = {
  data: {},
  onClickItem: defaultOnClick,
  children: defaultChildren,
  resetOpenNodesOnDataUpdate: false,
  disableKeyboard: false,
  initialOpenNodes: [],
};

export default TreeMenu;

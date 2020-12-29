import React from "react";
import classNames from "classnames";

const DEFAULT_PADDING = 0.75;
const ICON_SIZE = 2;
const LEVEL_SPACE = 1.75;


const iconLibrary = (type) => {

  const iconMap = {
    HQ: "mdi mdi-quality-high",
    DIVISION: "mdi mdi-image-area",
    DISTRICT: "mdi mdi-chess-rook",
    OPERATING_BASIN: "mdi mdi-image-filter-hdr",
    BASIN: "mdi mdi-water-pump",
    CWMS: "mdi mdi-map-marker",
    LOCATION: "mdi mdi-map-marker",
    STREAM: "mdi mdi-waves",
    WQ: "mdi mdi-cup-water",
  };
  return iconMap[type] ? iconMap[type] : iconMap.LOCATION;
};

export const ItemComponent = ( props ) => {
  const {
    hasNodes = false,
    level = 0,
    onClick,
    toggleNode,
    active,
    focused,
    id,
    label = "No Results Found",
    style = {},
    node_type = "STREAM"
  } = props;

  const handleOnClick = (e) => {
    if (hasNodes && toggleNode) {
      toggleNode();
    } else {
      onClick(e);
    }
  };

  return (
  <li
    title={label ? label.replace(/(.{60})/g,"$1\n") : ""}
    className={classNames(
      "rstm-tree-item",
      `rstm-tree-item-level${level}`,
      { "rstm-tree-item--active": active },
      { "rstm-tree-item--focused": focused },
      {"rstm-tree-item--has-nodes": hasNodes}
    )}
    style={{
      paddingLeft: `${
        DEFAULT_PADDING + ICON_SIZE * (hasNodes ? 0 : 0) + level * LEVEL_SPACE
      }rem`,
      ...style,
    }}
    id={`rstm-tree-item-${id}`}
    role="button"
    aria-pressed={active}
    onClick={handleOnClick}
  >
    <div
      className={`rstm-tree-label ${iconLibrary(node_type)}`}
      style={{ display:"inline-block" }}
    >
      {label}
    </div>
  </li>
)};

export const defaultChildren = ({items, typeFilter}) => {
  return (
    <ul className="rstm-tree-item-group">
      { typeFilter && items.length === 0
          ? <ItemComponent />
          : items.map(({ key, ...props }) => <ItemComponent key={key} {...props} />)
      }
    </ul>
  );
};

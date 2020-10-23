import React from "react";
import classNames from "classnames";

const DEFAULT_PADDING = 0.75;
const ICON_SIZE = 2;
const LEVEL_SPACE = 1.75;


const iconLibrary = (type) => {

  const iconMap = {
    HQ: "mdi mdi-quality-high",
    DIVISION: "mdi mdi-image-filter-hdr",
    DISTRICT: "mdi mdi-chess-rook",
    OPERATING_BASIN: "mdi mdi-water-pump",
    BASIN: "mdi mdi-water-pump",
    CWMS: "mdi mdi-waves",
    STREAM: "mdi mdi-map-marker",
    WQ: "mdi mdi-waves",
  };
  return iconMap[type];
};

export const ItemComponent = ({
  hasNodes = false,
  level = 0,
  onClick,
  toggleNode,
  active,
  focused,
  location_id,
  label = "unknown",
  style = {},
  location_type = "STREAM"
}) => (
  <li
    className={classNames(
      "rstm-tree-item",
      `rstm-tree-item-level${level}`,
      { "rstm-tree-item--active": active },
      { "rstm-tree-item--focused": focused },
      {"rstm-tree-item--has-nodes": hasNodes}
    )}
    style={{
      paddingLeft: `${
        DEFAULT_PADDING + ICON_SIZE * (hasNodes ? 0 : 1) + level * LEVEL_SPACE
      }rem`,
      ...style,
    }}
    id={`rstm-tree-item-${location_id}`}
    role="button"
    aria-pressed={active}
    onClick={onClick}
  >
    <div
    className={`rstm-tree-label ${iconLibrary(location_type)}`}
    style={{display:"inline-block"}}
      onClick={(e) => {
        hasNodes && toggleNode && toggleNode();
      }}
    >
      {label}
    </div>
  </li>
);

export const defaultChildren = ({ items }) => {
  return (
    <>
      <ul className="rstm-tree-item-group">
        {items.map(({ key, ...props }) => (
          <ItemComponent key={key} {...props}></ItemComponent>
        ))}
      </ul>
    </>
  );
};

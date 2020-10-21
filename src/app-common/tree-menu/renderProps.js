import React from "react";
import classNames from "classnames";

const DEFAULT_PADDING = 0.75;
const ICON_SIZE = 2;
const LEVEL_SPACE = 1.75;

const ToggleIcon = ({ on, openedIcon, closedIcon }) => (
  <div role="img" aria-label="Toggle" className="rstm-toggle-icon-symbol">
    {on ? openedIcon : closedIcon}
  </div>
);

export const ItemComponent = ({
  hasNodes = false,
  isOpen = false,
  level = 0,
  onClick,
  toggleNode,
  active,
  focused,
  openedIcon = "-",
  closedIcon = "+",
  label = "unknown",
  style = {},
}) => (
  <li
    className={classNames(
      "rstm-tree-item",
      `rstm-tree-item-level${level}`,
      { "rstm-tree-item--active": active },
      { "rstm-tree-item--focused": focused }
    )}
    style={{
      paddingLeft: `${
        DEFAULT_PADDING + ICON_SIZE * (hasNodes ? 0 : 1) + level * LEVEL_SPACE
      }rem`,
      ...style,
    }}
    role="button"
    aria-pressed={active}
    onClick={onClick}
  >
    {hasNodes && (
      <div
        className="rstm-toggle-icon"
        onClick={(e) => {
          hasNodes && toggleNode && toggleNode();
          e.stopPropagation();
        }}
      >
        <ToggleIcon
          on={isOpen}
          openedIcon={openedIcon}
          closedIcon={closedIcon}
        />
      </div>
    )}
    {label}
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

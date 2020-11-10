import React from "react";
import PropTypes from "prop-types";

const KeyDown = ({ up, down, left, right, enter, children }) => (
  <div
    onKeyDown={(e) => {
      switch (e.key) {
        case "ArrowUp": {
          e.preventDefault()
          up();
          break;
        }
        case "ArrowDown": {
          e.preventDefault()
          down();
          break;
        }
        case "ArrowLeft": {
          e.preventDefault()
          left();
          break;
        }
        case "ArrowRight": {
          e.preventDefault()
          right();
          break;
        }
        case "Enter": {
          e.preventDefault()
          enter();
          break;
        }
        default:
      }
    }}
  >
    {children}
  </div>
);

KeyDown.propTypes = {
  up: PropTypes.func.isRequired,
  down: PropTypes.func.isRequired,
  left: PropTypes.func.isRequired,
  right: PropTypes.func.isRequired,
  enter: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

export default KeyDown;

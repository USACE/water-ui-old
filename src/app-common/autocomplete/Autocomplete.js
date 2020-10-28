import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import "./autocomplete.scss";

// renders an input box that opens a menu of items. This component follows the WAI specifications for combobox
// with a listbox popup as described here https://www.w3.org/TR/wai-aria-practices/examples/combobox/aria1.1pattern/listbox-combo.html
const Autocomplete = (props) => {
  const {
    id,
    input,
    items,
    className,
    ariaLabel,
    itemOnClick,
    ...rest
  } = props;

  const node = useRef();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleInputOnClick = () => {
    if (!menuOpen) {
      setMenuOpen(true);
    }
  };

  const handleInputOnKeyDown = (e) => {
    if (!menuOpen) {
      setMenuOpen(true);
    }
    if (items.length > 0) {
      switch (e.key) {
        case "Tab": {
          // if user enters SHIFT + TAB, then close the menu
          if (e.shiftKey) {
            setMenuOpen(false);
          }
          break;
        }
        case "Escape":
        case "Enter":
          setMenuOpen(false);
          break;
        case "ArrowUp":
          // open the menu and move the focus to the last menu item
          e.preventDefault();
          setMenuOpen(true);
          node.current.childNodes[1].childNodes[items.length - 1].focus();
          break;
        case "ArrowDown":
          // open the menu and move the focus to the first menu item
          e.preventDefault();
          setMenuOpen(true);
          node.current.childNodes[1].childNodes[0].focus();
          break;
        default:
      }
    }

    // if an onKeyDown prop is passed to the input then call the onKeyDown function
    if (input.onKeyDown) {
      input.onKeyDown(e);
    }
  };

  const handleItemOnClick = (e) => {
    itemOnClick(e.target.getAttribute('value'));
    setMenuOpen(false);
  };

  const handleItemOnKeyDown = (e) => {
    switch (e.key) {
      case "Tab": {
        // if focus is on the last item, then close the menu
        const nodeIndex = parseInt(e.target.getAttribute('index'), 10);
        if (nodeIndex === items.length - 1) {
          setMenuOpen(false);
        }
        break;
      }
      case "Enter":
        handleItemOnClick(e);
        break;
      case "Escape":
        // close the menu and move the focus to the input button
        setMenuOpen(false);
        node.current.firstChild.focus();
        break;
      case "Home":
        // move the focus to the first menu item
        e.preventDefault();
        node.current.childNodes[1].firstChild.focus();
        break;
      case "End":
        // move the focus to the last menu item
        e.preventDefault();
        node.current.childNodes[1].lastChild.focus();
        break;
      case "ArrowUp": {
        // move the focus to the previous menu item; if focus is on the first menu item, then move focus to the last menu item
        e.preventDefault();
        const nodeIndex = parseInt(e.target.getAttribute('index'), 10);
        const nextIndex = nodeIndex === 0 ? items.length - 1 : nodeIndex - 1;
        node.current.childNodes[1].childNodes[nextIndex].focus();
        break;
      }
      case "ArrowDown": {
        // move the focus to the next menu item; if focus is on the last menu item, then move the focus to the first menu item
        e.preventDefault();
        const nodeIndex = parseInt(e.target.getAttribute('index'), 10);
        const nextIndex = nodeIndex === items.length - 1 ? 0 : nodeIndex + 1;
        node.current.childNodes[1].childNodes[nextIndex].focus();
        break;
      }
      default:
    }
  };

  // close the menu if the user clicks outside the component
  const handleClickOutside = (e) => {
    if (!node.current.contains(e.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  const menuId = `${id}-menu`;
  const show = menuOpen && items.length > 0 ? 'show' : '';
  return (
    <div
      className={`autocomplete ${className}`}
      ref={node}
    >
      <input
        {...input}
        {...rest}
        id={id}
        type="text"
        onClick={handleInputOnClick}
        onKeyDown={handleInputOnKeyDown}
        aria-haspopup="true"
        aria-label={ariaLabel}
        aria-controls={menuId}
      />
      <ul
        id={menuId}
        className={`dropdown-menu ${show}`}
        role="menu"
        aria-hidden={!menuOpen && items.length === 0}
        aria-labelledby={id}
      >
        {items.map((item, index) => (
          <li
            key={item}
            role="menuitem"
            tabIndex="0"
            value={item}
            index={index}
            onClick={handleItemOnClick}
            onKeyDown={handleItemOnKeyDown}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

Autocomplete.propTypes = {
  id: PropTypes.string.isRequired,
  input: PropTypes.shape({
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func,
  }).isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  itemOnClick: PropTypes.func.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Autocomplete.defaultProps = {
  className: '',
};

export default Autocomplete;

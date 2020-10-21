import React from "react";

export const isValidArrWithValues = (arr) => {
  if (arr && Array.isArray(arr) && arr.length > 0) {
    return true;
  }
  return false;
};

export const isValidObjWithValues = (obj) => {
  if (obj && Object.keys(obj).length > 0) {
    return true;
  } else {
    return false;
  }
};

export const fetch_request = async (url, params) => {
  let payload;
  try {
    const res = await fetch(url);

    payload = await res.json();

    // Add Status and ok to the payload
    payload.status = res.status;
    payload.ok = res.ok;
  } catch (err) {
    console.error(err);
    // Any Fetch error, return undefined to handle on the front end
    return undefined;
  }
  return payload;
};

export const KeyDown = ({ children, up, down, left, right, enter }) => {
  return (
    <div
      tabIndex={0}
      onKeyDown={(e) => {
        switch (e.key) {
          case "ArrowUp": {
            up();
            break;
          }
          case "ArrowDown": {
            down();
            break;
          }
          case "ArrowLeft": {
            left();
            break;
          }
          case "ArrowRight": {
            right();
            break;
          }

          case "Enter": {
            enter();
            break;
          }
          default: {
            console.log(`key: ${e.key}`);
          }
        }
      }}
    >
      {children}
    </div>
  );
};

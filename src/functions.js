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


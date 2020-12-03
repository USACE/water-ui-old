import { TIME } from "./constants";

/**
 * Helper function to output a JSDoc type definition.
 * @param model
 * @param typeName
 */
export const toTypeDef = ( model, typeName ) => {
  if( !model ) return;
  let result = `/**\n`;
  result += ` * @typedef a2w.models.${ typeName }\n`;

  for( const [ key, value ] of Object.entries( model ) ) {
    result += ` * @property {${ typeof value }} ${ key }\n`;
  }

  result += "*/";
  console.log( "toTypeDef:" );
  console.log( result );
};

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

/**
 * Converts an array of objects into an object where the key is the given uid
 * @param {array} array array of objects
 * @param {string} uid object key
 */
export const arrayToObj = (array, uid) => {
  const obj = {};
  array.forEach((item) => {
    obj[item[uid] || 0] = item;
  });
  return obj;
};

/**
 * Returns the number of milliseconds of the given time interval
 * @param {string} interval string representation of the time interval
 */
export const getIntervalTime = (interval) => {
  switch (interval) {
    case "PT15M": // 15 minutes
      return 900000;
    case "PT30M":
      return 1800000;
    case "PT1H":  // 1 hour
      return 3600000;
    case "P1D":
      return TIME.DAY;
    case "P1M": // 1 month
      return TIME.MONTH;
    default:
      return 0;
  }
};

/**
 * Receives javascript Date object and converts it to string in the format yyyy-mm-dd
 * @param {Date} date the date to convert
 */
export const dateToString = date => date && date.toISOString().substring(0, 10);

/**
 * Replaces _ with a space and capitalizes the first letter of the string. If capAll is true
 * then the function will capitalize all the words in the string.
 *
 * @param {string} str the string to format
 * @param {boolean} capAll true if you want to capitalize all the words in the string
 */
export const formatUnderscore = (str, capAll = false) => {
  if (!str) {
    return "";
  }
  const newStr = str.replace(/_/g, " ");
  if (capAll) {
    // capitalize any letter after a space
    return newStr.replace(/\b\w/g, l => l.toUpperCase())
  }
  return newStr.charAt(0).toUpperCase() + newStr.slice(1);
}
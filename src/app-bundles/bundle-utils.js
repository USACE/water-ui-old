export function isMockMode( forceMockMode ) {
  if( forceMockMode === true ) return true;
  return process.env.REACT_APP_MOCK_MODE === "true";
}

export function getMockUrlBase() {
  return `${ process.env.PUBLIC_URL }/mockdata`;
}

export function isDevelopmentMode() {
  return process.env.NODE_ENV !== "production";
}

/**
 * Builds a REST URL. When not in mock mode, it uses the `liveUrl`. In mock mode, uses the `mockUrl`. If the
 * optional `mockOverrideFlag` is set to true, forces use of the `mockUrl`. If set to false, forces use of the `liveUrl`.
 * @param liveUrl
 * @param mockUrl
 * @param [mockOverrideFlag]
 * @returns {string}
 */
export function getRestUrl( liveUrl, mockUrl, mockOverrideFlag ) {
  let useMockUrl = isMockMode();
  if( mockOverrideFlag === true || mockOverrideFlag === false ) useMockUrl = mockOverrideFlag;
  const baseUrl = isDevelopmentMode()
    ? useMockUrl ? `${ process.env.PUBLIC_URL }/mockdata` : `https://api.rsgis.dev/development`
    : useMockUrl ? `${ process.env.PUBLIC_URL }/mockdata` : `https://api.rsgis.dev/development`;

  if( useMockUrl ) return `${ baseUrl }${ mockUrl }`;
  else if( liveUrl.startsWith( "http" ) ) return liveUrl;
  else return `${ baseUrl }${ liveUrl }`;
}

export const arrayToObj = (array, uid) => {
  const obj = {};
  array.forEach((item) => {
    obj[item[uid] || 0] = item;
  });
  return obj;
};

/**
 * Returns the number of milliseconds of the given time interval
 * @param {*} interval string representation of the time interval
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

// number of milliseconds in a hour, day, week, month, and year
export const TIME = {
  DAY: 86400000, // (24 hours) * (60 minutes/hour) * (60 seconds/minute) * (1000 milliseconds/second)
  WEEK: 604800000, // (7 days) * (24 hours/day) * (60 minutes/hour) * (60 seconds/minute) * (1000 milliseconds/second)
  MONTH: 2592000000, // (30 days) * (24 hours/day) * (60 minutes/hour) * (60 seconds/minute) * (1000 milliseconds/second)
  YEAR: 31536000000, // (365 days) * (24 hours/day) * (60 minutes/hour) * (60 seconds/minute) * (1000 milliseconds/second)
};

/**
 * Receives javascript Date object and converts it to string in the format yyyy-mm-dd
 * @param {Date} date the date to convert
 */
export const dateToString = date => date && date.toISOString().substring(0, 10);

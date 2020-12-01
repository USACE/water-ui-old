export function isMockMode( forceMockMode ) {
  if( forceMockMode === true ) return true;
  return process.env.REACT_APP_MOCK_MODE === "true";
}

export function isRemoteMode() {
  return process.env.REACT_APP_REMOTE_MODE === "true";
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
  const baseUrl = isDevelopmentMode() && !isRemoteMode()
    ? useMockUrl ? `${ process.env.PUBLIC_URL }/mockdata` : `http://localhost:3030`
    : useMockUrl ? `${ process.env.PUBLIC_URL }/mockdata` : `https://api.rsgis.dev/development`;

  if( useMockUrl ) return `${ baseUrl }${ mockUrl }`;
  else if( liveUrl.startsWith( "http" ) ) return liveUrl;
  else return `${ baseUrl }${ liveUrl }`;
}

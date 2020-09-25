export function isMockMode( forceMockMode ) {
  if( forceMockMode === true ) return true;
  return process.env.REACT_APP_MOCK_MODE === "true";
}

export function getMockUrlBase() {
  return `${ process.env.PUBLIC_URL }/mockdata`;
}

export function getRestUrl( liveUrl, mockUrl, mockOverrideFlag ) {
  let useMockUrl = isMockMode();
  if( mockOverrideFlag === true || mockOverrideFlag === false ) useMockUrl = mockOverrideFlag;
  const baseUrl = process.env.NODE_ENV === "development"
    ? useMockUrl ? `${ process.env.PUBLIC_URL }/mockdata` : `http://localhost:3030`
    : useMockUrl ? `${ process.env.PUBLIC_URL }/mockdata` : `https://api.rsgis.dev/development`;

  if( useMockUrl ) return `${ baseUrl }${ mockUrl }`;
  else return `${ baseUrl }${ liveUrl }`;
}

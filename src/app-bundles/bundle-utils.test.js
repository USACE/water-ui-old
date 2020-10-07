describe( 'bundle-utils', () => {

  // TODO: Try to figure out if we can mock the bundle utils isMockMode() and isDevelopmentMode() that are used by original getRestUrl().
  // Mock method with same logic as original, but allows for forcing dev vs. prod mode detection
  const getRestUrlTest = ( isDev, isMockEnv, liveUrl, mockUrl, mockOverrideFlag ) => {
    let useMockUrl = isMockEnv; // Real function uses isMockMode() and mock NODE_ENV flag
    if( mockOverrideFlag === true || mockOverrideFlag === false ) useMockUrl = mockOverrideFlag;
    const baseUrl = isDev // Real function uses: process.env.NODE_ENV === "development"
      ? useMockUrl ? `${ process.env.PUBLIC_URL }/mockdata` : `http://localhost:3030`
      : useMockUrl ? `${ process.env.PUBLIC_URL }/mockdata` : `https://api.rsgis.dev/development`;

    if( useMockUrl ) return `${ baseUrl }${ mockUrl }`;
    else return `${ baseUrl }${ liveUrl }`;
  }

  it( "builds REST URL correctly", () => {
    let url = getRestUrlTest( true, false, "/water/locations", "/location-list.json" );
    expect( url ).toBe( "http://localhost:3030/water/locations" );

    url = getRestUrlTest( true, false, "/water/locations", "/location-list.json", true );
    expect( url ).toBe( `${ process.env.PUBLIC_URL }/mockdata/location-list.json` );

    url = getRestUrlTest( true, false, "/water/locations", "/location-list.json", false );
    expect( url ).toBe( "http://localhost:3030/water/locations" );

    url = getRestUrlTest( false, false, "/water/locations", "/location-list.json" );
    expect( url ).toBe( "https://api.rsgis.dev/development/water/locations" );

    url = getRestUrlTest( false, false, "/water/locations", "/location-list.json", true );
    expect( url ).toBe( `${ process.env.PUBLIC_URL }/mockdata/location-list.json` );

    url = getRestUrlTest( false, false, "/water/locations", "/location-list.json", false );
    expect( url ).toBe( "https://api.rsgis.dev/development/water/locations" );


    url = getRestUrlTest( true, true, "/water/locations", "/location-list.json" );
    expect( url ).toBe( `${ process.env.PUBLIC_URL }/mockdata/location-list.json` );

    url = getRestUrlTest( true, true, "/water/locations", "/location-list.json", true );
    expect( url ).toBe( `${ process.env.PUBLIC_URL }/mockdata/location-list.json` );

    url = getRestUrlTest( true, true, "/water/locations", "/location-list.json", false );
    expect( url ).toBe( "http://localhost:3030/water/locations" );

    url = getRestUrlTest( false, true, "/water/locations", "/location-list.json" );
    expect( url ).toBe( `${ process.env.PUBLIC_URL }/mockdata/location-list.json` );

    url = getRestUrlTest( false, true, "/water/locations", "/location-list.json", true );
    expect( url ).toBe( `${ process.env.PUBLIC_URL }/mockdata/location-list.json` );

    url = getRestUrlTest( false, true, "/water/locations", "/location-list.json", false );
    expect( url ).toBe( "https://api.rsgis.dev/development/water/locations" );
  } );

} );

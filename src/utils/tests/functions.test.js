import { isValidArrWithValues } from "../functions";

describe( "isValidArrWithValues", () => {

  it( "if VALID array is passed in", () => {
    const validArr = [ { hello: "yess??" } ];
    expect( isValidArrWithValues( validArr ) ).toBe( true );
  } );

  it( "if INVALID array is passed in", () => {
    const invalidData1 = [];
    const invalidData2 = { something: "something" };

    expect( isValidArrWithValues( invalidData1 ) ).toBe( false );
    expect( isValidArrWithValues( invalidData2 ) ).toBe( false );
  } );

  it( "if no props passed in", () => {
    expect( isValidArrWithValues() ).toBe( false );
  } );

} );

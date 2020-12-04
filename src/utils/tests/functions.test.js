import {
  isValidArrWithValues,
  formatUnderscore,
} from "../functions";

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

describe("formatUnderscore()", () => {
  it("should return empty string if str is null", () => {
    const result = formatUnderscore(null);
    expect(result).toBe("");
  });

  it("should remove underscore and capitalize first letter of first word", () => {
    const result = formatUnderscore("hello_testudo");
    expect(result).toBe("Hello testudo");
  });

  it("should remove underscore and capitalize first letter of all words", () => {
    const result = formatUnderscore("hello_testudo", true);
    expect(result).toBe("Hello Testudo");
  });

  it("should capitalize first letter of string if there are no underscores", () => {
    const result = formatUnderscore("helloTestudo");
    expect(result).toBe("HelloTestudo");
  });
});

import { getRestUrl } from "../bundle-utils";

describe("getRestUrl()", () => {
  const originalEnv = { ...process.env };

  beforeAll(() => {
    /** @type any */ ( process.env ).PUBLIC_URL = "/water";
  });

  afterAll(() => {
    process.env = originalEnv; // restore old env
  });

  const liveUrl = "/water/locations";
  const mockUrl = "/location-list.json";
  const httpUrl = "https://reactjs.org/";

  // testing "npm start"
  describe("in dev mode and not in mock mode", () => {
    beforeAll(() => {
      /** @type any */ ( process.env ).NODE_ENV = "development";
      /** @type any */ ( process.env ).REACT_APP_MOCK_MODE = "false";
    });

    it("should return live url when mockOverrideFlag is not set", () => {
      const url = getRestUrl(liveUrl, mockUrl);
      expect(url).toBe(`http://localhost:3030${liveUrl}`)
    });

    it("should return mock url when mockOverrideFlag is true", () => {
      const url = getRestUrl(liveUrl, mockUrl, true);
      expect(url).toBe(`${process.env.PUBLIC_URL}/mockdata${mockUrl}`);
    });

    it("should return live url when mockOverrideFlag is false", () => {
      const url = getRestUrl(liveUrl, mockUrl, false);
      expect(url).toBe(`http://localhost:3030${liveUrl}`)
    });

    it("should return unmodified live url if it begins with http", () => {
      const url = getRestUrl(httpUrl, mockUrl);
      expect(url).toBe(httpUrl)
    });
  });

  // testing "npm run mock"
  describe("in dev mode and in mock mode", () => {
    beforeAll(() => {
      /** @type any */ ( process.env ).NODE_ENV = "development";
      /** @type any */ ( process.env ).REACT_APP_MOCK_MODE = "true";
    });

    it("should return mock url when mockOverrideFlag is not set", () => {
      const url = getRestUrl(liveUrl, mockUrl);
      expect(url).toBe(`${process.env.PUBLIC_URL}/mockdata${mockUrl}`);
    });

    it("should return mock url when mockOverrideFlag is true", () => {
      const url = getRestUrl(liveUrl, mockUrl, true);
      expect(url).toBe(`${process.env.PUBLIC_URL}/mockdata${mockUrl}`);
    });

    it("should return live url when mockOverrideFlag is false", () => {
      const url = getRestUrl(liveUrl, mockUrl, false);
      expect(url).toBe(`http://localhost:3030${liveUrl}`)
    });

    it("should return mock url even if live url begins with http", () => {
      const url = getRestUrl(httpUrl, mockUrl);
      expect(url).toBe(`${process.env.PUBLIC_URL}/mockdata${mockUrl}`);
    });
  });

  // testing "npm run build"
  describe("in production mode and not in mock mode", () => {
    beforeAll(() => {
      /** @type any */ ( process.env ).NODE_ENV = "production";
      /** @type any */ ( process.env ).REACT_APP_MOCK_MODE = "false";
    });

    it("should return live url when mockOverrideFlag is not set", () => {
      const url = getRestUrl(liveUrl, mockUrl);
      expect(url).toBe(`https://api.rsgis.dev/development${liveUrl}`);
    });

    it("should return mock url when mockOverrideFlag is true", () => {
      const url = getRestUrl(liveUrl, mockUrl, true);
      expect(url).toBe(`${process.env.PUBLIC_URL}/mockdata${mockUrl}`);
    });

    it("should return live url when mockOverrideFlag is false", () => {
      const url = getRestUrl(liveUrl, mockUrl, false);
      expect(url).toBe(`https://api.rsgis.dev/development${liveUrl}`);
    });

    it("should return unmodified live url if it begins with http", () => {
      const url = getRestUrl(httpUrl, mockUrl);
      expect(url).toBe(httpUrl);
    });
  });

  // I don't think this is testing any real world scenario, but I copied it over when refactoring the previous unit tests
  describe("in production mode and in mock mode", () => {
    beforeAll(() => {
      /** @type any */ ( process.env ).NODE_ENV = "production";
      /** @type any */ ( process.env ).REACT_APP_MOCK_MODE = "true";
    });

    it("should return mock url when mockOverrideFlag is not set", () => {
      const url = getRestUrl(liveUrl, mockUrl);
      expect(url).toBe(`${process.env.PUBLIC_URL}/mockdata${mockUrl}`);
    });

    it("should return mock url when mockOverrideFlag is true", () => {
      const url = getRestUrl(liveUrl, mockUrl, true);
      expect(url).toBe(`${process.env.PUBLIC_URL}/mockdata${mockUrl}`);
    });

    it("should return live url when mockOverrideFlag is false", () => {
      const url = getRestUrl(liveUrl, mockUrl, false);
      expect(url).toBe(`https://api.rsgis.dev/development${liveUrl}`);
    });

    it("should return mock url even if live url begins with http", () => {
      const url = getRestUrl(httpUrl, mockUrl);
      expect(url).toBe(`${process.env.PUBLIC_URL}/mockdata${mockUrl}`);
    });
  });
});

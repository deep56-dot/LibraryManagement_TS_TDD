import {Library} from "../src/models/Library"
describe("Library Class Tests", () => {
    let library: Library;
    beforeEach(() => {
      library = new Library("shailesh");
    });
  
    test("Should throw exception when library name is less than 5 characters", () => {
      expect(() => new Library("Lib")).toThrow("Library name should be at least 5 characters long");
    });
})
import {Library} from "../src/models/Library"
import {User} from "../src/models/User"

describe("Library Class Tests", () => {
    let library: Library;
    beforeEach(() => {
      library = new Library("shailesh");
    });
  
    test("Should throw exception when library name is less than 5 characters", () => {
      expect(() => new Library("Lib")).toThrow("Library name should be at least 5 characters long");
    });

    test("Should add a user to the library", () => {
        const user = new User("Deep", User.Role.LIBRARIAN);
        library.addUser(user);
        expect(library["users"].get("Deep")).toBe(user)
      });

      test("Should not allow duplicate users", () => {
        const user = new User("Parth", User.Role.LIBRARIAN);
        library.addUser(user);
        expect(() => library.addUser(user)).toThrow(UserExistsException);
      });
})

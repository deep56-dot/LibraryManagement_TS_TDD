import { UserExistsException } from "../src/errors/userExitsException";
import { Book } from "../src/models/Book";
import {Library} from "../src/models/Library"
import {User} from "../src/models/User"
+
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

      test("Should add a book to the library",()=>{
        const librarian = new User("Deep", User.Role.LIBRARIAN);
    const book = new Book("9780144000581", "Malgudi Days", "R.K. Narayan", 1943);
    library.addUser(librarian);
    library.addBook(librarian, book);
    expect(library["books"].get("9780144000581")).toBe(book);
      })
})

import { UserExistsException } from "../src/errors/userExitsException";
import { Book } from "../src/models/Book";
import {Library} from "../src/models/Library"
import {User} from "../src/models/User"
import {PermissionDeniedException} from "../src/errors/permissionDeniedException"
import {BookNotFoundException} from "../src/errors/bookNotFoundException"

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


  test("Should not allow non-librarian users to add books", () => {
    const user = new User("Heta", User.Role.USER);
    const book = new Book("9780144000581", "Malgudi Days", "R.K. Narayan",1943);
    library.addUser(user);
    expect(() => library.addBook(user, book)).toThrow(PermissionDeniedException);
  });

  test("Should allow user to borrow an available book", () => {
    const librarian = new User("Deep", User.Role.LIBRARIAN);
    const user = new User("Heta", User.Role.USER);
    const book = new Book("9788172234980", "The White Tiger", "Aravind Adiga", 2008);

    library.addUser(librarian);
    library.addUser(user);
    library.addBook(librarian, book);

    library.borrowBook(user, "9788172234980");
    expect(library["books"].get("9788172234980")).toBeUndefined();
    expect(library["borrowedBooks"].get("9788172234980")).toBe("Heta");
  });

  test("Should throw exception when borrowing a non-existent book", () => {
    const user = new User("Parth", User.Role.USER);
    library.addUser(user);
    expect(() => library.borrowBook(user, "9788172234980")).toThrow(BookNotFoundException);
  });

  test("Should throw exception when borrowing an already borrowed book", () => {
    const librarian = new User("Deep", User.Role.LIBRARIAN);
    const user1 = new User("Heta", User.Role.USER);
    const user2 = new User("Parth", User.Role.USER);
    const book = new Book("9788172234980", "The White Tiger", "Aravind Adiga", 2008);

    library.addUser(librarian);
    library.addUser(user1);
    library.addUser(user2);
    library.addBook(librarian, book);

    library.borrowBook(user1, "9788172234980");
    expect(() => library.borrowBook(user2, "9788172234980")).toThrow(BookAlreadyBorrowedException);
  });



  

})

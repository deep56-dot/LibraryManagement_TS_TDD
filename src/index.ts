import { Library } from "./models/Library";
import { User } from "./models/User";
import { Book } from "./models/Book";
import { BookAlreadyBorrowedException } from "./errors/bookAlredayBorrowedException";
import { BookNotFoundException } from "./errors/bookNotFoundException";
import { UserExistsException } from "./errors/userExitsException";
import { PermissionDeniedException } from "./errors/permissionDeniedException";

try {
  // Create a library
  const library = new Library("Central Library");

  // Create users
  const librarian = new User("Parth", User.Role.LIBRARIAN);
  const user1 = new User("Deep", User.Role.USER);
  const user2 = new User("Heta", User.Role.USER);

  // Add users to the library
  library.addUser(librarian);
  library.addUser(user1);
  library.addUser(user2);

  // Create books
  const book1 = new Book("9788172234980", "The White Tiger", "Aravind Adiga", 2008);
  const book2 = new Book("9788184001655", "India Unbound", "Gurcharan Das", 2000);
  const book3 = new Book("9780143031795", "Malgudi Days", "R.K. Narayan", 1943);

  // Librarian adds books to the library
  library.addBook(librarian, book1);
  library.addBook(librarian, book2);
  library.addBook(librarian, book3);

  console.log("Books available in the library:");
  console.log(Array.from(library.viewAvailableBooks().values()).map(book => book.getTitle()));

  // User borrows a book
  console.log(`\n${user1.getName()} borrows "${book1.getTitle()}"`);
  library.borrowBook(user1, book1.getISBN());

  // Display borrowed books
  console.log("\nBorrowed books:");
  library["borrowedBooks"].forEach((borrowedBy, isbn) => {
    console.log(`ISBN: ${isbn}, Borrowed By: ${borrowedBy}`);
  });

  // User tries to borrow a book that is already borrowed
  try {
    console.log(`\n${user2.getName()} attempts to borrow "${book1.getTitle()}"`);
    library.borrowBook(user2, book1.getISBN());
  } catch (error) {
    if (error instanceof BookAlreadyBorrowedException) {
      console.error(error.message);
    }
  }

  // User returns a book
  console.log(`\n${user1.getName()} returns "${book1.getTitle()}"`);
  library.returnBook(user1, book1.getISBN());

  // Check available books after return
  console.log("\nBooks available in the library after return:");
  console.log(Array.from(library.viewAvailableBooks().values()).map(book => book.getTitle()));

  // User tries to return a book they did not borrow
  try {
    console.log(`\n${user2.getName()} attempts to return "${book1.getTitle()}"`);
    library.returnBook(user2, book1.getISBN());
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }

  // User tries to borrow a book that doesn't exist
  try {
    console.log(`\n${user1.getName()} attempts to borrow a non-existent book`);
    library.borrowBook(user1, "9999999999999");
  } catch (error) {
    if (error instanceof BookNotFoundException) {
      console.error(error.message);
    }
  }

  // Check final status of the library
  console.log("\nFinal library status:");
  console.log("Available books:", Array.from(library.viewAvailableBooks().values()).map(book => book.getTitle()));
  console.log("Borrowed books:");
  library["borrowedBooks"].forEach((borrowedBy, isbn) => {
    console.log(`ISBN: ${isbn}, Borrowed By: ${borrowedBy}`);
  });

} catch (error:any) {
  console.error(error.message);
}

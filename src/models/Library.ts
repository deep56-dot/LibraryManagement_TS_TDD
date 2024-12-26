import { Book } from "./Book";
import { User } from "./User";
import { UserExistsException } from "../errors/userExitsException";
import { PermissionDeniedException } from "../errors/permissionDeniedException";
import { BookNotFoundException } from "../errors/bookNotFoundException";
import { BookAlreadyBorrowedException } from "../errors/bookAlredayBorrowedException";

export class Library {
  private books: Map<string, Book> = new Map();
  private borrowedBooks: Map<string, string> = new Map();
  private borrowedBooksObj: Map<string, Book> = new Map();

  private users: Map<string, User> = new Map();

  constructor(private name: string) {
    if (!name || name.length < 5) throw new Error("Library name should be at least 5 characters long");
  }

  addUser(user: User): void {
    if (this.users.has(user.getName())) throw new UserExistsException("User already exists in catalog");
    
    this.users.set(user.getName(), user);
  }
  
    addBook(user: User, book: Book): void {
    if (user.getRole() !== User.Role.LIBRARIAN)
      throw new PermissionDeniedException("You are not authorized to add books");
    this.books.set(book.getISBN(), book);
  }

  borrowBook(user: User, isbn: string): void {
    if (this.borrowedBooks.has(isbn)) throw new BookAlreadyBorrowedException("Book is already borrowed");
    if (!this.books.has(isbn)) throw new BookNotFoundException("Book not found");
    this.borrowedBooks.set(isbn, user.getName());
    this.borrowedBooksObj.set(isbn,this.books.get(isbn)!)
    this.books.delete(isbn);

    this.borrowedBooks.forEach((value,key)=>{
      console.log(value);
    })
  }

    returnBook(user: User, isbn: string): void {
    const borrower = this.borrowedBooks.get(isbn);
    if (!borrower) throw new BookNotFoundException("Book was not borrowed by any user");
    if (borrower !== user.getName()) throw new Error("Book was not borrowed by this user");

    const book = this.borrowedBooksObj.get(isbn);

    this.borrowedBooksObj.delete(isbn);
    this.borrowedBooks.delete(isbn);
    this.books.set(isbn, book!);

    
    this.books.forEach((value,key)=>{
      console.log(value);
    })
  }

  viewAvailableBooks(): Map<string, Book> {
    return new Map(this.books); // Return a copy to ensure immutability
  }
}

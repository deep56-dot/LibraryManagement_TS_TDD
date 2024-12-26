import { Book } from "./Book";
import { User } from "./User";
import { UserExistsException } from "../errors/userExitsException";
import { PermissionDeniedException } from "../errors/permissionDeniedException";

export class Library {
  private books: Map<string, Book> = new Map();
  private borrowedBooks: Map<string, string> = new Map();
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
}

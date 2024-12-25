import { Book } from "./Book";
import { User } from "./User";


export class Library {
  private books: Map<string, Book> = new Map();
  private borrowedBooks: Map<string, string> = new Map();
  private users: Map<string, User> = new Map();

  constructor(private name: string) {
  }


}

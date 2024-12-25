import {Book} from "../src/models/Book"

describe("Book Class", () => {
    test("Should successfully create a valid book instance", () => {
        const book = new Book("9780143414969", "The Guide", "R.K. Narayan", 1958);
        expect(book).toBeDefined();
        expect(book.getISBN()).toBe("9780143414969");
      });
  });

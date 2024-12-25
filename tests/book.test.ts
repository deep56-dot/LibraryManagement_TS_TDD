import {Book} from "../src/models/Book"

describe("Book Class", () => {
    test("Should successfully create a valid book instance", () => {
        const book = new Book("9780143414969", "The Guide", "R.K. Narayan", 1958);
        expect(book).toBeDefined();
        expect(book.getISBN()).toBe("9780143414969");
      });

      test("Should Throw Error when ISBN is null",()=>{
        expect(() => new Book(null!, "The Guide", "R.K. Narayan", 1958)).toThrow(
            "ISBN should not be null or empty"
          );
      })

      test("Should throw exception when title is null", () => {
        expect(() => new Book("9780143414969", null!, "R.K. Narayan", 1958)).toThrow(
          "Title should not be null or empty"
        );
      });

      test("Should throw exception when author is empty", () => {
        expect(() => new Book("9780143414969", "The Guide", "", 1958)).toThrow(
          "Author should not be null or empty"
        );
      });
  });

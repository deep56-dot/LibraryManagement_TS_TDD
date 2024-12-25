
export class Book {
  constructor(
    private isbn: string,
    private title: string,
    private author: string,
    private publicationYear: Number
  ) {
    if (!isbn || isbn.trim() === "") throw new Error("ISBN should not be null or empty");
    if (!title || title.trim() === "") throw new Error("Title should not be null or empty");
    if (!author || author.trim() === "") throw new Error("Author should not be null or empty");
  }

  getISBN(): string {
    return this.isbn;
  }
}

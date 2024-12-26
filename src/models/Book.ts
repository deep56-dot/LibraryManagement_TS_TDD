
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
    if (!publicationYear) throw new Error("Publication year should not be null");
  }

  getISBN(): string {
    return this.isbn;
  }

  getTitle():string{
    return this.title
  }
}

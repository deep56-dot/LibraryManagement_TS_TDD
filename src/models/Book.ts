
export class Book {
  constructor(
    private isbn: string,
    private title: string,
    private author: string,
    private publicationYear: Number
  ) {
    
  }

  getISBN(): string {
    return this.isbn;
  }
}

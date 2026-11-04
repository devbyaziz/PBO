// Abstraction: class dasar menetapkan kontrak untuk semua item perpustakaan.
export abstract class LibraryItem {
  constructor(
    public readonly id: string,
    public readonly title: string,
  ) {}

  abstract getLoanPeriodInDays(): number;
}

// Inheritance: BookItem mewarisi data dan kontrak dari LibraryItem.
export class BookItem extends LibraryItem {
  constructor(
    id: string,
    title: string,
    public readonly author: string,
  ) {
    super(id, title);
  }

  getLoanPeriodInDays(): number {
    return 14;
  }
}

// Polymorphism: implementasi method yang sama memiliki aturan berbeda.
export class ReferenceBook extends LibraryItem {
  getLoanPeriodInDays(): number {
    return 0;
  }
}

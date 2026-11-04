// Encapsulation: stok hanya dapat diubah melalui operasi yang tervalidasi.
export class LibraryBook {
  private availableCopies: number;

  constructor(
    public readonly title: string,
    initialCopies: number,
  ) {
    if (initialCopies < 0) {
      throw new Error('Jumlah buku tidak boleh negatif');
    }
    this.availableCopies = initialCopies;
  }

  getAvailableCopies(): number {
    return this.availableCopies;
  }

  borrow(): void {
    if (this.availableCopies === 0) {
      throw new Error('Buku sedang tidak tersedia');
    }
    this.availableCopies -= 1;
  }

  returnBook(): void {
    this.availableCopies += 1;
  }
}

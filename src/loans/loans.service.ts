import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../books/book.entity';
import { BorrowBookDto } from './dto/borrow-book.dto';
import { Loan, LoanStatus } from './loan.entity';

@Injectable()
export class LoansService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(Loan)
    private readonly loanRepository: Repository<Loan>,
  ) {}

  async borrowBook(dto: BorrowBookDto): Promise<Loan> {
    const book = await this.bookRepository.findOneBy({ id: dto.bookId });
    if (!book) {
      throw new NotFoundException('Buku tidak ditemukan');
    }

    if (book.stock <= 0) {
      throw new BadRequestException('Buku sedang tidak tersedia');
    }

    const activeLoan = await this.loanRepository.findOne({
      where: {
        memberId: dto.memberId,
        status: LoanStatus.BORROWED,
        book: { id: dto.bookId },
      },
    });
    if (activeLoan) {
      throw new BadRequestException('Anggota masih meminjam buku ini');
    }

    book.stock -= 1;
    await this.bookRepository.save(book);

    return this.loanRepository.save(
      this.loanRepository.create({
        book,
        memberId: dto.memberId,
        status: LoanStatus.BORROWED,
      }),
    );
  }

  async returnBook(loanId: string): Promise<Loan> {
    const loan = await this.loanRepository.findOne({
      where: { id: loanId },
      relations: { book: true },
    });
    if (!loan) {
      throw new NotFoundException('Data peminjaman tidak ditemukan');
    }
    if (loan.status === LoanStatus.RETURNED) {
      throw new BadRequestException('Buku sudah dikembalikan');
    }

    loan.status = LoanStatus.RETURNED;
    loan.returnedAt = new Date();
    loan.book.stock += 1;
    await this.bookRepository.save(loan.book);

    return this.loanRepository.save(loan);
  }
}

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Book } from '../books/book.entity';

export enum LoanStatus {
  BORROWED = 'BORROWED',
  RETURNED = 'RETURNED',
}

@Entity('loans')
export class Loan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  memberId: string;

  @Column({
    type: 'varchar',
    length: 20,
    default: LoanStatus.BORROWED,
  })
  status: LoanStatus;

  @CreateDateColumn()
  borrowedAt: Date;

  @Column({ type: 'datetime', nullable: true })
  returnedAt: Date | null;

  @ManyToOne(() => Book, (book) => book.loans, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'book_id' })
  book: Book;
}

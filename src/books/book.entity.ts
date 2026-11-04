import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Loan } from '../loans/loan.entity';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 150 })
  title: string;

  @Column({ length: 100 })
  author: string;

  @Column({ unique: true, length: 20 })
  isbn: string;

  @Column({ default: 0 })
  stock: number;

  @OneToMany(() => Loan, (loan) => loan.book)
  loans: Loan[];
}

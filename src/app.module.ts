import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';
import { LoansModule } from './loans/loans.module';
import { Book } from './books/book.entity';
import { Loan } from './loans/loan.entity';
import { AppController } from './app.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.DB_NAME ?? 'library.sqlite',
      entities: [Book, Loan],
      synchronize: true,
    }),
    BooksModule,
    LoansModule,
  ],
  controllers: [AppController],
})
export class AppModule {}

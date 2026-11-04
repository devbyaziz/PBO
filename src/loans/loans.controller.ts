import { Body, Controller, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { BorrowBookDto } from './dto/borrow-book.dto';
import { LoansService } from './loans.service';

@Controller('loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @Post()
  borrow(@Body() dto: BorrowBookDto) {
    return this.loansService.borrowBook(dto);
  }

  @Post(':id/return')
  returnBook(@Param('id', ParseUUIDPipe) loanId: string) {
    return this.loansService.returnBook(loanId);
  }
}

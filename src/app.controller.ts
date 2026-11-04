import { Controller, Get } from '@nestjs/common';

@Controller('api')
export class AppController {
  @Get('status')
  getStatus(): object {
    return {
      aplikasi: 'Sistem Manajemen Perpustakaan',
      status: 'berjalan',
      database: 'SQLite',
    };
  }
}

# Sistem Manajemen Perpustakaan

~Proyek akhir Pemrograman Berorientasi Objek menggunakan NestJS, TypeORM, dan SQLite.~

## Menjalankan proyek

1. Salin `.env.example` menjadi `.env`.
2. Jalankan `npm install`.
3. Jalankan `npm run start:dev`.

SQLite disimpan sebagai file `library.sqlite`, sehingga tidak perlu menjalankan
server database terpisah.

Endpoint utama:

- `GET /` untuk memeriksa status aplikasi.
- `POST /loans` untuk meminjam buku.
- `POST /loans/:id/return` untuk mengembalikan buku.

## Contoh empat pilar PBO

Contoh kode tersedia di:

- `src/common/pbo/library-book.ts` untuk enkapsulasi.
- `src/common/pbo/library-item.ts` untuk abstraksi, pewarisan, dan polimorfisme.
- `src/common/pbo/notifiable.interface.ts` untuk abstraksi berbasis interface.

`synchronize` diaktifkan agar tabel dibuat otomatis saat belajar atau
menjalankan proyek secara lokal. Gunakan migration dan nonaktifkan
`synchronize` sebelum aplikasi dipakai pada lingkungan produksi.

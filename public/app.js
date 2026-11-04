const list = document.querySelector('#book-list');
const message = document.querySelector('#message');

function showMessage(text, error = false) {
  message.textContent = text;
  message.className = error ? 'message error' : 'message';
}

function renderBooks(books) {
  document.querySelector('#total-books').textContent = books.length;
  document.querySelector('#total-stock').textContent = books.reduce((total, book) => total + book.stock, 0);
  list.innerHTML = books.length
    ? books.map((book) => `
      <article class="book">
        <div><div class="book-title">${book.title}</div><div class="book-author">${book.author} · ISBN ${book.isbn}</div></div>
        <span class="stock">${book.stock} stok</span>
      </article>`).join('')
    : '<p class="empty">Belum ada buku. Tambahkan koleksi pertama.</p>';
}

async function loadBooks() {
  try {
    const response = await fetch('/books');
    if (!response.ok) throw new Error('Gagal mengambil daftar buku');
    renderBooks(await response.json());
  } catch (error) {
    showMessage(error.message, true);
  }
}

document.querySelector('#book-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget));
  data.stock = Number(data.stock);
  const response = await fetch('/books', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    showMessage('Buku gagal disimpan. Periksa data dan ISBN.', true);
    return;
  }
  event.currentTarget.reset();
  showMessage('Buku berhasil disimpan.');
  await loadBooks();
});

document.querySelector('#refresh-button').addEventListener('click', loadBooks);
loadBooks();

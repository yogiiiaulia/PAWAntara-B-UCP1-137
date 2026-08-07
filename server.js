const express = require('express');
const path = require('path');
const products = require('./data/products');
const apiRoutes = require('./routes/apiRoutes');

const app = express();
const PORT = 3000;

// Setup EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  const previewProducts = products.slice(0, 4);
  res.render('index', { 
    products: previewProducts,
    title: 'Beranda - Toko Sembako Ariesta',
    currentPage: 'beranda'
  });
});

app.get('/produk', (req, res) => {
  let filteredProducts = [...products];
  const { kategori, search } = req.query;

  if (kategori) {
    filteredProducts = filteredProducts.filter(p => 
      p.category.toLowerCase() === kategori.toLowerCase()
    );
  }

  if (search) {
    const searchLower = search.toLowerCase();
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(searchLower) ||
      p.category.toLowerCase().includes(searchLower)
    );
  }

  res.render('produk', { 
    products: filteredProducts,
    allProducts: products,
    title: 'Produk - Toko Sembako Ariesta',
    currentPage: 'produk',
    query: req.query
  });
});

app.get('/produk/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).render('404', {
      title: 'Produk Tidak Ditemukan',
      message: `Produk dengan ID ${id} tidak ditemukan.`,
      currentPage: 'produk'
    });
  }

  res.render('detail-produk', { 
    product,
    title: `${product.name} - Toko Sembako Ariesta`,
    currentPage: 'produk'
  });
});

app.get('/tanya-ai', (req, res) => {
  res.render('tanya-ai', {
    title: 'Tanya AI - Toko Sembako Ariesta',
    currentPage: 'tanya-ai'
  });
});

app.use('/api', apiRoutes);

app.use((req, res) => {
  res.status(404).render('404', {
    title: 'Halaman Tidak Ditemukan',
    message: 'Maaf, halaman yang Anda cari tidak tersedia.',
    currentPage: null
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
  console.log(`📦 ${products.length} produk siap ditampilkan`);
});

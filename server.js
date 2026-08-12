const express = require('express');
const session = require('express-session');
const path = require('path');
require('dotenv').config();

const products = require('./data/products');
const apiRoutes = require('./routes/apiRoutes');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const chatRoutes = require('./routes/chatRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// ============================================
// FR-08: MIDDLEWARE CUSTOM - REQUEST LOGGER
// ============================================
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url} - IP: ${req.ip}`);
  next();
});

// ============================================
// SETUP VIEW ENGINE
// ============================================
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ============================================
// MIDDLEWARE
// ============================================
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session (FR-11, FR-12)
app.use(session({
  secret: process.env.SESSION_SECRET || 'rahasia-kopdes',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 3600000 } // 1 jam
}));

// ============================================
// ROUTES
// ============================================

// Public routes
app.get('/', (req, res) => {
  const previewProducts = products.slice(0, 4);
  res.render('index', { 
    products: previewProducts,
    title: 'Beranda - Kopdes Ariesta',
    currentPage: 'beranda',
    user: req.session.user || null
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
    title: 'Produk - Kopdes Ariesta',
    currentPage: 'produk',
    query: req.query,
    user: req.session.user || null
  });
});

app.get('/produk/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).render('404', {
      title: 'Produk Tidak Ditemukan',
      message: `Produk dengan ID ${id} tidak ditemukan.`,
      currentPage: 'produk',
      user: req.session.user || null
    });
  }

  res.render('detail-produk', { 
    product,
    title: `${product.name} - Kopdes Ariesta`,
    currentPage: 'produk',
    user: req.session.user || null
  });
});

app.get('/tanya-ai', (req, res) => {
  res.render('tanya-ai', {
    title: 'Tanya AI - Kopdes Ariesta',
    currentPage: 'tanya-ai',
    user: req.session.user || null
  });
});

// ============================================
// SPRINT 2: AUTH ROUTES
// ============================================
app.use('/', authRoutes);

// ============================================
// SPRINT 2: DASHBOARD (wajib login - FR-12)
// ============================================
const { isAuthenticatedPage } = require('./middleware/auth');

app.get('/dashboard', isAuthenticatedPage, (req, res) => {
  res.render('dashboard', {
    title: 'Dashboard - Kopdes Ariesta',
    currentPage: 'dashboard',
    user: req.session.user
  });
});

// ============================================
// API ROUTES
// ============================================
app.use('/api', apiRoutes); // GET /api/products
app.use('/api', productRoutes); // POST/PUT/DELETE /api/products
app.use('/api', chatRoutes); // POST /api/chat

// ============================================
// 404 HANDLER
// ============================================
app.use((req, res) => {
  res.status(404).render('404', {
    title: 'Halaman Tidak Ditemukan',
    message: 'Maaf, halaman yang Anda cari tidak tersedia.',
    currentPage: null,
    user: req.session.user || null
  });
});

// ============================================
// START SERVER
// ============================================
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
  console.log(`📦 ${products.length} produk siap ditampilkan`);
  console.log(`🌾 Kopdes Ariesta - Sprint 2`);
});
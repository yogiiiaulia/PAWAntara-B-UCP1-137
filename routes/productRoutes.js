const express = require('express');
const router = express.Router();
const products = require('../data/products');
const { isAuthenticated } = require('../middleware/auth');

let nextId = products.length + 1;

// ============================================
// POST /api/products - Tambah produk (wajib login)
// ============================================
// ✅ BENAR: path-nya '/products' (tanpa /api)
router.post('/products', isAuthenticated, (req, res) => {
  console.log('🔥 POST /api/products dipanggil!');
  console.log('📦 Body:', req.body);
  console.log('👤 User:', req.session.user);

  const { name, category, price, stock, unit, description } = req.body;

  if (!name || !price || !stock) {
    return res.status(400).json({
      status: 'error',
      message: 'Nama, harga, dan stok wajib diisi'
    });
  }

  const newProduct = {
    id: nextId++,
    name,
    category: category || 'pangan',
    price: parseInt(price),
    stock: parseInt(stock),
    unit: unit || 'kg',
    description: description || ''
  };

  products.push(newProduct);

  res.status(201).json({
    status: 'success',
    message: 'Produk berhasil ditambahkan',
    data: newProduct
  });
});

// ============================================
// PUT /api/products/:id - Update produk (wajib login)
// ============================================
// ✅ BENAR: path-nya '/products/:id' (tanpa /api)
router.put('/products/:id', isAuthenticated, (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({
      status: 'error',
      message: 'Produk tidak ditemukan'
    });
  }

  const { name, category, price, stock, unit, description } = req.body;

  if (name) product.name = name;
  if (category) product.category = category;
  if (price) product.price = parseInt(price);
  if (stock) product.stock = parseInt(stock);
  if (unit) product.unit = unit;
  if (description) product.description = description;

  res.json({
    status: 'success',
    message: 'Produk berhasil diupdate',
    data: product
  });
});

// ============================================
// DELETE /api/products/:id - Hapus produk (wajib login)
// ============================================
// ✅ BENAR: path-nya '/products/:id' (tanpa /api)
router.delete('/products/:id', isAuthenticated, (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({
      status: 'error',
      message: 'Produk tidak ditemukan'
    });
  }

  const deleted = products.splice(index, 1);
  res.json({
    status: 'success',
    message: 'Produk berhasil dihapus',
    data: deleted[0]
  });
});

module.exports = router;
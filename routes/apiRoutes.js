const express = require('express');
const router = express.Router();
const products = require('../data/products');

router.get('/products', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Data produk berhasil diambil',
    count: products.length,
    data: products,
    timestamp: new Date().toISOString()
  });
});

router.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({
      status: 'error',
      message: `Produk dengan ID ${id} tidak ditemukan`,
      timestamp: new Date().toISOString()
    });
  }

  res.status(200).json({
    status: 'success',
    message: 'Detail produk berhasil diambil',
    data: product,
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
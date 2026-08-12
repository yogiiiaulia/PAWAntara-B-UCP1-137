const express = require('express');
const router = express.Router();
const products = require('../data/products');

// FR-14: POST /api/chat
router.post('/api/chat', (req, res) => {
  const { question } = req.body;

  if (!question || question.trim() === '') {
    return res.status(400).json({
      status: 'error',
      message: 'Pertanyaan tidak boleh kosong'
    });
  }

  const lowerQuestion = question.toLowerCase();
  let answer = 'Maaf, saya belum mengerti pertanyaan Anda. Coba tanyakan tentang produk, stok, atau harga.';

  // Keyword matching
  if (lowerQuestion.includes('harga') || lowerQuestion.includes('berapa')) {
    const productMatch = products.find(p => 
      lowerQuestion.includes(p.name.toLowerCase()) ||
      lowerQuestion.includes(p.category.toLowerCase())
    );
    if (productMatch) {
      answer = `🌾 Harga ${productMatch.name} adalah Rp ${productMatch.price.toLocaleString()} per ${productMatch.unit}.`;
    } else {
      answer = '🌾 Silakan sebutkan nama produk yang ingin Anda ketahui harganya. Contoh: "harga kopi robusta"';
    }
  } else if (lowerQuestion.includes('stok') || lowerQuestion.includes('ada')) {
    const productMatch = products.find(p => 
      lowerQuestion.includes(p.name.toLowerCase())
    );
    if (productMatch) {
      answer = `📦 Stok ${productMatch.name} tersisa ${productMatch.stock} ${productMatch.unit}.`;
    } else {
      answer = '📦 Silakan sebutkan nama produk yang ingin Anda cek stoknya. Contoh: "stok beras organik"';
    }
  } else if (lowerQuestion.includes('kopdes') || lowerQuestion.includes('koperasi')) {
    answer = '🏡 Kopdes Ariesta adalah Koperasi Desa yang bergerak di bidang pertanian, perkebunan, dan produk olahan. Kami melayani penjualan hasil bumi dari warga desa.';
  } else if (lowerQuestion.includes('organik') || lowerQuestion.includes('alami')) {
    answer = '🌱 Semua produk Kopdes Ariesta adalah produk organik alami, tanpa bahan kimia berbahaya.';
  } else if (lowerQuestion.includes('terima kasih') || lowerQuestion.includes('makasih')) {
    answer = '🌾 Sama-sama! Senang bisa membantu. Ada lagi yang bisa saya bantu?';
  } else if (lowerQuestion.includes('halo') || lowerQuestion.includes('hi') || lowerQuestion.includes('hai')) {
    answer = '🌾 Halo! Selamat datang di Kopdes Ariesta. Ada yang bisa saya bantu? Tanyakan tentang produk, stok, atau harga!';
  }

  res.json({
    status: 'success',
    data: {
      question,
      answer,
      timestamp: new Date().toISOString()
    }
  });
});

module.exports = router;
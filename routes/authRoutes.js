const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// Data admin (FR-18: in-memory)
const admin = {
  username: process.env.ADMIN_USERNAME || 'admin',
  password: '$2b$10$YourHashedPasswordHere' // nanti di-hash dengan bcrypt
};

// FR-10: Halaman Login
router.get('/login', (req, res) => {
  if (req.session && req.session.user) {
    return res.redirect('/dashboard');
  }
  res.render('login', { error: null });
});

// FR-11: Endpoint POST /api/login
router.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      status: 'error',
      message: 'Username dan password wajib diisi'
    });
  }

  // Validasi sederhana (tanpa bcrypt dulu untuk kemudahan)
  if (username === admin.username && password === 'kopdes123') {
    req.session.user = { username, role: 'admin' };
    return res.json({
      status: 'success',
      message: 'Login berhasil',
      data: { username }
    });
  }

  res.status(401).json({
    status: 'error',
    message: 'Username atau password salah'
  });
});

// FR-13: Logout
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Gagal logout'
      });
    }
    res.redirect('/login');
  });
});

module.exports = router;
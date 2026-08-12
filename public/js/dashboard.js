// ============================================
// FR-16: Fetch API dengan async/await
// FR-17: Event handling + validasi
// ============================================

// === LOAD PRODUK ===
async function loadProducts() {
  try {
    const response = await fetch('/api/products');
    const data = await response.json();
    
    const productList = document.getElementById('productList');
    if (!productList) return;
    
    productList.innerHTML = '';
    
    if (data.data && data.data.length > 0) {
      data.data.forEach(product => {
        const card = document.createElement('article');
        card.className = 'product-card';
        card.dataset.id = product.id;
        card.innerHTML = `
          <div class="product-card-content">
            <span class="product-category">${product.category}</span>
            <h3>${product.name}</h3>
            <div class="product-meta">
              <span class="product-price">Rp ${product.price.toLocaleString()}</span>
              <span class="product-stock">📦 Stok: ${product.stock} ${product.unit}</span>
            </div>
            <div class="product-actions">
              <button class="btn btn-edit" data-id="${product.id}">✏️ Edit</button>
              <button class="btn btn-delete" data-id="${product.id}">🗑️ Hapus</button>
            </div>
          </div>
        `;
        productList.appendChild(card);
      });
      
      // Event listener untuk tombol edit & hapus
      document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', openEditModal);
      });
      
      document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', deleteProduct);
      });
    } else {
      productList.innerHTML = '<p class="empty-state">🌾 Belum ada produk. Tambahkan produk baru!</p>';
    }
  } catch (err) {
    console.error('Error loading products:', err);
  }
}

// === TAMBAH PRODUK ===
document.getElementById('addProductForm')?.addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const name = document.getElementById('productName').value.trim();
  const category = document.getElementById('productCategory').value;
  const price = parseInt(document.getElementById('productPrice').value);
  const stock = parseInt(document.getElementById('productStock').value);
  const unit = document.getElementById('productUnit').value.trim() || 'kg';
  const description = document.getElementById('productDesc').value.trim();
  
  const messageDiv = document.getElementById('addMessage');
  
  // FR-17: Validasi
  if (!name || isNaN(price) || isNaN(stock) || price <= 0 || stock < 0) {
    messageDiv.className = 'message error';
    messageDiv.textContent = '⚠️ Semua field wajib diisi dengan benar!';
    return;
  }
  
  try {
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, category, price, stock, unit, description })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      messageDiv.className = 'message success';
      messageDiv.textContent = '✅ ' + data.message;
      this.reset();
      document.getElementById('productUnit').value = 'kg';
      loadProducts();
    } else {
      messageDiv.className = 'message error';
      messageDiv.textContent = '❌ ' + (data.message || 'Gagal tambah produk');
    }
  } catch (err) {
    messageDiv.className = 'message error';
    messageDiv.textContent = '❌ Gagal koneksi ke server!';
  }
});

// === HAPUS PRODUK ===
async function deleteProduct(e) {
  const id = e.target.dataset.id;
  if (!confirm('Yakin ingin menghapus produk ini?')) return;
  
  try {
    const response = await fetch(`/api/products/${id}`, { method: 'DELETE' });
    const data = await response.json();
    
    if (response.ok) {
      alert('✅ ' + data.message);
      loadProducts();
    } else {
      alert('❌ ' + (data.message || 'Gagal hapus produk'));
    }
  } catch (err) {
    alert('❌ Gagal koneksi ke server!');
  }
}

// === EDIT PRODUK ===
function openEditModal(e) {
  const id = e.target.dataset.id;
  const card = e.target.closest('.product-card');
  
  document.getElementById('editId').value = id;
  document.getElementById('editName').value = card.querySelector('h3').textContent;
  document.getElementById('editCategory').value = card.querySelector('.product-category').textContent;
  
  const priceText = card.querySelector('.product-price').textContent;
  document.getElementById('editPrice').value = parseInt(priceText.replace(/[^0-9]/g, ''));
  
  const stockText = card.querySelector('.product-stock').textContent;
  const stockMatch = stockText.match(/Stok:\s*(\d+)/);
  document.getElementById('editStock').value = stockMatch ? stockMatch[1] : 0;
  
  const unitText = card.querySelector('.product-stock').textContent;
  const unitMatch = unitText.match(/(\d+)\s+(\w+)/);
  document.getElementById('editUnit').value = unitMatch ? unitMatch[2] : 'kg';
  
  document.getElementById('editDesc').value = '';
  document.getElementById('editMessage').textContent = '';
  
  document.getElementById('editModal').style.display = 'flex';
}

document.getElementById('closeModal')?.addEventListener('click', function() {
  document.getElementById('editModal').style.display = 'none';
});

window.addEventListener('click', function(e) {
  if (e.target === document.getElementById('editModal')) {
    document.getElementById('editModal').style.display = 'none';
  }
});

document.getElementById('saveEditBtn')?.addEventListener('click', async function() {
  const id = document.getElementById('editId').value;
  const name = document.getElementById('editName').value.trim();
  const category = document.getElementById('editCategory').value;
  const price = parseInt(document.getElementById('editPrice').value);
  const stock = parseInt(document.getElementById('editStock').value);
  const unit = document.getElementById('editUnit').value.trim() || 'kg';
  const description = document.getElementById('editDesc').value.trim();
  
  const messageDiv = document.getElementById('editMessage');
  
  // FR-17: Validasi
  if (!name || isNaN(price) || isNaN(stock) || price <= 0 || stock < 0) {
    messageDiv.className = 'message error';
    messageDiv.textContent = '⚠️ Semua field wajib diisi dengan benar!';
    return;
  }
  
  try {
    const response = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, category, price, stock, unit, description })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      messageDiv.className = 'message success';
      messageDiv.textContent = '✅ ' + data.message;
      setTimeout(() => {
        document.getElementById('editModal').style.display = 'none';
        loadProducts();
      }, 1000);
    } else {
      messageDiv.className = 'message error';
      messageDiv.textContent = '❌ ' + (data.message || 'Gagal update produk');
    }
  } catch (err) {
    messageDiv.className = 'message error';
    messageDiv.textContent = '❌ Gagal koneksi ke server!';
  }
});

// === CHAT AI ===
document.getElementById('chatForm')?.addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const questionInput = document.getElementById('question');
  const question = questionInput.value.trim();
  const chatMessages = document.getElementById('chatMessages');
  
  if (!question) {
    alert('Masukkan pertanyaan terlebih dahulu!');
    return;
  }
  
  // Tampilkan pertanyaan user
  addChatMessage(question, 'user');
  questionInput.value = '';
  
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      addChatMessage(data.data.answer, 'bot');
    } else {
      addChatMessage('❌ ' + (data.message || 'Gagal mendapatkan jawaban'), 'bot');
    }
  } catch (err) {
    addChatMessage('❌ Gagal koneksi ke server!', 'bot');
  }
});

function addChatMessage(text, sender) {
  const chatMessages = document.getElementById('chatMessages');
  if (!chatMessages) return;
  
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${sender}-message`;
  const avatar = sender === 'user' ? '👤' : '🌾';
  
  messageDiv.innerHTML = `
    <div class="message-content">
      <span class="message-avatar">${avatar}</span>
      <div class="message-bubble">${escapeHtml(text)}</div>
    </div>
  `;
  
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// === LOAD SAAT HALAMAN DIMUAT ===
document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('productList')) {
    loadProducts();
  }
});
// ============================================
// HAMBURGER MENU TOGGLE
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', function() {
      const isOpen = navMenu.classList.toggle('active');
      this.setAttribute('aria-expanded', isOpen);
      
      const lines = this.querySelectorAll('.hamburger-line');
      if (isOpen) {
        lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        lines[1].style.opacity = '0';
        lines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
      } else {
        lines[0].style.transform = 'none';
        lines[1].style.opacity = '1';
        lines[2].style.transform = 'none';
      }
    });

    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
          navMenu.classList.remove('active');
          hamburgerBtn.setAttribute('aria-expanded', 'false');
          const lines = hamburgerBtn.querySelectorAll('.hamburger-line');
          lines[0].style.transform = 'none';
          lines[1].style.opacity = '1';
          lines[2].style.transform = 'none';
        }
      });
    });
  }

  // ============================================
  // CHAT AI (DUMMY)
  // ============================================
  const chatForm = document.getElementById('chatForm');
  const questionInput = document.getElementById('question');
  const chatMessages = document.getElementById('chatMessages');

  if (chatForm && questionInput && chatMessages) {
    chatForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const question = questionInput.value.trim();
      if (!question) {
        alert('Masukkan pertanyaan terlebih dahulu!');
        return;
      }

      addMessage(question, 'user');
      questionInput.value = '';

      setTimeout(() => {
        const dummyReplies = [
          'Terima kasih atas pertanyaannya! Untuk saat ini, silakan cek langsung daftar produk di halaman Produk.',
          'Mohon tunggu, kami sedang mengembangkan fitur AI yang lebih cerdas. Untuk sekarang, Anda bisa melihat produk di halaman Produk.',
          'Halo! 👋 Terima kasih sudah bertanya. Silakan lihat daftar produk kami di menu Produk.',
          'Maaf, untuk pertanyaan spesifik, silakan hubungi admin kami di WhatsApp 0812-3456-7890.'
        ];
        const randomReply = dummyReplies[Math.floor(Math.random() * dummyReplies.length)];
        addMessage(randomReply, 'bot');
      }, 500);
    });

    questionInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        chatForm.dispatchEvent(new Event('submit'));
      }
    });
  }
});

function addMessage(text, sender) {
  const chatMessages = document.getElementById('chatMessages');
  if (!chatMessages) return;

  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${sender}-message`;
  
  const avatar = sender === 'user' ? '👤' : '🤖';
  
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

console.log('✅ Toko Sembako Ariesta - Sprint 1 loaded!');
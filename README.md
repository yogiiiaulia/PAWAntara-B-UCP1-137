<img width="1917" height="1017" alt="image" src="https://github.com/user-attachments/assets/71ac8ae8-09f5-43c5-81f8-2828f846f10d" /><img width="1916" height="1025" alt="Screenshot 2026-08-12 224616" src="https://github.com/user-attachments/assets/104eb5a0-dc1d-4f12-9b35-bb56dd068821" />🌾 Kopdes Ariesta - Website Koperasi Desa



##👤 Identitas

| Nama | NIM | Kelas |
|------|-----|-------|
| [Yogi Aulia Ardiano] | [20240140137] | [B] |



📋 Deskripsi Project

**Kopdes Ariesta** adalah website Koperasi Desa (Kopdes) yang dibangun untuk membantu pengelolaan dan penjualan produk hasil bumi dari warga desa. Website ini memungkinkan pengunjung untuk melihat produk, menanyakan informasi melalui AI, serta memungkinkan admin untuk mengelola produk secara mandiri.

Fitur Utama:
- 🌾 Menampilkan produk hasil bumi desa
- 🤖 Fitur Tanya AI untuk informasi produk, stok, dan harga
- 🔐 Login admin untuk mengelola produk
- 📊 Dashboard CRUD produk (Tambah, Edit, Hapus)
- 📱 Tampilan responsif untuk semua perangkat



🚀 Cara Menjalankan Project

NPM RUN DEV

Dokumentasi Hasil :

Tampilan Beranda:
menampilkan tampilan awal bentuk web
<img width="1916" height="1025" alt="Screenshot 2026-08-12 224616" src="https://github.com/user-attachments/assets/0a3518d0-4fa7-40b1-ac5c-9543dfe76d68" />

Tampilan daftar produk :
menampilkan produk apa saja yg dijual di toko ini
<img width="1916" height="970" alt="Screenshot 2026-08-12 224631" src="https://github.com/user-attachments/assets/169eef93-ac2f-4870-b465-2b06f15ce6c7" />

Chat Ai:
menanyakan apa saja kenapa ai tentang toko tersebut
<img width="1917" height="967" alt="Screenshot 2026-08-12 224726" src="https://github.com/user-attachments/assets/d5cdb4f3-b1e0-44b0-885e-33fb5ea9c1c0" />

Dokumentasi Endpoint dan method :
http://localhost:3000/api/products (GET) :
menampilkan seluruh isi produk yang ada di toko
<img width="1917" height="983" alt="Screenshot 2026-08-12 225058" src="https://github.com/user-attachments/assets/b7903634-474f-4adb-906a-469984580da9" />

http://localhost:3000/api/products/1 (GET) :
Mendapatkan detail produk berdasarkan ID
<img width="1917" height="1017" alt="Screenshot 2026-08-12 225610" src="https://github.com/user-attachments/assets/8ff80455-884c-471e-a18f-b5b283d1f79e" />

http://localhost:3000/api/login (POST (ADMIN)):
login sebagai admin untuk mengakses fitur tertentu
<img width="1596" height="1020" alt="Screenshot 2026-08-12 232130" src="https://github.com/user-attachments/assets/7fbac335-ffbe-4d20-a86b-168fd7fd52da" />

http://localhost:3000/api/products (POST (ADMIN)):
berfungsi untuk menambahkan produk sebagai admin:
<img width="1571" height="1017" alt="Screenshot 2026-08-12 234336" src="https://github.com/user-attachments/assets/ab5f6268-f2f8-45ea-8f31-3c765277f969" />

http://localhost:3000/api/products/8 (PUT (ADMIN)):
Berfungsi untuk mengupdate data produk berdasarkan id
<img width="1595" height="1005" alt="Screenshot 2026-08-13 001943" src="https://github.com/user-attachments/assets/302a8ed9-fd74-411d-a6e5-8c2b264f566c" />

http://localhost:3000/api/products/8 (DELETE (ADMIN)):
berfungsi untuk menghapus produk di toko 
<img width="1585" height="1018" alt="Screenshot 2026-08-13 004603" src="https://github.com/user-attachments/assets/1c72f1d9-e794-4127-9126-de1b4d0bc459" />

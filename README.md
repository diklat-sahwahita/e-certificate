# E-Sertifikat Diklat Online Sahwahita
- `index.html` = halaman peserta (publik). `admin.html` = panel admin (hanya akun di tabel `admins`).
## Langkah
1. Buat proyek di supabase.com. Buka **SQL Editor**, tempel isi `schema.sql`, jalankan.
2. **Authentication > Providers > Email**: matikan "Confirm email" jika ingin peserta langsung bisa masuk.
3. Salin **Project URL** dan **anon public key** (Project Settings > API) ke `config.js`. Jangan pernah memakai service_role key.
4. Buka `index.html`, daftar dengan email admin, lalu jalankan baris `insert into public.admins ...` (bagian bawah schema.sql) dengan email Anda.
5. Unggah semua file ke repo GitHub, lalu **Settings > Pages > Deploy from branch (main /root)**.
6. Buka `.../admin.html`, masuk, unggah template, atur posisi, Simpan.
## Catatan
- Pengecekan "screenshot real time" memakai waktu file (juga dibatasi 20 menit di database). Admin tetap harus memeriksa bukti sebelum menyetujui.
- Bagikan hanya tautan `index.html` ke peserta.

# Rumah Makan Nusantara

Website statis rumah makan (HTML, CSS, JavaScript). Tanpa server dan tanpa proses build.

## Struktur
```
index.html   halaman utama
style.css    tampilan
script.js    menu, keranjang, reservasi, pengaturan (CONFIG)
favicon.svg  ikon tab browser
images/      foto menu dan foto hero (.webp)
```

## Fitur
Menu dengan filter, pencarian, dan label; keranjang (tersimpan di browser) dengan checkout via WhatsApp; reservasi meja via WhatsApp; galeri dengan perbesar foto; peta Google Maps; tombol WhatsApp mengambang; mode terang/gelap otomatis.

## Melihat di komputer
Klik dua kali `index.html`.

## Upload ke GitHub dan online lewat GitHub Pages
1. Buat akun di github.com, lalu klik **New repository**.
2. Nama repositori: `rumah-makan-nusantara`, pilih **Public**, klik **Create repository**.
3. Klik **uploading an existing file**, lalu seret ISI folder ini (index.html, style.css, script.js, favicon.svg, folder images, README.md), bukan file ZIP-nya. `index.html` harus berada di paling luar.
4. Klik **Commit changes**.
5. Buka **Settings > Pages**. Pada **Branch** pilih `main` dan folder `/ (root)`, lalu **Save**.
6. Tunggu 1-2 menit. Situs tampil di `https://USERNAME.github.io/rumah-makan-nusantara/`.

## Mengubah isi (buka `script.js`)
- **Pengaturan:** baris `CONFIG` di paling atas: nomor WhatsApp (format 62...), link Instagram/TikTok/Facebook (kosong = disembunyikan), dan `mapsQuery` untuk peta.
- **Menu:** daftar `MENU`. Ubah nama, deskripsi, harga (`p`). Label: `t:"Terlaris"`. Tandai habis: tambahkan `s:1`.
- **Foto:** ganti file di folder `images/` dengan nama yang sama.
- **Ulasan:** isi `TESTIMONIALS` dengan ulasan asli pelanggan agar bagian ulasan muncul.
- **Alamat, jam buka, telepon:** edit di `index.html` bagian Kontak.
- **Peta tidak pas?** Di Google Maps: cari lokasi > Bagikan > Sematkan peta > salin alamat `src` ke atribut `src` iframe (`id="map"`), dan hapus baris yang mengisi `$("#map").src` di `script.js`.
- **Preview link:** setelah online, ubah `og:image` di `index.html` menjadi alamat lengkap, misalnya `https://USERNAME.github.io/rumah-makan-nusantara/images/hero.webp`.

## Catatan
- Pesanan dan reservasi dikirim lewat WhatsApp dan tidak tersimpan otomatis.
- Nomor telepon dan alamat akan terlihat publik di repositori publik.

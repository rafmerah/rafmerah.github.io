/* ===== DATA FOTO =====
   Untuk menambah foto: tambahkan satu baris baru di array ini.
   - src      : alamat/ path gambar (mis. "foto/liburan1.jpg")
   - title    : keterangan singkat
   - category : harus sama dengan data-category di dropdown (index.html)
*/
const photos = [
  { src: "https://picsum.photos/seed/grup1/600/450",    title: "Kumpul angkatan",       category: "Foto Grup" },
  { src: "https://picsum.photos/seed/grup2/600/450",    title: "Foto bareng kelas",     category: "Foto Grup" },
  { src: "https://picsum.photos/seed/grup3/600/450",    title: "Acara perpisahan",      category: "Foto Grup" },
  { src: "https://picsum.photos/seed/kampus1/600/450",  title: "Hari pertama kuliah",   category: "Masa Kampus" },
  { src: "https://picsum.photos/seed/kampus2/600/450",  title: "Belajar kelompok",      category: "Masa Kampus" },
  { src: "https://picsum.photos/seed/kampus3/600/450",  title: "Hari wisuda",           category: "Masa Kampus" },
  { src: "https://picsum.photos/seed/liburan1/600/450", title: "Pantai sore hari",      category: "Liburan" },
  { src: "https://picsum.photos/seed/liburan2/600/450", title: "Naik gunung",           category: "Liburan" },
  { src: "https://picsum.photos/seed/liburan3/600/450", title: "Jalan-jalan kota",      category: "Liburan" },
  { src: "https://picsum.photos/seed/bebas1/600/450",   title: "Momen tak terduga",     category: "Bebas" },
  { src: "https://picsum.photos/seed/bebas2/600/450",   title: "Ngopi santai",          category: "Bebas" },
  { src: "https://picsum.photos/seed/bebas3/600/450",   title: "Langit senja",          category: "Bebas" },
];

/* ===== ELEMEN ===== */
const gallery      = document.getElementById("gallery");
const dropdown     = document.getElementById("dropdown");
const toggleBtn    = document.getElementById("dropdownToggle");
const menuButtons  = document.querySelectorAll("#dropdownMenu button");
const currentLabel = document.getElementById("currentCategory");
const searchInput  = document.getElementById("search");
const resultInfo   = document.getElementById("resultInfo");
const emptyMsg     = document.getElementById("empty");

let activeCategory = "Semua";

/* ===== RENDER GALERI ===== */
function renderGallery() {
  gallery.innerHTML = photos.map(p => `
    <figure class="card" data-category="${p.category}" data-title="${p.title.toLowerCase()}">
      <img src="${p.src}" alt="${p.title}" loading="lazy">
      <figcaption class="card__caption">${p.title}<small>${p.category}</small></figcaption>
    </figure>
  `).join("");
}

/* ===== FILTER (kategori + pencarian) ===== */
function applyFilter() {
  const keyword = searchInput.value.trim().toLowerCase();
  let visible = 0;

  gallery.querySelectorAll(".card").forEach(card => {
    const matchCategory = activeCategory === "Semua" || card.dataset.category === activeCategory;
    const matchSearch   = card.dataset.title.includes(keyword);
    const show = matchCategory && matchSearch;
    card.classList.toggle("hide", !show);
    if (show) visible++;
  });

  resultInfo.textContent = `Menampilkan ${visible} foto — ${activeCategory}`;
  emptyMsg.hidden = visible > 0;
}

/* ===== DROPDOWN ===== */
function setDropdown(open) {
  dropdown.classList.toggle("open", open);
  toggleBtn.setAttribute("aria-expanded", open);
}

toggleBtn.addEventListener("click", e => {
  e.stopPropagation();
  setDropdown(!dropdown.classList.contains("open"));
});

menuButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    activeCategory = btn.dataset.category;
    currentLabel.textContent = activeCategory;
    menuButtons.forEach(b => b.classList.toggle("active", b === btn));
    setDropdown(false);
    applyFilter();
  });
});

// Tutup dropdown saat klik di luar atau tekan Escape
document.addEventListener("click", () => setDropdown(false));
document.addEventListener("keydown", e => { if (e.key === "Escape") setDropdown(false); });

searchInput.addEventListener("input", applyFilter);

/* ===== INISIALISASI ===== */
document.getElementById("year").textContent = new Date().getFullYear();
renderGallery();
applyFilter();

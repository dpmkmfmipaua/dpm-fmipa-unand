/* ===================================================================
   MAIN.JS — Fungsi umum dipakai di semua halaman
   =================================================================== */

// ---------- Mobile menu toggle ----------
function initMobileMenu() {
  const btn = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu");
  if (!btn || !menu) return;

  btn.addEventListener("click", () => {
    const isHidden = menu.classList.contains("hidden");
    menu.classList.toggle("hidden", !isHidden);
    btn.setAttribute("aria-expanded", String(isHidden));
  });
}

// ---------- Highlight nav aktif sesuai halaman ----------
function highlightActiveNav() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-nav]").forEach((link) => {
    const target = link.getAttribute("data-nav");
    if (target === path) link.classList.add("active");
  });
}

// ---------- Scroll reveal sederhana (tanpa library) ----------
function initScrollReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  items.forEach((el) => observer.observe(el));
}

// ---------- Set tahun otomatis di footer ----------
function setFooterYear() {
  const el = document.getElementById("footer-year");
  if (el) el.textContent = new Date().getFullYear();
}

// ---------- Inisialisasi avatar fallback (kalau foto belum ada) ----------
function initials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

// ---------- Jalankan semua saat DOM siap ----------
document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  highlightActiveNav();
  initScrollReveal();
  setFooterYear();
});

/* ===================================================================
   INSTITUTO RAÍZES — nav.js
   Controla o botão hambúrguer (mobile). Usa as classes reais do
   projeto: .site-header, .nav-list, .nav-toggle.
   =================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("navToggle");
  const list = document.getElementById("navList");

  if (!toggle || !list) return; // segurança: não quebra se a página não tiver nav

  toggle.addEventListener("click", () => {
    const isOpen = list.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", isOpen);
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".site-header")) {
      list.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      list.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
});

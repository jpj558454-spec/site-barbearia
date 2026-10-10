/* ============================================
   MAIN.JS — Menu drawer, scroll animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ===== MENU DRAWER MOBILE =====
  const hamburger = document.querySelector('.hamburger');
  const drawer = document.querySelector('.drawer');
  const overlay = document.querySelector('.drawer-overlay');
  const fechar = document.querySelector('.drawer-fechar');

  function abrirDrawer() {
    drawer?.classList.add('ativo');
    overlay?.classList.add('ativo');
    hamburger?.classList.add('ativo');
    document.body.style.overflow = 'hidden';
  }

  function fecharDrawer() {
    drawer?.classList.remove('ativo');
    overlay?.classList.remove('ativo');
    hamburger?.classList.remove('ativo');
    document.body.style.overflow = '';
  }

  hamburger?.addEventListener('click', () => {
    if (drawer.classList.contains('ativo')) {
      fecharDrawer();
    } else {
      abrirDrawer();
    }
  });

  fechar?.addEventListener('click', fecharDrawer);
  overlay?.addEventListener('click', fecharDrawer);

  // Fecha drawer ao clicar em link
  document.querySelectorAll('.drawer-nav a').forEach(link => {
    link.addEventListener('click', fecharDrawer);
  });

  // ===== SCROLL ANIMATIONS (IntersectionObserver) =====
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visivel');
        observador.unobserve(entrada.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  });

  document.querySelectorAll('.reveal, .reveal-slide').forEach(el => {
    observador.observe(el);
  });

  // ===== HEADER SCROLL =====
  const header = document.querySelector('.header');
  let ultimoScroll = 0;

  window.addEventListener('scroll', () => {
    const atual = window.scrollY;
    if (atual > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
    ultimoScroll = atual;
  });

  // ===== FECHAR MSG WHATSAPP =====
  const fecharMsg = document.querySelector('.whatsapp-msg .fechar');
  const msgWhats = document.querySelector('.whatsapp-msg');
  fecharMsg?.addEventListener('click', () => {
    msgWhats?.remove();
  });
});
/* ============================================
   CONTADOR.JS — Clientes na fila (fake)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const numEl = document.querySelector('.contador .num');
  if (!numEl) return;

  function atualizar() {
    // Valor aleatório entre 1 e 30
    const valor = Math.floor(Math.random() * 30) + 1;
    numEl.textContent = valor;

    // Animação de "pop"
    numEl.style.transform = 'scale(1.25)';
    numEl.style.transition = 'transform 0.2s ease';
    setTimeout(() => {
      numEl.style.transform = 'scale(1)';
    }, 200);
  }

  atualizar();
  setInterval(atualizar, 5000);
});
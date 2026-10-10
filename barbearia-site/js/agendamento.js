/* ============================================
   AGENDAMENTO.JS — Form + localStorage + WhatsApp
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-agendamento');
  const msgSucesso = document.getElementById('mensagem-sucesso');
  if (!form) return;

  // ===== MÁSCARA DE TELEFONE =====
  const tel = document.getElementById('telefone');
  tel?.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '');
    if (v.length > 11) v = v.slice(0, 11);
    if (v.length > 10) {
      v = v.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    } else if (v.length > 6) {
      v = v.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
    } else if (v.length > 2) {
      v = v.replace(/^(\d{2})(\d{0,5}).*/, '($1) $2');
    } else if (v.length > 0) {
      v = v.replace(/^(\d{0,2}).*/, '($1');
    }
    e.target.value = v;
  });

  // ===== DATA MÍNIMA = HOJE =====
  const dataInput = document.getElementById('data');
  if (dataInput) {
    const hoje = new Date().toISOString().split('T')[0];
    dataInput.setAttribute('min', hoje);
  }

  // ===== SUBMIT =====
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validação básica
    const nome = form.nome.value.trim();
    const telefone = form.telefone.value.trim();
    const servico = form.servico.value;
    const data = form.data.value;
    const hora = form.hora.value;
    const email = form.email.value.trim();
    const obs = form.obs.value.trim();

    if (!nome || !telefone || !servico || !data || !hora) {
      alert('Por favor, preencha todos os campos obrigatórios (*).');
      return;
    }

    // Monta objeto
    const agendamento = {
      nome,
      telefone,
      email,
      servico,
      data,
      hora,
      obs,
      criadoEm: new Date().toISOString()
    };

    // Salva no localStorage
    const agendamentos = JSON.parse(localStorage.getItem('agendamentos') || '[]');
    agendamentos.push(agendamento);
    localStorage.setItem('agendamentos', JSON.stringify(agendamentos));

    // Mensagem de sucesso
    msgSucesso.style.display = 'block';
    msgSucesso.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Monta mensagem WhatsApp
    const dataFormatada = data.split('-').reverse().join('/');
    const texto = `Olá! Gostaria de confirmar meu agendamento:%0A%0A` +
      `*Nome:* ${nome}%0A` +
      `*Telefone:* ${telefone}%0A` +
      `*Serviço:* ${servico}%0A` +
      `*Data:* ${dataFormatada}%0A` +
      `*Horário:* ${hora}` +
      (obs ? `%0A*Obs:* ${obs}` : '');

    const url = `https://wa.me/5534999480826?text=${texto}`;

    // Redireciona após 1.5s
    setTimeout(() => {
      window.open(url, '_blank');
      form.reset();
      msgSucesso.style.display = 'none';
    }, 1800);
  });
});
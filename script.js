document.addEventListener('DOMContentLoaded', function () {
  // MENU RESPONSIVO
  const btn = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mainMenu');

  if (btn && mobileMenu) {
    btn.addEventListener('click', () => {
      mobileMenu.classList.toggle('show'); // ajustado para combinar com o CSS
    });
  }

  // FORMULÁRIO DE CONTATO (Formspree)
  const form = document.querySelector('form[action*="formspree.io"]');
  if (form) {
    const submitButton = form.querySelector('button[type="submit"]');
    const messageBox = document.createElement('p');
    messageBox.className = 'form-message';
    form.appendChild(messageBox);

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      const email = form.querySelector('input[name="email"]');
      const message = form.querySelector('textarea[name="message"]');

      if (!email.value.trim() || !message.value.trim()) {
        messageBox.textContent = 'Por favor, preencha todos os campos obrigatórios.';
        messageBox.style.color = '#b00020';
        return;
      }

      submitButton.disabled = true;
      submitButton.textContent = 'Enviando...';

      try {
        const formData = new FormData(form);
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: { Accept: 'application/json' }
        });

        if (response.ok) {
          messageBox.textContent = 'Mensagem enviada com sucesso! Obrigado pelo contato.';
          messageBox.style.color = '#006400';
          form.reset();
        } else {
          messageBox.textContent = 'Ops! Algo deu errado. Tente novamente mais tarde.';
          messageBox.style.color = '#b00020';
        }
      } catch (error) {
        messageBox.textContent = 'Erro de conexão. Verifique sua internet.';
        messageBox.style.color = '#b00020';
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Enviar';
      }
    });
  }

  // Futuras animações ou interações aqui
});
// MENU RESPONSIVO - Abrir e fechar menu mobile com clique fora
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('menuToggle');
  const menu = document.getElementById('mainMenu');

  if (!btn || !menu) return;

  // Função para alternar menu
  const toggleMenu = () => {
    menu.classList.toggle('hidden');
  };

  // Abrir/fechar ao clicar no botão
  btn.addEventListener('click', (e) => {
    e.stopPropagation(); // impede que o clique "suba" para o document
    toggleMenu();
  });

  // Fecha o menu se clicar fora dele
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !btn.contains(e.target)) {
      menu.classList.add('hidden');
    }
  });
});


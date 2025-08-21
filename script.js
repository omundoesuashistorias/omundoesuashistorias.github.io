document.addEventListener('DOMContentLoaded', () => {
  // Seleciona botão hamburguer e menu mobile
  const menuToggle = document.getElementById('menuToggle');
  const menuMobile = document.getElementById('mainMenu');

  if (!menuToggle || !menuMobile) return;

  // Função para abrir/fechar menu mobile
  const toggleMenu = () => {
    menuMobile.classList.toggle('show');
  };

  // Clicar no botão abre/fecha o menu
  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation(); // impede que o clique "suba" para o document
    toggleMenu();
  });

  // Fecha o menu se clicar fora dele
  document.addEventListener('click', (e) => {
    if (!menuMobile.contains(e.target) && !menuToggle.contains(e.target)) {
      menuMobile.classList.remove('show');
    }
  });

  // FUTURAS EDIÇÕES: adicione aqui novas interações ou animações
});

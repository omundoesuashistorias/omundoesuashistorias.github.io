document.addEventListener('DOMContentLoaded', () => {
  // Seleciona botão hambúrguer e menu mobile
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
      // fecha todos os submenus
      document.querySelectorAll('.submenu-parent-mobile').forEach(parent => {
        parent.classList.remove('active');
      });
    }
  });

  // Lógica para abrir/fechar submenus mobile
  document.querySelectorAll('.submenu-parent-mobile > a').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault(); // previne navegação ao clicar no item principal
      const parent = item.parentElement;
      parent.classList.toggle('active'); // abre ou fecha submenu
    });
  });

  // FUTURAS EDIÇÕES: adicione aqui novas interações ou animações
});

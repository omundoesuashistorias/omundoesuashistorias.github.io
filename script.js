document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navUl = document.querySelector('nav ul');
  if(menuToggle && navUl) {
    menuToggle.addEventListener('click', function() {
      navUl.classList.toggle('active');
    });
    navUl.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navUl.classList.remove('active');
      });
    });
  }
});

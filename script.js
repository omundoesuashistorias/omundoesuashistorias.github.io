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

<script>
document.addEventListener('DOMContentLoaded', () => {
  const FEED_URL =
    'https://omundoesuashistoriasartigos.blogspot.com/feeds/posts/default?alt=json&max-results=3';

  const grid = document.getElementById('posts-grid');
  if (!grid) return;

  fetch(FEED_URL)
    .then(res => res.json())
    .then(data => {
      const entries = data.feed.entry || [];

      entries.forEach(entry => {
        const title = entry.title.$t;
        const link = entry.link.find(l => l.rel === 'alternate')?.href || '#';

        // imagem de destaque
        let image =
          entry.media$thumbnail?.url ||
          entry.content?.$t.match(/<img.*?src="(.*?)"/)?.[1] ||
          'https://via.placeholder.com/600x400?text=O+Mundo+e+Suas+Hist%C3%B3rias';

        const card = document.createElement('article');
        card.className =
          'bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition flex flex-col';

        card.innerHTML = `
          <div class="aspect-[16/9] overflow-hidden">
            <img src="${image}" alt="${title}"
              class="w-full h-full object-cover hover:scale-105 transition-transform">
          </div>

          <div class="p-6 flex flex-col flex-grow">
            <h3 class="text-lg font-bold text-gray-900 mb-4 line-clamp-3">
              ${title}
            </h3>

            <div class="mt-auto">
              <a href="${link}" target="_blank"
                class="inline-block bg-bordo text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-800 transition">
                Ler mais
              </a>
            </div>
          </div>
        `;

        grid.appendChild(card);
      });
    })
    .catch(err => {
      console.error('Erro ao carregar feed:', err);
      grid.innerHTML =
        '<p class="text-center text-gray-500">Erro ao carregar artigos.</p>';
    });
});
</script>

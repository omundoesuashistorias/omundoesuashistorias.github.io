document.addEventListener('DOMContentLoaded', () => {

  /* ===============================
     MENU MOBILE
  =============================== */

  const menuToggle = document.getElementById('menuToggle');
  const menuMobile = document.getElementById('mainMenu');

  if (menuToggle && menuMobile) {

    const toggleMenu = () => {
      menuMobile.classList.toggle('show');
    };

    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    document.addEventListener('click', (e) => {
      if (!menuMobile.contains(e.target) && !menuToggle.contains(e.target)) {
        menuMobile.classList.remove('show');
        document
          .querySelectorAll('.submenu-parent-mobile')
          .forEach(parent => parent.classList.remove('active'));
      }
    });

    document
      .querySelectorAll('.submenu-parent-mobile > a')
      .forEach(item => {
        item.addEventListener('click', (e) => {
          e.preventDefault();
          item.parentElement.classList.toggle('active');
        });
      });
  }

  /* ===============================
     ÚLTIMOS ARTIGOS – BLOGGER
  =============================== */

  const grid = document.getElementById('posts-grid');
  if (!grid) return;

  window.bloggerFeedCallback = function (data) {
    const entries = data.feed?.entry || [];

    entries.slice(0, 3).forEach(entry => {
      const title = entry.title.$t;

      const link =
        entry.link.find(l => l.rel === 'alternate')?.href || '#';

      const image =
        entry.media$thumbnail?.url ||
        entry.content?.$t.match(/<img[^>]+src="([^">]+)"/)?.[1] ||
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
          <h3 class="text-lg font-bold text-gray-900 mb-4">
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
  };

  const script = document.createElement('script');
  script.src =
    'https://omundoesuashistoriasartigos.blogspot.com/feeds/posts/default' +
    '?alt=json-in-script&max-results=3&callback=bloggerFeedCallback';

  document.body.appendChild(script);

});

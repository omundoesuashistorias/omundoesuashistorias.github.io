document.addEventListener('DOMContentLoaded', () => {

  /* ===============================
      ÚLTIMOS ARTIGOS – BLOGGER 
      (Convertido para Cards do Bootstrap)
  =============================== */
  const grid = document.getElementById('posts-grid');
  if (!grid) return;

  window.bloggerFeedCallback = function (data) {
    const entries = data.feed?.entry || [];
    
    // Limpa o grid antes de inserir (evita duplicatas)
    grid.innerHTML = '';

    entries.slice(0, 3).forEach(entry => {
      const title = entry.title.$t;
      const link = entry.link.find(l => l.rel === 'alternate')?.href || '#';

      // Lógica de imagem aprimorada
      let image = entry.media$thumbnail?.url || '';
      if (image) {
        // Aumenta a qualidade da imagem do Blogger (troca s72-c por s600)
        image = image.replace('/s72-c/', '/s600/');
      } else {
        const contentImg = entry.content?.$t.match(/<img[^>]+src="([^">]+)"/)?.[1];
        image = contentImg || 'https://via.placeholder.com/600x400?text=O+Mundo+e+Suas+Hist%C3%B3rias';
      }

      // Cria a coluna do Bootstrap
      const col = document.createElement('div');
      col.className = 'col-md-4 mb-4';

      col.innerHTML = `
        <article class="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
          <div class="ratio ratio-16x9 overflow-hidden">
            <img src="${image}" alt="${title}" 
                 class="card-img-top object-fit-cover transition-transform" 
                 style="transition: transform 0.3s ease;">
          </div>

          <div class="card-body d-flex flex-column p-4">
            <h3 class="card-title h5 fw-bold text-dark mb-4">
              ${title}
            </h3>

            <div class="mt-auto">
              <a href="${link}" target="_blank" 
                 class="btn btn-ovo w-100 fw-bold py-2 rounded-3 shadow-sm">
                Ler mais
              </a>
            </div>
          </div>
        </article>
      `;

      // Efeito de hover na imagem via JS simples (opcional)
      const imgElement = col.querySelector('img');
      col.addEventListener('mouseenter', () => imgElement.style.transform = 'scale(1.05)');
      col.addEventListener('mouseleave', () => imgElement.style.transform = 'scale(1)');

      grid.appendChild(col);
    });
  };

  const script = document.createElement('script');
  script.src = 'https://omundoesuashistoriasartigos.blogspot.com/feeds/posts/default' +
               '?alt=json-in-script&max-results=3&callback=bloggerFeedCallback';
  document.body.appendChild(script);

});

async function carregarFeed() {
  const feedUrl = "https://api.allorigins.win/get?url=" + encodeURIComponent("https://portalciencianews.com.br/feed.xml");
  const container = document.getElementById("feed-container");
  if (!container) return;

  try {
    const res = await fetch(feedUrl);
    const data = await res.json();
    const xmlText = data.contents;

    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlText, "application/xml");

    const items = Array.from(xml.querySelectorAll("item")).slice(0, 3);
    container.innerHTML = "";

    items.forEach(item => {
      const title = item.querySelector("title")?.textContent || "Sem título";
      const link = item.querySelector("link")?.textContent || "#";
      const rawDesc = item.querySelector("description")?.textContent || "";
      const description = rawDesc.replace(/<[^>]+>/g, "").substring(0, 120);

      // Pega imagem do feed ou do <img> dentro do description
      let imageUrl = "https://via.placeholder.com/800x450.png?text=Ci%C3%AAncia+News";
      const media = item.getElementsByTagName("media:content")[0];
      if (media?.getAttribute("url")) {
        imageUrl = media.getAttribute("url");
      } else {
        // busca primeira imagem dentro do description
        const imgMatch = rawDesc.match(/<img[^>]+src=["']([^"']+)["']/i);
        if (imgMatch) imageUrl = imgMatch[1];
      }

      // cria card
      const card = document.createElement("article");
      card.className = "bg-white shadow-lg rounded-xl overflow-hidden flex flex-col";

      card.innerHTML = `
        <img src="${imageUrl}" alt="${title}" class="w-full h-48 object-cover">
        <div class="p-6 flex flex-col flex-grow">
          <h3 class="text-lg font-semibold mb-3">${title}</h3>
          <p class="text-gray-600 text-sm mb-4">${description}...</p>
          <a href="${link}" target="_blank" class="mt-auto inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Ler mais
          </a>
        </div>
      `;

      container.appendChild(card);
    });

  } catch (err) {
    console.error("Erro ao carregar o feed:", err);
    container.innerHTML = `<p class="text-red-500 col-span-3 text-center">Não foi possível carregar o feed.</p>`;
  }
}

carregarFeed();

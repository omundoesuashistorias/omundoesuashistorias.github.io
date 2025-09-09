document.addEventListener("DOMContentLoaded", async () => {

  const widgetsData = [
    // Widget 1: Blogger Feed
    { type: "blogger-feed", title: "✨ Últimos Artigos ✨", maxPosts: 3, bgColor: "#5A0F1B", textColor: "#D4AF37" },

    // Widget 2: Destaque de Artigo
    { type: "article-highlight", title: "Motivo Palmette", image: "https://scx1.b-cdn.net/csz/news/800a/2025/new-modeling-indicates.jpg", description: "Descubra a origem e o simbolismo do motivo palmette na arte e arquitetura antiga.", link: "https://omundoesuashistorias.com.br/motivo-palmette.html" },

    // Widget 3: Lista de links
    { type: "linklist", title: "Postagens e páginas", items: [
      { text: "Evolução dos Dinossauros", href: "https://omundoesuashistorias.com.br/evolucao-dos-dinossauros.html" },
      { text: "Filosofia", href: "https://omundoesuashistorias.com.br/filosofia/" },
      { text: "Mitologia", href: "https://omundoesuashistorias.com.br/mitologia/" },
      { text: "História Antiga", href: "https://omundoesuashistorias.com.br/historia-antiga/" }
    ] },

    // Widget 4: Frase do dia
    { type: "quote", title: "Frase do dia", text: "“A história não é o que aconteceu. A história é o que foi escrito.”" },

    // Widget 5: Mini Quiz
    { type: "mini-quiz", title: "Mini Quiz Relâmpago", question: null, options: [], correctIndex: null },

    // Widget 6: Redes sociais
    { type: "social", title: "Siga o projeto", links: [
      { icon: "bi-youtube", text: "YouTube", href: "https://youtube.com/omundoesuashistorias" },
      { icon: "bi-instagram", text: "Instagram", href: "https://instagram.com/omundoesuashistorias" },
      { icon: "bi-facebook", text: "Facebook", href: "https://facebook.com/omundoesuashistorias" }
    ] },

    // Widget 7: Categorias
    { type: "category-chips", title: "Categorias", chips: [
      { text: "Filosofia", href: "https://omundoesuashistorias.com.br/filosofia/" },
      { text: "Mitologia", href: "https://omundoesuashistorias.com.br/mitologia/" },
      { text: "História Antiga", href: "https://omundoesuashistorias.com.br/historia-antiga/" },
      { text: "Arqueologia", href: "https://omundoesuashistorias.com.br/arqueologia/" },
      { text: "Medieval", href: "https://omundoesuashistorias.com.br/medieval/" },
      { text: "Contemporânea", href: "https://omundoesuashistorias.com.br/contemporanea/" }
    ] }
  ];

  // Função para carregar quiz do dia
  async function loadQuiz() {
    try {
      const res = await fetch('/quiz.json');
      const data = await res.json();
      const today = new Date().toDateString();
      const currentQuiz = data.quizzes.find(q => new Date(q.date).toDateString() === today);
      if (currentQuiz) {
        const quizWidget = widgetsData.find(w => w.type === "mini-quiz");
        quizWidget.question = currentQuiz.question;
        quizWidget.options = currentQuiz.options;
        quizWidget.correctIndex = currentQuiz.correctIndex;
      }
    } catch (err) {
      const quizWidget = widgetsData.find(w => w.type === "mini-quiz");
      quizWidget.question = "Qual civilização utilizava o motivo palmette?";
      quizWidget.options = ["Egípcios", "Gregos", "Maias", "Chineses"];
      quizWidget.correctIndex = 1;
    }
  }

  // Widget 2: render Article Highlight
  function renderArticleHighlight(w) {
    return `<div class="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 mb-4">
      <img src="${w.image}" alt="${w.title}" class="w-full h-40 object-cover">
      <div class="p-4">
        <h3 class="font-bold text-[#5A0F1B] mb-2">${w.title}</h3>
        <p class="text-gray-700 mb-3">${w.description}</p>
        <a href="${w.link}" target="_blank" class="inline-block bg-[#5A0F1B] text-white px-4 py-2 rounded-lg hover:bg-[#D4AF37] hover:text-[#5A0F1B] transition font-semibold">Ler artigo completo →</a>
      </div>
    </div>`;
  }

  // Widget 3: render Link List
  function renderLinkList(w) {
    return `<div class="bg-white shadow-lg rounded-xl p-4 border border-gray-200 mb-4">
      <h3 class="font-bold text-[#5A0F1B] mb-2">${w.title}</h3>
      <ul class="list-disc list-inside text-gray-700">
        ${w.items.map(item => `<li><a href="${item.href}" class="text-blue-600 hover:underline">${item.text}</a></li>`).join('')}
      </ul>
    </div>`;
  }

  // Widget 4: render Quote
  function renderQuote(w) {
    return `<div class="bg-yellow-50 shadow-lg rounded-xl p-4 border-l-4 border-[#5A0F1B] mb-4">
      <h3 class="font-bold text-[#5A0F1B] mb-2">${w.title}</h3>
      <p class="italic text-gray-800">"${w.text}"</p>
    </div>`;
  }

  // Widget 5: render Mini Quiz
  function renderMiniQuiz(w) {
    if (!w.question || !w.options.length) return `<div class="bg-white shadow-lg rounded-xl p-4 border border-gray-200 mb-4">
      <h3 class="font-bold text-[#5A0F1B] mb-2">${w.title}</h3>
      <p class="text-gray-800 mb-3 font-semibold">Nenhum quiz disponível hoje.</p>
    </div>`;
    return `<div class="bg-white shadow-lg rounded-xl p-4 border border-gray-200 mb-4">
      <h3 class="font-bold text-[#5A0F1B] mb-2">${w.title}</h3>
      <p class="text-gray-800 mb-3 font-semibold">${w.question}</p>
      ${w.options.map((opt, idx) => `<button class="quiz-btn w-full text-left bg-gray-100 hover:bg-gray-200 py-2 px-3 rounded mb-1 transition-transform duration-200" data-answer="${idx}" data-correct="${w.correctIndex}">${opt}</button>`).join('')}
      <p class="mt-2 text-green-700 font-bold quiz-feedback hidden transition-all duration-300"></p>
    </div>`;
  }

  // Widget 6: render Social
  function renderSocial(w) {
    return `<div class="bg-white shadow-lg rounded-xl p-4 border border-gray-200 mb-4">
      <h3 class="font-bold text-[#5A0F1B] mb-2">${w.title}</h3>
      <div class="flex gap-3">
        ${w.links.map(link => `<a href="${link.href}" target="_blank" aria-label="${link.text}" class="text-2xl text-[#5A0F1B] hover:text-[#D4AF37] transition-colors"><i class="bi ${link.icon}"></i></a>`).join('')}
      </div>
    </div>`;
  }

  // Widget 7: render Category Chips
  function renderCategoryChips(w) {
    return `<div class="bg-white shadow-lg rounded-xl p-4 border border-gray-200 mb-4">
      <h3 class="font-bold text-[#5A0F1B] mb-2">${w.title}</h3>
      <div class="flex flex-wrap gap-2">
        ${w.chips.map(chip => `<a href="${chip.href}" class="bg-gray-200 text-gray-800 px-3 py-1 rounded-full hover:bg-[#D4AF37] hover:text-[#5A0F1B] transition">${chip.text}</a>`).join('')}
      </div>
    </div>`;
  }

  // Widget 1: render Blogger Feed
  async function renderBloggerFeedWidget(w) {
    return new Promise((resolve) => {
      const feedContainer = document.createElement('div');
      feedContainer.className = `rounded-xl shadow-lg p-4 mb-4`;
      feedContainer.style.backgroundColor = w.bgColor;
      feedContainer.innerHTML = `<h3 class="text-xl font-bold mb-3 text-center" style="color: ${w.textColor}">${w.title}</h3><div id='blogger-feed' class='space-y-3'>Carregando...</div>`;

      const feedDiv = feedContainer.querySelector('#blogger-feed');
      const callbackName = `jsonp_callback_${Math.floor(Math.random() * 1000000)}`;
      window[callbackName] = function(data) {
        const posts = data.feed.entry || [];
        feedDiv.innerHTML = '';
        posts.slice(0, w.maxPosts || 3).forEach(post => {
          const title = post.title.$t;
          const link = post.link.find(l => l.rel === 'alternate').href;
          const thumbnail = post.media$thumbnail ? post.media$thumbnail.url : '';
          feedDiv.insertAdjacentHTML('beforeend', `
            <a href='${link}' target='_blank' class='flex items-center gap-2 p-2 rounded border' style='border-color: ${w.textColor};'>
              ${thumbnail ? `<img src='${thumbnail}' class='w-12 h-12 object-cover rounded' alt='${title}'>` : ''}
              <span class='font-semibold' style='color:${w.textColor}'>${title}</span>
            </a>
          `);
        });
        resolve(feedContainer.outerHTML);
        document.body.removeChild(script);
        delete window[callbackName];
      };

      const script = document.createElement('script');
      script.src = `https://omundoesuashistoriasartigos.blogspot.com/feeds/posts/default?alt=json-in-script&callback=${callbackName}`;
      script.onerror = function() {
        feedDiv.innerHTML = '<p style="color: #FFD700">Não foi possível carregar os artigos.</p>';
        resolve(feedContainer.outerHTML);
      };
      document.body.appendChild(script);
    });
  }

  async function renderWidget(w) {
    switch (w.type) {
      case "article-highlight": return renderArticleHighlight(w);
      case "linklist": return renderLinkList(w);
      case "quote": return renderQuote(w);
      case "mini-quiz": return renderMiniQuiz(w);
      case "social": return renderSocial(w);
      case "category-chips": return renderCategoryChips(w);
      case "blogger-feed": return await renderBloggerFeedWidget(w);
      default: return "";
    }
  }

  async function mountSidebar() {
    const container = document.getElementById("sidebar-content");
    if (!container) return;
    container.innerHTML = "";
    for (const widget of widgetsData) {
      container.insertAdjacentHTML("beforeend", await renderWidget(widget));
    }
    attachQuizEvents();
  }

  function attachQuizEvents() {
    const quizzes = document.querySelectorAll(".quiz-btn");
    quizzes.forEach(btn => {
      btn.addEventListener("mouseenter", () => btn.style.transform = "scale(1.05)");
      btn.addEventListener("mouseleave", () => btn.style.transform = "scale(1)");
      btn.onclick = () => {
        const parent = btn.closest("div");
        const feedback = parent.querySelector(".quiz-feedback");
        const answerIndex = btn.dataset.answer;
        const correct = btn.dataset.correct;
        feedback.textContent = answerIndex == correct ? "✅ Correto!" : "❌ Errado!";
        feedback.classList.remove("hidden");
        feedback.style.transform = "scale(1.2)";
        feedback.style.opacity = "1";
        setTimeout(() => feedback.style.transform = "scale(1)", 300);
        btn.style.backgroundColor = answerIndex == correct ? "#34D399" : "#F87171";
        setTimeout(() => btn.style.backgroundColor = "", 500);
      };
    });
  }

  await loadQuiz();
  await mountSidebar();

});

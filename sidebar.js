// sidebar.js
document.addEventListener("DOMContentLoaded", async () => {

  // ==========================
  // DADOS DOS WIDGETS
  // ==========================
  const widgetsData = [
    {
      type: "article-highlight",
      title: "Motivo Palmette",
      image: "https://scx1.b-cdn.net/csz/news/800a/2025/new-modeling-indicates.jpg",
      description: "Descubra a origem e o simbolismo do motivo palmette na arte e arquitetura antiga.",
      link: "https://omundoesuashistorias.com.br/motivo-palmette.html"
    },
    {
      type: "linklist",
      title: "Postagens e páginas",
      items: [
        { text: "Evolução dos Dinossauros", href: "https://omundoesuashistorias.com.br/evolucao-dos-dinossauros.html" },
        { text: "Filosofia", href: "https://omundoesuashistorias.com.br/filosofia/" },
        { text: "Mitologia", href: "https://omundoesuashistorias.com.br/mitologia/" },
        { text: "História Antiga", href: "https://omundoesuashistorias.com.br/historia-antiga/" }
      ]
    },
    {
      type: "quote",
      title: "Frase do dia",
      text: "“A história não é o que aconteceu. A história é o que foi escrito.”"
    },
    {
      type: "mini-quiz",
      title: "Mini Quiz Relâmpago",
      question: null,
      options: [],
      correctIndex: null
    },
    {
      type: "social",
      title: "Siga o projeto",
      links: [
        { icon: "bi-youtube", text: "YouTube", href: "https://youtube.com/omundoesuashistorias" },
        { icon: "bi-instagram", text: "Instagram", href: "https://instagram.com/omundoesuashistorias" },
        { icon: "bi-facebook", text: "Facebook", href: "https://facebook.com/omundoesuashistorias" }
      ]
    },
    {
      type: "category-chips",
      title: "Categorias",
      chips: [
        { text: "Filosofia", href: "https://omundoesuashistorias.com.br/filosofia/" },
        { text: "Mitologia", href: "https://omundoesuashistorias.com.br/mitologia/" },
        { text: "História Antiga", href: "https://omundoesuashistorias.com.br/historia-antiga/" },
        { text: "Arqueologia", href: "https://omundoesuashistorias.com.br/arqueologia/" },
        { text: "Medieval", href: "https://omundoesuashistorias.com.br/medieval/" },
        { text: "Contemporânea", href: "https://omundoesuashistorias.com.br/contemporanea/" }
      ]
    }
  ];

  // ==========================
  // CARREGAR QUIZ DO JSON
  // ==========================
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
      console.error("Erro ao carregar quiz.json, fallback aplicado:", err);
      const quizWidget = widgetsData.find(w => w.type === "mini-quiz");
      quizWidget.question = "Qual civilização utilizava o motivo palmette?";
      quizWidget.options = ["Egípcios", "Gregos", "Maias", "Chineses"];
      quizWidget.correctIndex = 1;
    }
  }

  // ==========================
  // FUNÇÕES DE RENDERIZAÇÃO
  // ==========================
  function renderArticleHighlight(w) {
    return `
      <div class="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 mb-4">
        <img src="${w.image}" alt="${w.title}" class="w-full h-40 object-cover">
        <div class="p-4">
          <h3 class="font-bold text-[#5A0F1B] mb-2">${w.title}</h3>
          <p class="text-gray-700 mb-3">${w.description}</p>
          <a href="${w.link}" target="_blank"
            class="inline-block bg-[#5A0F1B] text-white px-4 py-2 rounded-lg hover:bg-[#D4AF37] hover:text-[#5A0F1B] transition font-semibold">
            Ler artigo completo →
          </a>
        </div>
      </div>
    `;
  }

  function renderLinkList(w) {
    return `
      <div class="bg-white shadow-lg rounded-xl p-4 border border-gray-200 mb-4">
        <h3 class="font-bold text-[#5A0F1B] mb-2">${w.title}</h3>
        <ul class="list-disc list-inside text-gray-700">
          ${w.items.map(item => `<li><a href="${item.href}" class="text-blue-600 hover:underline">${item.text}</a></li>`).join("")}
        </ul>
      </div>
    `;
  }

  function renderQuote(w) {
    return `
      <div class="bg-yellow-50 shadow-lg rounded-xl p-4 border-l-4 border-[#5A0F1B] mb-4">
        <h3 class="font-bold text-[#5A0F1B] mb-2">${w.title}</h3>
        <p class="italic text-gray-800">"${w.text}"</p>
      </div>
    `;
  }

  function renderMiniQuiz(w) {
    if (!w.question || !w.options.length) {
      return `
        <div class="bg-white shadow-lg rounded-xl p-4 border border-gray-200 mb-4">
          <h3 class="font-bold text-[#5A0F1B] mb-2">${w.title}</h3>
          <p class="text-gray-800 mb-3 font-semibold">Nenhum quiz disponível hoje.</p>
        </div>
      `;
    }
    return `
      <div class="bg-white shadow-lg rounded-xl p-4 border border-gray-200 mb-4">
        <h3 class="font-bold text-[#5A0F1B] mb-2">${w.title}</h3>
        <p class="text-gray-800 mb-3 font-semibold">${w.question}</p>
        ${w.options.map((opt, idx) => `
          <button class="quiz-btn w-full text-left bg-gray-100 hover:bg-gray-200 py-2 px-3 rounded mb-1 transition-transform duration-200" data-answer="${idx}" data-correct="${w.correctIndex}">
            ${opt}
          </button>
        `).join("")}
        <p class="mt-2 text-green-700 font-bold quiz-feedback hidden transition-all duration-300"></p>
      </div>
    `;
  }

  function renderSocial(w) {
    return `
      <div class="bg-white shadow-lg rounded-xl p-4 border border-gray-200 mb-4">
        <h3 class="font-bold text-[#5A0F1B] mb-2">${w.title}</h3>
        <div class="flex gap-3">
          ${w.links.map(link => `
            <a href="${link.href}" target="_blank" aria-label="${link.text}" class="text-2xl text-[#5A0F1B] hover:text-[#D4AF37] transition-colors">
              <i class="bi ${link.icon}"></i>
            </a>
          `).join("")}
        </div>
      </div>
    `;
  }

  function renderCategoryChips(w) {
    return `
      <div class="bg-white shadow-lg rounded-xl p-4 border border-gray-200 mb-4">
        <h3 class="font-bold text-[#5A0F1B] mb-2">${w.title}</h3>
        <div class="flex flex-wrap gap-2">
          ${w.chips.map(chip => `<a href="${chip.href}" class="bg-gray-200 text-gray-800 px-3 py-1 rounded-full hover:bg-[#D4AF37] hover:text-[#5A0F1B] transition">${chip.text}</a>`).join("")}
        </div>
      </div>
    `;
  }

  function renderWidget(w) {
    switch (w.type) {
      case "article-highlight": return renderArticleHighlight(w);
      case "linklist": return renderLinkList(w);
      case "quote": return renderQuote(w);
      case "mini-quiz": return renderMiniQuiz(w);
      case "social": return renderSocial(w);
      case "category-chips": return renderCategoryChips(w);
      default: return "";
    }
  }

  // ==========================
  // MONTAGEM FIXA DO SIDEBAR
  // ==========================
  function mountSidebar() {
    const container = document.getElementById("sidebar-content");
    if (!container) return;
    container.innerHTML = "";

    // Renderiza todos os widgets na ordem definida
    widgetsData.forEach(widget => {
      container.insertAdjacentHTML("beforeend", renderWidget(widget));
    });

    attachQuizEvents();
  }

  // ==========================
  // MINI QUIZ FUNCIONAL + FEEDBACK VISUAL
  // ==========================
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

  // ==========================
  // INICIALIZAÇÃO
  // ==========================
  await loadQuiz();
  mountSidebar();

});

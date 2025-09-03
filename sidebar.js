// sidebar.js

document.addEventListener("DOMContentLoaded", async () => {

  // ==========================
  // DADOS DOS WIDGETS
  // ==========================
  const widgetsData = [
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
      const today = new Date();
      const currentQuiz = data.quizzes.find(q => {
        const quizDate = new Date(q.date);
        return quizDate.toDateString() === today.toDateString();
      });
      if (currentQuiz) {
        const quizWidget = widgetsData.find(w => w.type === "mini-quiz");
        quizWidget.question = currentQuiz.question;
        quizWidget.options = currentQuiz.options;
        quizWidget.correctIndex = currentQuiz.correctIndex;
      }
    } catch (err) {
      console.error("Erro ao carregar o quiz:", err);
    }
  }

  // ==========================
  // FUNÇÕES DE RENDERIZAÇÃO
  // ==========================
  function renderLinkList(w) {
    return `
      <div class="bg-white shadow-lg rounded-xl p-4 border border-gray-200">
        <h3 class="font-bold text-[#5A0F1B] mb-2">${w.title}</h3>
        <ul class="list-disc list-inside text-gray-700">
          ${w.items.map(item => `<li><a href="${item.href}" class="text-blue-600 hover:underline">${item.text}</a></li>`).join("")}
        </ul>
      </div>
    `;
  }

  function renderQuote(w) {
    return `
      <div class="bg-yellow-50 shadow-lg rounded-xl p-4 border-l-4 border-[#5A0F1B]">
        <h3 class="font-bold text-[#5A0F1B] mb-2">${w.title}</h3>
        <p class="italic text-gray-800">"${w.text}"</p>
      </div>
    `;
  }

  function renderMiniQuiz(w) {
    if (!w.question || !w.options.length) {
      return `
        <div class="bg-white shadow-lg rounded-xl p-4 border border-gray-200">
          <h3 class="font-bold text-[#5A0F1B] mb-2">${w.title}</h3>
          <p class="text-gray-800 mb-3 font-semibold">Quiz indisponível hoje.</p>
        </div>
      `;
    }
    return `
      <div class="bg-white shadow-lg rounded-xl p-4 border border-gray-200">
        <h3 class="font-bold text-[#5A0F1B] mb-2">${w.title}</h3>
        <p class="text-gray-800 mb-3 font-semibold">${w.question}</p>
        ${w.options.map((opt, idx) => `
          <button class="quiz-btn w-full text-left bg-gray-100 hover:bg-gray-200 py-2 px-3 rounded mb-1 transition-transform duration-200" data-answer="${idx}" data-correct="${w.correctIndex}">${opt}</button>
        `).join("")}
        <p class="mt-2 text-green-700 font-bold quiz-feedback hidden transition-all duration-300"></p>
      </div>
    `;
  }

  function renderSocial(w) {
    return `
      <div class="bg-white shadow-lg rounded-xl p-4 border border-gray-200">
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
      <div class="bg-white shadow-lg rounded-xl p-4 border border-gray-200">
        <h3 class="font-bold text-[#5A0F1B] mb-2">${w.title}</h3>
        <div class="flex flex-wrap gap-2">
          ${w.chips.map(chip => `<a href="${chip.href}" class="bg-gray-200 text-gray-800 px-3 py-1 rounded-full hover:bg-[#D4AF37] hover:text-[#5A0F1B] transition">${chip.text}</a>`).join("")}
        </div>
      </div>
    `;
  }

  function renderWidget(w) {
    switch (w.type) {
      case "linklist": return renderLinkList(w);
      case "quote": return renderQuote(w);
      case "mini-quiz": return renderMiniQuiz(w);
      case "social": return renderSocial(w);
      case "category-chips": return renderCategoryChips(w);
      default: return "";
    }
  }

  // ==========================
  // MONTAGEM DO SIDEBAR
  // ==========================
  const mountCount = 3;
  let startIndex = 0;

  function mountSidebar() {
    const container = document.getElementById("sidebar-content");
    if (!container) return;
    container.innerHTML = "";
    for (let i = 0; i < mountCount; i++) {
      const w = widgetsData[(startIndex + i) % widgetsData.length];
      container.insertAdjacentHTML("beforeend", renderWidget(w));
    }
    attachQuizEvents();
  }

  // ==========================
  // ROTACIONAR WIDGETS
  // ==========================
  function startRotation() {
    setInterval(() => {
      startIndex = (startIndex + 1) % widgetsData.length;
      mountSidebar();
    }, 12000);
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
  startRotation();

});

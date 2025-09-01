document.addEventListener("DOMContentLoaded", () => {
  const questions = Array.from(document.querySelectorAll(".question"));
  const totalQuestions = questions.length;
  const progressBar = document.getElementById("progressBar");
  const progressText = document.getElementById("progressText");
  const resultDiv = document.getElementById("result");

  // Gabarito
  const answers = {
    q1: "1822",
    q2: "Deodoro",
    q3: "1914",
    q4: "Cabral",
    q5: "Egito",
  };

  let currentIndex = 0;

  function updateProgress(index) {
    progressBar.style.width = `${Math.round((index / totalQuestions) * 100)}%`;
    progressText.textContent = `Pergunta ${Math.min(index + 1, totalQuestions)} de ${totalQuestions}`;
  }

  function showQuestion(index) {
    questions.forEach((q, i) => q.classList.toggle("hidden", i !== index));
    updateProgress(index);
  }

  function showResult() {
    let score = 0;
    let html = `<h3 class="text-2xl text-[#5A0F1B] font-bold mb-4">Resultado Final</h3>`;
    html += `<div class="space-y-3 text-left">`;

    Object.keys(answers).forEach((key, idx) => {
      const checked = document.querySelector(`input[name="${key}"]:checked`);
      const user = checked ? checked.value : "Não respondida";
      const correct = answers[key];
      const isCorrect = user === correct;

      if (isCorrect) score++;

      html += `
        <div class="p-3 rounded-lg ${isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"} border">
          <strong>Pergunta ${idx + 1} — ${isCorrect ? "✅ Correta" : "❌ Incorreta"}</strong>
          <div class="mt-1">Sua resposta: <b>${user}</b></div>
          <div class="text-sm">Gabarito: <b>${correct}</b></div>
        </div>
      `;
    });

    html += `</div>`;
    html += `<p class="mt-6 text-lg">Você acertou <b>${score}</b> de <b>${totalQuestions}</b> perguntas.</p>`;

    resultDiv.innerHTML = html;
    resultDiv.classList.remove("hidden");
    progressBar.style.width = "100%";
    progressText.textContent = "Quiz concluído 🎉";
    questions.forEach(q => q.classList.add("hidden"));
    resultDiv.scrollIntoView({behavior: "smooth", block: "center"});
  }

  document.addEventListener("click", e => {
    const btn = e.target.closest(".next-btn, .finish-btn");
    if (!btn) return;
    const questionEl = btn.closest(".question");
    if (!questionEl) return;

    const checked = questionEl.querySelector('input[type="radio"]:checked');
    if (!checked) {
      const notice = questionEl.querySelector(".quiz-notice") || document.createElement("div");
      notice.className = "quiz-notice text-sm text-red-600 mt-2";
      notice.textContent = "Selecione uma resposta antes de continuar!";
      if (!questionEl.contains(notice)) questionEl.appendChild(notice);
      setTimeout(() => notice.remove(), 2500);
      return;
    }

    const idx = questions.indexOf(questionEl);
    if (btn.classList.contains("next-btn")) {
      const nextIdx = idx + 1;
      if (nextIdx < totalQuestions) currentIndex = nextIdx;
      showQuestion(currentIndex);
    } else if (btn.classList.contains("finish-btn")) {
      showResult();
    }
  });

  showQuestion(currentIndex);
});
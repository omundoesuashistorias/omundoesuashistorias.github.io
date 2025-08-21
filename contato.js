// contato.js
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btnContato");
  const emailBox = document.getElementById("emailBox");

  btn.addEventListener("click", () => {
    emailBox.classList.toggle("hidden");

    if (!emailBox.classList.contains("hidden")) {
      btn.textContent = "Ocultar e-mail";
    } else {
      btn.textContent = "Entrar em contato";
    }
  });
});

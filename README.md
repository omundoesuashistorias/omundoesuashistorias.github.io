# 🌍 O Mundo e Suas Histórias

**Bem-vindo ao repositório oficial de *O Mundo e Suas Histórias*** — um projeto dedicado a reunir narrativas, memórias e conteúdos audiovisuais que conectam pessoas, culturas e experiências por meio da força da história.

🔗 **Website:** [omundoesuashistorias.com.br](https://omundoesuashistorias.com.br)
🌐 **Página alternativa (com acento):** [omundoesuashistórias.com.br](https://omundoesuashistórias.com.br)

📱 **Redes sociais**

* [Facebook](https://facebook.com/omundoesuashistorias)
* [YouTube](https://youtube.com/@omundoesuashistorias)
* [Instagram](https://instagram.com/omundoesuashistorias)
* ✉️ **Contato:** [omh.tube@gmail.com](mailto:omh.tube@gmail.com)

👥 **Fundadores**

* Rodrigo Pontes
* Jaqueline Longoni

---

## 🧭 Índice

1. Visão geral
2. Missão e valores
3. O que você encontra aqui
4. Tecnologias e estrutura do repositório
5. Como executar localmente
6. Fluxo de contribuição
7. Boas práticas de conteúdo, acessibilidade e SEO
8. Deploy e integração contínua
9. Licença, créditos e agradecimentos
10. Contato e suporte

---

## 🌐 Visão geral

**O Mundo e Suas Histórias** produz e organiza conteúdos em vídeo e texto que valorizam **memórias locais, relatos orais e manifestações culturais**. Este repositório reúne os **arquivos públicos do site estático**, hospedado via GitHub Pages, incluindo recursos visuais e documentação para manutenção e contribuições.

---

## 🎯 Missão e valores

* Preservar e amplificar vozes e histórias humanas.
* Produzir conteúdo com **integridade jornalística** e **sensibilidade cultural**.
* Tornar o conteúdo **acessível, leve e compartilhável** para públicos diversos.
* Valorizar **transparência, colaboração e responsabilidade** no uso de material sensível.

---

## 📚 O que você encontra aqui

* Página institucional e listagem de episódios e matérias.
* Páginas multimídia com vídeos incorporados, galerias e entrevistas.
* Recursos públicos: imagens, folhas de estilo e scripts leves.
* Documentação técnica e guias para contribuir e publicar novos conteúdos.

---

## 🧩 Tecnologias e estrutura do repositório

**Principais tecnologias:**

* **HTML:** estrutura e marcação de conteúdo
* **CSS:** estilos, grid responsivo e temas visuais
* **JavaScript:** interatividade leve e integrações (vídeos, widgets sociais)

**Estrutura típica:**

```
index.html          # Página inicial
/assets             # Imagens, vídeos, ícones e arquivos estáticos
/css                # Estilos principais (possível organização por partials)
/js                 # Scripts front-end
/posts ou /_posts   # Conteúdo e artigos
README.md           # Este arquivo
```

---

## ⚙️ Como executar localmente

1. Clone o repositório:

```bash
git clone https://github.com/omundoesuashistorias/omundoesuashistorias.github.io.git
```

2. Acesse a pasta:

```bash
cd omundoesuashistorias.github.io
```

3. Execute um servidor local:

* Com Python 3:

```bash
python -m http.server 8000
```

Acesse: [http://localhost:8000](http://localhost:8000)

* Ou use a extensão **Live Server** no VS Code para recarregamento automático.

4. Abra `index.html` no navegador e navegue pelo site.

---

## 🤝 Fluxo de contribuição

Contribuições são **bem-vindas** — técnicas, editoriais ou visuais. Siga o fluxo padrão:

1. **Abra uma issue** descrevendo sua proposta (ex.: nova feature, melhoria visual, novo post).
2. Crie uma branch:

```bash
git checkout -b feat/nome-da-feature
```

3. Faça **commits atômicos e descritivos** (preferencialmente seguindo o padrão *Conventional Commits*).
4. Envie um **Pull Request** com descrição clara e, se possível, **screenshots** ou **links de referência**.

---

## 🪶 Boas práticas de conteúdo

* Credite sempre **autores, fontes e colaboradores**.
* Obtenha **autorização por escrito** para uso de imagens e vídeos de pessoas identificáveis.
* Mantenha **contexto e fidelidade** ao relato original.
* Adicione **avisos de conteúdo sensível** quando necessário.

---

## ♿ Acessibilidade e SEO — *Checklist essencial*

* Estrutura semântica: `<h1>`–`<h4>`, `<nav>`, `<main>`, `<footer>`.
* Textos alternativos (`alt`) descritivos para imagens.
* Contraste de cores adequado e boa legibilidade em dispositivos móveis.
* Navegação acessível por teclado e foco visível.
* Tags meta essenciais: `title`, `description`, `canonical`, `og:`, `twitter:`.
* Sitemap.xml e robots.txt configurados.
* Uso de microdados ou JSON-LD (ex.: `schema.org/VideoObject`) quando aplicável.

---

## 🚀 Deploy e integração contínua

* **Hospedagem:** GitHub Pages (branch `main` ou `gh-pages`).
* **CI recomendada (GitHub Actions):**

  * Validação HTML/CSS
  * Linting (Prettier, Stylelint)
  * Teste de build
* Opcional: incluir badge de status de build no README.

---

## 🎨 Qualidade de código e design

* **CSS:** modularizar com partials ou metodologia **BEM**.
* **Imagens:** otimizar e usar formatos modernos (**WebP**, `srcset`).
* **Vídeos:** incorporar via YouTube com player responsivo e transcrições.
* **Performance:** usar lazy-loading para imagens e recursos pesados.

---

## 🔒 Privacidade e aspectos legais

* Página de **Política de Privacidade** (Analytics, formulários).
* Aviso e consentimento de cookies, se aplicável.
* Termos de uso para contribuições e envio de materiais.

---

## ⚖️ Licença, créditos e agradecimentos

* Adicione um arquivo **LICENSE** (ex.: MIT) se quiser permitir uso livre com atribuição.
* Use um **CREDITS.md** para listar colaboradores, parceiros e fontes.
* Inclua um **CODE_OF_CONDUCT.md** para orientar interações na comunidade.

---

## 🧱 Modelos e templates recomendados

```
.github/
 ├── ISSUE_TEMPLATE/        # Templates para bugs e sugestões
 ├── PULL_REQUEST_TEMPLATE.md
 └── CONTRIBUTING.md
```

---

## 💌 Contato e suporte

📧 **E-mail:** [omh.tube@gmail.com](mailto:omh.tube@gmail.com)
📱 **Facebook:** [@omundoesuashistorias](https://facebook.com/omundoesuashistorias)
▶️ **YouTube:** [@omundoesuashistorias](https://youtube.com/@omundoesuashistorias)
📸 **Instagram:** [@omundoesuashistorias](https://instagram.com/omundoesuashistorias)

---

## 🎨 Aparência e material visual

Inclua uma pasta `/design` com:

* Logotipos em SVG/PNG
* Paleta de cores e tipografia
* Guia de uso da marca
* Screenshots do site (`/assets/screenshots`)

---

## 🕓 Changelog e releases

Use **tags semânticas** e um `CHANGELOG.md` para registrar atualizações, melhorias e publicações de novas matérias.

---

## 🙌 Créditos

**Fundadores:** Rodrigo Pontes & Jaqueline Longoni
**Criação, produção e curadoria:** Equipe *O Mundo e Suas Histórias*

---

### 💬 Agradecimento

Obrigado por contribuir com **O Mundo e Suas Histórias**.
Se desejar, posso:

* Adicionar este README diretamente ao repositório e abrir um Pull Request;
* Gerar automaticamente uma **LICENSE (MIT, Apache 2.0 ou GPL)**;
* Criar **templates de issues e PRs**, e um **workflow básico de CI (GitHub Actions)**.



```
```

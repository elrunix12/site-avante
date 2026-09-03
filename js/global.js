/* ============================================
   EMPRESA JÚNIOR - NAVBAR E RODAPÉ GLOBAIS
   ============================================
   Este arquivo injeta a barra de navegação e o rodapé em todas as páginas.
   Ele também marca o item de menu ativo com base no nome da página atual.
   ============================================ */

// Configurações centrais - edite os links abaixo
const CONFIG = {
  formularioUrl: "#",
  instagramUrl: "#",
  linkedinUrl: "#",
  email: "avanteconsultjr@gmail.com"
};

// Função para detectar se estamos em uma subpasta (ex: /noticias/)
function getPrefix() {
  const path = window.location.pathname;
  if (path.includes('/noticias/') || path.endsWith('/noticias/')) {
    return '../';
  }
  return '';
}

// Função para injetar a navbar
function injectNavbar() {
  const navbarContainer = document.getElementById('navbar');
  if (!navbarContainer) return;

  const prefix = getPrefix();
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  const navbarHTML = `
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="${prefix}index.html">
          <img src="${prefix}assets/logo.png" alt="Logo da Empresa Júnior" onerror="this.style.display='none'; this.nextSibling.style.display='inline';">
          <span style="display:none; font-weight: bold; color: #23588e;">Empresa Júnior</span>
        </a>
        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarMenu">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div id="navbarMenu" class="navbar-menu">
        <div class="navbar-end">
          <a class="navbar-item ${currentPage === 'index.html' ? 'has-text-primary' : ''}" href="${prefix}index.html">
            Início
          </a>
          <a class="navbar-item ${currentPage === 'sobre.html' ? 'has-text-primary' : ''}" href="${prefix}sobre.html">
            Sobre
          </a>
          <a class="navbar-item ${currentPage === 'servicos.html' ? 'has-text-primary' : ''}" href="${prefix}servicos.html">
            Serviços
          </a>
        </div>
      </div>
    </nav>
  `;

  navbarContainer.innerHTML = navbarHTML;

  const burger = navbarContainer.querySelector('.navbar-burger');
  const menu = navbarContainer.querySelector('#navbarMenu');
  if (burger && menu) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('is-active');
      menu.classList.toggle('is-active');
    });
  }
}

// Função para injetar o rodapé
function injectFooter() {
  const footerContainer = document.getElementById('footer');
  if (!footerContainer) return;

  const prefix = getPrefix();

  const footerHTML = `
    <footer class="footer-custom">
      <div class="container">
        <div class="social-icons">
          <a href="${CONFIG.instagramUrl}" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <i class="fab fa-instagram"></i>
          </a>
          <a href="${CONFIG.linkedinUrl}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <i class="fab fa-linkedin"></i>
          </a>
          <a href="${CONFIG.formularioUrl}" target="_blank" rel="noopener noreferrer" aria-label="Formulário de contato">
            <i class="fas fa-clipboard-list"></i>
          </a>
        </div>

        <p class="has-text-centered">
          <a href="${prefix}index.html">Início</a> &nbsp;|&nbsp;
          <a href="${prefix}sobre.html">Sobre</a> &nbsp;|&nbsp;
          <a href="${prefix}servicos.html">Serviços</a>
        </p>

        <p class="has-text-centered" style="margin-top: 8px;">
          <a href="mailto:${CONFIG.email}" style="color: inherit; text-decoration: underline;">
            ${CONFIG.email}
          </a>
        </p>

        <p class="has-text-centered" style="margin-top: 15px; opacity: 0.8;">
          © ${new Date().getFullYear()} AVANTE CONSULTORIA - Empresa Júnior. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  `;

  footerContainer.innerHTML = footerHTML;
}

// Inicializa navbar e rodapé ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  injectNavbar();
  injectFooter();
});
/* ============================================
   EMPRESA JÚNIOR - GESTÃO DE NOTÍCIAS
   ============================================
   Este arquivo carrega as notícias de noticias.json
   e renderiza na página inicial com paginação.
   ============================================ */

const NOTICIAS_POR_PAGINA = 4; // alterado de 3 para 4
let paginaAtual = 1;
let noticias = []; // será preenchida com o JSON

// Função para renderizar as notícias da página atual
function renderizarNoticias(pagina) {
  const container = document.getElementById('noticias-lista');
  if (!container) return;

  const inicio = (pagina - 1) * NOTICIAS_POR_PAGINA;
  const fim = inicio + NOTICIAS_POR_PAGINA;
  const noticiasPagina = noticias.slice(inicio, fim);

  container.innerHTML = '';

  noticiasPagina.forEach(noticia => {
    const col = document.createElement('div');
    // Alterado is-4-desktop para is-3-desktop para caber 4 colunas por linha no desktop
    col.className = 'column is-12-mobile is-6-tablet is-3-desktop';

    col.innerHTML = `
      <div class="card noticia-card">
        <div class="card-content">
          <p class="title is-5">${noticia.titulo}</p>
          <p class="subtitle is-6 has-text-grey">${formatarData(noticia.data)}</p>
          <p>${noticia.resumo}</p>
        </div>
        <footer class="card-footer">
          <a href="${noticia.link}" class="card-footer-item" aria-label="Leia mais sobre ${noticia.titulo}">Leia mais</a>
        </footer>
      </div>
    `;

    container.appendChild(col);
  });

  renderizarPaginacao();
}

// Função para formatar data (AAAA-MM-DD para DD/MM/AAAA)
function formatarData(dataISO) {
  const [ano, mes, dia] = dataISO.split('-');
  return `${dia}/${mes}/${ano}`;
}

// Função para renderizar a paginação
function renderizarPaginacao() {
  const container = document.getElementById('paginacao');
  if (!container) return;

  const totalPaginas = Math.ceil(noticias.length / NOTICIAS_POR_PAGINA);
  if (totalPaginas <= 1) {
    container.innerHTML = '';
    return;
  }

  container.innerHTML = '';

  // Botão anterior
  const anterior = document.createElement('a');
  anterior.className = `pagination-previous ${paginaAtual === 1 ? 'is-disabled' : ''}`;
  anterior.textContent = 'Anterior';
  anterior.addEventListener('click', () => {
    if (paginaAtual > 1) {
      paginaAtual--;
      renderizarNoticias(paginaAtual);
    }
  });
  container.appendChild(anterior);

  // Botão próxima
  const proxima = document.createElement('a');
  proxima.className = `pagination-next ${paginaAtual === totalPaginas ? 'is-disabled' : ''}`;
  proxima.textContent = 'Próxima';
  proxima.addEventListener('click', () => {
    if (paginaAtual < totalPaginas) {
      paginaAtual++;
      renderizarNoticias(paginaAtual);
    }
  });
  container.appendChild(proxima);

  // Lista de páginas numeradas
  const lista = document.createElement('ul');
  lista.className = 'pagination-list';

  for (let i = 1; i <= totalPaginas; i++) {
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.className = `pagination-link ${i === paginaAtual ? 'is-current' : ''}`;
    link.textContent = i;
    link.addEventListener('click', () => {
      paginaAtual = i;
      renderizarNoticias(paginaAtual);
    });
    li.appendChild(link);
    lista.appendChild(li);
  }

  container.appendChild(lista);
}

// Carrega as notícias do JSON e inicializa a listagem
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('noticias.json');
    if (!response.ok) throw new Error('Não foi possível carregar noticias.json');
    noticias = await response.json();

    // Se quiser ordenar por data (mais recente primeiro), descomente:
    // noticias.sort((a, b) => new Date(b.data) - new Date(a.data));

    renderizarNoticias(paginaAtual);
  } catch (error) {
    console.error('Erro ao carregar notícias:', error);
    const container = document.getElementById('noticias-lista');
    if (container) {
      container.innerHTML = `<p class="has-text-centered">Nenhuma notícia disponível.</p>`;
    }
  }
});
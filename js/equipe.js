document.addEventListener('DOMContentLoaded', async () => {
  const secaoEquipe = document.getElementById('secao-equipe');
  const containerEquipe = document.getElementById('equipe-container');

  if (!secaoEquipe || !containerEquipe) return;

  try {
    const resposta = await fetch('equipe.json');
    if (!resposta.ok) throw new Error('Falha ao carregar equipe.json');

    const equipe = await resposta.json();
    const membrosValidos = equipe.filter(membro =>
      membro.nome && membro.funcao && membro.nome.trim() !== ''
    );

    if (membrosValidos.length === 0) {
      secaoEquipe.style.display = 'none';
      return;
    }

    // Ordena coordenador primeiro
    membrosValidos.sort((a, b) => (b.coordenador === true) - (a.coordenador === true));

    containerEquipe.innerHTML = '';
    membrosValidos.forEach(membro => {
      const coluna = document.createElement('div');
      coluna.className = 'column is-12-mobile is-6-tablet is-3-desktop';

      const foto = membro.foto || 'https://via.placeholder.com/100?text=Sem+Foto';
      const badge = membro.coordenador
        ? '<span class="coordenador-badge">Coord.</span>'
        : '<span class="coordenador-badge is-invisible">Coord.</span>';
      const linkedinHtml = membro.linkedin
        ? `<a href="${membro.linkedin}" target="_blank" class="membro-linkedin"><i class="fab fa-linkedin"></i></a>`
        : '';

      coluna.innerHTML = `
        <div class="membro-item has-text-centered">
          <figure class="membro-foto">
            <img src="${foto}" alt="Foto de ${membro.nome}">
          </figure>
          ${badge}
          <h3 class="title is-6 is-spaced">${membro.nome}</h3>
          <p class="subtitle is-6 has-text-grey mb-1">${membro.funcao}</p>
          ${linkedinHtml}
        </div>
      `;

      containerEquipe.appendChild(coluna);
    });

    secaoEquipe.style.display = 'block';
  } catch (erro) {
    console.error('Erro ao carregar equipe:', erro);
    secaoEquipe.style.display = 'none';
  }
});

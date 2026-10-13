document.addEventListener('DOMContentLoaded', () => {
  // ===================================
  // EXERCICE 1 : Afficher/masquer sections
  // ===================================
  const toggleButtons = document.querySelectorAll('.section-toggle');

  toggleButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const section = document.querySelector(`#${button.dataset.target}`);
      const isHidden = section.classList.toggle('hidden');
      button.textContent = isHidden ? 'Afficher' : 'Masquer';
      button.setAttribute('aria-expanded', String(!isHidden));
    });
    button.setAttribute('aria-expanded', 'true');
  });

  // ===================================
  // EXERCICE 2 : Compteur de films
  // ===================================
  const movieCount = document.querySelectorAll('article').length;
  const countElement = document.createElement('span');
  countElement.textContent = `Catalogue : ${movieCount} films disponibles`;
  document.querySelector('#movie-count').replaceChildren(countElement);

  // ===================================
  // EXERCICE 3 : Films vus
  // ===================================
  const articles = document.querySelectorAll('article');
  articles.forEach((article) => {
    article.addEventListener('click', (event) => {
      const clickedArticle = event.target.closest('article');
      clickedArticle.classList.toggle('watched');

      const title = clickedArticle.querySelector('h3').textContent;
      const description = clickedArticle.querySelector('.movie-info p:last-child').textContent;
      const meta = clickedArticle.querySelector('.movie-meta').textContent;
      openModal(title, description, meta);
    });
  });

  // ===================================
  // EXERCICE 4 : Recherche
  // ===================================
  const searchInput = document.querySelector('#search');
  const noResults = document.querySelector('#no-results');

  searchInput.addEventListener('input', function handleSearch() {
    const searchTerm = this.value.trim().toLowerCase();
    let visibleMovies = 0;

    articles.forEach((article) => {
      const title = article.querySelector('h3').textContent.toLowerCase();
      const matches = title.includes(searchTerm);
      article.style.display = matches ? '' : 'none';
      if (matches) visibleMovies += 1;
    });

    noResults.hidden = visibleMovies !== 0;
  });

  // ===================================
  // EXERCICE 5 : Modal
  // ===================================
  const modal = document.querySelector('#modal');
  const modalBody = document.querySelector('#modal-body');
  const closeButton = document.querySelector('.close');

  const openModal = (title, description, meta) => {
    modalBody.replaceChildren();
    const titleElement = document.createElement('h2');
    titleElement.id = 'modal-title';
    titleElement.textContent = title;
    const metaElement = document.createElement('p');
    metaElement.className = 'movie-meta';
    metaElement.textContent = meta;
    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = description;
    modalBody.append(metaElement, titleElement, descriptionElement);
    modal.hidden = false;
    closeButton.focus();
  };

  const closeModal = () => {
    modal.hidden = true;
  };

  closeButton.addEventListener('click', closeModal);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modal.hidden) closeModal();
  });

  // ===================================
  // EXERCICE 6 : Changement de thème
  // ===================================
  const themeButton = document.querySelector('#theme-toggle');
  themeButton.addEventListener('click', () => {
    const darkThemeEnabled = document.body.classList.toggle('dark-theme');
    themeButton.textContent = darkThemeEnabled ? 'Mode clair' : 'Mode sombre';
  });
});

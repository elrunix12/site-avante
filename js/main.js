/* ============================================
   EMPRESA JÚNIOR - INTERAÇÕES GERAIS
   ============================================
   Este arquivo contém:
   - Lógica do carrossel (troca de slides, indicadores, autoplay)
   - Atualização dos links de formulário e redes sociais
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ===================== CARROSSEL =====================
  const slides = document.querySelectorAll('.carousel-slide');
  const indicators = document.querySelectorAll('.indicator');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const carousel = document.querySelector('.carousel-container');

  if (slides.length > 0) {
    let currentSlide = 0;
    let autoplayInterval = null;

    function showSlide(index) {
      // Remove 'is-active' de todos os slides
      slides.forEach((slide, i) => {
        slide.classList.toggle('is-active', i === index);
      });

      // Atualiza indicadores
      indicators.forEach((ind, i) => {
        ind.classList.toggle('is-active', i === index);
      });

      currentSlide = index;
    }

    function nextSlide() {
      const next = (currentSlide + 1) % slides.length;
      showSlide(next);
    }

    function prevSlide() {
      const prev = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(prev);
    }

    // Eventos dos botões
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoplay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoplay();
      });
    }

    // Eventos dos indicadores
    indicators.forEach((indicator) => {
      indicator.addEventListener('click', () => {
        const slideIndex = parseInt(indicator.dataset.slide, 10);
        if (!isNaN(slideIndex)) {
          showSlide(slideIndex);
          resetAutoplay();
        }
      });
    });

    // Autoplay (5 segundos)
    function startAutoplay() {
      if (autoplayInterval) clearInterval(autoplayInterval);
      autoplayInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoplay() {
      startAutoplay();
    }

    // Pausar autoplay ao passar o mouse
    if (carousel) {
      carousel.addEventListener('mouseenter', () => {
        if (autoplayInterval) clearInterval(autoplayInterval);
      });
      carousel.addEventListener('mouseleave', () => {
        startAutoplay();
      });
    }

    // Inicia autoplay
    startAutoplay();
  }

  // ===================== LINKS DE CONTATO =====================
  // Atualiza os hrefs dos botões de formulário e redes sociais
  // usando as URLs definidas no arquivo global.js (CONFIG)

  const linkFormularioCard = document.getElementById('linkFormularioCard');
  const linkFormularioContato = document.getElementById('linkFormularioContato');
  const linkInstagram = document.getElementById('linkInstagram');
  const linkLinkedin = document.getElementById('linkLinkedin');

  if (typeof CONFIG !== 'undefined') {
    if (linkFormularioCard) linkFormularioCard.href = CONFIG.formularioUrl;
    if (linkFormularioContato) linkFormularioContato.href = CONFIG.formularioUrl;
    if (linkInstagram) linkInstagram.href = CONFIG.instagramUrl;
    if (linkLinkedin) linkLinkedin.href = CONFIG.linkedinUrl;
  }
});
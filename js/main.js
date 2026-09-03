/* ============================================
   EMPRESA JÚNIOR - INTERAÇÕES GERAIS
   ============================================
   Este arquivo contém:
   - Lógica do carrossel (troca de slides, indicadores, autoplay)
   - Suporte a gestos de arrasto (swipe) no carrossel
   - Atualização dos links de formulário e redes sociais
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ===================== CARROSSEL =====================
  const slides = document.querySelectorAll('.carousel-slide');
  const indicators = document.querySelectorAll('.indicator');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const carousel = document.querySelector('.carousel-container');
  const slidesContainer = document.getElementById('carouselSlides');

  if (slides.length > 0) {
    let currentSlide = 0;
    let autoplayInterval = null;

    function showSlide(index) {
      // Move o container de slides para exibir o slide desejado
      if (slidesContainer) {
        slidesContainer.style.transform = `translateX(-${index * 100}%)`;
      }

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

    // Suporte a gestos de arrasto (swipe) no carrossel
    let touchStartX = 0;
    let touchEndX = 0;

    if (carousel) {
      carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        const threshold = 50;
        if (Math.abs(diff) > threshold) {
          if (diff > 0) {
            nextSlide();
          } else {
            prevSlide();
          }
          resetAutoplay();
        }
      }, { passive: true });
    }

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

    // Inicializa o primeiro slide (posição inicial)
    showSlide(0);
    startAutoplay();
  }

  // ===================== LINKS DE CONTATO =====================
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
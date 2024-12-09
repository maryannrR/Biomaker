// Função para alternar o menu de navegação em telas pequenas
function toggleFunction() {
    const navDemo = document.getElementById('navDemo');
    navDemo.classList.toggle('w3-show'); // Alterna visibilidade do menu
  }
  
  // Controle do Carrossel
  let currentSlide = 0;
  let autoSlideInterval;
  
  function showSlide(index) {
    const slides = document.querySelectorAll('.slide'); // Cada slide individual
    const manualBtns = document.querySelectorAll('.manual-btn'); // Botões de navegação manual
  
    slides.forEach((slide, i) => {
      slide.style.display = i === index ? 'block' : 'none'; // Exibe apenas o slide atual
      manualBtns[i].classList.toggle('active', i === index); // Destaque no botão correspondente
    });
  
    currentSlide = index;
  }
  
  // Configuração do carrossel automático
  function startAutoSlide() {
    stopAutoSlide(); // Reinicia para evitar múltiplos intervalos
    autoSlideInterval = setInterval(() => {
      const slides = document.querySelectorAll('.slide');
      showSlide((currentSlide + 1) % slides.length); // Alterna para o próximo slide
    }, 5000); // Troca de slides a cada 5 segundos
  }
  
  function stopAutoSlide() {
    clearInterval(autoSlideInterval); // Limpa o intervalo existente
  }
  
  // Suporte a interação por toque para dispositivos móveis
  function addTouchSupport(slider) {
    let startX = 0;
  
    slider.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX; // Posição inicial do toque
    });
  
    slider.addEventListener('touchend', (e) => {
      const endX = e.changedTouches[0].clientX; // Posição final do toque
      const slides = document.querySelectorAll('.slide');
  
      if (startX > endX + 50) {
        // Deslizou para a esquerda (próximo slide)
        showSlide((currentSlide + 1) % slides.length);
      } else if (startX < endX - 50) {
        // Deslizou para a direita (slide anterior)
        showSlide((currentSlide - 1 + slides.length) % slides.length);
      }
  
      startAutoSlide(); // Reinicia o carrossel automático
    });
  }
  
  // Inicialização do carrossel
  document.addEventListener('DOMContentLoaded', () => {
    const manualBtns = document.querySelectorAll('.manual-btn');
    const slider = document.querySelector('.slider');
  
    // Exibir o primeiro slide ao carregar
    showSlide(currentSlide);
  
    // Adicionar eventos de clique nos botões manuais
    manualBtns.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        showSlide(i);
        startAutoSlide(); // Reinicia o intervalo após interação manual
      });
    });
  
    // Adicionar suporte ao toque para dispositivos móveis
    if (slider) {
      addTouchSupport(slider);
    }
  
    // Iniciar carrossel automático
    startAutoSlide();
  });

  
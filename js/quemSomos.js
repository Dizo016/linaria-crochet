// Efeito de typewriter para o título
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      // Manter o cursor piscando após terminar
      element.style.borderRight = '3px solid ' + getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
    }
  }
  
  type();
}

// Verificar quando elementos entram na viewport
function checkVisibility() {
  const cards = document.querySelectorAll('.motive-card');
  
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const isVisible = (rect.top <= window.innerHeight * 0.8 && rect.bottom >= 0);
    
    if (isVisible) {
      card.classList.add('visible');
    }
  });
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
  // Typewriter effect
  const typewriterElement = document.querySelector('.typewriter');
  if (typewriterElement) {
    const text = typewriterElement.textContent;
    typeWriter(typewriterElement, text, 80);
  }
  
  // Animar cards quando entrarem na viewport
  window.addEventListener('scroll', checkVisibility);
  checkVisibility(); // Verificar inicialmente
  
  // Adicionar delay sequencial para os cards
  const cards = document.querySelectorAll('.motive-card');
  cards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.2}s`;
  });
  
  // Animações de entrada para elementos
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 1s ease forwards';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observar elementos para animação
  const animatedElements = document.querySelectorAll('.intro-text, .gallery-item, .cta-button');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
});
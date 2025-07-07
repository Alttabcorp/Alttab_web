/**
 * Alt tab Corp - Animations
 * Script para gerenciar animações e efeitos visuais do site
 */

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar animações de scroll
    initScrollAnimations();
    
    // Inicializar contadores
    initCounters();
    
    // Inicializar efeitos de hover
    initHoverEffects();
    
    // Inicializar efeitos de ripple
    initRippleEffect();
    
    // Inicializar animações de texto
    initTextAnimations();
});

/**
 * Inicializa animações baseadas em scroll
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    // Função para verificar se elemento está visível
    const isElementInViewport = (el) => {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
            rect.bottom >= 0
        );
    };
    
    // Função para animar elementos visíveis
    const animateVisibleElements = () => {
        animatedElements.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('visible');
                
                // Adicionar classes específicas de animação
                if (element.classList.contains('fade-up')) {
                    element.classList.add('visible');
                } else if (element.classList.contains('fade-left')) {
                    element.classList.add('visible');
                } else if (element.classList.contains('fade-right')) {
                    element.classList.add('visible');
                } else if (element.classList.contains('scale-in')) {
                    element.classList.add('visible');
                }
            }
        });
    };
    
    // Executar na carga inicial
    setTimeout(animateVisibleElements, 100);
    
    // Adicionar evento de scroll
    window.addEventListener('scroll', animateVisibleElements);
    window.addEventListener('resize', animateVisibleElements);
}

/**
 * Inicializa contadores animados
 */
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const startCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 segundos
        const step = target / (duration / 16); // 16ms é aproximadamente 60fps
        
        let current = 0;
        const updateCounter = () => {
            current += step;
            
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    };
    
    // Usar Intersection Observer para iniciar contadores quando visíveis
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

/**
 * Inicializa efeitos de hover
 */
function initHoverEffects() {
    // Adicionar classe hover-lift aos cards
    const cards = document.querySelectorAll('.service-card, .testimonial-card, .team-card, .project-card');
    cards.forEach(card => {
        card.classList.add('hover-lift');
    });
    
    // Adicionar classe hover-rotate aos ícones
    const icons = document.querySelectorAll('.service-icon i, .feature-icon i, .social-link i');
    icons.forEach(icon => {
        icon.classList.add('hover-rotate');
    });
}

/**
 * Inicializa efeito de ripple para botões
 */
function initRippleEffect() {
    const rippleButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    rippleButtons.forEach(button => {
        if (!button.classList.contains('btn-ripple')) {
            button.classList.add('btn-ripple');
        }
        
        button.addEventListener('click', function(e) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

/**
 * Inicializa animações de texto
 */
function initTextAnimations() {
    // Adicionar classe reveal-text para títulos principais
    const mainTitles = document.querySelectorAll('.hero h1, .section-title');
    mainTitles.forEach((title, index) => {
        // Aplicar apenas em alguns títulos para não sobrecarregar
        if (index % 2 === 0) {
            title.classList.add('reveal-text');
        }
    });
    
    // Adicionar classe gradient-text para badges e destaques
    const badges = document.querySelectorAll('.section-badge');
    badges.forEach(badge => {
        badge.classList.add('gradient-text');
    });
}

/**
 * Adiciona animação de parallax para elementos de fundo
 * @param {string} selector - Seletor CSS para o elemento
 * @param {number} speed - Velocidade do efeito (0.1 a 0.5)
 */
function addParallaxEffect(selector, speed = 0.2) {
    const element = document.querySelector(selector);
    if (!element) return;
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        element.style.transform = `translateY(${scrollPosition * speed}px)`;
    });
}

// Exportar funções para uso em outros arquivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initScrollAnimations,
        initCounters,
        initHoverEffects,
        initRippleEffect,
        initTextAnimations,
        addParallaxEffect
    };
} 
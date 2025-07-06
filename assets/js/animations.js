/**
 * Alt tab Corp - Animations
 * Gerencia as animações do site
 */

document.addEventListener('DOMContentLoaded', function() {
    // Animação de entrada para os cards de serviço
    const serviceCards = document.querySelectorAll('.service-card');
    
    if (serviceCards.length > 0) {
        // Usar Intersection Observer para animar os cards quando entrarem na viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        // Adicionar classe para animação inicial
        serviceCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `opacity 0.5s ease, transform 0.5s ease ${index * 0.1}s`;
            
            observer.observe(card);
        });
    }
    
    // Animação para os passos do processo
    const processSteps = document.querySelectorAll('.process-step');
    
    if (processSteps.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        processSteps.forEach((step, index) => {
            step.style.opacity = '0';
            step.style.transform = 'translateY(30px)';
            step.style.transition = `opacity 0.5s ease, transform 0.5s ease ${index * 0.15}s`;
            
            observer.observe(step);
        });
    }
    
    // Adicionar classe animated quando os elementos entrarem na viewport
    document.querySelectorAll('.animated').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    });
}); 
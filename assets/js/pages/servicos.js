/**
 * Script para a página de serviços
 * Gerencia as funcionalidades interativas específicas da página
 * Atualizado em 11 de julho de 2025
 */

document.addEventListener('DOMContentLoaded', function() {
    // Inicializa as abas da seção de processo
    initProcessTabs();
    
    // Adiciona observador para animações
    initAnimations();
    
    // Inicializa as animações da hero section
    initHeroAnimations();
});

/**
 * Inicializa o sistema de abas da seção de processo
 */
function initProcessTabs() {
    const tabButtons = document.querySelectorAll('.process-tab-btn');
    
    // Inicializa com a primeira aba ativa
    const firstTab = document.querySelector('.process-tab-btn');
    if (firstTab && !document.querySelector('.process-tab-btn.active')) {
        firstTab.classList.add('active');
        const firstTabId = firstTab.dataset.tab;
        const firstTabPane = document.getElementById(firstTabId);
        if (firstTabPane) {
            firstTabPane.classList.add('active');
        }
    }
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove classe ativa de todos os botões
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adiciona classe ativa ao botão clicado
            this.classList.add('active');
            
            // Obtém o ID da aba a ser mostrada
            const tabId = this.dataset.tab;
            
            // Oculta todas as abas de conteúdo primeiro
            const tabPanes = document.querySelectorAll('.process-tab-pane');
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
            });
            
            // Mostra a aba de conteúdo correspondente com animação suave
            const targetPane = document.getElementById(tabId);
            if (targetPane) {
                // Força um reflow para garantir que a animação funcione
                void targetPane.offsetWidth;
                targetPane.classList.add('active');
            }
        });
    });
    
    // Adapta a interface para mobile quando necessário
    handleMobileProcessNav();
    window.addEventListener('resize', handleMobileProcessNav);
}

/**
 * Adapta a navegação de processo para dispositivos móveis
 */
function handleMobileProcessNav() {
    const processNavButtons = document.querySelectorAll('.process-tab-btn');
    const processTabsNav = document.querySelector('.process-tabs-nav');
    
    if (window.innerWidth < 768) {
        // Em dispositivos móveis, exibe apenas o botão ativo e adiciona botões de navegação
        const activeButton = document.querySelector('.process-tab-btn.active');
        
        if (processTabsNav && !document.querySelector('.process-mobile-controls')) {
            // Criar controles móveis
            const mobileControls = document.createElement('div');
            mobileControls.className = 'process-mobile-controls';
            
            const prevButton = document.createElement('button');
            prevButton.className = 'process-mobile-prev';
            prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
            prevButton.setAttribute('aria-label', 'Etapa anterior');
            
            const nextButton = document.createElement('button');
            nextButton.className = 'process-mobile-next';
            nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
            nextButton.setAttribute('aria-label', 'Próxima etapa');
            
            mobileControls.appendChild(prevButton);
            mobileControls.appendChild(nextButton);
            
            processTabsNav.parentNode.insertBefore(mobileControls, processTabsNav.nextSibling);
            
            // Adicionar eventos aos botões de navegação
            prevButton.addEventListener('click', navigatePrevTab);
            nextButton.addEventListener('click', navigateNextTab);
        }
    } else {
        // Em desktop, remove os controles móveis se existirem
        const mobileControls = document.querySelector('.process-mobile-controls');
        if (mobileControls) {
            mobileControls.remove();
        }
    }
}

/**
 * Navega para a aba anterior
 */
function navigatePrevTab() {
    const activeButton = document.querySelector('.process-tab-btn.active');
    if (!activeButton) return;
    
    const prevButton = activeButton.previousElementSibling;
    if (prevButton && prevButton.classList.contains('process-tab-btn')) {
        prevButton.click();
    } else {
        // Se não houver anterior, vai para o último (circular)
        const allButtons = document.querySelectorAll('.process-tab-btn');
        allButtons[allButtons.length - 1].click();
    }
}

/**
 * Navega para a próxima aba
 */
function navigateNextTab() {
    const activeButton = document.querySelector('.process-tab-btn.active');
    if (!activeButton) return;
    
    const nextButton = activeButton.nextElementSibling;
    if (nextButton && nextButton.classList.contains('process-tab-btn')) {
        nextButton.click();
    } else {
        // Se não houver próximo, vai para o primeiro (circular)
        const allButtons = document.querySelectorAll('.process-tab-btn');
        allButtons[0].click();
    }
}

/**
 * Inicializa as animações nos elementos da página
 */
function initAnimations() {
    // Animação suave para os elementos com scroll
    const animateItems = document.querySelectorAll('.animate-on-scroll');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const animation = element.dataset.animation || 'fade-in';
                    const delay = element.dataset.delay || '0s';
                    
                    element.style.animationDelay = delay;
                    element.classList.add(animation);
                    element.classList.add('animated');
                    
                    observer.unobserve(element);
                }
            });
        }, {
            threshold: 0.1
        });
        
        animateItems.forEach(item => {
            observer.observe(item);
        });
    } else {
        // Fallback para navegadores sem suporte a IntersectionObserver
        animateItems.forEach(item => {
            item.classList.add('animated');
            
            const animation = item.dataset.animation || 'fade-in';
            item.classList.add(animation);
        });
    }
}

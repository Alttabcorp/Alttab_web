/**
 * Alt tab Corp - Main JavaScript
 * Script principal para funcionalidades do site
 */

window.addEventListener('load', function() {
    console.log('DOM carregado, inicializando scripts...');
    
    // Inicializa todas as animações
    if (window.animations && typeof window.animations.init === 'function') {
        window.animations.init();
    }
    
    // ======== Menu Mobile ========
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // ======== E-Sports Submenu Fix ========
    // Função específica para garantir que o submenu de E-Sports funcione corretamente
    const initEsportsSubMenu = () => {
        const esportsMenu = document.querySelector('.nav-dropdown a[href="pages/esports/"]');
        if (!esportsMenu) return;
        
        const esportsDropdown = esportsMenu.closest('.nav-dropdown');
        const subDropdowns = esportsDropdown.querySelectorAll('.nav-item.nav-dropdown');
        
        subDropdowns.forEach(subMenu => {
            const subMenuLink = subMenu.querySelector('.nav-link');
            const subDropdownMenu = subMenu.querySelector('.dropdown-menu');
            
            if (window.innerWidth > 992) {
                // Configuração para desktop
                subMenu.addEventListener('mouseenter', function(e) {
                    if (subDropdownMenu) {
                        subDropdownMenu.style.opacity = '1';
                        subDropdownMenu.style.visibility = 'visible';
                        subDropdownMenu.classList.add('active');
                    }
                });
                
                subMenu.addEventListener('mouseleave', function(e) {
                    if (subDropdownMenu) {
                        subDropdownMenu.style.opacity = '0';
                        subDropdownMenu.style.visibility = 'hidden';
                        subDropdownMenu.classList.remove('active');
                    }
                });
            } else {
                // Mobile: Desabilitar submenus para navegação direta
                // Não adicionar event listeners que impedem navegação
                console.log('Mobile: E-Sports submenu desabilitado para navegação direta');
            }
        });
    };

    // Inicializar o fix para o submenu de E-Sports
    document.addEventListener('DOMContentLoaded', initEsportsSubMenu);
    window.addEventListener('resize', initEsportsSubMenu);
    
    // ======== Dropdown Menu ========
    const dropdownItems = document.querySelectorAll('.nav-dropdown');
    
    if (dropdownItems.length > 0) {
        dropdownItems.forEach(item => {
            const link = item.querySelector('.nav-link');
            const dropdownMenu = item.querySelector('.dropdown-menu');
            
            // Função para mostrar dropdown
            const showDropdown = (menu) => {
                menu.classList.add('active');
                menu.style.opacity = '1';
                menu.style.visibility = 'visible';
            };
            
            // Função para esconder dropdown
            const hideDropdown = (menu) => {
                menu.classList.remove('active');
                menu.style.opacity = '0';
                menu.style.visibility = 'hidden';
            };
            
            if (window.innerWidth > 992) {
                // Desktop: Hover
                item.addEventListener('mouseenter', function() {
                    showDropdown(dropdownMenu);
                });
                
                item.addEventListener('mouseleave', function() {
                    hideDropdown(dropdownMenu);
                });
                
                // Lidar com submenus aninhados
                const nestedDropdowns = item.querySelectorAll('.nav-item.nav-dropdown');
                nestedDropdowns.forEach(nestedItem => {
                    const nestedLink = nestedItem.querySelector('.nav-link');
                    const nestedMenu = nestedItem.querySelector('.dropdown-menu');
                    
                    nestedItem.addEventListener('mouseenter', function(e) {
                        e.stopPropagation();
                        showDropdown(nestedMenu);
                    });
                    
                    nestedItem.addEventListener('mouseleave', function(e) {
                        e.stopPropagation();
                        hideDropdown(nestedMenu);
                    });
                });
            } else {
                // Mobile: Navegar diretamente para a página (sem dropdown)
                // Permitir navegação normal - não adicionar event listeners que impedem navegação
                console.log('Dispositivo móvel: dropdowns desabilitados, navegação direta habilitada');
            }
        });
        
        // Fecha todos os dropdowns ao clicar fora
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.nav-dropdown')) {
                dropdownItems.forEach(item => {
                    const menu = item.querySelector('.dropdown-menu');
                    if (menu) hideDropdown(menu);
                });
            }
        });
    }
    
    // ======== Scroll Suave para Âncoras ========
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    if (anchorLinks) {
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                
                if (targetId === '#') return;
                
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Fecha o menu mobile se estiver aberto
                    if (navMenu && navMenu.classList.contains('active')) {
                        mobileMenuBtn.classList.remove('active');
                        navMenu.classList.remove('active');
                        document.body.classList.remove('menu-open');
                    }
                    
                    // Calcula a posição de rolagem considerando o header fixo
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // ======== Botão Voltar ao Topo ========
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        });
        
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ======== Animações ao Scroll ========
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animateElements.length > 0) {
        const animateElementsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    animateElementsObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        animateElements.forEach(element => {
            animateElementsObserver.observe(element);
        });
    }
    
    // ======== Banner de Cookies ========
    const cookieBanner = document.querySelector('.cookie-banner');
    const cookieAcceptBtn = document.querySelector('.cookie-btn-accept');
    const cookieSettingsBtn = document.querySelector('.cookie-btn-settings');
    
    if (cookieBanner && cookieAcceptBtn) {
        // Verifica se o usuário já aceitou os cookies
        const cookiesAccepted = localStorage.getItem('cookiesAccepted');
        
        if (!cookiesAccepted) {
            // Exibe o banner após 2 segundos
            setTimeout(() => {
                cookieBanner.classList.add('active');
            }, 2000);
            
            // Evento para aceitar cookies
            cookieAcceptBtn.addEventListener('click', function() {
                localStorage.setItem('cookiesAccepted', 'true');
                cookieBanner.classList.remove('active');
            });
            
            // Evento para configurações de cookies
            if (cookieSettingsBtn) {
                cookieSettingsBtn.addEventListener('click', function() {
                    // Redireciona para a página de política de cookies
                    window.location.href = '/cookies/';
                });
            }
        }
    }
    
    // ======== FAQ Accordion ========
    function initializeFAQ() {
        // Aguardar um pouco para garantir que o DOM esteja completamente carregado
        setTimeout(() => {
            const allFaqItems = document.querySelectorAll('.faq-item');
            
            allFaqItems.forEach((item, index) => {
                const question = item.querySelector('.faq-question');
                const answer = item.querySelector('.faq-answer');
                
                if (question && answer) {
                    // Limpar eventos anteriores
                    question.removeAttribute('data-faq-initialized');
                    
                    // Verificar se já foi inicializado
                    if (question.getAttribute('data-faq-initialized') === 'true') {
                        return;
                    }
                    
                    // Marcar como inicializado
                    question.setAttribute('data-faq-initialized', 'true');
                    
                    // Configurar estado inicial
                    answer.style.maxHeight = '0px';
                    answer.style.overflow = 'hidden';
                    answer.style.transition = 'max-height 0.3s ease-out';
                    
                    // Adicionar evento de clique
                    question.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        const isActive = item.classList.contains('active');
                        
                        // Fechar todos os outros FAQs
                        allFaqItems.forEach(otherItem => {
                            if (otherItem !== item) {
                                otherItem.classList.remove('active');
                                const otherAnswer = otherItem.querySelector('.faq-answer');
                                if (otherAnswer) {
                                    otherAnswer.style.maxHeight = '0px';
                                }
                            }
                        });
                        
                        // Toggle do item atual
                        if (isActive) {
                            item.classList.remove('active');
                            answer.style.maxHeight = '0px';
                        } else {
                            item.classList.add('active');
                            answer.style.maxHeight = answer.scrollHeight + 'px';
                        }
                    });
                    
                    // Suporte para teclado
                    question.addEventListener('keydown', function(e) {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            question.click();
                        }
                    });
                    
                    // Configurar acessibilidade
                    question.setAttribute('role', 'button');
                    question.setAttribute('tabindex', '0');
                    question.setAttribute('aria-expanded', 'false');
                }
            });
            
            // Ativar o primeiro FAQ de cada seção
            const faqSections = document.querySelectorAll('.faq-section, .faq');
            faqSections.forEach(section => {
                const firstItem = section.querySelector('.faq-item');
                if (firstItem && !firstItem.classList.contains('active')) {
                    setTimeout(() => {
                        const firstQuestion = firstItem.querySelector('.faq-question');
                        if (firstQuestion) {
                            firstQuestion.click();
                        }
                    }, 100);
                }
            });
            
        }, 200);
    }
    
    // Inicializar FAQ
    initializeFAQ();
    
    // Re-inicializar se necessário após mudanças no DOM
    if (window.MutationObserver) {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    // Verificar se novos elementos FAQ foram adicionados
                    let hasNewFAQ = false;
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === 1 && (node.classList.contains('faq-item') || node.querySelector('.faq-item'))) {
                            hasNewFAQ = true;
                        }
                    });
                    if (hasNewFAQ) {
                        initializeFAQ();
                    }
                }
            });
        });
        
        observer.observe(document.body, { childList: true, subtree: true });
    }
    
    // ======== Formulário de Contato ========
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulação de envio de formulário
            const formMessage = document.createElement('div');
            formMessage.className = 'form-message success';
            formMessage.innerHTML = '<i class="fas fa-check-circle"></i> Mensagem enviada com sucesso! Entraremos em contato em breve.';
            
            contactForm.appendChild(formMessage);
            
            // Limpa o formulário
            contactForm.reset();
            
            // Remove a mensagem após 5 segundos
            setTimeout(() => {
                formMessage.classList.add('fade-out');
                setTimeout(() => {
                    formMessage.remove();
                }, 500);
            }, 5000);
        });
    }
    
    // ======== Efeito de Partículas ========
    const particlesContainer = document.getElementById('particles-js');
    
    if (particlesContainer && window.particlesJS) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#ffffff'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    },
                },
                opacity: {
                    value: 0.5,
                    random: false,
                },
                size: {
                    value: 3,
                    random: true,
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#ffffff',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
    
    // ======== Parallax Effect ========
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    
    if (parallaxElements.length > 0) {
        window.addEventListener('scroll', function() {
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(window.pageYOffset * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
    
    // ======== Abas de Missão, Visão e Valores ========
    const valuesTabs = document.querySelectorAll('.values-tab-btn');
    const valuesTabsContent = document.querySelectorAll('.values-tab-pane');
    
    if (valuesTabs.length > 0 && valuesTabsContent.length > 0) {
        // Função para alternar entre as abas
        const switchValueTab = (tabId) => {
            // Desativa todas as abas
            valuesTabs.forEach(tab => tab.classList.remove('active'));
            valuesTabsContent.forEach(content => content.classList.remove('active'));
            
            // Ativa a aba selecionada
            const activeTab = document.querySelector(`.values-tab-btn[data-tab="${tabId}"]`);
            const activeContent = document.getElementById(tabId);
            
            if (activeTab && activeContent) {
                activeTab.classList.add('active');
                activeContent.classList.add('active');
                
                // Animação para o conteúdo
                activeContent.style.animation = 'none';
                activeContent.offsetHeight; // Trigger reflow
                activeContent.style.animation = 'fadeIn 0.5s ease forwards';
            }
        };
        
        // Adiciona evento de clique para cada botão de aba
        valuesTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                switchValueTab(tabId);
            });
        });
        
        // Navegação automática entre as abas a cada 6 segundos
        let currentTabIndex = 0;
        const autoSwitchTabs = () => {
            currentTabIndex = (currentTabIndex + 1) % valuesTabs.length;
            const nextTabId = valuesTabs[currentTabIndex].getAttribute('data-tab');
            switchValueTab(nextTabId);
        };
        
        // Iniciar rotação automática
        let tabInterval = setInterval(autoSwitchTabs, 6000);
        
        // Parar a rotação automática quando o usuário interagir com as abas
        const valuesTabsContainer = document.querySelector('.values-tabs');
        if (valuesTabsContainer) {
            valuesTabsContainer.addEventListener('mouseenter', () => {
                clearInterval(tabInterval);
            });
            
            valuesTabsContainer.addEventListener('mouseleave', () => {
                tabInterval = setInterval(autoSwitchTabs, 6000);
            });
            
            // Parar a rotação automática em dispositivos de toque
            valuesTabsContainer.addEventListener('touchstart', () => {
                clearInterval(tabInterval);
            }, { passive: true });
        }
    }
    
    // ======== Timeline Horizontal na Página Sobre ========
    const timelineNavItems = document.querySelectorAll('.timeline-nav-item');
    const timelineSlides = document.querySelectorAll('.timeline-slide');
    const timelineProgressBar = document.querySelector('.timeline-progress-bar');
    const timelineNext = document.querySelector('.timeline-control-next');
    const timelinePrev = document.querySelector('.timeline-control-prev');
    
    if (timelineNavItems.length > 0 && timelineSlides.length > 0) {
        // Função para alternar entre os slides da timeline
        const switchTimelineSlide = (slideIndex) => {
            // Desativa todos os slides e itens de navegação
            timelineNavItems.forEach(item => item.classList.remove('active'));
            timelineSlides.forEach(slide => slide.classList.remove('active'));
            
            // Ativa o slide selecionado e item de navegação
            timelineNavItems[slideIndex].classList.add('active');
            timelineSlides[slideIndex].classList.add('active');
            
            // Atualiza a barra de progresso
            if (timelineProgressBar) {
                const progressPercent = (slideIndex / (timelineNavItems.length - 1)) * 100;
                timelineProgressBar.style.width = `${progressPercent}%`;
            }
        };
        
        // Adiciona evento de clique para cada item de navegação da timeline
        timelineNavItems.forEach((item, index) => {
            item.addEventListener('click', function() {
                switchTimelineSlide(index);
            });
        });
        
        // Adiciona evento de clique para os botões de navegação
        let currentSlideIndex = 0;
        
        if (timelineNext) {
            timelineNext.addEventListener('click', function() {
                currentSlideIndex = (currentSlideIndex + 1) % timelineSlides.length;
                switchTimelineSlide(currentSlideIndex);
            });
        }
        
        if (timelinePrev) {
            timelinePrev.addEventListener('click', function() {
                currentSlideIndex = (currentSlideIndex - 1 + timelineSlides.length) % timelineSlides.length;
                switchTimelineSlide(currentSlideIndex);
            });
        }
        
        // Ativa o primeiro slide por padrão
        switchTimelineSlide(0);
    }
    
    // ======== Typed.js Animation ========
    const typedElements = document.querySelectorAll('.typed-element');
    
    if (typedElements.length > 0 && typeof Typed !== 'undefined') {
        typedElements.forEach(element => {
            const strings = element.getAttribute('data-typed-strings').split(',');
            
            new Typed(element, {
                strings: strings,
                typeSpeed: 50,
                backSpeed: 30,
                backDelay: 2000,
                loop: true,
                smartBackspace: true
            });
        });
    }
    
    console.log('Scripts inicializados com sucesso!');
});
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
                // Configuração para mobile
                if (subMenuLink) {
                    subMenuLink.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        if (subDropdownMenu) {
                            subDropdownMenu.classList.toggle('active');
                            if (subDropdownMenu.classList.contains('active')) {
                                subDropdownMenu.style.opacity = '1';
                                subDropdownMenu.style.visibility = 'visible';
                                subDropdownMenu.style.maxHeight = '500px';
                                subMenuLink.classList.add('active');
                            } else {
                                subDropdownMenu.style.opacity = '0';
                                subDropdownMenu.style.visibility = 'hidden';
                                subDropdownMenu.style.maxHeight = '0';
                                subMenuLink.classList.remove('active');
                            }
                        }
                    });
                }
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
                // Mobile: Click
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Verifica se este dropdown já está ativo
                    const isActive = dropdownMenu.classList.contains('active');
                    
                    // Fecha todos os outros dropdowns do mesmo nível
                    const siblings = Array.from(item.parentNode.children);
                    siblings.forEach(sibling => {
                        if (sibling !== item && sibling.classList.contains('nav-dropdown')) {
                            const siblingMenu = sibling.querySelector('.dropdown-menu');
                            if (siblingMenu) hideDropdown(siblingMenu);
                        }
                    });
                    
                    // Alterna o estado atual
                    if (isActive) {
                        hideDropdown(dropdownMenu);
                    } else {
                        showDropdown(dropdownMenu);
                    }
                });
                
                // Lidar com submenus aninhados em mobile
                const nestedDropdowns = item.querySelectorAll('.nav-item.nav-dropdown');
                nestedDropdowns.forEach(nestedItem => {
                    const nestedLink = nestedItem.querySelector('.nav-link');
                    const nestedMenu = nestedItem.querySelector('.dropdown-menu');
                    
                    nestedLink.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        // Verifica se este dropdown já está ativo
                        const isActive = nestedMenu.classList.contains('active');
                        
                        // Alterna o estado atual
                        if (isActive) {
                            hideDropdown(nestedMenu);
                        } else {
                            showDropdown(nestedMenu);
                        }
                    });
                });
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
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            if (question) {
                question.addEventListener('click', function() {
                    // Fecha todos os outros itens
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('active')) {
                            otherItem.classList.remove('active');
                            const otherAnswer = otherItem.querySelector('.faq-answer');
                            if (otherAnswer) {
                                otherAnswer.style.maxHeight = '0';
                            }
                        }
                    });
                    
                    // Abre/fecha o item atual
                    item.classList.toggle('active');
                    const answer = item.querySelector('.faq-answer');
                    
                    if (answer) {
                        if (item.classList.contains('active')) {
                            answer.style.maxHeight = answer.scrollHeight + 'px';
                        } else {
                            answer.style.maxHeight = '0';
                        }
                    }
                });
            }
        });
        
        // Abre o primeiro item por padrão
        if (faqItems[0]) {
            faqItems[0].classList.add('active');
            const firstAnswer = faqItems[0].querySelector('.faq-answer');
            if (firstAnswer) {
                firstAnswer.style.maxHeight = firstAnswer.scrollHeight + 'px';
            }
        }
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
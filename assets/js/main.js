/**
 * Alt tab Corp - Main JavaScript
 * Responsável por todas as interações e animações do site
 */

document.addEventListener('DOMContentLoaded', function() {
    // ======== Menu Mobile ========
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const dropdowns = document.querySelectorAll('.nav-dropdown');
    
    // Toggle menu mobile
    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuBtn.classList.toggle('active');
        });
    }
    
    // Gerenciar dropdowns no menu
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link, .dropdown-link');
        
        // No mobile, prevenir navegação ao clicar em links com dropdown
        if (link) {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 992) {
                    const hasSubmenu = this.parentElement.querySelector('.dropdown-menu');
                    if (hasSubmenu) {
                        e.preventDefault();
                        // Fechar outros dropdowns do mesmo nível
                        const siblings = Array.from(this.parentElement.parentElement.children);
                        siblings.forEach(sibling => {
                            if (sibling !== this.parentElement && sibling.classList.contains('nav-dropdown')) {
                                sibling.classList.remove('open');
                                const siblingMenu = sibling.querySelector('.dropdown-menu');
                                if (siblingMenu) {
                                    siblingMenu.style.display = 'none';
                                }
                            }
                        });
                        
                        // Alternar este dropdown
                        this.parentElement.classList.toggle('open');
                        hasSubmenu.style.display = this.parentElement.classList.contains('open') ? 'flex' : 'none';
                    }
                }
            });
        }
    });
    
    // Fechar menu ao clicar fora
    document.addEventListener('click', function(e) {
        if (navMenu && navMenu.classList.contains('active') && !e.target.closest('.nav') && !e.target.closest('.mobile-menu-btn')) {
            navMenu.classList.remove('active');
            menuBtn.classList.remove('active');
        }
        
        // Fechar dropdowns ao clicar fora (mobile)
        if (window.innerWidth <= 992) {
            if (!e.target.closest('.nav-dropdown')) {
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('open');
                    const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                    if (dropdownMenu) {
                        dropdownMenu.style.display = 'none';
                    }
                });
            }
        }
    });
    
    // ======== FAQ Accordion ========
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Fechar todos os itens
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
                const icon = faqItem.querySelector('.faq-icon i');
                if (icon) {
                    icon.className = 'fas fa-plus';
                }
            });
            
            // Se não estava ativo, abrir este item
            if (!isActive) {
                item.classList.add('active');
                const icon = item.querySelector('.faq-icon i');
                if (icon) {
                    icon.className = 'fas fa-minus';
                }
            }
        });
    });
    
    // ======== Header Scroll ========
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Adicionar classe quando rolar para baixo
        if (scrollTop > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
        
        // Esconder/mostrar header ao rolar
        if (scrollTop > 150) {
            if (scrollTop > lastScrollTop && scrollTop > 300) {
                header.classList.add('header-hidden');
            } else {
                header.classList.remove('header-hidden');
            }
        }
        
        lastScrollTop = scrollTop;
    });
    
    // ======== Animações de Scroll ========
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const animateOnScroll = function() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100 && elementBottom > 0) {
                element.classList.add('animated');
                
                // Adicionar atraso para elementos em sequência
                if (element.parentElement) {
                    const siblings = Array.from(element.parentElement.children);
                    if (siblings.length > 1) {
                        siblings.forEach((sibling, index) => {
                            if (sibling.classList.contains('animate-on-scroll')) {
                                sibling.style.transitionDelay = `${index * 0.1}s`;
                            }
                        });
                    }
                }
            }
        });
    };
    
    // Executar uma vez ao carregar a página
    setTimeout(animateOnScroll, 100);
    
    // Executar ao rolar a página
    window.addEventListener('scroll', animateOnScroll);
    
    // ======== Botão Voltar ao Topo ========
    const backToTop = document.getElementById('backToTop');
    
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }
        });
        
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ======== Formulário de Contato ========
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação do formulário
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
                
                // Validação de email
                if (field.type === 'email') {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(field.value)) {
                        isValid = false;
                        field.classList.add('error');
                    }
                }
            });
            
            if (!isValid) {
                // Mostrar mensagem de erro
                let errorMessage = document.querySelector('.form-message.error');
                if (!errorMessage) {
                    errorMessage = document.createElement('div');
                    errorMessage.className = 'form-message error';
                    errorMessage.innerHTML = '<i class="fas fa-exclamation-circle"></i> Por favor, preencha todos os campos corretamente.';
                    contactForm.parentNode.insertBefore(errorMessage, contactForm.nextSibling);
                    
                    setTimeout(() => {
                        errorMessage.remove();
                    }, 5000);
                }
                return;
            }
            
            // Simular envio do formulário
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            
            // Simular atraso de rede
            setTimeout(() => {
                // Criar mensagem de sucesso
                const formMessage = document.createElement('div');
                formMessage.className = 'form-message success';
                formMessage.innerHTML = '<i class="fas fa-check-circle"></i> Mensagem enviada com sucesso! Entraremos em contato em breve.';
                
                // Inserir mensagem após o formulário
                contactForm.parentNode.insertBefore(formMessage, contactForm.nextSibling);
                
                // Restaurar botão
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
                
                // Limpar formulário
                contactForm.reset();
                
                // Remover mensagem após 5 segundos
                setTimeout(() => {
                    formMessage.remove();
                }, 5000);
            }, 1500);
        });
        
        // Remover classe de erro quando o usuário começa a digitar
        contactForm.querySelectorAll('input, textarea').forEach(field => {
            field.addEventListener('input', function() {
                this.classList.remove('error');
            });
        });
    }
    
    // ======== Efeitos de Hover nos Botões ========
    const rippleButtons = document.querySelectorAll('.btn-ripple');
    
    rippleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    });
    
    // ======== Lazy Loading de Imagens ========
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback para navegadores que não suportam IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
    
    // ======== Floating Contact Button ========
    const floatingContactBtn = document.getElementById('floatingContactBtn');
    const floatingContactMenu = document.getElementById('floatingContactMenu');
    const floatingContactClose = document.getElementById('floatingContactClose');
    
    if (floatingContactBtn && floatingContactMenu) {
        floatingContactBtn.addEventListener('click', function() {
            floatingContactMenu.classList.toggle('active');
            
            // Adicionar efeito de pulso quando fechado
            if (!floatingContactMenu.classList.contains('active')) {
                floatingContactBtn.classList.add('pulse');
                setTimeout(() => {
                    floatingContactBtn.classList.remove('pulse');
                }, 1000);
            }
        });
        
        if (floatingContactClose) {
            floatingContactClose.addEventListener('click', function() {
                floatingContactMenu.classList.remove('active');
            });
        }
        
        // Fechar ao clicar fora
        document.addEventListener('click', function(e) {
            if (floatingContactMenu.classList.contains('active') && 
                !e.target.closest('.floating-contact-menu') && 
                !e.target.closest('.floating-contact-btn')) {
                floatingContactMenu.classList.remove('active');
            }
        });
    }
    
    // Adicionar efeito de pulso inicial após alguns segundos
    setTimeout(() => {
        if (floatingContactBtn) {
            floatingContactBtn.classList.add('pulse');
            setTimeout(() => {
                floatingContactBtn.classList.remove('pulse');
            }, 1000);
        }
    }, 3000);
    
    // ======== Carrossel de Depoimentos ========
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevTestimonial = document.getElementById('prevTestimonial');
    const nextTestimonial = document.getElementById('nextTestimonial');
    const testimonialIndicators = document.querySelectorAll('.carousel-indicator');
    
    let currentSlide = 0;
    
    function showTestimonialSlide(index) {
        // Validar índice
        if (index < 0) index = testimonialSlides.length - 1;
        if (index >= testimonialSlides.length) index = 0;
        
        // Atualizar slide atual
        currentSlide = index;
        
        // Esconder todos os slides
        testimonialSlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Mostrar slide atual
        testimonialSlides[currentSlide].classList.add('active');
        
        // Atualizar indicadores
        testimonialIndicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === currentSlide);
        });
    }
    
    // Adicionar eventos de navegação
    if (prevTestimonial && nextTestimonial) {
        prevTestimonial.addEventListener('click', () => {
            showTestimonialSlide(currentSlide - 1);
        });
        
        nextTestimonial.addEventListener('click', () => {
            showTestimonialSlide(currentSlide + 1);
        });
    }
    
    // Adicionar eventos aos indicadores
    testimonialIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showTestimonialSlide(index);
        });
    });
    
    // Rotação automática de depoimentos
    setInterval(() => {
        if (testimonialSlides.length > 1) {
            showTestimonialSlide(currentSlide + 1);
        }
    }, 8000);
    
    // ======== Theme Toggle (Dark/Light Mode) ========
    const themeToggle = document.getElementById('themeToggle');
    
    // Verificar preferência do usuário ou configuração salva
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            // Alternar tema
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Atualizar atributo e salvar preferência
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
});
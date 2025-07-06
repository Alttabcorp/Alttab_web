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
        const link = dropdown.querySelector('.nav-link');
        
        // No mobile, prevenir navegação ao clicar em links com dropdown
        if (link) {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 992) {
                    e.preventDefault();
                    const subMenu = this.nextElementSibling;
                    if (subMenu) {
                        subMenu.style.maxHeight = subMenu.style.maxHeight ? null : subMenu.scrollHeight + 'px';
                        dropdown.classList.toggle('active');
                    }
                }
            });
        }
        
        // Dropdown no hover para desktop
        dropdown.addEventListener('mouseenter', function() {
            if (window.innerWidth > 992) {
                this.classList.add('active');
            }
        });
        
        dropdown.addEventListener('mouseleave', function() {
            if (window.innerWidth > 992) {
                this.classList.remove('active');
            }
        });
    });
    
    // Fechar menu ao clicar fora
    document.addEventListener('click', function(e) {
        if (navMenu && navMenu.classList.contains('active') && !e.target.closest('.nav') && !e.target.closest('.mobile-menu-btn')) {
            navMenu.classList.remove('active');
            menuBtn.classList.remove('active');
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
            });
            
            // Se não estava ativo, abrir este item
            if (!isActive) {
                item.classList.add('active');
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
            if (scrollTop > lastScrollTop) {
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
            }
        });
    };
    
    // Executar uma vez ao carregar a página
    animateOnScroll();
    
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
    }
    
    // ======== Efeitos de Hover nos Botões ========
    const rippleButtons = document.querySelectorAll('.btn-ripple');
    
    rippleButtons.forEach(button => {
        button.addEventListener('mouseenter', function(e) {
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
    
    // ======== Testimonial Carousel ========
    const prevTestimonial = document.getElementById('prevTestimonial');
    const nextTestimonial = document.getElementById('nextTestimonial');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialIndicators = document.querySelectorAll('.carousel-indicator');
    let currentSlide = 0;
    
    function showTestimonialSlide(index) {
        // Esconder todos os slides
        testimonialSlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Desativar todos os indicadores
        testimonialIndicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        // Mostrar slide atual
        testimonialSlides[index].classList.add('active');
        
        // Ativar indicador atual
        if (testimonialIndicators[index]) {
            testimonialIndicators[index].classList.add('active');
        }
    }
    
    if (prevTestimonial && nextTestimonial && testimonialSlides.length > 0) {
        // Botão anterior
        prevTestimonial.addEventListener('click', function() {
            currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
            showTestimonialSlide(currentSlide);
        });
        
        // Botão próximo
        nextTestimonial.addEventListener('click', function() {
            currentSlide = (currentSlide + 1) % testimonialSlides.length;
            showTestimonialSlide(currentSlide);
        });
        
        // Indicadores
        testimonialIndicators.forEach((indicator, index) => {
            indicator.addEventListener('click', function() {
                currentSlide = index;
                showTestimonialSlide(currentSlide);
            });
        });
    }
    
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
// Módulo de Animações Avançadas
// Expondo globalmente ao invés de usar export
window.animations = {
    // Inicializa todas as animações
    init() {
        this.initScrollAnimations();
        this.initParticles();
        this.initCounters();
        this.initTyped();
        this.initHoverEffects();
        this.initRippleEffect();
        this.initParallaxEffect();
        this.initSmoothScroll();
        this.initTiltEffect();
    },

    // Inicializa animações de scroll
    initScrollAnimations() {
        const animateElements = document.querySelectorAll('.animate-on-scroll');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    
                    // Adiciona delay para elementos em sequência
                    if (entry.target.dataset.delay) {
                        entry.target.style.animationDelay = entry.target.dataset.delay;
                    }
                    
                    // Adiciona animação específica se definida
                    if (entry.target.dataset.animation) {
                        entry.target.classList.add(entry.target.dataset.animation);
                    }
                    
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });
        
        animateElements.forEach(element => {
            observer.observe(element);
        });
    },

    // Inicializa Particles.js
    initParticles() {
        if (document.getElementById('particles-js')) {
            particlesJS('particles-js', {
                particles: {
                    number: {
                        value: 80,
                        density: {
                            enable: true,
                            value_area: 1200
                        }
                    },
                    color: {
                        value: ['#2563EB', '#0EA5E9', '#10B981']
                    },
                    shape: {
                        type: ['circle', 'triangle', 'polygon'],
                        stroke: {
                            width: 0,
                            color: '#000000'
                        },
                        polygon: {
                            nb_sides: 6
                        }
                    },
                    opacity: {
                        value: 0.5,
                        random: true,
                        anim: {
                            enable: true,
                            speed: 1,
                            opacity_min: 0.1,
                            sync: false
                        }
                    },
                    size: {
                        value: 4,
                        random: true,
                        anim: {
                            enable: true,
                            speed: 2,
                            size_min: 0.1,
                            sync: false
                        }
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: '#2563EB',
                        opacity: 0.4,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: 'none',
                        random: true,
                        straight: false,
                        out_mode: 'out',
                        bounce: false,
                        attract: {
                            enable: true,
                            rotateX: 600,
                            rotateY: 1200
                        }
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
                            distance: 180,
                            line_linked: {
                                opacity: 0.8
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
    },

    // Inicializa contadores
    initCounters() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3
        });

        document.querySelectorAll('.counter[data-target]').forEach(counter => {
            observer.observe(counter);
        });
    },

    // Anima contador individual
    animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2500;
        const step = target / (duration / 16);
        let current = 0;
        const format = counter.dataset.format || 'number';

        function update() {
            current += step;
            if (current < target) {
                if (format === 'currency') {
                    counter.textContent = 'R$ ' + Math.floor(current).toLocaleString('pt-BR');
                } else {
                    counter.textContent = Math.floor(current).toLocaleString('pt-BR');
                }
                requestAnimationFrame(update);
            } else {
                if (format === 'currency') {
                    counter.textContent = 'R$ ' + target.toLocaleString('pt-BR');
                } else {
                    counter.textContent = target.toLocaleString('pt-BR');
                }
                
                // Adiciona classe para efeito de conclusão
                counter.classList.add('counter-complete');
            }
        }

        update();
    },

    // Inicializa Typed.js
    initTyped() {
        const typedElement = document.querySelector('.typed-text');
        if (typedElement) {
            new Typed('.typed-text', {
                strings: [
                    'Excelência',
                    'Inovação',
                    'Tecnologia',
                    'Resultados',
                    'Criatividade',
                    'Qualidade'
                ],
                typeSpeed: 80,
                backSpeed: 40,
                backDelay: 2000,
                startDelay: 1000,
                loop: true,
                showCursor: true,
                cursorChar: '|',
                autoInsertCss: true,
                fadeOut: true,
                fadeOutClass: 'typed-fade-out',
                fadeOutDelay: 500
            });
        }
    },

    // Inicializa efeitos de hover
    initHoverEffects() {
        // Efeito de hover para cards
        document.querySelectorAll('.service-card, .team-card, .portfolio-item').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.classList.add('hover-active');
            });
            
            card.addEventListener('mouseleave', function() {
                this.classList.remove('hover-active');
            });
        });
        
        // Efeito de hover para botões
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                this.classList.add('btn-hover');
            });
            
            btn.addEventListener('mouseleave', function() {
                this.classList.remove('btn-hover');
            });
        });
    },

    // Inicializa efeito ripple para botões
    initRippleEffect() {
        document.querySelectorAll('.btn-ripple').forEach(button => {
            button.addEventListener('click', function(e) {
                const x = e.clientX - e.target.getBoundingClientRect().left;
                const y = e.clientY - e.target.getBoundingClientRect().top;
                
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    },

    // Inicializa efeito parallax
    initParallaxEffect() {
        document.querySelectorAll('.parallax-bg').forEach(element => {
            window.addEventListener('scroll', () => {
                const scrollPosition = window.pageYOffset;
                const speed = element.dataset.speed || 0.5;
                element.style.transform = `translateY(${scrollPosition * speed}px)`;
            });
        });
        
        // Parallax para elementos em movimento
        document.querySelectorAll('.parallax-element').forEach(element => {
            window.addEventListener('mousemove', (e) => {
                const speed = element.getAttribute('data-speed') || 0.1;
                const x = (window.innerWidth - e.pageX * speed) / 100;
                const y = (window.innerHeight - e.pageY * speed) / 100;
                
                element.style.transform = `translateX(${x}px) translateY(${y}px)`;
            });
        });
    },

    // Inicializa smooth scroll
    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        });
    },

    // Inicializa efeito tilt para cards
    initTiltEffect() {
        document.querySelectorAll('.tilt-effect').forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const cardRect = this.getBoundingClientRect();
                const x = e.clientX - cardRect.left;
                const y = e.clientY - cardRect.top;
                
                const centerX = cardRect.width / 2;
                const centerY = cardRect.height / 2;
                
                const deltaX = (x - centerX) / 15;
                const deltaY = (y - centerY) / 15;
                
                this.style.transform = `perspective(1000px) rotateX(${-deltaY}deg) rotateY(${deltaX}deg) scale3d(1.02, 1.02, 1.02)`;
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });
    }
}; 
/**
 * Alt tab Corp - Contato JavaScript
 * Responsável pelas interações e validações da página de contato
 */

document.addEventListener('DOMContentLoaded', function() {
    // Garantir que as animações do hero funcionem
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        // Verificar se as partículas estão visíveis
        const particlesElement = document.getElementById('particles-js');
        if (particlesElement && window.particlesJS) {
            particlesElement.style.opacity = '1';
            particlesElement.style.visibility = 'visible';
        }
    }
    
    // ==================== VALIDAÇÃO DO FORMULÁRIO ====================
    const contactForm = document.getElementById('contactForm');
    const inputs = contactForm ? contactForm.querySelectorAll('input, textarea, select') : [];
    
    // Adicionar eventos de validação em tempo real
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateInput(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateInput(this);
            }
        });
    });
    
    // Função para validar um campo específico
    function validateInput(input) {
        const errorClass = 'error';
        const validClass = 'valid';
        
        // Remover classes anteriores
        input.classList.remove(errorClass, validClass);
        
        // Remover mensagem de erro anterior
        const existingError = input.parentElement.querySelector('.input-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Verificar se é obrigatório e está vazio
        if (input.hasAttribute('required') && !input.value.trim()) {
            input.classList.add(errorClass);
            addErrorMessage(input, 'Este campo é obrigatório');
            return false;
        }
        
        // Validações específicas por tipo
        switch (input.type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (input.value && !emailRegex.test(input.value)) {
                    input.classList.add(errorClass);
                    addErrorMessage(input, 'Por favor, digite um e-mail válido');
                    return false;
                }
                break;
                
            case 'tel':
                if (input.value) {
                    const phoneRegex = /^[\d\s\(\)\-\+]{10,}$/;
                    if (!phoneRegex.test(input.value)) {
                        input.classList.add(errorClass);
                        addErrorMessage(input, 'Por favor, digite um telefone válido');
                        return false;
                    }
                }
                break;
                
            case 'checkbox':
                if (input.hasAttribute('required') && !input.checked) {
                    input.classList.add(errorClass);
                    addErrorMessage(input, 'Este campo é obrigatório');
                    return false;
                }
                break;
                
            case 'select-one':
                if (input.value === '' && input.hasAttribute('required')) {
                    input.classList.add(errorClass);
                    addErrorMessage(input, 'Por favor, selecione uma opção');
                    return false;
                }
                break;
        }
        
        // Se chegou até aqui, o campo é válido
        input.classList.add(validClass);
        return true;
    }
    
    // Função para adicionar mensagem de erro
    function addErrorMessage(input, message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'input-error';
        errorElement.textContent = message;
        
        if (input.type === 'checkbox') {
            input.parentElement.appendChild(errorElement);
        } else {
            input.insertAdjacentElement('afterend', errorElement);
        }
    }
    
    // Validar formulário ao enviar
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            inputs.forEach(input => {
                if (!validateInput(input)) {
                    isValid = false;
                }
            });
            
            if (!isValid) {
                const firstError = contactForm.querySelector('.error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    firstError.focus();
                }
                return;
            }
            
            // Simular envio do formulário
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            
            setTimeout(() => {
                const formMessage = document.createElement('div');
                formMessage.className = 'form-message success';
                formMessage.innerHTML = '<i class="fas fa-check-circle"></i> Mensagem enviada com sucesso! Entraremos em contato em breve.';
                
                contactForm.parentNode.insertBefore(formMessage, contactForm.nextSibling);
                
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
                contactForm.reset();
            }, 1500);
        });
    }
    
    // ==================== MÁSCARA PARA TELEFONE ====================
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length <= 11) {
                value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
                if (value.length < 14) {
                    value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
                }
            } else {
                value = value.substring(0, 11);
                value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
            }
            
            e.target.value = value;
        });
    }
    
    // ==================== AJUSTE RESPONSIVO GOOGLE FORM ====================
    function adjustGoogleFormHeight() {
        const iframe = document.querySelector('.google-form-container iframe');
        if (!iframe) return;
        
        const viewportWidth = window.innerWidth;
        
        if (viewportWidth > 1200) {
            iframe.style.height = '850px';
        } else if (viewportWidth > 992) {
            iframe.style.height = '800px';
        } else if (viewportWidth > 768) {
            iframe.style.height = '780px';
        } else if (viewportWidth > 576) {
            iframe.style.height = '750px';
        } else if (viewportWidth > 480) {
            iframe.style.height = '700px';
        } else {
            iframe.style.height = '680px';
        }
        
        // Ajuste especial para orientação paisagem em dispositivos móveis
        if (window.matchMedia("(max-height: 500px) and (orientation: landscape)").matches) {
            iframe.style.height = '700px';
        }
    }
    
    // ==================== MELHORIAS PARA LINKS DE CONTATO ====================
    function enhanceContactLinks() {
        // Efeito para links de telefone
        const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
        phoneLinks.forEach(link => {
            link.addEventListener('touchstart', function() {
                this.classList.add('active-link');
            });
            
            link.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('active-link');
                }, 300);
            });
        });
        
        // Efeito para links de email
        const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
        emailLinks.forEach(link => {
            link.addEventListener('touchstart', function() {
                this.classList.add('active-link');
            });
            
            link.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('active-link');
                }, 300);
            });
        });
    }
    
    // ==================== DETECÇÃO DE ORIENTAÇÃO ====================
    function handleOrientationChange() {
        if (window.matchMedia("(orientation: portrait)").matches) {
            document.body.classList.add('orientation-portrait');
            document.body.classList.remove('orientation-landscape');
        } else {
            document.body.classList.add('orientation-landscape');
            document.body.classList.remove('orientation-portrait');
        }
        
        adjustGoogleFormHeight();
    }
    
    // ==================== OVERLAY DE CARREGAMENTO ====================
    function handleFormLoadingOverlay() {
        const formLoadingOverlay = document.getElementById('formLoadingOverlay');
        if (formLoadingOverlay) {
            setTimeout(function() {
                formLoadingOverlay.style.opacity = '0';
                setTimeout(function() {
                    formLoadingOverlay.style.display = 'none';
                }, 300);
            }, 3000);
        }
    }
    
    // ==================== EFEITOS NOS CAMPOS DO FORMULÁRIO ====================
    inputs.forEach(input => {
        if (input.type !== 'checkbox') {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
            });
        }
    });
    
    // ==================== ANIMAÇÃO DO MAPA ====================
    const mapSection = document.querySelector('.map-section');
    if (mapSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.3
        });
        
        observer.observe(mapSection);
    }
    
    // ==================== INICIALIZAÇÃO ====================
    function init() {
        enhanceContactLinks();
        handleOrientationChange();
        adjustGoogleFormHeight();
        handleFormLoadingOverlay();
        
        // Inicializar partículas do hero/page-header
        if (window.particlesJS) {
            particlesJS('particles-js', {
                "particles": {
                    "number": {
                        "value": 80,
                        "density": {
                            "enable": true,
                            "value_area": 800
                        }
                    },
                    "color": {
                        "value": "#ffffff"
                    },
                    "shape": {
                        "type": "circle",
                        "stroke": {
                            "width": 0,
                            "color": "#000000"
                        }
                    },
                    "opacity": {
                        "value": 0.5,
                        "random": false,
                        "anim": {
                            "enable": false,
                            "speed": 1,
                            "opacity_min": 0.1,
                            "sync": false
                        }
                    },
                    "size": {
                        "value": 3,
                        "random": true,
                        "anim": {
                            "enable": false,
                            "speed": 40,
                            "size_min": 0.1,
                            "sync": false
                        }
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 150,
                        "color": "#ffffff",
                        "opacity": 0.4,
                        "width": 1
                    },
                    "move": {
                        "enable": true,
                        "speed": 6,
                        "direction": "none",
                        "random": false,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": false,
                        "attract": {
                            "enable": false,
                            "rotateX": 600,
                            "rotateY": 1200
                        }
                    }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": {
                            "enable": true,
                            "mode": "grab"
                        },
                        "onclick": {
                            "enable": true,
                            "mode": "push"
                        },
                        "resize": true
                    },
                    "modes": {
                        "grab": {
                            "distance": 140,
                            "line_linked": {
                                "opacity": 1
                            }
                        },
                        "push": {
                            "particles_nb": 4
                        },
                        "remove": {
                            "particles_nb": 2
                        }
                    }
                },
                "retina_detect": true
            });
        }
    }
    
    // ==================== EVENT LISTENERS ====================
    window.addEventListener('resize', function() {
        adjustGoogleFormHeight();
        handleOrientationChange();
    });
    
    window.addEventListener('orientationchange', function() {
        setTimeout(function() {
            adjustGoogleFormHeight();
            handleOrientationChange();
        }, 100);
    });
    
    // Inicializar todas as funcionalidades
    init();
    
    // Event listener para mudanças no formulário Google
    const googleFormIframe = document.getElementById('googleFormIframe');
    if (googleFormIframe) {
        googleFormIframe.addEventListener('load', function() {
            const formLoadingOverlay = document.getElementById('formLoadingOverlay');
            if (formLoadingOverlay) {
                formLoadingOverlay.style.display = 'none';
            }
        });
    }
});
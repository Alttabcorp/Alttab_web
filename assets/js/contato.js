/**
 * Alt tab Corp - Contato JavaScript
 * Responsável pelas interações e validações da página de contato
 */

document.addEventListener('DOMContentLoaded', function() {
    // Validação avançada do formulário
    const contactForm = document.getElementById('contactForm');
    const inputs = contactForm ? contactForm.querySelectorAll('input, textarea, select') : [];
    
    // Adicionar eventos de validação em tempo real
    inputs.forEach(input => {
        // Validação ao perder o foco
        input.addEventListener('blur', function() {
            validateInput(this);
        });
        
        // Validação ao digitar (para remover erros quando corrigidos)
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
                    addErrorMessage(input, 'E-mail inválido');
                    return false;
                }
                break;
                
            case 'tel':
                if (input.value) {
                    const phoneRegex = /^(\+\d{1,3}\s?)?\(?\d{2,3}\)?[\s.-]?\d{4,5}[\s.-]?\d{4}$/;
                    if (!phoneRegex.test(input.value)) {
                        input.classList.add(errorClass);
                        addErrorMessage(input, 'Telefone inválido');
                        return false;
                    }
                }
                break;
                
            case 'checkbox':
                if (input.hasAttribute('required') && !input.checked) {
                    input.classList.add(errorClass);
                    addErrorMessage(input, 'Você precisa concordar para continuar');
                    return false;
                }
                break;
                
            case 'select-one':
                if (input.value === '' && input.hasAttribute('required')) {
                    input.classList.add(errorClass);
                    addErrorMessage(input, 'Selecione uma opção');
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
        
        // Inserir após o input ou após o label do checkbox
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
            
            // Validar todos os campos
            let isValid = true;
            inputs.forEach(input => {
                if (!validateInput(input)) {
                    isValid = false;
                }
            });
            
            if (!isValid) {
                // Rolar até o primeiro campo com erro
                const firstError = contactForm.querySelector('.error');
                if (firstError) {
                    firstError.focus();
                    window.scrollTo({
                        top: firstError.getBoundingClientRect().top + window.pageYOffset - 150,
                        behavior: 'smooth'
                    });
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
                
                // Remover classes de validação
                inputs.forEach(input => {
                    input.classList.remove('valid', 'error');
                });
                
                // Rolar até a mensagem de sucesso
                window.scrollTo({
                    top: formMessage.getBoundingClientRect().top + window.pageYOffset - 150,
                    behavior: 'smooth'
                });
                
                // Remover mensagem após alguns segundos
                setTimeout(() => {
                    formMessage.classList.add('fade-out');
                    setTimeout(() => {
                        formMessage.remove();
                    }, 500);
                }, 5000);
            }, 1500);
        });
    }
    
    // Máscara para campo de telefone
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length <= 11) {
                // Formato: (XX) XXXXX-XXXX
                if (value.length > 2) {
                    value = `(${value.substring(0, 2)}) ${value.substring(2)}`;
                }
                if (value.length > 10) {
                    value = `${value.substring(0, 10)}-${value.substring(10)}`;
                }
            } else {
                // Formato internacional: +XX (XX) XXXXX-XXXX
                value = `+${value.substring(0, 2)} (${value.substring(2, 4)}) ${value.substring(4, 9)}-${value.substring(9, 13)}`;
            }
            
            e.target.value = value;
        });
    }
    
    // Efeito de foco nos campos do formulário
    inputs.forEach(input => {
        if (input.type !== 'checkbox') {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('input-focused');
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('input-focused');
            });
        }
    });
    
    // Animação do mapa ao entrar na viewport
    const mapSection = document.querySelector('.map-section');
    if (mapSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('map-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3
        });
        
        observer.observe(mapSection);
    }
}); 
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = contactForm.querySelector('.btn-primary');
    const inputs = contactForm.querySelectorAll('input, textarea, select');

    // Máscara para telefone
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 11) {
                value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
                value = value.replace(/(\d)(\d{4})$/, '$1-$2');
                e.target.value = value;
            }
        });
    }

    // Função para validar email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Função para validar telefone
    function isValidPhone(phone) {
        const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
        return phoneRegex.test(phone);
    }

    // Função para mostrar mensagem de erro
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        const errorDiv = formGroup.querySelector('.error-message') || document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(errorDiv);
        }
        
        input.classList.add('error');
        input.focus();
    }

    // Função para remover mensagem de erro
    function removeError(input) {
        const formGroup = input.closest('.form-group');
        const errorDiv = formGroup.querySelector('.error-message');
        
        if (errorDiv) {
            errorDiv.remove();
        }
        
        input.classList.remove('error');
    }

    // Adicionar listeners para validação em tempo real
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            removeError(this);
        });

        input.addEventListener('blur', function() {
            validateField(this);
        });
    });

    // Função para validar campo individual
    function validateField(field) {
        const value = field.value.trim();

        switch (field.id) {
            case 'name':
                if (value.length < 3) {
                    showError(field, 'O nome deve ter pelo menos 3 caracteres');
                    return false;
                }
                break;

            case 'email':
                if (!isValidEmail(value)) {
                    showError(field, 'Por favor, insira um email válido');
                    return false;
                }
                break;

            case 'phone':
                if (value && !isValidPhone(value)) {
                    showError(field, 'Por favor, insira um telefone válido');
                    return false;
                }
                break;

            case 'service':
                if (!value) {
                    showError(field, 'Por favor, selecione um serviço');
                    return false;
                }
                break;

            case 'message':
                if (value.length < 10) {
                    showError(field, 'A mensagem deve ter pelo menos 10 caracteres');
                    return false;
                }
                break;

            case 'privacy':
                if (!field.checked) {
                    showError(field, 'Você precisa concordar com a política de privacidade');
                    return false;
                }
                break;
        }

        return true;
    }

    // Função para validar todo o formulário
    function validateForm() {
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        return isValid;
    }

    // Manipular envio do formulário
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        // Desabilitar botão durante o envio
        submitBtn.disabled = true;
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = `
            <span>Enviando...</span>
            <i class="fas fa-spinner fa-spin"></i>
        `;

        try {
            // Aqui você pode adicionar a lógica para enviar os dados para um servidor
            // Por enquanto, vamos simular um delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Mostrar mensagem de sucesso
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <p>Mensagem enviada com sucesso! Entraremos em contato em breve.</p>
            `;
            contactForm.insertBefore(successMessage, contactForm.firstChild);
            
            // Limpar o formulário
            contactForm.reset();

            // Remover mensagem de sucesso após 5 segundos
            setTimeout(() => {
                successMessage.remove();
            }, 5000);

        } catch (error) {
            // Mostrar mensagem de erro
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.innerHTML = `
                <i class="fas fa-exclamation-circle"></i>
                <p>Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.</p>
            `;
            contactForm.insertBefore(errorMessage, contactForm.firstChild);

            // Remover mensagem de erro após 5 segundos
            setTimeout(() => {
                errorMessage.remove();
            }, 5000);
        } finally {
            // Reabilitar botão
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    });
}); 
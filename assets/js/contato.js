document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = contactForm.querySelector('.submit-btn');

    // Função para validar email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
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
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            removeError(this);
        });
    });

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        let hasError = false;

        // Validar campos
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');

        if (name.value.trim() === '') {
            showError(name, 'Por favor, insira seu nome');
            hasError = true;
        }

        if (!isValidEmail(email.value)) {
            showError(email, 'Por favor, insira um email válido');
            hasError = true;
        }

        if (subject.value.trim() === '') {
            showError(subject, 'Por favor, insira um assunto');
            hasError = true;
        }

        if (message.value.trim() === '') {
            showError(message, 'Por favor, insira sua mensagem');
            hasError = true;
        }

        if (hasError) {
            return;
        }

        // Desabilitar botão durante o envio
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';

        try {
            // Aqui você pode adicionar a lógica para enviar os dados para um servidor
            // Por enquanto, vamos simular um delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Mostrar mensagem de sucesso
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            
            // Limpar o formulário
            contactForm.reset();
        } catch (error) {
            alert('Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.');
        } finally {
            // Reabilitar botão
            submitBtn.disabled = false;
            submitBtn.textContent = 'Enviar Mensagem';
        }
    });
}); 
/**
 * Alt tab Corp - FAQ Script
 * Script universal para FAQs em todas as páginas do site
 */

document.addEventListener('DOMContentLoaded', function() {

    // Aguardar um pouco para garantir que todos os estilos carregaram
    setTimeout(initializeFAQ, 100);
    
    function initializeFAQ() {
        // Selecionar todos os itens do FAQ
        const faqItems = document.querySelectorAll('.faq-item');
        
        if (faqItems.length === 0) {
            console.error("Nenhum item de FAQ encontrado na página!");
            return;
        }

        // Função para abrir um item de FAQ
        function openFaqItem(item) {
            
            // Obtém a resposta e o ícone
            const answer = item.querySelector('.faq-answer');
            const icon = item.querySelector('.faq-icon i') || item.querySelector('.faq-question i');
            const question = item.querySelector('.faq-question');

            // Adiciona a classe active
            item.classList.add('active');

            // Aplica estilos diretos para garantir que a resposta seja visível
            if (answer) {
                // Primeiro, calcula a altura necessária
                answer.style.display = 'block';
                answer.style.visibility = 'visible';
                answer.style.opacity = '0';
                answer.style.maxHeight = 'none';
                const height = answer.scrollHeight;
                
                // Depois aplica a animação
                answer.style.maxHeight = '0px';
                answer.style.opacity = '0';
                
                // Força o reflow
                answer.offsetHeight;
                
                // Aplica os estilos finais
                answer.style.maxHeight = height + 'px';
                answer.style.opacity = '1';
                answer.style.padding = '1.25rem';
                
            }

            // Muda o ícone
            if (icon) {
                icon.style.transform = 'rotate(180deg)';
                icon.className = icon.className.replace('fa-chevron-down', 'fa-chevron-up');
            }
            
            // Muda o background da question
            if (question) {
                question.style.backgroundColor = 'var(--primary)';
                const span = question.querySelector('span');
                if (span) span.style.color = 'white';
                if (icon) icon.style.color = 'white';
            }
        }

        // Função para fechar um item de FAQ
        function closeFaqItem(item) {
            
            // Obtém a resposta e o ícone
            const answer = item.querySelector('.faq-answer');
            const icon = item.querySelector('.faq-icon i') || item.querySelector('.faq-question i');
            const question = item.querySelector('.faq-question');

            // Remove a classe active
            item.classList.remove('active');

            // Aplica estilos diretos para esconder a resposta
            if (answer) {
                answer.style.maxHeight = '0px';
                answer.style.opacity = '0';
                answer.style.padding = '0 1.25rem';
                
                // Esconde completamente após a animação
                setTimeout(() => {
                    if (!item.classList.contains('active')) {
                        answer.style.visibility = 'hidden';
                        answer.style.display = 'none';
                    }
                }, 300);
            }

            // Muda o ícone de volta
            if (icon) {
                icon.style.transform = 'rotate(0deg)';
                icon.className = icon.className.replace('fa-chevron-up', 'fa-chevron-down');
            }
            
            // Restaura o background da question
            if (question) {
                question.style.backgroundColor = 'transparent';
                const span = question.querySelector('span');
                if (span) span.style.color = 'var(--text-color)';
                if (icon) icon.style.color = 'var(--primary)';
            }
        }

        // Adicionar evento de clique a cada pergunta
        faqItems.forEach((item, index) => {
            const question = item.querySelector('.faq-question');
            
            if (question) {
                // Adicionar cursor pointer
                question.style.cursor = 'pointer';
                
                question.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Verificar se este item já está ativo
                    const isActive = item.classList.contains('active');
                    
                    // Fechar todos os itens ativos
                    faqItems.forEach(faqItem => {
                        if (faqItem !== item) {
                            closeFaqItem(faqItem);
                        }
                    });
                    
                    // Se o item clicado não estava ativo, ativá-lo
                    if (!isActive) {
                        openFaqItem(item);
                    } else {
                        closeFaqItem(item);
                    }
                });
                
                // Adicionar suporte para teclado
                question.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        question.click();
                    }
                });
                
                // Tornar focusável
                question.setAttribute('tabindex', '0');
                question.setAttribute('role', 'button');
                question.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Aplicar estilos base a todas as respostas
        const faqAnswers = document.querySelectorAll('.faq-answer');
        faqAnswers.forEach(answer => {
            answer.style.transition = 'all 0.3s ease-out';
            answer.style.overflow = 'hidden';
            answer.style.display = 'none';
            answer.style.visibility = 'hidden';
        });

        // Abrir o primeiro item do FAQ por padrão após um delay
        setTimeout(() => {
            if (faqItems.length > 0) {
                openFaqItem(faqItems[0]);
            }
        }, 200);
    }
}); 
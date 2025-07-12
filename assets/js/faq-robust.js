/**
 * Alt tab Corp - FAQ Script Robusto
 * Script que força o FAQ a funcionar independentemente de conflitos
 */

(function() {
    'use strict';
    
    console.log('FAQ Script Robusto carregado');
    
    function initFAQ() {
        console.log('Inicializando FAQ...');
        
        // Aguardar o DOM estar completamente carregado
        const faqItems = document.querySelectorAll('.faq-item');
        console.log(`Encontrados ${faqItems.length} itens de FAQ`);
        
        if (faqItems.length === 0) {
            console.error('Nenhum item de FAQ encontrado!');
            return;
        }
        
        // Função para aplicar estilos de abertura
        function openFaqItem(item) {
            console.log('Abrindo FAQ item:', item);
            
            const answer = item.querySelector('.faq-answer');
            const icon = item.querySelector('.faq-icon i') || item.querySelector('.faq-question i');
            const question = item.querySelector('.faq-question');
            
            if (!answer) {
                console.error('Answer não encontrado para item:', item);
                return;
            }
            
            // Adicionar classe active
            item.classList.add('active');
            
            // Aplicar estilos inline para forçar visibilidade
            answer.style.display = 'block';
            answer.style.visibility = 'visible';
            answer.style.opacity = '0';
            answer.style.maxHeight = 'none';
            answer.style.padding = '1.25rem';
            answer.style.background = '#ffffff';
            answer.style.border = 'none';
            answer.style.transition = 'all 0.3s ease-out';
            
            // Calcular altura real
            const realHeight = answer.scrollHeight;
            console.log('Altura calculada:', realHeight + 'px');
            
            // Aplicar animação
            answer.style.maxHeight = '0px';
            answer.style.opacity = '0';
            
            // Forçar reflow
            answer.offsetHeight;
            
            // Aplicar altura final
            setTimeout(() => {
                answer.style.maxHeight = realHeight + 'px';
                answer.style.opacity = '1';
            }, 10);
            
            // Estilizar o botão como ativo
            if (question) {
                question.style.backgroundColor = '#1A2238';
                question.style.color = '#ffffff';
                const span = question.querySelector('span');
                if (span) span.style.color = '#ffffff';
            }
            
            // Rotacionar ícone
            if (icon) {
                icon.style.transform = 'rotate(180deg)';
                icon.style.color = '#ffffff';
            }
        }
        
        // Função para aplicar estilos de fechamento
        function closeFaqItem(item) {
            console.log('Fechando FAQ item:', item);
            
            const answer = item.querySelector('.faq-answer');
            const icon = item.querySelector('.faq-icon i') || item.querySelector('.faq-question i');
            const question = item.querySelector('.faq-question');
            
            if (!answer) return;
            
            // Remover classe active
            item.classList.remove('active');
            
            // Aplicar estilos de fechamento
            answer.style.maxHeight = '0px';
            answer.style.opacity = '0';
            answer.style.padding = '0 1.25rem';
            
            // Esconder após animação
            setTimeout(() => {
                if (!item.classList.contains('active')) {
                    answer.style.display = 'none';
                    answer.style.visibility = 'hidden';
                }
            }, 300);
            
            // Resetar estilo do botão
            if (question) {
                question.style.backgroundColor = 'transparent';
                question.style.color = '';
                const span = question.querySelector('span');
                if (span) span.style.color = '#334155';
            }
            
            // Resetar ícone
            if (icon) {
                icon.style.transform = 'rotate(0deg)';
                icon.style.color = '#1A2238';
            }
        }
        
        // Adicionar eventos de clique
        faqItems.forEach((item, index) => {
            const question = item.querySelector('.faq-question');
            
            if (!question) {
                console.error('Question não encontrado para item:', item);
                return;
            }
            
            // Remover eventos existentes
            question.replaceWith(question.cloneNode(true));
            const newQuestion = item.querySelector('.faq-question');
            
            // Estilizar botão
            newQuestion.style.cursor = 'pointer';
            newQuestion.style.outline = 'none';
            newQuestion.style.border = 'none';
            newQuestion.style.width = '100%';
            newQuestion.style.textAlign = 'left';
            newQuestion.style.display = 'flex';
            newQuestion.style.justifyContent = 'space-between';
            newQuestion.style.alignItems = 'center';
            newQuestion.style.padding = '1.25rem';
            newQuestion.style.transition = 'all 0.3s ease';
            
            // Adicionar hover effect
            newQuestion.addEventListener('mouseenter', function() {
                if (!item.classList.contains('active')) {
                    this.style.backgroundColor = 'rgba(26, 34, 56, 0.05)';
                }
            });
            
            newQuestion.addEventListener('mouseleave', function() {
                if (!item.classList.contains('active')) {
                    this.style.backgroundColor = 'transparent';
                }
            });
            
            // Evento principal de clique
            newQuestion.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                console.log(`FAQ item ${index + 1} clicado`);
                
                const isActive = item.classList.contains('active');
                
                // Fechar todos os outros itens
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        closeFaqItem(otherItem);
                    }
                });
                
                // Toggle do item atual
                if (isActive) {
                    closeFaqItem(item);
                } else {
                    openFaqItem(item);
                }
            });
            
            // Suporte para teclado
            newQuestion.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
            
            // Tornar acessível
            newQuestion.setAttribute('tabindex', '0');
            newQuestion.setAttribute('role', 'button');
            newQuestion.setAttribute('aria-expanded', 'false');
        });
        
        // Inicializar com primeiro item aberto
        setTimeout(() => {
            if (faqItems.length > 0) {
                console.log('Abrindo primeiro item por padrão');
                openFaqItem(faqItems[0]);
            }
        }, 100);
        
        console.log('FAQ inicializado com sucesso!');
    }
    
    // Executar quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFAQ);
    } else {
        initFAQ();
    }
    
    // Backup: executar após um delay para garantir
    setTimeout(initFAQ, 500);
    
})();

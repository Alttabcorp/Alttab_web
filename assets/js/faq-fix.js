/**
 * Alt tab Corp - Correção do FAQ
 * Script para corrigir o comportamento do FAQ na tela inicial
 */

document.addEventListener('DOMContentLoaded', function() {
    // Selecionar todos os itens do FAQ
    const faqItems = document.querySelectorAll('.faq-item');
    
    // Adicionar evento de clique a cada pergunta
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Verificar se este item já está ativo
                const isActive = item.classList.contains('active');
                
                // Fechar todos os itens ativos
                faqItems.forEach(faqItem => {
                    faqItem.classList.remove('active');
                    
                    // Resetar o ícone para o estado inicial (plus)
                    const icon = faqItem.querySelector('.faq-icon i');
                    if (icon) {
                        icon.className = 'fas fa-plus';
                    }
                });
                
                // Se o item clicado não estava ativo, ativá-lo
                if (!isActive) {
                    item.classList.add('active');
                    
                    // Mudar o ícone para minus
                    const icon = item.querySelector('.faq-icon i');
                    if (icon) {
                        icon.className = 'fas fa-minus';
                    }
                }
            });
        }
    });
    
    // Abrir o primeiro item do FAQ por padrão
    if (faqItems.length > 0) {
        const firstItem = faqItems[0];
        firstItem.classList.add('active');
        
        const icon = firstItem.querySelector('.faq-icon i');
        if (icon) {
            icon.className = 'fas fa-minus';
        }
    }
}); 
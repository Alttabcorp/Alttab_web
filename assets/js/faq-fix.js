/**
 * Alt tab Corp - Correção do FAQ
 * Script para corrigir o comportamento do FAQ na tela inicial
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log("Inicializando script do FAQ...");

    // Selecionar todos os itens do FAQ
    const faqItems = document.querySelectorAll('.faq-item');
    console.log(`Encontrados ${faqItems.length} itens de FAQ`);
    
    // Verificar se temos itens do FAQ
    if (faqItems.length === 0) {
        console.error("Nenhum item de FAQ encontrado na página!");
        return;
    }

    // Função para configurar o estado de um item do FAQ
    function setFaqItemState(item, isActive) {
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon i');
        
        if (isActive) {
            item.classList.add('active');
            if (icon) icon.className = 'fas fa-minus';
            // Forçar a exibição da resposta
            if (answer) {
                answer.style.maxHeight = '500px';
                answer.style.opacity = '1';
                answer.style.visibility = 'visible';
                answer.style.padding = '1.5rem';
            }
        } else {
            item.classList.remove('active');
            if (icon) icon.className = 'fas fa-plus';
            // Esconder a resposta
            if (answer) {
                answer.style.maxHeight = '0';
                answer.style.opacity = '0';
                answer.style.visibility = 'hidden';
                answer.style.padding = '0 1.5rem';
            }
        }
    }
    
    // Adicionar evento de clique a cada pergunta
    faqItems.forEach((item, index) => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function(e) {
                e.preventDefault();
                console.log(`FAQ item ${index + 1} clicado`);
                
                // Verificar se este item já está ativo
                const isActive = item.classList.contains('active');
                
                // Fechar todos os itens ativos
                faqItems.forEach(faqItem => {
                    setFaqItemState(faqItem, false);
                });
                
                // Se o item clicado não estava ativo, ativá-lo
                if (!isActive) {
                    setFaqItemState(item, true);
                    console.log(`FAQ item ${index + 1} ativado`);
                }
            });
        }
    });
    
    // Abrir o primeiro item do FAQ por padrão
    console.log("Ativando o primeiro item do FAQ por padrão");
    setFaqItemState(faqItems[0], true);
    
    // Verificar o estado do FAQ após um curto atraso
    setTimeout(() => {
        const activeItems = document.querySelectorAll('.faq-item.active');
        console.log(`Itens ativos após inicialização: ${activeItems.length}`);
        
        if (activeItems.length === 0) {
            console.log("Nenhum item ativo, forçando ativação do primeiro item");
            setFaqItemState(faqItems[0], true);
        }
    }, 500);
}); 
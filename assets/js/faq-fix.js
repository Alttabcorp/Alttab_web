/**
 * Alt tab Corp - FAQ Script
 * Script universal para FAQs em todas as páginas do site
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log("Inicializando script do FAQ...");

    // Selecionar todos os itens do FAQ
    const faqItems = document.querySelectorAll('.faq-item');
    console.log(`Encontrados ${faqItems.length} itens de FAQ`);
    
    if (faqItems.length === 0) {
        console.error("Nenhum item de FAQ encontrado na página!");
        return;
    }

    // Função para abrir um item de FAQ
    function openFaqItem(item) {
        // Obtém a resposta e o ícone
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon i');

        // Adiciona a classe active
        item.classList.add('active');

        // Aplica estilos diretos para garantir que a resposta seja visível
        if (answer) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
            answer.style.opacity = '1';
            answer.style.visibility = 'visible';
            answer.style.padding = '1.5rem';
            answer.style.display = 'block';
        }

        // Muda o ícone
        if (icon) {
            icon.className = icon.className.replace('fa-plus', 'fa-minus');
            icon.className = icon.className.replace('fa-chevron-down', 'fa-chevron-up');
        }
    }

    // Função para fechar um item de FAQ
    function closeFaqItem(item) {
        // Obtém a resposta e o ícone
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon i');

        // Remove a classe active
        item.classList.remove('active');

        // Aplica estilos diretos para esconder a resposta
        if (answer) {
            answer.style.maxHeight = '0';
            answer.style.opacity = '0';
            answer.style.visibility = 'hidden';
            answer.style.padding = '0 1.5rem';
        }

        // Muda o ícone de volta
        if (icon) {
            icon.className = icon.className.replace('fa-minus', 'fa-plus');
            icon.className = icon.className.replace('fa-chevron-up', 'fa-chevron-down');
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
                    closeFaqItem(faqItem);
                });
                
                // Se o item clicado não estava ativo, ativá-lo
                if (!isActive) {
                    openFaqItem(item);
                    console.log(`FAQ item ${index + 1} ativado`);
                }
            });
        }
    });
    
    // Abrir o primeiro item do FAQ por padrão (com atraso para garantir que o DOM está pronto)
    setTimeout(() => {
        console.log("Ativando o primeiro item do FAQ por padrão");
        if (faqItems.length > 0) {
            openFaqItem(faqItems[0]);
        }
    }, 500);

    // Aplicar correções de estilo diretamente aos elementos do FAQ
    const faqAnswers = document.querySelectorAll('.faq-answer');
    faqAnswers.forEach(answer => {
        // Estilos base para todas as respostas
        answer.style.transition = 'all 0.3s ease-out';
        answer.style.overflow = 'hidden';
    });

    // Verificar novamente o estado do FAQ após um curto atraso
    setTimeout(() => {
        const activeItems = document.querySelectorAll('.faq-item.active');
        console.log(`Itens ativos após inicialização: ${activeItems.length}`);
        
        if (activeItems.length === 0 && faqItems.length > 0) {
            console.log("Nenhum item ativo, forçando ativação do primeiro item");
            openFaqItem(faqItems[0]);
        }
        
        // Certifique-se de que os itens ativos estão realmente exibidos
        activeItems.forEach(item => {
            const answer = item.querySelector('.faq-answer');
            if (answer) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.opacity = '1';
                answer.style.visibility = 'visible';
                answer.style.padding = '1.5rem';
                answer.style.display = 'block';
            }
        });
    }, 1000);
}); 
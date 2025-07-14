/**
 * FAQ Debug Script - Para testar o funcionamento do FAQ
 */

document.addEventListener('DOMContentLoaded', function() {
    
    setTimeout(() => {
        // Verificar se existem seções FAQ
        const faqSections = document.querySelectorAll('.faq-section, .faq');
        
        faqSections.forEach((section, index) => {
            
            const faqItems = section.querySelectorAll('.faq-item');
            
            faqItems.forEach((item, itemIndex) => {
                const question = item.querySelector('.faq-question');
                const answer = item.querySelector('.faq-answer');
                
               
                
                if (question) {
                    // Testar clique
                    question.style.border = '2px solid red';
                    question.style.cursor = 'pointer';
                    
                    question.addEventListener('click', function() {
                        
                        // Toggle manual
                        const isActive = item.classList.contains('active');
                        
                        // Fechar todos
                        faqItems.forEach(otherItem => {
                            otherItem.classList.remove('active');
                            const otherAnswer = otherItem.querySelector('.faq-answer');
                            if (otherAnswer) {
                                otherAnswer.style.maxHeight = '0px';
                            }
                        });
                        
                        // Abrir atual se não estava ativo
                        if (!isActive) {
                            item.classList.add('active');
                            if (answer) {
                                answer.style.maxHeight = answer.scrollHeight + 'px';
                            }
                        } else {
                        }
                    });
                }
            });
        });
    }, 500);
});

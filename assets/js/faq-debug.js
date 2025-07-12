/**
 * FAQ Debug Script - Para testar o funcionamento do FAQ
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('=== FAQ DEBUG INICIADO ===');
    
    setTimeout(() => {
        // Verificar se existem seções FAQ
        const faqSections = document.querySelectorAll('.faq-section, .faq');
        console.log('Seções FAQ encontradas:', faqSections.length);
        
        faqSections.forEach((section, index) => {
            console.log(`Seção ${index + 1}:`, section);
            
            const faqItems = section.querySelectorAll('.faq-item');
            console.log(`  - Items FAQ: ${faqItems.length}`);
            
            faqItems.forEach((item, itemIndex) => {
                const question = item.querySelector('.faq-question');
                const answer = item.querySelector('.faq-answer');
                
                console.log(`  - Item ${itemIndex + 1}:`);
                console.log(`    Question:`, question);
                console.log(`    Answer:`, answer);
                
                if (question) {
                    // Testar clique
                    question.style.border = '2px solid red';
                    question.style.cursor = 'pointer';
                    
                    question.addEventListener('click', function() {
                        console.log(`CLIQUE DETECTADO em: Seção ${index + 1}, Item ${itemIndex + 1}`);
                        
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
                            console.log('FAQ ABERTO');
                        } else {
                            console.log('FAQ FECHADO');
                        }
                    });
                }
            });
        });
    }, 500);
});

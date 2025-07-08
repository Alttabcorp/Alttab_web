/**
 * Floating Contact Button
 * Script específico para o botão flutuante de contato
 */

(function() {
    // Função para inicializar o botão flutuante
    function initFloatingContact() {
        console.log('Inicializando botão flutuante de contato...');
        
        const floatingContactBtn = document.querySelector('.floating-contact-btn');
        const floatingContactMenu = document.querySelector('.floating-contact-menu');
        const floatingContactClose = document.querySelector('.floating-contact-close');
        
        if (!floatingContactBtn || !floatingContactMenu) {
            console.error('Elementos do botão flutuante não encontrados!');
            return;
        }
        
        // Garantir que o botão esteja visível
        floatingContactBtn.style.visibility = 'visible';
        floatingContactBtn.style.opacity = '1';
        
        // Adicionar classe de pulsação imediatamente
        floatingContactBtn.classList.add('pulse');
        console.log('Classe pulse adicionada ao botão flutuante');
        
        // Adicionar evento de clique ao botão
        floatingContactBtn.addEventListener('click', function() {
            console.log('Botão flutuante clicado');
            floatingContactMenu.classList.toggle('active');
            floatingContactBtn.classList.toggle('active');
            
            // Remover classe de pulsação quando o menu estiver aberto
            if (floatingContactMenu.classList.contains('active')) {
                floatingContactBtn.classList.remove('pulse');
            } else {
                // Adicionar classe de pulsação quando o menu estiver fechado
                setTimeout(() => {
                    floatingContactBtn.classList.add('pulse');
                }, 2000);
            }
        });
        
        // Fechar o menu ao clicar no botão de fechar
        if (floatingContactClose) {
            floatingContactClose.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                floatingContactMenu.classList.remove('active');
                floatingContactBtn.classList.remove('active');
                
                // Adicionar classe de pulsação após fechar
                setTimeout(() => {
                    floatingContactBtn.classList.add('pulse');
                }, 2000);
            });
        }
    }

    // Executar quando o DOM estiver completamente carregado
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(initFloatingContact, 500);
        });
    } else {
        // Se o DOM já estiver carregado
        setTimeout(initFloatingContact, 500);
    }
    
    // Garantir que a inicialização também ocorra após o carregamento completo da página
    window.addEventListener('load', function() {
        setTimeout(initFloatingContact, 1000);
        
        // Verificação adicional após 3 segundos para garantir que a animação esteja aplicada
        setTimeout(function() {
            const floatingContactBtn = document.querySelector('.floating-contact-btn');
            if (floatingContactBtn && !floatingContactBtn.classList.contains('pulse')) {
                console.log('Aplicando classe pulse novamente após 3 segundos');
                floatingContactBtn.classList.add('pulse');
            }
        }, 3000);
    });
})(); 
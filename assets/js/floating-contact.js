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
        const floatingContactOptions = document.querySelectorAll('.floating-contact-option');
        
        if (!floatingContactBtn || !floatingContactMenu) {
            console.error('Elementos do botão flutuante não encontrados!');
            return;
        }
        
        // Garantir que o botão esteja visível
        floatingContactBtn.style.visibility = 'visible';
        floatingContactBtn.style.opacity = '1';
        
        // Adicionar classe de pulsação com um pequeno atraso para chamar atenção
        setTimeout(() => {
            floatingContactBtn.classList.add('pulse');
            console.log('Classe pulse adicionada ao botão flutuante');
        }, 2000);
        
        // Adicionar evento de clique ao botão
        floatingContactBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Botão flutuante clicado');
            
            // Adicionar efeito de ripple ao clicar
            const ripple = document.createElement('span');
            ripple.classList.add('floating-contact-ripple');
            this.appendChild(ripple);
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${size}px`;
            
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Alternar estado do menu
            floatingContactMenu.classList.toggle('active');
            floatingContactBtn.classList.toggle('active');
            
            // Gerenciar acessibilidade
            const expanded = floatingContactBtn.getAttribute('aria-expanded') === 'true' || false;
            floatingContactBtn.setAttribute('aria-expanded', !expanded);
            
            // Remover classe de pulsação quando o menu estiver aberto
            if (floatingContactMenu.classList.contains('active')) {
                floatingContactBtn.classList.remove('pulse');
                
                // Animar os itens do menu sequencialmente
                floatingContactOptions.forEach((option, index) => {
                    option.style.transitionDelay = `${index * 0.1}s`;
                    option.classList.add('animate-in');
                });
            } else {
                // Adicionar classe de pulsação quando o menu estiver fechado
                setTimeout(() => {
                    floatingContactBtn.classList.add('pulse');
                }, 2000);
                
                // Resetar animações dos itens
                floatingContactOptions.forEach(option => {
                    option.style.transitionDelay = '0s';
                    option.classList.remove('animate-in');
                });
            }
        });
        
        // Adicionar eventos para os itens do menu
        floatingContactOptions.forEach(option => {
            option.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.floating-contact-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.1)';
                }
            });
            
            option.addEventListener('mouseleave', function() {
                const icon = this.querySelector('.floating-contact-icon');
                if (icon) {
                    icon.style.transform = 'scale(1)';
                }
            });
            
            option.addEventListener('click', function() {
                // Adicionar efeito de clique
                this.style.opacity = '0.8';
                setTimeout(() => {
                    this.style.opacity = '1';
                }, 200);
            });
        });
        
        // Fechar o menu ao clicar no botão de fechar
        if (floatingContactClose) {
            floatingContactClose.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                floatingContactMenu.classList.remove('active');
                floatingContactBtn.classList.remove('active');
                floatingContactBtn.setAttribute('aria-expanded', 'false');
                
                // Resetar animações dos itens
                floatingContactOptions.forEach(option => {
                    option.style.transitionDelay = '0s';
                    option.classList.remove('animate-in');
                });
                
                // Adicionar classe de pulsação após fechar
                setTimeout(() => {
                    floatingContactBtn.classList.add('pulse');
                }, 2000);
            });
        }
        
        // Fechar o menu ao clicar fora dele
        document.addEventListener('click', function(e) {
            if (floatingContactMenu.classList.contains('active') && 
                !floatingContactMenu.contains(e.target) && 
                e.target !== floatingContactBtn && 
                !floatingContactBtn.contains(e.target)) {
                
                floatingContactMenu.classList.remove('active');
                floatingContactBtn.classList.remove('active');
                floatingContactBtn.setAttribute('aria-expanded', 'false');
                
                // Resetar animações dos itens
                floatingContactOptions.forEach(option => {
                    option.style.transitionDelay = '0s';
                    option.classList.remove('animate-in');
                });
                
                // Adicionar classe de pulsação após fechar
                setTimeout(() => {
                    floatingContactBtn.classList.add('pulse');
                }, 2000);
            }
        });
        
        // Adicionar atributos de acessibilidade
        floatingContactBtn.setAttribute('aria-expanded', 'false');
        floatingContactBtn.setAttribute('aria-controls', 'floatingContactMenu');
        floatingContactMenu.setAttribute('role', 'dialog');
        floatingContactMenu.setAttribute('aria-label', 'Opções de contato');
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
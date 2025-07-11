/**
 * Floating Contact Button
 * Script específico para o botão flutuante de contato
 */

(function() {
    // Variáveis para controle do estado global
    let isMenuOpen = false;
    let isInitialized = false;
    
    // Função para inicializar o botão flutuante
    function initFloatingContact() {
        console.log('Inicializando botão flutuante de contato...');
        
        // Se já foi inicializado, limpa os eventos anteriores
        if (isInitialized) {
            cleanupFloatingContact();
        }
        
        const floatingContactBtn = document.querySelector('.floating-contact-btn');
        const floatingContactMenu = document.querySelector('.floating-contact-menu');
        const floatingContactClose = document.querySelector('.floating-contact-close');
        const floatingContactOptions = document.querySelectorAll('.floating-contact-option');
        
        if (!floatingContactBtn || !floatingContactMenu) {
            console.error('Elementos do botão flutuante não encontrados!');
            return;
        }
        
        // Marcar como inicializado
        isInitialized = true;
        
        // Garantir que o botão esteja visível
        floatingContactBtn.style.visibility = 'visible';
        floatingContactBtn.style.opacity = '1';
        
        // Verificar se é dispositivo móvel
        const isMobile = window.innerWidth <= 576;
        
        // Adicionar classe de pulsação com um pequeno atraso para chamar atenção
        setTimeout(() => {
            floatingContactBtn.classList.add('pulse');
            console.log('Classe pulse adicionada ao botão flutuante');
        }, 2000);
        
        // Função para ajustar o menu com base no tamanho da tela
        function adjustMenuPosition() {
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            const backToTopBtn = document.querySelector('.back-to-top');
            const contactButton = document.querySelector('.floating-contact');
            
            // Ajustar posição do botão com base na resolução
            if (contactButton) {
                if (windowWidth <= 380) {
                    // Telas muito pequenas
                    contactButton.style.bottom = '90px';
                    contactButton.style.right = '15px';
                } else if (windowWidth <= 480) {
                    // Telas pequenas
                    contactButton.style.bottom = '95px';
                    contactButton.style.right = '20px';
                } else if (windowWidth <= 576) {
                    // Telas médias/pequenas
                    contactButton.style.bottom = '100px';
                    contactButton.style.right = '20px';
                } else {
                    // Telas maiores
                    contactButton.style.bottom = '120px';
                    contactButton.style.right = '25px';
                }
                
                // Ajuste adicional para telas com altura baixa
                if (windowHeight <= 600) {
                    contactButton.style.bottom = '85px';
                }
            }
            
            if (floatingContactMenu) {
                if (windowWidth <= 380) {
                    // Configurações para telas muito pequenas
                    floatingContactMenu.style.width = 'calc(100vw - 30px)';
                    floatingContactMenu.style.right = '0';
                    floatingContactMenu.style.maxHeight = '45vh';
                } else if (windowWidth <= 576) {
                    // Configurações para telas pequenas
                    floatingContactMenu.style.width = 'calc(100vw - 40px)';
                    floatingContactMenu.style.right = '0';
                    floatingContactMenu.style.maxHeight = '50vh';
                } else {
                    // Configurações para desktop
                    floatingContactMenu.style.width = '320px';
                    floatingContactMenu.style.right = '0';
                    floatingContactMenu.style.maxHeight = '80vh';
                }
                
                // Ajuste adicional para telas com altura baixa
                if (windowHeight <= 600) {
                    floatingContactMenu.style.maxHeight = '40vh';
                }
            }
            
            // Garantir que cada opção de contato tenha espaço adequado
            const contactOptions = document.querySelectorAll('.floating-contact-option');
            contactOptions.forEach(option => {
                // Verificar se o texto está sobrepondo
                const info = option.querySelector('.floating-contact-info');
                const icon = option.querySelector('.floating-contact-icon');
                
                if (info && icon) {
                    // Ajustar largura máxima baseado no espaço disponível
                    const iconWidth = icon.offsetWidth + parseInt(getComputedStyle(icon).marginRight);
                    const containerWidth = option.offsetWidth;
                    const availableWidth = containerWidth - iconWidth - 8; // 8px de segurança
                    
                    if (availableWidth > 0) {
                        info.style.maxWidth = `${availableWidth}px`;
                        
                        // Em telas pequenas, garantir que os textos não sobreponham
                        const label = option.querySelector('.floating-contact-label');
                        const value = option.querySelector('.floating-contact-value');
                        const desc = option.querySelector('.floating-contact-desc');
                        
                        if (label && windowWidth <= 576) {
                            label.style.maxWidth = `${availableWidth}px`;
                        }
                        
                        if (value && windowWidth <= 576) {
                            value.style.maxWidth = `${availableWidth}px`;
                        }
                        
                        if (desc && windowWidth <= 576) {
                            desc.style.maxWidth = `${availableWidth}px`;
                        }
                    }
                }
            });
        }
        
        // Ajustar posicionamento inicial
        adjustMenuPosition();
        
        // Chamar também com um pequeno atraso para garantir que os elementos estejam completamente renderizados
        setTimeout(adjustMenuPosition, 300);
        
        // Ouvir por mudanças de tamanho da tela
        window.addEventListener('resize', adjustMenuPosition);
        
        // Função para abrir o menu
        function openMenu() {
            isMenuOpen = true;
            floatingContactMenu.classList.add('active');
            floatingContactBtn.classList.add('active');
            floatingContactBtn.setAttribute('aria-expanded', 'true');
            floatingContactBtn.classList.remove('pulse');
            
            // Animar os itens do menu sequencialmente
            floatingContactOptions.forEach((option, index) => {
                option.style.transitionDelay = `${index * 0.1}s`;
                option.classList.add('animate-in');
            });
        }
        
        // Função para fechar o menu
        function closeMenu() {
            isMenuOpen = false;
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
        
        // Adicionar evento de clique ao botão
        function handleButtonClick(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Botão flutuante clicado');
            
            // Adicionar efeito de ripple ao clicar
            const ripple = document.createElement('span');
            ripple.classList.add('floating-contact-ripple');
            floatingContactBtn.appendChild(ripple);
            
            const rect = floatingContactBtn.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${size}px`;
            
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Verificar posição novamente ao abrir o menu
            adjustMenuPosition();
            
            // Alternar estado do menu
            if (isMenuOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        }
        
        floatingContactBtn.addEventListener('click', handleButtonClick);
        
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
        function handleCloseClick(e) {
            e.preventDefault();
            e.stopPropagation();
            closeMenu();
        }
        
        if (floatingContactClose) {
            floatingContactClose.addEventListener('click', handleCloseClick);
        }
        
        // Fechar o menu ao clicar fora dele
        function handleDocumentClick(e) {
            if (isMenuOpen && 
                !floatingContactMenu.contains(e.target) && 
                e.target !== floatingContactBtn && 
                !floatingContactBtn.contains(e.target)) {
                closeMenu();
            }
        }
        
        document.addEventListener('click', handleDocumentClick);
        
        // Função para limpar eventos quando reinicializar
        function cleanupFloatingContact() {
            console.log('Limpando eventos do botão flutuante...');
            if (floatingContactBtn) {
                floatingContactBtn.removeEventListener('click', handleButtonClick);
            }
            
            if (floatingContactClose) {
                floatingContactClose.removeEventListener('click', handleCloseClick);
            }
            
            document.removeEventListener('click', handleDocumentClick);
        }
        
        // Armazenar função de limpeza para uso posterior
        window.cleanupFloatingContact = cleanupFloatingContact;
        
        // Resetar o menu ao carregar a página
        closeMenu();
    }
    
    // Verificar se o DOM está carregado
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFloatingContact);
    } else {
        initFloatingContact();
    }
    
    // Expor a função globalmente
    window.initFloatingContact = initFloatingContact;
})(); 
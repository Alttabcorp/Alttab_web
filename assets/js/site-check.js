/**
 * Alt tab Corp - Site Check
 * Verifica se todos os componentes do site estão funcionando corretamente
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🔍 Iniciando verificação do site...');
    
    // Verificar tema claro/escuro
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        console.log('✅ Toggle de tema encontrado');
        
        // Verificar se o tema está sendo aplicado corretamente
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        console.log(`ℹ️ Tema atual: ${currentTheme}`);
        
        // Forçar aplicação do tema
        document.documentElement.setAttribute('data-theme', currentTheme);
        console.log('✅ Tema aplicado');
    } else {
        console.warn('⚠️ Toggle de tema não encontrado');
    }
    
    // Verificar botão flutuante de contato
    const floatingContactBtn = document.querySelector('.floating-contact-btn');
    const floatingContactMenu = document.querySelector('.floating-contact-menu');
    
    if (floatingContactBtn && floatingContactMenu) {
        console.log('✅ Botão flutuante de contato encontrado');
        
        // Garantir que o botão seja visível
        floatingContactBtn.style.visibility = 'visible';
        floatingContactBtn.style.opacity = '1';
        
        // Adicionar evento de clique se não existir
        if (!floatingContactBtn.hasAttribute('data-initialized')) {
            floatingContactBtn.addEventListener('click', function() {
                floatingContactMenu.classList.toggle('active');
                floatingContactBtn.classList.toggle('active');
            });
            floatingContactBtn.setAttribute('data-initialized', 'true');
            console.log('✅ Evento de clique adicionado ao botão flutuante');
        }
    } else {
        console.warn('⚠️ Botão flutuante de contato não encontrado');
    }
    
    // Verificar banner de cookies
    const cookieBanner = document.getElementById('cookieBanner');
    if (cookieBanner) {
        console.log('✅ Banner de cookies encontrado');
        
        // Verificar se o usuário já aceitou os cookies
        const cookiesAccepted = localStorage.getItem('cookiesAccepted');
        if (!cookiesAccepted) {
            // Garantir que o banner seja visível
            setTimeout(function() {
                cookieBanner.classList.add('active');
                console.log('✅ Banner de cookies ativado');
            }, 1000);
        } else {
            console.log('ℹ️ Cookies já aceitos pelo usuário');
        }
    } else {
        console.warn('⚠️ Banner de cookies não encontrado');
    }
    
    // Verificar FAQ
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        console.log(`✅ ${faqItems.length} itens de FAQ encontrados`);
        
        // Garantir que o primeiro item esteja aberto
        if (!document.querySelector('.faq-item.active')) {
            faqItems[0].classList.add('active');
            const icon = faqItems[0].querySelector('.faq-icon i');
            if (icon) {
                icon.className = 'fas fa-minus';
            }
            console.log('✅ Primeiro item do FAQ aberto');
        }
    } else {
        console.log('ℹ️ Nenhum item de FAQ encontrado na página atual');
    }
    
    // Verificar dropdown de e-sports
    const esportsDropdown = document.querySelector('.nav-dropdown a[href="../esports/"]');
    if (esportsDropdown) {
        console.log('✅ Dropdown de e-sports encontrado');
        
        // Garantir que o dropdown funcione corretamente
        const parentDropdown = esportsDropdown.closest('.nav-dropdown');
        if (parentDropdown) {
            // Garantir que o evento de clique esteja funcionando
            if (!parentDropdown.hasAttribute('data-initialized')) {
                const dropdownMenu = parentDropdown.querySelector('.dropdown-menu');
                if (dropdownMenu) {
                    console.log('✅ Menu dropdown de e-sports encontrado');
                }
                parentDropdown.setAttribute('data-initialized', 'true');
            }
        }
    } else {
        console.log('ℹ️ Dropdown de e-sports não encontrado na página atual');
    }
    
    console.log('✅ Verificação do site concluída');
}); 
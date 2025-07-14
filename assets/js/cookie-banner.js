/**
 * Alt tab Corp - Cookie Banner
 * Gerencia o banner de consentimento de cookies
 */

document.addEventListener('DOMContentLoaded', function() {
    // Verificar se o usuário já aceitou os cookies
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    
    // Se não aceitou, mostrar o banner após 1 segundo
    if (!cookiesAccepted) {
        setTimeout(function() {
            const cookieBanner = document.getElementById('cookieBanner');
            if (cookieBanner) {
                cookieBanner.classList.add('active');
            } else {
                console.error('Banner de cookies não encontrado');
            }
        }, 1000);
    }
    
    // Botão de aceitar cookies
    const acceptCookiesBtn = document.getElementById('acceptCookies');
    if (acceptCookiesBtn) {
        acceptCookiesBtn.addEventListener('click', function() {
            // Salvar a preferência do usuário
            localStorage.setItem('cookiesAccepted', 'true');
            
            // Esconder o banner
            const cookieBanner = document.getElementById('cookieBanner');
            if (cookieBanner) {
                cookieBanner.classList.remove('active');
            }
        });
    }
    
    // Botão de configurações de cookies
    const cookieSettingsBtn = document.getElementById('cookieSettings');
    if (cookieSettingsBtn) {
        cookieSettingsBtn.addEventListener('click', function() {
            // Redirecionar para a página de política de cookies
            window.location.href = '/pages/cookies/';
        });
    }
    
    // Forçar exibição do banner para testes
    window.showCookieBanner = function() {
        const cookieBanner = document.getElementById('cookieBanner');
        if (cookieBanner) {
            cookieBanner.classList.add('active');
        }
    };
    
    // Forçar ocultação do banner para testes
    window.hideCookieBanner = function() {
        const cookieBanner = document.getElementById('cookieBanner');
        if (cookieBanner) {
            cookieBanner.classList.remove('active');
        }
    };
}); 
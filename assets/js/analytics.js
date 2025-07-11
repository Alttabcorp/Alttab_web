// Google Analytics - Alt tab Corp
// Configuração do Google Analytics 4 

// Google Analytics 4
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-XTXHKDRDTJ', {
    'page_title': document.title,
    'page_location': window.location.href,
    'page_path': window.location.pathname,
    'cookie_domain': 'alttabcorp.com.br',
    'custom_map': {
        'dimension1': 'user_type',
        'dimension2': 'service_interest',
        'dimension3': 'device_type',
        'dimension4': 'page_section'
    }
});

// Detecção do tipo de dispositivo para dimensão personalizada
const deviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return "tablet";
    } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return "mobile";
    }
    return "desktop";
};

gtag('set', {'dimension3': deviceType()});

// Eventos personalizados
document.addEventListener('DOMContentLoaded', function() {
    // Rastrear cliques em botões de contato
    const contactButtons = document.querySelectorAll('a[href*="contato"], a[href*="mailto:"], a[href*="tel:"]');
    contactButtons.forEach(button => {
        button.addEventListener('click', function() {
            gtag('event', 'contact_click', {
                'event_category': 'engagement',
                'event_label': this.href,
                'value': 1
            });
        });
    });
    
    // Rastrear cliques em serviços
    const serviceLinks = document.querySelectorAll('a[href*="servicos"], a[href*="web"], a[href*="consultoria"], a[href*="impressao3d"], a[href*="esports"]');
    serviceLinks.forEach(link => {
        link.addEventListener('click', function() {
            gtag('event', 'service_click', {
                'event_category': 'engagement',
                'event_label': this.href,
                'value': 1
            });
        });
    });
    
    // Rastrear scroll da página
    let scrollDepth = 0;
    window.addEventListener('scroll', function() {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        if (scrollPercent > scrollDepth && scrollPercent % 25 === 0) {
            scrollDepth = scrollPercent;
            gtag('event', 'scroll_depth', {
                'event_category': 'engagement',
                'event_label': scrollPercent + '%',
                'value': scrollPercent
            });
        }
    });
    
    // Rastrear tempo na página
    setTimeout(function() {
        gtag('event', 'time_on_page', {
            'event_category': 'engagement',
            'event_label': '30_seconds',
            'value': 30
        });
    }, 30000);
});

// Rastrear formulários
document.addEventListener('submit', function(e) {
    if (e.target.tagName === 'FORM') {
        gtag('event', 'form_submit', {
            'event_category': 'engagement',
            'event_label': e.target.action || 'contact_form',
            'value': 1
        });
    }
});

console.log('📊 Google Analytics configurado'); 
(function() {
    // Detecta o ambiente (GitHub Pages ou local)
    const isGitHubPages = window.location.hostname.includes('github.io');
    
    // Define o base path
    let base = '/';
    if (isGitHubPages) {
        // Para GitHub Pages: https://alttabcorp.github.io/Alttab_web/
        base = '/Alttab_web/';
    }

    // Função para ajustar caminhos
    function adjustPaths(selector, attr) {
        const elements = document.querySelectorAll(selector);
        if (!elements) return;

        elements.forEach(el => {
            if (el.hasAttribute(attr)) {
                let value = el.getAttribute(attr);
                
                // Ignora URLs absolutas e protocolos
                if (/^https?:\/\//.test(value) || value.startsWith('//')) {
                    return;
                }

                // Se o valor começa com /, adiciona o base
                if (value.startsWith('/')) {
                    // Remove a barra inicial
                    value = value.substring(1);
                    // Adiciona o base
                    el.setAttribute(attr, base + value);
                    return;
                }

                // Para caminhos relativos
                value = value.replace(/^\.\.?\//, '');
                el.setAttribute(attr, base + value);
            }
        });
    }

    // Função para ajustar caminhos após carregamento dinâmico
    function adjustDynamicPaths() {
        adjustPaths('img', 'src');
        adjustPaths('a', 'href');
        adjustPaths('link[rel="stylesheet"]', 'href');
        adjustPaths('script', 'src');
    }

    // Função para inicializar
    function initialize() {
        // Ajusta caminhos iniciais
        adjustDynamicPaths();

        // Observa mudanças no DOM para ajustar novos elementos
        if (document.body) {
            const observer = new MutationObserver(function(mutations) {
                adjustDynamicPaths();
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
    }

    // Aguarda o DOM estar pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }

    // Exponha o base e as funções para uso em outros scripts
    window.siteBasePath = base;
    window.adjustPaths = adjustDynamicPaths;

    // Log para debug
    console.log('Base path:', base);
    console.log('Is GitHub Pages:', isGitHubPages);
})();
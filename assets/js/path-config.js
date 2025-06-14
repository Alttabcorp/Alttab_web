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

                // Se o valor já contém o base path, não ajusta
                if (value.startsWith(base)) {
                    return;
                }

                // Se o valor começa com /, remove a barra inicial
                if (value.startsWith('/')) {
                    value = value.substring(1);
                }

                // Remove ./ ou ../ do início
                value = value.replace(/^\.\.?\//, '');

                // Adiciona o base apenas se não estiver vazio
                if (value) {
                    el.setAttribute(attr, base + value);
                }
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
    console.log('Current path:', window.location.pathname);
})();
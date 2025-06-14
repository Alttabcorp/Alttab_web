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
        document.querySelectorAll(selector).forEach(el => {
            if (el.hasAttribute(attr)) {
                let value = el.getAttribute(attr);
                
                // Ignora URLs absolutas e protocolos
                if (/^https?:\/\//.test(value) || value.startsWith('//')) {
                    return;
                }

                // Se o valor começa com /, adiciona o base
                if (value.startsWith('/')) {
                    el.setAttribute(attr, base + value.substring(1));
                    return;
                }

                // Para caminhos relativos, calcula o caminho correto
                const currentPath = window.location.pathname;
                const currentDir = currentPath.substring(0, currentPath.lastIndexOf('/') + 1);
                const relativeBase = isGitHubPages ? '/Alttab_web' : '';
                
                // Remove ./ ou ../ do início
                value = value.replace(/^\.\.?\//, '');
                
                // Adiciona o base correto
                el.setAttribute(attr, relativeBase + currentDir + value);
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

    // Ajusta caminhos iniciais
    adjustDynamicPaths();

    // Observa mudanças no DOM para ajustar novos elementos
    const observer = new MutationObserver(function(mutations) {
        adjustDynamicPaths();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Exponha o base e as funções para uso em outros scripts
    window.siteBasePath = base;
    window.adjustPaths = adjustDynamicPaths;

    // Log para debug
    console.log('Base path:', base);
    console.log('Is GitHub Pages:', isGitHubPages);
    console.log('Current path:', window.location.pathname);
})();
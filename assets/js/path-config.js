(function() {
    // Detecta o caminho base do site (ex: /Alttab_web/ ou /)
    const pathParts = window.location.pathname.split('/').filter(part => part !== '');
    let base = '/';
    
    // Verifica se está rodando no GitHub Pages (incluindo subdomínios personalizados)
    const isGitHubPages = window.location.hostname.endsWith('.github.io') || 
                          window.location.hostname === 'github.io';
    
    if (isGitHubPages && pathParts.length > 0 && pathParts[0] === 'Alttab_web') {
        base = '/' + pathParts[0] + '/';
    }

    // Função para ajustar src e href de elementos
    function adjustPaths(selector, attr) {
        document.querySelectorAll(selector).forEach(el => {
            if (el.hasAttribute(attr)) {
                let value = el.getAttribute(attr);
                if (!/^https?:\/\//.test(value) && !value.startsWith('//')) {
                    value = value.replace(/^\//, '');
                    el.setAttribute(attr, base + value);
                }
            }
        });
    }

    // Ajusta todas as imagens
    adjustPaths('img', 'src');
    // Ajusta todos os links
    adjustPaths('a', 'href');

    // Exponha o base e a função para uso em outros scripts
    window.siteBasePath = base;
    window.adjustPaths = adjustPaths;
})();

console.log(window.siteBasePath); // Exibe o caminho base atual
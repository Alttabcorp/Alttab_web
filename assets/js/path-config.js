// path-config.js
(function() {
    // Detecta o caminho base do site (ex: /Alttab_web/ ou /)
    const pathParts = window.location.pathname.split('/');
    let base = '/';
    if (window.location.hostname.includes('github.io') && pathParts[1]) {
        base = '/' + pathParts[1] + '/';
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

    // Exponha o base para uso em outros scripts se quiser
    window.siteBasePath = base;
})(); 
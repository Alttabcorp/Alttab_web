// Configuração de caminhos baseada no ambiente
const BASE_PATH = {
    getPath: function() {
        // Verifica se está rodando no GitHub Pages
        if (window.location.hostname === 'alttabcorp.github.io') {
            return '/Alttab_web';
        }
        // Local
        return '';
    }
};

// Função para ajustar links
function adjustLinks() {
    const basePath = BASE_PATH.getPath();
    document.querySelectorAll('a[href^="/Alttab_web/"]').forEach(link => {
        link.href = link.href.replace('/Alttab_web/', basePath + '/');
    });
}

// Executa quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', adjustLinks); 
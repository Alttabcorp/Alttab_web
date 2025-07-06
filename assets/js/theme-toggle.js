/**
 * Alt tab Corp - Theme Toggle
 * Gerencia a alternância entre tema claro e escuro
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elementos
    const themeToggle = document.getElementById('themeToggle');
    
    // Verificar preferência do usuário ou configuração salva
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme');
    
    // Aplicar tema inicial
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
    
    // Adicionar evento de clique ao botão de alternância
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            // Alternar tema
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Atualizar atributo e salvar preferência
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
}); 
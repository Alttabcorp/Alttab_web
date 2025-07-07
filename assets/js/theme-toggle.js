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
    
    // Função para aplicar tema
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        console.log('Tema aplicado:', theme);
        
        // Atualizar visual do toggle
        if (themeToggle) {
            if (theme === 'dark') {
                themeToggle.classList.add('active');
            } else {
                themeToggle.classList.remove('active');
            }
        }
        
        // Salvar preferência
        localStorage.setItem('theme', theme);
    }
    
    // Aplicar tema inicial
    if (savedTheme) {
        // Se o usuário já escolheu um tema anteriormente
        applyTheme(savedTheme);
    } else if (prefersDarkScheme.matches) {
        // Se o sistema operacional está em modo escuro
        applyTheme('dark');
    } else {
        // Padrão: tema claro
        applyTheme('light');
    }
    
    // Adicionar evento de clique ao toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            // Alternar entre temas
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            applyTheme(newTheme);
        });
    }
    
    // Ouvir mudanças na preferência do sistema
    prefersDarkScheme.addEventListener('change', function(e) {
        if (!localStorage.getItem('theme')) {
            // Só aplicar automaticamente se o usuário não tiver escolhido manualmente
            const newTheme = e.matches ? 'dark' : 'light';
            applyTheme(newTheme);
        }
    });
}); 
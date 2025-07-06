/**
 * Script principal do site
 * Contém apenas a funcionalidade do menu mobile
 */

document.addEventListener('DOMContentLoaded', function() {
    // Menu Mobile
    const menuToggle = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.querySelector('.header');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Fechar menu ao clicar em um link
    if (navMenu) {
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function(e) {
                // Não fechar o menu se for um dropdown
                const isDropdownToggle = link.parentNode.classList.contains('nav-dropdown');
                if (isDropdownToggle && window.innerWidth <= 768) {
                    e.preventDefault();
                    const dropdown = link.parentNode;
                    dropdown.classList.toggle('open');
                } else {
                    // Para links normais, fechar o menu
                    navMenu.classList.remove('active');
                    if (menuToggle) {
                        menuToggle.classList.remove('active');
                    }
                }
            });
        });
    }

    // Dropdown Serviços no mobile - melhorado para todos os dropdowns
    const navDropdowns = document.querySelectorAll('.nav-dropdown');
    if (navDropdowns.length > 0) {
        navDropdowns.forEach(dropdown => {
            const dropdownLink = dropdown.querySelector('a');
            if (dropdownLink) {
                dropdownLink.addEventListener('click', function(e) {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        dropdown.classList.toggle('open');
                    }
                });
            }
        });
    }
});
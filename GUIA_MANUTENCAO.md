# Guia de Manutenção - Alt tab Corp Website

Este guia fornece informações sobre a estrutura do projeto, como manter e expandir o site da Alt tab Corp.

## Estrutura do Projeto

O projeto foi organizado seguindo boas práticas de desenvolvimento web, com separação clara entre componentes, estilos e scripts:

```
Alttab_web/
  ├── assets/            # Recursos estáticos
  │   ├── css/           # Estilos CSS
  │   │   ├── base/      # Estilos base (variáveis, reset, tipografia)
  │   │   ├── layout/    # Estilos de layout (grid, header, footer)
  │   │   ├── components/# Estilos de componentes (botões, cards, etc)
  │   │   └── pages/     # Estilos específicos de páginas
  │   ├── images/        # Imagens e recursos visuais
  │   └── js/            # Scripts JavaScript
  │       ├── core/      # Scripts principais (paths, components, template)
  │       ├── components/# Scripts de componentes
  │       └── pages/     # Scripts específicos de páginas
  ├── components/        # Componentes HTML reutilizáveis
  │   ├── layout/        # Componentes de layout (header, footer)
  │   └── ui/            # Componentes de interface (serviços, FAQ, etc)
  ├── pages/             # Páginas do site
  └── templates/         # Templates base para páginas
```

## Sistemas Principais

### 1. Sistema de Gerenciamento de Caminhos (`assets/js/core/paths.js`)

Este sistema resolve problemas de caminhos entre ambiente local e GitHub Pages.

**Características:**
- Detecta automaticamente se está rodando no GitHub Pages ou localmente
- Ajusta caminhos de recursos (imagens, CSS, JS) conforme o ambiente
- Usa atributos `data-path` para definir caminhos relativos

**Como usar:**
```html
<!-- Exemplo de uso com data-path -->
<img src="" data-path="assets/images/logo.png" alt="Logo">
<link rel="stylesheet" href="" data-path="assets/css/style.css">
<script src="" data-path="assets/js/script.js"></script>
```

### 2. Sistema de Carregamento de Componentes (`assets/js/core/components.js`)

Facilita o carregamento e gerenciamento de componentes HTML.

**Características:**
- Carrega componentes HTML via AJAX
- Suporta callbacks após carregamento
- Permite carregar múltiplos componentes de uma vez

**Como usar:**
```javascript
// Carregar um único componente
window.componentLoader.load('header-placeholder', 'components/layout/header.html');

// Carregar múltiplos componentes
window.componentLoader.loadMultiple([
    { targetId: 'header-placeholder', path: 'components/layout/header.html' },
    { targetId: 'footer-placeholder', path: 'components/layout/footer.html' },
    { targetId: 'services-placeholder', path: 'components/ui/services.html' }
]);

// Com callback
window.componentLoader.load('faq-placeholder', 'components/ui/faq.html', function(element) {
    // Inicializar comportamento após carregamento
    initializeFAQ();
});
```

### 3. Sistema de Processamento de Templates (`assets/js/core/template.js`)

Permite a utilização do template base para todas as páginas.

**Características:**
- Suporta variáveis com sintaxe `{{variavel}}`
- Suporta condicionais `{{#if variavel}}...{{/if}}`
- Suporta loops `{{#each array}}...{{/each}}`
- Cache de templates para melhor performance

**Como usar:**
```javascript
// Renderizar uma página com o template base
const pageData = {
    title: 'Página de Contato',
    description: 'Entre em contato com a Alt tab Corp',
    pageClass: 'contato',
    pageHeader: 'Entre em Contato',
    pageSubtitle: 'Estamos prontos para atendê-lo',
    content: '<div class="container">Conteúdo da página</div>',
    components: [
        { targetId: 'contact-form', path: 'components/ui/contact-form.html' }
    ],
    pageScripts: ['assets/js/pages/contato.js']
};

window.templateProcessor.renderPage('templates/base.html', pageData)
    .then(html => {
        document.documentElement.innerHTML = html;
    });
```

## CSS: Sistema de Design

### Variáveis CSS (`assets/css/base/variables.css`)

Contém todas as variáveis do sistema de design:

- Cores (primárias, secundárias, neutras, estados)
- Tipografia (tamanhos, pesos)
- Espaçamento
- Bordas e sombras
- Breakpoints para responsividade

### Reset CSS (`assets/css/base/reset.css`)

Normaliza o estilo entre navegadores e fornece uma base consistente.

### Sistema de Grid (`assets/css/layout/grid.css`)

Sistema de layout baseado em flexbox para construção de interfaces responsivas:

- Sistema de 12 colunas
- Breakpoints responsivos (sm, md, lg, xl)
- Classes utilitárias para alinhamento e espaçamento

## Servidor de Desenvolvimento

O arquivo `server.js` fornece um servidor HTTP simples para desenvolvimento local:

```bash
# Iniciar o servidor
node server.js
```

O servidor roda por padrão na porta 3000 e serve arquivos estáticos do diretório do projeto.

## Adicionando Novas Páginas

1. Crie uma pasta para a página em `pages/nome-da-pagina/`
2. Crie um arquivo `index.html` seguindo a estrutura do template base
3. Adicione estilos específicos em `assets/css/pages/nome-da-pagina.css`
4. Adicione scripts específicos em `assets/js/pages/nome-da-pagina.js` (se necessário)

## Adicionando Novos Componentes

1. Crie o arquivo HTML do componente em `components/ui/` ou `components/layout/`
2. Adicione estilos específicos em `assets/css/components/nome-do-componente.css`
3. Adicione scripts específicos em `assets/js/components/nome-do-componente.js` (se necessário)
4. Use o componente em suas páginas com o sistema de carregamento de componentes

## Publicação no GitHub Pages

O site está configurado para funcionar tanto localmente quanto no GitHub Pages sem alterações no código. O sistema de gerenciamento de caminhos (`paths.js`) detecta automaticamente o ambiente e ajusta os caminhos conforme necessário.

Para publicar:
1. Faça commit das alterações
2. Envie para o repositório GitHub
3. Configure o GitHub Pages para usar a branch desejada

## Dicas de Manutenção

- **Componentes Reutilizáveis**: Sempre que possível, crie componentes reutilizáveis para elementos que se repetem no site
- **Variáveis CSS**: Use as variáveis CSS definidas em `variables.css` para manter consistência visual
- **Responsividade**: Teste o site em diferentes tamanhos de tela usando as classes de grid responsivas
- **Otimização de Imagens**: Comprima imagens antes de adicioná-las ao projeto
- **Validação de Código**: Verifique regularmente seu HTML, CSS e JavaScript com ferramentas de validação

## Solução de Problemas

### Caminhos de Arquivos

Se os recursos (imagens, CSS, JS) não estão carregando:

1. Verifique se está usando o atributo `data-path` corretamente
2. Verifique se o caminho relativo está correto
3. Certifique-se de que o arquivo `paths.js` está sendo carregado antes de outros scripts

### Componentes Não Carregam

Se os componentes não estão aparecendo:

1. Verifique os erros no console do navegador
2. Certifique-se de que o ID do elemento de destino existe na página
3. Verifique se o caminho do componente está correto

### Problemas no GitHub Pages

Se o site não funciona corretamente no GitHub Pages:

1. Verifique se a configuração do GitHub Pages está apontando para a branch correta
2. Certifique-se de que o nome do repositório está correto em `paths.js`
3. Aguarde alguns minutos após o push para que as alterações sejam publicadas

## Suporte e Contato

Para dúvidas ou sugestões sobre a manutenção do site, entre em contato com a equipe de desenvolvimento da Alt tab Corp.

---

Documento atualizado em: Julho de 2024 
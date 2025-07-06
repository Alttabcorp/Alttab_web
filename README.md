# Alt tab Corp - Site Institucional

Site institucional da Alt tab Corp, desenvolvido com HTML e CSS puro para garantir máxima compatibilidade e facilidade de manutenção.

## Sobre o Projeto

Este é um site estático, construído apenas com HTML e CSS, projetado para funcionar tanto localmente quanto no GitHub Pages sem a necessidade de JavaScript complexo ou dependências de servidor.

## Estrutura do Projeto

```
Alttab_web/
  ├── assets/
  │   ├── css/
  │   │   ├── base/          # Estilos base (reset, variáveis, tipografia)
  │   │   ├── components/    # Estilos de componentes (botões, cards, etc)
  │   │   ├── layout/        # Estilos de layout (grid, etc)
  │   │   └── pages/         # Estilos específicos de páginas
  │   ├── images/            # Imagens do site
  │   └── js/                # JavaScript mínimo (apenas para menu mobile)
  ├── pages/                 # Páginas do site
  │   ├── sobre/
  │   ├── servicos/
  │   ├── contato/
  │   └── ...
  └── index.html             # Página inicial
```

## Como Executar Localmente

Por ser um site estático, você pode simplesmente abrir os arquivos HTML em seu navegador:

1. Clone o repositório:
   ```
   git clone https://github.com/seu-usuario/Alttab_web.git
   ```

2. Navegue até a pasta do projeto:
   ```
   cd Alttab_web
   ```

3. Abra o arquivo `index.html` em seu navegador favorito.

Alternativamente, você pode usar qualquer servidor web estático simples, como:

- Extensão "Live Server" do VS Code
- Servidor Python:
  ```
  python -m http.server
  ```
- Servidor PHP:
  ```
  php -S localhost:8000
  ```

## Hospedagem no GitHub Pages

Este site foi projetado para funcionar perfeitamente no GitHub Pages. Para hospedar:

1. Faça o fork ou clone este repositório para sua conta GitHub
2. Vá para Settings > Pages
3. Selecione a branch principal (main ou master)
4. Clique em "Save"

O site estará disponível em `https://seu-usuario.github.io/Alttab_web/`

## Características

- Design responsivo para todos os dispositivos
- Otimizado para SEO
- Carregamento rápido
- Sem dependências de frameworks ou bibliotecas externas
- Compatível com todos os navegadores modernos

## Manutenção

Para adicionar novas páginas:

1. Crie um novo diretório em `/pages/` com o nome da página
2. Crie um arquivo `index.html` dentro desse diretório
3. Copie a estrutura básica de outra página existente (incluindo header e footer)
4. Atualize os links relativos conforme necessário

## Licença

Este projeto é propriedade da Alt tab Corp. Todos os direitos reservados. 
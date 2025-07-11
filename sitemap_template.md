# Template de Sitemap.xml Atualizado - Alt tab Corp

Este é um modelo atualizado para o sitemap.xml que você deve implementar ao migrar para o domínio www.alttabcorp.com.br:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    
    <!-- Página Principal -->
    <url>
        <loc>https://www.alttabcorp.com.br/</loc>
        <lastmod>2025-07-11</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
    
    <!-- Páginas Principais -->
    <url>
        <loc>https://www.alttabcorp.com.br/pages/sobre/</loc>
        <lastmod>2025-07-11</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.9</priority>
    </url>
    
    <url>
        <loc>https://www.alttabcorp.com.br/pages/servicos/</loc>
        <lastmod>2025-07-11</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.9</priority>
    </url>
    
    <url>
        <loc>https://www.alttabcorp.com.br/pages/contato/</loc>
        <lastmod>2025-07-11</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    
    <!-- Páginas de Serviços Principais -->
    <url>
        <loc>https://www.alttabcorp.com.br/pages/web/</loc>
        <lastmod>2025-07-11</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    
    <url>
        <loc>https://www.alttabcorp.com.br/pages/consultoria/</loc>
        <lastmod>2025-07-11</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    
    <url>
        <loc>https://www.alttabcorp.com.br/pages/impressao3d/</loc>
        <lastmod>2025-07-11</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    
    <url>
        <loc>https://www.alttabcorp.com.br/pages/esports/</loc>
        <lastmod>2025-07-11</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    
    <!-- Subpáginas de E-sports -->
    <url>
        <loc>https://www.alttabcorp.com.br/pages/esports/estudio/</loc>
        <lastmod>2025-07-11</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>
    
    <url>
        <loc>https://www.alttabcorp.com.br/pages/esports/time/</loc>
        <lastmod>2025-07-11</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>
    
    <!-- Páginas Legais e de Suporte -->
    <url>
        <loc>https://www.alttabcorp.com.br/pages/termos/</loc>
        <lastmod>2025-07-11</lastmod>
        <changefreq>yearly</changefreq>
        <priority>0.5</priority>
    </url>
    
    <url>
        <loc>https://www.alttabcorp.com.br/pages/privacidade/</loc>
        <lastmod>2025-07-11</lastmod>
        <changefreq>yearly</changefreq>
        <priority>0.5</priority>
    </url>
    
    <url>
        <loc>https://www.alttabcorp.com.br/pages/cookies/</loc>
        <lastmod>2025-07-11</lastmod>
        <changefreq>yearly</changefreq>
        <priority>0.5</priority>
    </url>
    
    <!-- Página 404 -->
    <url>
        <loc>https://www.alttabcorp.com.br/pages/404/</loc>
        <lastmod>2025-07-11</lastmod>
        <changefreq>yearly</changefreq>
        <priority>0.3</priority>
    </url>
</urlset>
```

Importante:
1. Atualize a data `lastmod` sempre que fizer alterações significativas em uma página
2. Ajuste a frequência de alteração (`changefreq`) conforme a atualização real da página
3. Prioridades (`priority`) devem refletir a importância relativa da página no seu site
4. Certifique-se de incluir todas as páginas novas que criar no sitemap
5. Após atualizar o sitemap, reenvie-o ao Google Search Console para reindexação

# Templates de Meta Tags SEO - Alt tab Corp

## 📋 Template Base para Todas as Páginas

Substitua o `<head>` de cada página pelo template abaixo, adaptando o conteúdo específico:

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Meta Tags SEO -->
    <meta name="description" content="[DESCRIÇÃO ESPECÍFICA DA PÁGINA]">
    <meta name="keywords" content="[PALAVRAS-CHAVE ESPECÍFICAS]">
    <meta name="author" content="Alt tab Corp">
    <meta name="robots" content="index, follow">
    <meta name="theme-color" content="#1E293B">
    <meta name="language" content="pt-BR">
    <meta name="geo.region" content="BR-SP">
    <meta name="geo.placename" content="São Paulo">
    <meta name="geo.position" content="-23.5505;-46.6333">
    <meta name="ICBM" content="-23.5505, -46.6333">

    <title>[TÍTULO ESPECÍFICO] - Alt tab Corp</title>

    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="[TÍTULO OG ESPECÍFICO]">
    <meta property="og:description" content="[DESCRIÇÃO OG ESPECÍFICA]">
    <meta property="og:image" content="https://alttabcorp.com.br/assets/images/og-image.jpg">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="Alt tab Corp - [PÁGINA ESPECÍFICA]">
    <meta property="og:url" content="https://alttabcorp.com.br/[URL-ESPECÍFICA]">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Alt tab Corp">
    <meta property="og:locale" content="pt_BR">
    
    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="[TÍTULO TWITTER ESPECÍFICO]">
    <meta name="twitter:description" content="[DESCRIÇÃO TWITTER ESPECÍFICA]">
    <meta name="twitter:image" content="https://alttabcorp.com.br/assets/images/og-image.jpg">
    <meta name="twitter:image:alt" content="Alt tab Corp - [PÁGINA ESPECÍFICA]">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://alttabcorp.com.br/[URL-ESPECÍFICA]">
    
    <!-- Schema.org Structured Data -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "[TIPO DE PÁGINA]",
        "name": "[NOME DA PÁGINA]",
        "description": "[DESCRIÇÃO SCHEMA]",
        "url": "https://alttabcorp.com.br/[URL-ESPECÍFICA]",
        "mainEntity": {
            "@type": "[TIPO DE CONTEÚDO]",
            "name": "[NOME DO CONTEÚDO]",
            "description": "[DESCRIÇÃO DO CONTEÚDO]"
        }
    }
    </script>

    <!-- [RESTANTE DOS CSS E JS] -->
</head>
```

## 📄 Exemplos por Página

### 1. Página Sobre (/pages/sobre/)

```html
<!-- Meta Tags SEO -->
<meta name="description" content="Conheça a Alt tab Corp - Nossa história, valores, equipe e missão. Empresa de tecnologia especializada em desenvolvimento web, consultoria TI, impressão 3D e E-Sports em São Paulo.">
<meta name="keywords" content="sobre alt tab corp, história empresa tecnologia, equipe desenvolvimento, valores empresa São Paulo, missão alt tab corp">

<title>Sobre Nós - História, Valores e Equipe | Alt tab Corp</title>

<!-- Open Graph -->
<meta property="og:title" content="Sobre Nós - História, Valores e Equipe | Alt tab Corp">
<meta property="og:description" content="Conheça a Alt tab Corp - Nossa história, valores, equipe e missão. Empresa de tecnologia especializada em desenvolvimento web, consultoria TI, impressão 3D e E-Sports.">
<meta property="og:url" content="https://alttabcorp.com.br/pages/sobre/">

<!-- Twitter -->
<meta name="twitter:title" content="Sobre Nós - História, Valores e Equipe | Alt tab Corp">
<meta name="twitter:description" content="Conheça a Alt tab Corp - Nossa história, valores, equipe e missão. Empresa de tecnologia especializada em desenvolvimento web, consultoria TI, impressão 3D e E-Sports.">

<!-- Canonical -->
<link rel="canonical" href="https://alttabcorp.com.br/pages/sobre/">

<!-- Schema.org -->
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Alt tab Corp",
    "description": "Empresa de tecnologia especializada em desenvolvimento web, consultoria TI, impressão 3D e E-Sports",
    "url": "https://alttabcorp.com.br/pages/sobre/",
    "foundingDate": "2015",
    "numberOfEmployees": "50+",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "Av. Paulista, 1000",
        "addressLocality": "São Paulo",
        "addressRegion": "SP",
        "postalCode": "01310-100",
        "addressCountry": "BR"
    }
}
</script>
```

### 2. Página Serviços (/pages/servicos/)

```html
<!-- Meta Tags SEO -->
<meta name="description" content="Serviços de tecnologia da Alt tab Corp: desenvolvimento web, consultoria TI, impressão 3D e soluções E-Sports. Soluções completas para seu negócio em São Paulo.">
<meta name="keywords" content="serviços tecnologia, desenvolvimento web, consultoria TI, impressão 3D, e-sports, soluções digitais São Paulo">

<title>Nossos Serviços - Desenvolvimento Web, Consultoria TI e E-Sports | Alt tab Corp</title>

<!-- Open Graph -->
<meta property="og:title" content="Nossos Serviços - Desenvolvimento Web, Consultoria TI e E-Sports | Alt tab Corp">
<meta property="og:description" content="Serviços de tecnologia da Alt tab Corp: desenvolvimento web, consultoria TI, impressão 3D e soluções E-Sports. Soluções completas para seu negócio.">
<meta property="og:url" content="https://alttabcorp.com.br/pages/servicos/">

<!-- Canonical -->
<link rel="canonical" href="https://alttabcorp.com.br/pages/servicos/">

<!-- Schema.org -->
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Serviços de Tecnologia",
    "description": "Desenvolvimento web, consultoria TI, impressão 3D e soluções E-Sports",
    "provider": {
        "@type": "Organization",
        "name": "Alt tab Corp"
    },
    "serviceType": "Tecnologia",
    "areaServed": "BR"
}
</script>
```

### 3. Página Desenvolvimento Web (/pages/web/)

```html
<!-- Meta Tags SEO -->
<meta name="description" content="Desenvolvimento web profissional em São Paulo. Sites responsivos, aplicações web, e-commerce e sistemas personalizados. Alt tab Corp - Tecnologia de ponta para seu negócio.">
<meta name="keywords" content="desenvolvimento web São Paulo, criação de sites, aplicações web, e-commerce, sites responsivos, programação web">

<title>Desenvolvimento Web - Sites e Aplicações Web Profissionais | Alt tab Corp</title>

<!-- Open Graph -->
<meta property="og:title" content="Desenvolvimento Web - Sites e Aplicações Web Profissionais | Alt tab Corp">
<meta property="og:description" content="Desenvolvimento web profissional em São Paulo. Sites responsivos, aplicações web, e-commerce e sistemas personalizados.">
<meta property="og:url" content="https://alttabcorp.com.br/pages/web/">

<!-- Canonical -->
<link rel="canonical" href="https://alttabcorp.com.br/pages/web/">

<!-- Schema.org -->
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Desenvolvimento Web",
    "description": "Criação de sites responsivos, aplicações web e e-commerce",
    "provider": {
        "@type": "Organization",
        "name": "Alt tab Corp"
    },
    "serviceType": "Desenvolvimento Web",
    "areaServed": "BR"
}
</script>
```

### 4. Página Consultoria TI (/pages/consultoria/)

```html
<!-- Meta Tags SEO -->
<meta name="description" content="Consultoria em TI em São Paulo. Otimização de infraestrutura, segurança de dados, migração para nuvem e gestão de projetos. Alt tab Corp - Especialistas em tecnologia.">
<meta name="keywords" content="consultoria TI São Paulo, consultoria tecnologia, infraestrutura TI, segurança dados, migração nuvem, gestão projetos TI">

<title>Consultoria em TI - Especialistas em Tecnologia | Alt tab Corp</title>

<!-- Open Graph -->
<meta property="og:title" content="Consultoria em TI - Especialistas em Tecnologia | Alt tab Corp">
<meta property="og:description" content="Consultoria em TI em São Paulo. Otimização de infraestrutura, segurança de dados, migração para nuvem e gestão de projetos.">
<meta property="og:url" content="https://alttabcorp.com.br/pages/consultoria/">

<!-- Canonical -->
<link rel="canonical" href="https://alttabcorp.com.br/pages/consultoria/">

<!-- Schema.org -->
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Consultoria em TI",
    "description": "Consultoria especializada em tecnologia da informação",
    "provider": {
        "@type": "Organization",
        "name": "Alt tab Corp"
    },
    "serviceType": "Consultoria",
    "areaServed": "BR"
}
</script>
```

### 5. Página Impressão 3D (/pages/impressao3d/)

```html
<!-- Meta Tags SEO -->
<meta name="description" content="Impressão 3D em São Paulo. Protótipos, peças personalizadas, maquetes e produtos finais. Alt tab Corp - Tecnologia 3D de alta precisão para seu projeto.">
<meta name="keywords" content="impressão 3D São Paulo, protótipos 3D, peças 3D, maquetes 3D, tecnologia 3D, impressora 3D">

<title>Impressão 3D - Protótipos e Peças Personalizadas | Alt tab Corp</title>

<!-- Open Graph -->
<meta property="og:title" content="Impressão 3D - Protótipos e Peças Personalizadas | Alt tab Corp">
<meta property="og:description" content="Impressão 3D em São Paulo. Protótipos, peças personalizadas, maquetes e produtos finais. Tecnologia 3D de alta precisão.">
<meta property="og:url" content="https://alttabcorp.com.br/pages/impressao3d/">

<!-- Canonical -->
<link rel="canonical" href="https://alttabcorp.com.br/pages/impressao3d/">

<!-- Schema.org -->
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Impressão 3D",
    "description": "Serviços de impressão 3D para protótipos e peças personalizadas",
    "provider": {
        "@type": "Organization",
        "name": "Alt tab Corp"
    },
    "serviceType": "Impressão 3D",
    "areaServed": "BR"
}
</script>
```

### 6. Página E-Sports (/pages/esports/)

```html
<!-- Meta Tags SEO -->
<meta name="description" content="Soluções E-Sports em São Paulo. Estúdio de jogos, time profissional, gestão de eventos e plataformas de streaming. Alt tab Corp - Especialistas em E-Sports.">
<meta name="keywords" content="e-sports São Paulo, estúdio jogos, time e-sports, eventos gaming, streaming games, plataforma e-sports">

<title>E-Sports - Estúdio de Jogos e Time Profissional | Alt tab Corp</title>

<!-- Open Graph -->
<meta property="og:title" content="E-Sports - Estúdio de Jogos e Time Profissional | Alt tab Corp">
<meta property="og:description" content="Soluções E-Sports em São Paulo. Estúdio de jogos, time profissional, gestão de eventos e plataformas de streaming.">
<meta property="og:url" content="https://alttabcorp.com.br/pages/esports/">

<!-- Canonical -->
<link rel="canonical" href="https://alttabcorp.com.br/pages/esports/">

<!-- Schema.org -->
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Soluções E-Sports",
    "description": "Estúdio de jogos, time profissional e gestão de eventos E-Sports",
    "provider": {
        "@type": "Organization",
        "name": "Alt tab Corp"
    },
    "serviceType": "E-Sports",
    "areaServed": "BR"
}
</script>
```

### 7. Página Contato (/pages/contato/)

```html
<!-- Meta Tags SEO -->
<meta name="description" content="Entre em contato com a Alt tab Corp. Atendimento em São Paulo para desenvolvimento web, consultoria TI, impressão 3D e E-Sports. Solicite um orçamento.">
<meta name="keywords" content="contato alt tab corp, orçamento desenvolvimento web, consultoria TI São Paulo, atendimento tecnologia">

<title>Contato - Entre em Contato Conosco | Alt tab Corp</title>

<!-- Open Graph -->
<meta property="og:title" content="Contato - Entre em Contato Conosco | Alt tab Corp">
<meta property="og:description" content="Entre em contato com a Alt tab Corp. Atendimento em São Paulo para desenvolvimento web, consultoria TI, impressão 3D e E-Sports.">
<meta property="og:url" content="https://alttabcorp.com.br/pages/contato/">

<!-- Canonical -->
<link rel="canonical" href="https://alttabcorp.com.br/pages/contato/">

<!-- Schema.org -->
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contato - Alt tab Corp",
    "description": "Página de contato da Alt tab Corp",
    "url": "https://alttabcorp.com.br/pages/contato/",
    "mainEntity": {
        "@type": "Organization",
        "name": "Alt tab Corp",
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+55-11-9999-9999",
            "contactType": "customer service",
            "areaServed": "BR",
            "availableLanguage": "Portuguese"
        }
    }
}
</script>
```

## 🔧 Como Aplicar

1. **Copie o template base** para cada página
2. **Substitua os campos específicos** com o conteúdo da página
3. **Mantenha a estrutura** de todas as meta tags
4. **Adapte o Schema.org** para o tipo de conteúdo da página
5. **Atualize as URLs** para o caminho correto de cada página

## 📊 Benefícios

- ✅ Melhor indexação no Google
- ✅ Rich snippets nos resultados
- ✅ Compartilhamento otimizado em redes sociais
- ✅ SEO local para São Paulo
- ✅ Estrutura de dados para Google

---

**Lembre-se**: Cada página deve ter meta tags únicas e específicas para o conteúdo! 
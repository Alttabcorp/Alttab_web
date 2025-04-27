const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname)));

// Middleware para parsing de JSON
app.use(express.json());

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Rotas para as vertentes
const verticals = ['consultoria', 'esports', 'impressao3d', 'saas'];

verticals.forEach(vertical => {
    app.get(`/${vertical}`, (req, res) => {
        res.sendFile(path.join(__dirname, 'pages', vertical, 'index.html'));
    });
});

// API mock para o formulário de contato
app.post('/api/contact', (req, res) => {
    console.log('Dados do formulário recebidos:', req.body);
    res.json({ success: true, message: 'Mensagem recebida com sucesso!' });
});

// Tratamento de erros 404
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
}); 
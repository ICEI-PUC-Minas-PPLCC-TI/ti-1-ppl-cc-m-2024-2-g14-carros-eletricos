const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');

app.use(express.static(path.join(__dirname))); // Serve arquivos estáticos

app.get('/carros', (req, res) => {
    res.sendFile(path.join(__dirname, 'db.json'));
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

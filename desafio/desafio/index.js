const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();

app.use(express.json());

let pessoas = [];


app.get('/pessoas', (req, res) => {
    return res.json(pessoas);
});


app.post('/pessoas', (req, res) => {
    const { nome, celular } = req.body;
    const novaPessoa = { id: uuidv4(), nome, celular };
    pessoas.push(novaPessoa);
    return res.status(201).json(novaPessoa);
});


app.put('/pessoas/:id', (req, res) => {
    const { id } = req.params;
    const { nome, celular } = req.body;

    const pessoaIndex = pessoas.findIndex(p => p.id === id);

    if (pessoaIndex < 0) {
        return res.status(404).json({ error: 'Pessoa não encontrada' });
    }

    pessoas[pessoaIndex] = { id, nome, celular };
    return res.json(pessoas[pessoaIndex]);
});

app.delete('/pessoas/:id', (req, res) => {
    const { id } = req.params;
    const pessoaIndex = pessoas.findIndex(p => p.id === id);

    if (pessoaIndex < 0) {
        return res.status(404).json({ error: 'Pessoa não encontrada' });
    }

    pessoas.splice(pessoaIndex, 1);
    return res.status(204).send();
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});

const disciplinasModel = require('../models/disciplinasModel'); // Importa o modelo

// Criar uma disciplina
exports.createDisciplina = async (req, res) => {
    const { nome_disciplina } = req.body;

    if (!nome_disciplina) {
        return res.status(400).json({ error: 'Nome da disciplina é obrigatório.' });
    }

    try {
        const result = await disciplinasModel.createDisciplina(nome_disciplina);

        res.status(201).json({
            message: 'Disciplina registrada com sucesso.',
            disciplina: result,
        });
    } catch (err) {
        console.error('Erro ao registrar a disciplina:', err.message);
        res.status(500).json({ error: 'Erro ao registrar disciplina.' });
    }
};

// Listar todas as disciplinas
exports.listDisciplinas = async (req, res) => {
    try {
        const result = await disciplinasModel.listDisciplinas();
        res.status(200).json(result);
    } catch (err) {
        console.error('Erro ao listar disciplinas:', err.message);
        res.status(500).json({ error: 'Erro ao listar disciplinas.' });
    }
};

// Atualizar uma disciplina
exports.updateDisciplina = async (req, res) => {
    const { id } = req.params;
    const { nome_disciplina } = req.body;

    if (!id || !nome_disciplina) {
        return res.status(400).json({ error: 'ID e nome da disciplina são obrigatórios.' });
    }

    try {
        const result = await disciplinasModel.updateDisciplina(id, nome_disciplina);

        if (!result) {
            return res.status(404).json({ error: 'Disciplina não encontrada.' });
        }

        res.status(200).json({
            message: 'Disciplina atualizada com sucesso.',
            disciplina: result,
        });
    } catch (err) {
        console.error('Erro ao atualizar a disciplina:', err.message);
        res.status(500).json({ error: 'Erro ao atualizar disciplina.' });
    }
};

// Deletar uma disciplina
exports.deleteDisciplina = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'ID da disciplina é obrigatório.' });
    }

    try {
        const result = await disciplinasModel.deleteDisciplina(id);

        if (result === 0) {
            return res.status(404).json({ error: 'Disciplina não encontrada.' });
        }

        res.status(200).json({ message: 'Disciplina deletada com sucesso.' });
    } catch (err) {
        console.error('Erro ao deletar a disciplina:', err.message);
        res.status(500).json({ error: 'Erro ao deletar disciplina.' });
    }
};


// Buscar disciplina por ID
exports.getDisciplinaById = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'ID da disciplina é obrigatório.' });
    }

    try {
        const result = await disciplinasModel.getDisciplinaById(id);
        if (!result) {
            return res.status(404).json({ error: 'Disciplina não encontrada.' });
        }

        res.status(200).json(result);
    } catch (err) {
        console.error('Erro ao buscar a disciplina por ID:', err.message);
        res.status(500).json({ error: 'Erro ao buscar disciplina.' });
    }
};

// Buscar disciplinas pelo nome
exports.getDisciplinasByName = async (req, res) => {
    const { nome } = req.query;

    if (!nome) {
        return res.status(400).json({ error: 'Nome da disciplina é obrigatório.' });
    }

    try {
        const result = await disciplinasModel.getDisciplinasByName(nome);
        if (result.length === 0) {
            return res.status(404).json({ error: 'Nenhuma disciplina encontrada com este nome.' });
        }

        res.status(200).json(result);
    } catch (err) {
        console.error('Erro ao buscar disciplinas pelo nome:', err.message);
        res.status(500).json({ error: 'Erro ao buscar disciplinas.' });
    }
};
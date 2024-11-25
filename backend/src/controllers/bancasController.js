const bancasModel = require('../models/bancasModel'); // Importa o modelo

// Criar uma banca
exports.createBanca = async (req, res) => {
    const { nome_banca } = req.body;

    if (!nome_banca) {
        return res.status(400).json({ error: 'Nome da banca é obrigatório.' });
    }

    try {
        const result = await bancasModel.createBanca(nome_banca);

        res.status(201).json({
            message: 'Banca criada com sucesso.',
            banca: result,
        });
    } catch (err) {
        console.error('Erro ao criar a banca:', err.message);
        res.status(500).json({ error: 'Erro ao criar banca.' });
    }
};

// Listar todas as bancas
exports.listBancas = async (req, res) => {
    try {
        const result = await bancasModel.listBancas();
        res.status(200).json(result);
    } catch (err) {
        console.error('Erro ao listar bancas:', err.message);
        res.status(500).json({ error: 'Erro ao listar bancas.' });
    }
};

// Atualizar uma banca
exports.updateBanca = async (req, res) => {
    const { id } = req.params;
    const { nome_banca } = req.body;

    if (!id || !nome_banca) {
        return res.status(400).json({ error: 'ID e nome da banca são obrigatórios.' });
    }

    try {
        const result = await bancasModel.updateBanca(id, nome_banca);

        if (!result) {
            return res.status(404).json({ error: 'Banca não encontrada.' });
        }

        res.status(200).json({
            message: 'Banca atualizada com sucesso.',
            banca: result,
        });
    } catch (err) {
        console.error('Erro ao atualizar a banca:', err.message);
        res.status(500).json({ error: 'Erro ao atualizar banca.' });
    }
};

// Deletar uma banca
exports.deleteBanca = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'ID da banca é obrigatório.' });
    }

    try {
        const result = await bancasModel.deleteBanca(id);

        if (result === 0) {
            return res.status(404).json({ error: 'Banca não encontrada.' });
        }

        res.status(200).json({ message: 'Banca deletada com sucesso.' });
    } catch (err) {
        console.error('Erro ao deletar a banca:', err.message);
        res.status(500).json({ error: 'Erro ao deletar banca.' });
    }
};

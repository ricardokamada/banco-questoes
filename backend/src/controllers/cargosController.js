const cargosModel = require('../models/cargosModel'); // Importa o modelo

// Criar um cargo
exports.createCargo = async (req, res) => {
    const { nome_cargo } = req.body;

    if (!nome_cargo) {
        return res.status(400).json({ error: 'Nome do cargo é obrigatório.' });
    }

    try {
        const result = await cargosModel.createCargo(nome_cargo);

        res.status(201).json({
            message: 'Cargo criado com sucesso.',
            cargo: result,
        });
    } catch (err) {
        console.error('Erro ao criar o cargo:', err.message);
        res.status(500).json({ error: 'Erro ao criar cargo.' });
    }
};

// Listar todos os cargos
exports.listCargos = async (req, res) => {
    try {
        const result = await cargosModel.listCargos();
        res.status(200).json(result);
    } catch (err) {
        console.error('Erro ao listar cargos:', err.message);
        res.status(500).json({ error: 'Erro ao listar cargos.' });
    }
};

// Atualizar um cargo
exports.updateCargo = async (req, res) => {
    const { id } = req.params;
    const { nome_cargo } = req.body;

    if (!id || !nome_cargo) {
        return res.status(400).json({ error: 'ID e nome do cargo são obrigatórios.' });
    }

    try {
        const result = await cargosModel.updateCargo(id, nome_cargo);

        if (!result) {
            return res.status(404).json({ error: 'Cargo não encontrado.' });
        }

        res.status(200).json({
            message: 'Cargo atualizado com sucesso.',
            cargo: result,
        });
    } catch (err) {
        console.error('Erro ao atualizar o cargo:', err.message);
        res.status(500).json({ error: 'Erro ao atualizar cargo.' });
    }
};

// Deletar um cargo
exports.deleteCargo = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'ID do cargo é obrigatório.' });
    }

    try {
        const result = await cargosModel.deleteCargo(id);

        if (result === 0) {
            return res.status(404).json({ error: 'Cargo não encontrado.' });
        }

        res.status(200).json({ message: 'Cargo deletado com sucesso.' });
    } catch (err) {
        console.error('Erro ao deletar o cargo:', err.message);
        res.status(500).json({ error: 'Erro ao deletar cargo.' });
    }
};

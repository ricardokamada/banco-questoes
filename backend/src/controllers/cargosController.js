const pool = require('../config/db');

exports.createCargo = async (req, res) => {
    const { nome } = req.body;

    if (!nome) {
        return res.status(400).json({ error: 'O campo "nome" é obrigatório.' });
    }

    try {
        const result = await pool.query(
            `INSERT INTO cargos (nome) VALUES ($1) RETURNING *`,
            [nome]
        );
        res.status(201).json({ cargo: result.rows[0] });
    } catch (err) {
        console.error('Erro ao criar cargo:', err.message);
        res.status(500).json({ error: 'Erro ao criar cargo.', details: err.message });
    }
};

exports.listCargos = async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM cargos`);
        res.json({ cargos: result.rows });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao listar cargos.', details: err.message });
    }
};


exports.updateCargo = async (req, res) => {
    const { id } = req.params; // ID do cargo a ser atualizado
    const { nome } = req.body; // Novo nome do cargo

    if (!nome) {
        return res.status(400).json({ error: 'O campo "nome" é obrigatório.' });
    }

    try {
        const result = await pool.query(
            `UPDATE cargos SET nome = $1 WHERE cargo_id = $2 RETURNING *`,
            [nome, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Cargo não encontrado.' });
        }

        res.json({ cargo: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao atualizar cargo.', details: err.message });
    }
};


exports.deleteCargo = async (req, res) => {
    const { id } = req.params; // ID do cargo a ser deletado

    try {
        const result = await pool.query(
            `DELETE FROM cargos WHERE cargo_id = $1`,
            [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Cargo não encontrado.' });
        }

        res.json({ message: 'Cargo deletado com sucesso.' });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao deletar cargo.', details: err.message });
    }
};

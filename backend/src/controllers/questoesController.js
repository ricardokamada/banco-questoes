const questoesModel = require('../models/questoesModel');

// Criar uma nova questão
exports.createQuestao = async (req, res) => {
    const {
        questao,
        banca_id,
        disciplina_id,
        cargo_id,
        ano_prova,
        alternativa_correta,
        alternativa_a,
        alternativa_b,
        alternativa_c,
        alternativa_d,
        alternativa_e,
    } = req.body;

    if (
        !questao ||
        !banca_id ||
        !disciplina_id ||
        !cargo_id ||
        !ano_prova ||
        !alternativa_correta ||
        !alternativa_a ||
        !alternativa_b ||
        !alternativa_c ||
        !alternativa_d ||
        !alternativa_e
    ) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    try {
        const result = await questoesModel.createQuestao({
            questao,
            banca_id,
            disciplina_id,
            cargo_id,
            ano_prova,
            alternativa_correta,
            alternativa_a,
            alternativa_b,
            alternativa_c,
            alternativa_d,
            alternativa_e,
        });

        res.status(201).json({
            message: 'Questão criada com sucesso.',
            questao: result,
        });
    } catch (err) {
        console.error('Erro ao criar questão:', err.message);
        res.status(500).json({ error: 'Erro ao criar questão.' });
    }
};

// Listar todas as questões
exports.listQuestoes = async (req, res) => {
    try {
        const result = await questoesModel.listQuestoes();
        res.status(200).json(result);
    } catch (err) {
        console.error('Erro ao listar questões:', err.message);
        res.status(500).json({ error: 'Erro ao listar questões.' });
    }
};

// Atualizar uma questão
exports.updateQuestao = async (req, res) => {
    const { id } = req.params;
    const {
        questao,
        banca_id,
        disciplina_id,
        cargo_id,
        ano_prova,
        alternativa_correta,
        alternativa_a,
        alternativa_b,
        alternativa_c,
        alternativa_d,
        alternativa_e,
    } = req.body;

    if (
        !id ||
        !questao ||
        !banca_id ||
        !disciplina_id ||
        !cargo_id ||
        !ano_prova ||
        !alternativa_correta ||
        !alternativa_a ||
        !alternativa_b ||
        !alternativa_c ||
        !alternativa_d ||
        !alternativa_e
    ) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    try {
        const result = await questoesModel.updateQuestao({
            questao_id: id,
            questao,
            banca_id,
            disciplina_id,
            cargo_id,
            ano_prova,
            alternativa_correta,
            alternativa_a,
            alternativa_b,
            alternativa_c,
            alternativa_d,
            alternativa_e,
        });

        if (!result) {
            return res.status(404).json({ error: 'Questão não encontrada.' });
        }

        res.status(200).json({
            message: 'Questão atualizada com sucesso.',
            questao: result,
        });
    } catch (err) {
        console.error('Erro ao atualizar questão:', err.message);
        res.status(500).json({ error: 'Erro ao atualizar questão.' });
    }
};

// Deletar uma questão
exports.deleteQuestao = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'ID da questão é obrigatório.' });
    }

    try {
        const result = await questoesModel.deleteQuestao(id);

        if (result === 0) {
            return res.status(404).json({ error: 'Questão não encontrada.' });
        }

        res.status(200).json({ message: 'Questão deletada com sucesso.' });
    } catch (err) {
        console.error('Erro ao deletar questão:', err.message);
        res.status(500).json({ error: 'Erro ao deletar questão.' });
    }
};

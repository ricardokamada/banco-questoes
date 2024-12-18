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
        !alternativa_correta
    ) {
        return res.status(400).json({ error: 'Campos obrigatórios estão ausentes.' });
    }

    try {
        const result = await questoesModel.createQuestao({
            questao,
            banca_id,
            disciplina_id,
            cargo_id,
            ano_prova,
            alternativa_correta,
            alternativa_a: alternativa_a || null,
            alternativa_b: alternativa_b || null,
            alternativa_c: alternativa_c || null,
            alternativa_d: alternativa_d || null,
            alternativa_e: alternativa_e || null,
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

        // Formatar as questões para incluir a propriedade 'alternativas'
        const formattedResult = result.map((questao) => ({
            id: questao.questao_id,
            enunciado: questao.questao,
            ano: questao.ano_prova,
            alternativa_correta: questao.alternativa_correta,
            alternativas: [
                questao.alternativa_a,
                questao.alternativa_b,
                questao.alternativa_c,
                questao.alternativa_d,
                questao.alternativa_e,
            ].filter(Boolean), // Remove alternativas nulas ou undefined
            banca: questao.nome_banca,
            disciplina: questao.nome_disciplina,
            cargo: questao.nome_cargo,
        }));

        res.status(200).json(formattedResult);
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


// Verificar se a resposta está correta
exports.verificarResposta = async (req, res) => {
    const { idQuestao, resposta } = req.body;

    if (!idQuestao || !resposta) {
        return res.status(400).json({ error: 'Questão e resposta são obrigatórias.' });
    }

    try {
        // Buscar a questão pelo ID
        const questao = await questoesModel.getQuestaoById(idQuestao);

        if (!questao) {
            return res.status(404).json({ error: 'Questão não encontrada.' });
        }

        // Obter o texto da alternativa correta com base na letra armazenada
        const alternativaCorreta = questao[`alternativa_${questao.alternativa_correta.toLowerCase()}`];

        if (!alternativaCorreta) {
            return res.status(500).json({ error: 'Alternativa correta não encontrada.' });
        }

        // Comparar a resposta enviada com o texto da alternativa correta
        const correto = alternativaCorreta.trim().toLowerCase() === resposta.trim().toLowerCase();

        res.status(200).json({ correto });
    } catch (err) {
        console.error('Erro ao verificar resposta:', err.message);
        res.status(500).json({ error: 'Erro interno ao verificar a resposta.' });
    }
};




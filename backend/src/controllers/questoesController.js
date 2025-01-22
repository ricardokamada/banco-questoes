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
    const {
        questao,
        banca_id,
        disciplina_id,
        cargo_id,
        ano_prova,
        alternativa_a,
        alternativa_b,
        alternativa_c,
        alternativa_d,
        alternativa_e,
        alternativa_correta,
    } = req.body;

    // Log para verificar os dados recebidos
    console.log("Dados recebidos no controller:", req.body);

    // Verificação de campos obrigatórios
    if (
        !questao ||
        !banca_id ||
        !disciplina_id ||
        !cargo_id ||
        !ano_prova ||
        !alternativa_a ||
        !alternativa_b ||
        !alternativa_c ||
        !alternativa_d ||
        !alternativa_correta
    ) {
        return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos.' });
    }

    try {
        const result = await questoesModel.updateQuestao({
            questao_id: req.params.id,
            questao,
            banca_id,
            disciplina_id,
            cargo_id,
            ano_prova: parseInt(ano_prova, 10), // Garantir que ano_prova seja um número
            alternativa_a,
            alternativa_b,
            alternativa_c,
            alternativa_d,
            alternativa_e,
            alternativa_correta,
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



// Buscar questão por ID
exports.buscaID = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'ID é obrigatório.' });
    }

    try {
        const questao = await questoesModel.getQuestaoById(id);

        if (!questao) {
            return res.status(404).json({ error: 'Questão não encontrada.' });
        }

        res.status(200).json(questao);
    } catch (err) {
        console.error('Erro ao buscar questão por ID:', err.message);
        res.status(500).json({ error: 'Erro ao buscar questão.' });
    }
};





// Buscar questões por texto do enunciado
exports.buscaEnunciado = async (req, res) => {
    const { texto } = req.query;

    console.log('chegando no backend:', req.query.texto);


    if (!texto) {
        return res.status(400).json({ error: 'Texto do enunciado é obrigatório.' });
    }

    try {
        const result = await questoesModel.getQuestoesByText(texto);
        if (result.length === 0) {
            return res.status(404).json({ error: 'Nenhuma questão encontrada.' });
        }

        const formattedResults = result.map((questao) => ({
            id: questao.questao_id,
            questao: questao.enunciado, // Ajuste para usar enunciado
            ano: questao.ano_prova,
            alternativas: [
                questao.alternativa_a,
                questao.alternativa_b,
                questao.alternativa_c,
                questao.alternativa_d,
                questao.alternativa_e,
            ].filter(Boolean),
        }));
        

        console.log('Dados retornados pelo modelo:', result);


        res.status(200).json(formattedResults);
    } catch (err) {
        console.error('Erro ao buscar questões por enunciado:', err.message);
        res.status(500).json({ error: 'Erro ao buscar questões.' });
    }
};

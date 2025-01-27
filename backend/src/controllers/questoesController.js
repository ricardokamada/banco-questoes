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

        res.status(200).json({
            questao_id: questao.questao_id, // Garante consistência
            enunciado: questao.enunciado,
            ano: questao.ano,
            alternativas: [
                questao.alternativa_a,
                questao.alternativa_b,
                questao.alternativa_c,
                questao.alternativa_d,
                questao.alternativa_e,
            ].filter(Boolean),
        });
        
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
            questao_id: questao.questao_id, // Padronizado como questao_id
            enunciado: questao.enunciado,
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

// exports.getQuestoesByDisciplina = async (req, res) => {
//     const { disciplinaId } = req.params;
//     console.log('Recebido disciplinaId:', disciplinaId); // Verifica o valor recebido
//     if (!disciplinaId) {
//         return res.status(400).json({ error: 'O ID da disciplina é obrigatório.' });
//     }

//     try {
//         const result = await questoesModel.getQuestoesByDisciplina(disciplinaId);
//         if (result.length === 0) {
//             return res.status(404).json({ error: 'Nenhuma questão encontrada para esta disciplina.' });
//         }

//         // Formatar os dados para o frontend
//         const formattedResult = result.map((questao) => ({
//             id: questao.questao_id,
//             questao: questao.questao,
//             ano: questao.ano_prova,
//             banca: questao.nome_banca,
//             disciplina: questao.nome_disciplina,
//             cargo: questao.nome_cargo,
//             alternativa_a: questao.alternativa_a,
//             alternativa_b: questao.alternativa_b,
//             alternativa_c: questao.alternativa_c,
//             alternativa_d: questao.alternativa_d,
//             alternativa_e: questao.alternativa_e,
//         }));

//         res.status(200).json({
//             questoes: formattedResult,
//             currentPage: 1, // Placeholder para paginação
//             totalPages: 1,  // Placeholder para paginação
//         });
//     } catch (err) {
//         console.error('Erro ao buscar questões por disciplina:', err.message);
//         res.status(500).json({ error: 'Erro ao buscar questões por disciplina.' });
//     }
// };

exports.getQuestoesByDisciplina = async (req, res) => {
    const { disciplinaId } = req.params;
    console.log('Recebido disciplinaId:', disciplinaId); // Verifica o valor recebido
    if (!disciplinaId) {
        return res.status(400).json({ error: 'O ID da disciplina é obrigatório.' });
    }

    try {
        const result = await questoesModel.getQuestoesByDisciplina(disciplinaId);
        if (result.length === 0) {
            return res.status(404).json({ error: 'Nenhuma questão encontrada para esta disciplina.' });
        }

        // Formatar os dados para o frontend
        const formattedResult = result.map((questao) => ({
            id: questao.questao_id,
            questao: questao.questao,
            ano: questao.ano_prova,
            banca: questao.nome_banca,
            disciplina: questao.nome_disciplina,
            cargo: questao.nome_cargo,
            alternativa_a: questao.alternativa_a,
            alternativa_b: questao.alternativa_b,
            alternativa_c: questao.alternativa_c,
            alternativa_d: questao.alternativa_d,
            alternativa_e: questao.alternativa_e,
        }));

        res.status(200).json({
            questoes: formattedResult,
            currentPage: 1, // Placeholder para paginação
            totalPages: 1,  // Placeholder para paginação
        });
    } catch (err) {
        console.error('Erro ao buscar questões por disciplina:', err.message);
        res.status(500).json({ error: 'Erro ao buscar questões por disciplina.' });
    }
};


// Verificar se a resposta está correta
exports.verificarResposta = async (req, res) => {
    const { questaoId, alternativaSelecionada } = req.body;

    if (!questaoId || !alternativaSelecionada) {
        return res.status(400).json({ error: 'O ID da questão e a alternativa selecionada são obrigatórios.' });
    }

    try {
        const resultado = await questoesModel.getAlternativaCorreta(questaoId);

        if (!resultado) {
            return res.status(404).json({ error: 'Questão não encontrada.' });
        }

        const correta = resultado.alternativa_correta; // A alternativa correta da questão
        const corretaFormatada = correta.toLowerCase(); // Formato consistente para comparação

        if (corretaFormatada === alternativaSelecionada.toLowerCase()) {
            return res.status(200).json({ correta: true, mensagem: 'Parabéns! Resposta correta.' });
        } else {
            return res.status(200).json({ correta: false, mensagem: 'Resposta incorreta. Tente novamente!' });
        }
    } catch (err) {
        console.error('Erro ao verificar a resposta:', err.message);
        res.status(500).json({ error: 'Erro ao verificar a resposta.' });
    }
};

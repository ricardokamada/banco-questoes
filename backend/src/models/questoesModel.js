const pool = require('../config/db');

// Criar uma nova questão
exports.createQuestao = async ({
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
}) => {
    const query = `
        INSERT INTO questoes (
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
            alternativa_e
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING *;
    `;
    const values = [
        questao,
        banca_id,
        disciplina_id,
        cargo_id,
        ano_prova,
        alternativa_correta,
        alternativa_a || null,
        alternativa_b || null,
        alternativa_c || null,
        alternativa_d || null,
        alternativa_e || null,
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
};


// Listar todas as questões
exports.listQuestoes = async () => {
    const query = `
        SELECT 
            q.questao_id,
            q.questao,
            q.ano_prova,
            q.alternativa_correta,
            q.alternativa_a,
            q.alternativa_b,
            q.alternativa_c,
            q.alternativa_d,
            q.alternativa_e,
            b.nome_banca,
            d.nome_disciplina,
            c.nome_cargo
        FROM questoes q
        JOIN bancas b ON q.banca_id = b.banca_id
        JOIN disciplinas d ON q.disciplina_id = d.disciplina_id
        JOIN cargos c ON q.cargo_id = c.cargo_id;
    `;

    const result = await pool.query(query);
    return result.rows;
};

// Atualizar uma questão
exports.updateQuestao = async ({
    questao_id,
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
}) => {
    const query = `
        UPDATE questoes
        SET 
            questao = $1,
            banca_id = $2,
            disciplina_id = $3,
            cargo_id = $4,
            ano_prova = $5,
            alternativa_correta = $6,
            alternativa_a = $7,
            alternativa_b = $8,
            alternativa_c = $9,
            alternativa_d = $10,
            alternativa_e = $11
        WHERE questao_id = $12
        RETURNING *;
    `;
    const values = [
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
        questao_id,
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
};

// Deletar uma questão
exports.deleteQuestao = async (questao_id) => {
    const query = `DELETE FROM questoes WHERE questao_id = $1`;
    const result = await pool.query(query, [questao_id]);
    return result.rowCount;
};




exports.getQuestaoById = async (idQuestao) => {
    const query = `
        SELECT 
            q.questao_id,
            q.questao AS enunciado,
            q.ano_prova AS ano,
            q.alternativa_a,
            q.alternativa_b,
            q.alternativa_c,
            q.alternativa_d,
            q.alternativa_e,
            q.alternativa_correta,
            b.nome_banca AS banca,
            d.nome_disciplina AS disciplina,
            c.nome_cargo AS cargo
        FROM questoes q
        LEFT JOIN bancas b ON q.banca_id = b.banca_id
        LEFT JOIN disciplinas d ON q.disciplina_id = d.disciplina_id
        LEFT JOIN cargos c ON q.cargo_id = c.cargo_id
        WHERE q.questao_id = $1;
    `;

    try {
        const result = await pool.query(query, [idQuestao]);
        
        if (result.rows.length === 0) {
            throw new Error("Questão não encontrada.");
        }

        return result.rows[0]; // Retorna a questão completa
    } catch (error) {
        console.error("Erro ao buscar questão:", error.message);
        throw new Error("Erro ao buscar a questão. Tente novamente mais tarde.");
    }
};


  
  // Buscar questões pelo texto do enunciado
  exports.getQuestoesByText = async (texto) => {
    const query = `
        SELECT 
            q.questao_id,
            q.questao AS enunciado,
            q.ano_prova,
            q.alternativa_correta,
            q.alternativa_a,
            q.alternativa_b,
            q.alternativa_c,
            q.alternativa_d,
            q.alternativa_e,
            b.nome_banca,
            d.nome_disciplina,
            c.nome_cargo
        FROM questoes q
        LEFT JOIN bancas b ON q.banca_id = b.banca_id
        LEFT JOIN disciplinas d ON q.disciplina_id = d.disciplina_id
        LEFT JOIN cargos c ON q.cargo_id = c.cargo_id
        WHERE q.questao ILIKE $1;
    `;
    const values = [`%${texto.trim()}%`]; // Remove espaços extras antes e depois
    try {
        const result = await pool.query(query, values);
        return result.rows;
    } catch (error) {
        console.error("Erro ao buscar questões pelo texto:", error.message);
        throw new Error("Erro ao buscar questões. Verifique o backend.");
    }
};


exports.getQuestoesByDisciplina = async (disciplinaId) => {
    const query = `
        SELECT 
            q.questao_id,
            q.questao,
            q.ano_prova,
            q.alternativa_correta,
            q.alternativa_a,
            q.alternativa_b,
            q.alternativa_c,
            q.alternativa_d,
            q.alternativa_e,
            b.nome_banca,
            d.nome_disciplina,
            c.nome_cargo
        FROM questoes q
        JOIN bancas b ON q.banca_id = b.banca_id
        JOIN disciplinas d ON q.disciplina_id = d.disciplina_id
        JOIN cargos c ON q.cargo_id = c.cargo_id
        WHERE q.disciplina_id = $1;
    `;
    try {
        const result = await pool.query(query, [disciplinaId]);
        return result.rows;
    } catch (err) {
        console.error('Erro ao buscar questões por disciplina:', err.message);
        throw new Error('Erro ao buscar questões por disciplina.');
    }
};

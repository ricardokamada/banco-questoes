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

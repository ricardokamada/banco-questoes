// disciplinaModels.js

const pool = require('../config/db');

// Criar uma nova disciplina
exports.createDisciplina = async (nome_disciplina) => {
    const result = await pool.query(
        `INSERT INTO disciplinas (nome_disciplina) VALUES ($1) RETURNING *`,
        [nome_disciplina]
    );
    return result.rows[0];
};

// Listar todas as disciplinas
exports.listDisciplinas = async () => {
    const result = await pool.query(`SELECT * FROM disciplinas`);
    return result.rows;
};

// Atualizar uma disciplina
exports.updateDisciplina = async (id, nome_disciplina) => {
    const result = await pool.query(
        `UPDATE disciplinas SET nome_disciplina = $1 WHERE disciplina_id = $2 RETURNING *`,
        [nome_disciplina, id]
    );
    return result.rows[0];
};

// Deletar uma disciplina
exports.deleteDisciplina = async (id) => {
    const result = await pool.query(
        `DELETE FROM disciplinas WHERE disciplina_id = $1`,
        [id]
    );
    return result.rowCount; // Retorna o número de linhas deletadas
};

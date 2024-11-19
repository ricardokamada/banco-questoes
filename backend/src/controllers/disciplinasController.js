const pool = require('../config/db');

// Criar disciplina
exports.createDisciplina = async (req, res) => {
  const { nome } = req.body;

  try {
    const result = await pool.query(`INSERT INTO disciplinas (nome) VALUES ($1) RETURNING *`, [nome]);
    res.status(201).json({ disciplina: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar disciplina.', details: err.message });
  }
};

// Listar disciplinas
exports.listDisciplinas = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM disciplinas`);
    res.json({ disciplinas: result.rows });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar disciplinas.', details: err.message });
  }
};

// Atualizar disciplina
exports.updateDisciplina = async (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;

  if (!nome) {
    return res.status(400).json({ error: 'O campo "nome" é obrigatório.' });
  }

  try {
    const result = await pool.query(
      `UPDATE disciplinas SET nome = $1 WHERE disciplina_id = $2 RETURNING *`,
      [nome, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Disciplina não encontrada.' });
    }

    res.json({ disciplina: result.rows[0] });
  } catch (err) {
    console.error('Erro ao atualizar disciplina:', err.message);
    res.status(500).json({ error: 'Erro ao atualizar disciplina.', details: err.message });
  }
};

// Deletar disciplina
exports.deleteDisciplina = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(`DELETE FROM disciplinas WHERE disciplina_id = $1`, [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Disciplina não encontrada.' });
    }

    res.json({ message: 'Disciplina deletada com sucesso.' });
  } catch (err) {
    console.error('Erro ao deletar disciplina:', err.message);
    res.status(500).json({ error: 'Erro ao deletar disciplina.', details: err.message });
  }
};

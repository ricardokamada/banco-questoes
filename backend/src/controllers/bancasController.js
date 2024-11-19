const pool = require('../config/db');

// Criar banca
exports.createBanca = async (req, res) => {
  const { nome_banca } = req.body;

  if (!nome_banca) {
    return res.status(400).json({ error: 'O campo "nome_banca" é obrigatório.' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO bancas (nome_banca) VALUES ($1) RETURNING *`,
      [nome_banca]
    );
    res.status(201).json({ banca: result.rows[0] });
  } catch (err) {
    console.error('Erro ao criar banca:', err.message);
    res.status(500).json({ error: 'Erro ao criar banca.', details: err.message });
  }
};

// Listar bancas
exports.listBancas = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM bancas`);
    res.json({ bancas: result.rows });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar bancas.', details: err.message });
  }
};

// Atualizar banca
exports.updateBanca = async (req, res) => {
  const { id } = req.params;
  const { nome_banca } = req.body;

  if (!nome_banca) {
    return res.status(400).json({ error: 'O campo "nome_banca" é obrigatório.' });
  }

  try {
    const result = await pool.query(
      `UPDATE bancas SET nome_banca = $1 WHERE banca_id = $2 RETURNING *`,
      [nome_banca, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Banca não encontrada.' });
    }

    res.json({ banca: result.rows[0] });
  } catch (err) {
    console.error('Erro ao atualizar banca:', err.message);
    res.status(500).json({ error: 'Erro ao atualizar banca.', details: err.message });
  }
};

// Deletar banca
exports.deleteBanca = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(`DELETE FROM bancas WHERE banca_id = $1`, [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Banca não encontrada.' });
    }

    res.json({ message: 'Banca deletada com sucesso.' });
  } catch (err) {
    console.error('Erro ao deletar banca:', err.message);
    res.status(500).json({ error: 'Erro ao deletar banca.', details: err.message });
  }
};

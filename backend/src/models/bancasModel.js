const pool = require('../config/db');

// Criar uma nova banca
exports.createBanca = async (nome_banca) => {
  const result = await pool.query(
    `INSERT INTO bancas (nome_banca) VALUES ($1) RETURNING *`,
    [nome_banca]
  );
  return result.rows[0];
};

// Listar todas as bancas
exports.listBancas = async () => {
  const result = await pool.query(`SELECT * FROM bancas`);
  return result.rows;
};

// Atualizar uma banca
exports.updateBanca = async (id, nome_banca) => {
  const result = await pool.query(
    `UPDATE bancas SET nome_banca = $1 WHERE banca_id = $2 RETURNING *`,
    [nome_banca, id]
  );
  return result.rows[0];
};

// Deletar uma banca
exports.deleteBanca = async (id) => {
  const result = await pool.query(`DELETE FROM bancas WHERE banca_id = $1`, [id]);
  return result.rowCount;
};

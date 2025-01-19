const pool = require('../config/db');

// Criar uma novo cargo
exports.createCargo = async (nome_cargo) => {
  const result = await pool.query(
    `INSERT INTO cargos (nome_cargo) VALUES ($1) RETURNING *`,
    [nome_cargo]
  );
  return result.rows[0];
};

// Listar todas os cargos
exports.listCargos = async () => {
  const result = await pool.query(`SELECT * FROM cargos`);
  return result.rows;
};

// Atualizar uma cargo
exports.updateCargo = async (id, nome_cargo) => {
  const result = await pool.query(
    `UPDATE cargos SET nome_cargo = $1 WHERE cargo_id = $2 RETURNING *`,
    [nome_cargo, id]
  );
  return result.rows[0];
};

// Deletar uma cargo
exports.deleteCargo = async (id) => {
  const result = await pool.query(`DELETE FROM cargos WHERE cargo_id = $1`, [id]);
  return result.rowCount;
};

// Buscar cargo por ID
exports.getCargoById = async (id) => {
    const result = await pool.query(`SELECT * FROM cargos WHERE cargo_id = $1`, [id]);
    return result.rows[0]; // Retorna o cargo ou undefined
  };
  
  // Buscar cargos pelo nome
  exports.getCargosByName = async (nome) => {
    const result = await pool.query(
      `SELECT * FROM cargos WHERE nome_cargo ILIKE $1`,
      [`%${nome}%`] // Busca parcial e case-insensitive
    );
    return result.rows; // Retorna uma lista de cargos
  };
  

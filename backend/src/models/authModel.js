const pool = require('../config/db');

// Criar um usuário
exports.createUser = async (nome, email, senha) => {
    const result = await pool.query(
        `INSERT INTO usuarios (nome, email, senha, tipo_usuario) VALUES ($1, $2, $3, 'usuario') RETURNING *`,
        [nome, email, senha]
    );
    return result.rows[0];
};


// Buscar um usuário pelo email
exports.findUserByEmail = async (email) => {
    const result = await pool.query(
        `SELECT * FROM usuarios WHERE email = $1`,
        [email]
    );
    return result.rows[0];
};


// Listar todos usuarios
exports.listUsuarios = async () => {
    const result = await pool.query(`SELECT * FROM usuarios`);
    return result.rows;
};

// Atualizar uma usuario
exports.updateUsuario = async (id, nome) => {
    const result = await pool.query(
        `UPDATE usuarios SET nome = $1 WHERE usuario_id = $2 RETURNING *`,
        [nome, id]
    );
    return result.rows[0];
};

// Deletar um usuario
exports.deleteUsuario = async (id) => {
    const result = await pool.query(`DELETE FROM usuarios WHERE usuario_id = $1`, [id]);
    return result.rowCount;
};







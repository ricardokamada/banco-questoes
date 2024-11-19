// src/controllers/authController.js


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

// Registrar usuário
exports.register = async (req, res) => {
  const { nome, email, senha, tipo_usuario } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(senha, 10);
    const result = await pool.query(
      `INSERT INTO usuarios (nome, email, senha, tipo_usuario) VALUES ($1, $2, $3, $4) RETURNING *`,
      [nome, email, hashedPassword, tipo_usuario]
    );
    res.status(201).json({ user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao registrar usuário' });
  }
};

// Login do usuário
exports.login = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const result = await pool.query(`SELECT * FROM usuarios WHERE email = $1`, [email]);
    const user = result.rows[0];
    if (!user || !(await bcrypt.compare(senha, user.senha))) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ id: user.usuario_id, tipo: user.tipo_usuario }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao realizar login' });
  }
};

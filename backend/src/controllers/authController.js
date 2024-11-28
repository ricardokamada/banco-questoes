// src/controllers/authController.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authModel = require('../models/authModel'); // Importa o modelo
require('dotenv').config(); // Certifique-se de que as variáveis de ambiente estejam carregadas

// Registrar usuário
exports.register = async (req, res) => {
  const { nome, email, senha } = req.body;

  console.log('Email recebido:', email);
  console.log('Usuário encontrado:', user);


  if (!nome || !email || !senha) {
    return res.status(400).json({ error: 'Nome, email e senha são obrigatórios.' });
  }

  try {
    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Salvar o usuário no banco de dados
    const result = await authModel.createUser(nome, email, hashedPassword);

    res.status(201).json({
      message: 'Usuário registrado com sucesso.',
      user: {
        id: result.usuario_id,
        nome: result.nome,
        email: result.email,
      },
    });
  } catch (err) {
    console.error('Erro ao registrar usuário:', err.message);
    res.status(500).json({ error: 'Erro ao registrar usuário.' });
  }
};

// Login do usuário
exports.login = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
  }

  try {
    // Buscar o usuário pelo email
    const user = await authModel.findUserByEmail(email);

    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    // Comparar a senha fornecida com a armazenada
    const isPasswordValid = await bcrypt.compare(senha, user.senha);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    // Gerar token JWT
    const token = jwt.sign(
      { id: user.usuario_id, tipo: user.tipo_usuario },
      process.env.JWT_SECRET,
      { expiresIn: '6h' }
    );

    res.json({ message: 'Login bem-sucedido.', token });
  } catch (err) {
    console.error('Erro ao realizar login:', err.message);
    res.status(500).json({ error: 'Erro ao realizar login.' });
  }
};

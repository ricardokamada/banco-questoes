const jwt = require('jsonwebtoken');

// Middleware para verificar se o usuário é administrador
exports.isAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ error: 'Acesso negado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.tipo !== 'administrador') {
      return res.status(403).json({ error: 'Acesso permitido apenas para administradores' });
    }
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token inválido ou expirado' });
  }
};

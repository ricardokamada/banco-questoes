const pool = require('../config/db');

// Buscar perfil do usuário por ID
exports.getUserById = async (id) => {
    const result = await pool.query(
        `SELECT usuario_id, nome, email, tipo_usuario, criado_em, status_pagamento, valor_pagamento, data_pagamento, usuario_ativo, plano_expira_em, total_questoes_respondidas, total_questoes_acertos, total_questoes_erradas 
        FROM usuarios 
        WHERE usuario_id = $1`,
        [id]
    );
    return result.rows[0]; // Retorna o usuário ou undefined
};

// Atualizar status do pagamento e campo usuario_ativo
exports.updatePaymentStatus = async (id, status_pagamento, usuario_ativo) => {
    const result = await pool.query(
        `UPDATE usuarios SET status_pagamento = $1, usuario_ativo = $2 WHERE usuario_id = $3 RETURNING *`,
        [status_pagamento, usuario_ativo, id]
    );
    return result.rows[0];
};
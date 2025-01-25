import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarHome from '../components/SidebarHome';

const HomePage = () => {
  const disciplinas = [
    'Banco de dados',
    'SQL',
    'PL/SQL',
    'ORACLE APEX',
    'TESTE DE SOFTWARE',
    'PYTHON',
    'JAVASCRIPT',
    'C++',
    'C',
    'C#',
    'PHP',
    'ITIL',
    'COBIT',
    'KAMBAN',
    'LINUX',
    'WINDOWS',
  ];

  const [disciplinaAtiva, setDisciplinaAtiva] = useState(null);
  const navigate = useNavigate();

  return (
    <div>
      <header className="d-flex justify-content-end py-1 bg-light border-bottom">
        <button
          className="btn btn-outline-primary btn-sm me-1"
          onClick={() => navigate('/')}
        >
          Home
        </button>
        <button
          className="btn btn-outline-primary btn-sm me-1"
          onClick={() => navigate('/cadastro')}
        >
          Cadastro
        </button>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => navigate('/login')}
        >
          Login
        </button>
      </header>

      <div className="d-flex">
        <SidebarHome
          disciplinas={disciplinas}
          onDisciplinaSelect={setDisciplinaAtiva}
          disciplinaAtiva={disciplinaAtiva}
        />
        <div className="container mt-4">
          {/* Texto de boas-vindas */}
          <div className="bg-light p-4 rounded shadow-sm mb-4">
            <h2 className="text-center mb-3">Bem-vindo(a) a Plataforma Banco de Questões!</h2>
            <p className="text-muted">
              Estamos empolgados em tê-lo(a) conosco nesta jornada de aprendizado e preparação. Aqui, você encontrará uma ampla gama de questões que vão impulsionar seus estudos e aprimorar seus conhecimentos.
            </p>
            <h4 className="text-primary">Acesso Gratuito</h4>
            <p className="mb-3">
              Responda questões de <strong>Português</strong> e <strong>Matemática</strong> de forma completamente <strong>gratuita</strong>.
            </p>
            <h4 className="text-primary">Acesso Premium</h4>
            <p className="mb-3">
              Disciplinas de tecnologia como <strong>Banco de Dados</strong>, <strong>Programação</strong>, <strong>Linux</strong>, entre outras, estão disponíveis apenas para usuários cadastrados no plano de <strong>R$ 79,00</strong> mensais.
            </p>
            <h4 className="text-primary">Desconto com Criptomoedas</h4>
            <p>
              Pague com <strong>Bitcoin (BTC)</strong>, <strong>BNB</strong> ou <strong>USDT</strong> e receba um <strong>desconto de 30%</strong> no valor do plano!
            </p>

            {/* Linha de separação */}
            <hr className="my-4" />

            {/* QR Code Section */}
            <div className="d-flex align-items-center mt-4">
              {/* QR Code */}
              <div className="me-4">
                <img
                  src="/qrcode_pix.jpg" // Caminho correto para o QR Code
                  alt="QR Code para pagamentos via Pix"
                  className="img-fluid"
                  style={{ maxWidth: '200px', border: '1px solid #ccc', borderRadius: '8px' }}
                />
              </div>

              {/* Informações ao lado do QR Code */}
              <div>
                <h5 className="text-primary">Deseja fazer uma doação ou pagamento?</h5>
                <p>
                  Caso prefira, você pode realizar o pagamento diretamente via <strong>Pix</strong> utilizando o QR Code ao lado. Sua contribuição é muito importante para que possamos continuar oferecendo conteúdos de qualidade e expandindo nossa plataforma!
                </p>
                {/* Logo Pix */}
                <img
                  src="/Logo-powered_by_Banco_Central.png" // Caminho correto para o logo do Pix
                  alt="Powered by Banco Central - Pix"
                  className="img-fluid mt-2"
                  style={{ maxWidth: '80px' }}
                />
              </div>
            </div>
          </div>

          {/* Conteúdo da Página */}
          {disciplinaAtiva ? (
            <h1>Conteúdo da disciplina: {disciplinaAtiva}</h1>
          ) : (
            <h1>Selecione uma disciplina no menu lateral.</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

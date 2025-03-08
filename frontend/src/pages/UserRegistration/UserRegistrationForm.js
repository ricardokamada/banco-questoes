import React, { useState } from "react";
import api from "../../services/api";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const UserRegistrationForm = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nome.trim()) {
      newErrors.nome = "Nome é obrigatório.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório.";
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) {
      newErrors.email = "Email inválido.";
    }
    if (!formData.senha) {
      newErrors.senha = "Senha é obrigatória.";
    } else if (formData.senha.length < 3) {
      newErrors.senha = "A senha deve ter pelo menos 4 caracteres.";
    }
    if (formData.senha !== formData.confirmarSenha) {
      newErrors.confirmarSenha = "As senhas não coincidem.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
        const response = await api.post("/register", {
          nome: formData.nome,
          email: formData.email,
          senha: formData.senha,
        });
      
        Swal.fire({
          icon: "success",
          title: "Cadastro realizado com sucesso!",
          text: "Você será redirecionado para a página de pagamento.",
          confirmButtonText: "OK",
        }).then(() => {
          
            navigate("/checkout");
        });
      
        // Reset form
        setFormData({ nome: "", email: "", senha: "", confirmarSenha: "" });
        setErrors({});
      } catch (error) {
        console.error("Erro ao cadastrar usuário", error);
        Swal.fire({
          icon: "error",
          title: "Erro ao cadastrar",
          text: "Tente novamente mais tarde.",
          confirmButtonText: "OK",
        });
      }
      
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title text-center mb-4">Cadastro de Usuário</h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Nome</label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    className={`form-control ${errors.nome ? "is-invalid" : ""}`}
                    placeholder="Digite seu nome"
                  />
                  {errors.nome && <div className="invalid-feedback">{errors.nome}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    placeholder="Digite seu email"
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Senha</label>
                  <input
                    type="password"
                    name="senha"
                    value={formData.senha}
                    onChange={handleChange}
                    className={`form-control ${errors.senha ? "is-invalid" : ""}`}
                    placeholder="Digite sua senha"
                  />
                  {errors.senha && <div className="invalid-feedback">{errors.senha}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Confirmar Senha</label>
                  <input
                    type="password"
                    name="confirmarSenha"
                    value={formData.confirmarSenha}
                    onChange={handleChange}
                    className={`form-control ${errors.confirmarSenha ? "is-invalid" : ""}`}
                    placeholder="Confirme sua senha"
                  />
                  {errors.confirmarSenha && <div className="invalid-feedback">{errors.confirmarSenha}</div>}
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Cadastrar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegistrationForm;

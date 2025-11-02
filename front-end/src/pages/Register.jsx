import React from "react";
import { useUserContext } from "../contexts/UserContext";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const { setUser } = useUserContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email && password && name) {
      try {
        const { data: userDoc } = await axios.post("/users", {
          name,
          email,
          password,
        });
        setUser(userDoc);
        setRedirect(true);
      } catch (error) {
        alert(`Deu um erro ao cadastrar o usuário: ${JSON.stringify(error)}`);
      }
    } else {
      alert("Preencha o e-mail o nome e senha!");
    }
  };

  if (redirect) return <Navigate to="/" />;

  return (
    <section className="flex items-center">
      <div className="mx-auto flex w-full max-w-96 flex-col items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-700 md:text-3xl">
          Faça seu cadastro
        </h2>
        <form className="flex w-full flex-col gap-2" onSubmit={handleSubmit}>
          <input
            type="text"
            className="w-76 self-center rounded-full border border-gray-300 px-2 py-1 placeholder-gray-400 md:w-full md:px-4 md:py-2"
            placeholder="Digite seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            className="w-76 self-center rounded-full border border-gray-300 px-2 py-1 placeholder-gray-400 md:w-full md:px-4 md:py-2"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-76 self-center rounded-full border border-gray-300 px-2 py-1 placeholder-gray-400 md:w-full md:px-4 md:py-2"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="bg-primary-400 mt-1 w-76 cursor-pointer self-center rounded-full border border-gray-300 px-2 py-1 font-bold text-white md:w-full md:px-4 md:py-2">
            Registrar
          </button>
        </form>
        <p>
          Já tem uma conta?{" "}
          <Link to="/login" className="font-semibold underline">
            Logue aqui!
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;

import { useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import { Link, Navigate } from "react-router-dom";
import React from "react";
import axios from "axios";

const Login = () => {
  const { user, setUser } = useUserContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email && password) {
      try {
        const { data: userDoc } = await axios.post("/users/login", {
          email,
          password,
        });
        setUser(userDoc);
        setRedirect(true);
      } catch (error) {
        alert(`Deu um erro ao logar: ${error.response.data}`);
      }
    } else {
      alert("Preencha o e-mail e senha!");
    }
  };

  if (redirect || user) return <Navigate to="/" />;

  return (
    <section className="relative flex min-h-screen items-center overflow-y-hidden">
      <div className="mx-auto flex w-full max-w-96 flex-col items-center gap-4">
        <div className="absolute inset-1 top-0 z-0">
          <img
            src="https://a0.muscache.com/im/pictures/miso/Hosting-770408447346280075/original/dfb144df-dc4d-418a-a9b9-015e6793e496.jpeg?im_w=1440"
            alt="bgimg"
            className="h-full w-full bg-fixed object-cover"
          />
        </div>
        <h2 className="text-3xl font-bold">Faça seu login</h2>
        <form
          className="relative z-10 flex w-full flex-col gap-2"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            className="w-full rounded-full border border-gray-700 bg-white px-4 py-2 placeholder-gray-700"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full rounded-full border border-gray-700 bg-white px-4 py-2 placeholder-gray-700"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="bg-primary-400 w-full cursor-pointer rounded-full border border-gray-300 px-4 py-2 font-bold text-white opacity-80">
            Login
          </button>
        </form>
        <p className="z-10 text-white">
          Ainda não tem uma conta?{" "}
          <Link to="/register" className="font-semibold underline">
            Registre-se aqui!
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;

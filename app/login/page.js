"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: usuario, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const role = data.userRecord.role;
        const username = data.userRecord.user;
        const userId = data.userRecord.id;

        localStorage.setItem("token", data.token);
        localStorage.setItem("role", role);
        localStorage.setItem("username", username);
        localStorage.setItem("userId", userId);

        router.push("/dashboard"); // Redirect to the dashboard
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error al autenticar:", error);
      setError(
        "Ocurrió un error al intentar iniciar sesión. Por favor, inténtalo de nuevo."
      );
    }
  };

  const handleRegister = () => {
    router.push("/register"); // Redirect to the registration page
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Inicio de Sesión</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <label htmlFor="usuario" className="block mb-2">
          Email:
        </label>
        <input
          type="email"
          id="usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          required
          className="w-full p-2 border rounded mb-4"
        />
        <label htmlFor="password" className="block mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 border rounded mb-4"
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Iniciar sesión
        </button>
        <button
          type="button"
          onClick={handleRegister}
          className="w-full bg-green-500 text-white py-2 rounded mt-4"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Login;

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const router = useRouter();
  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({
    user: "",
    password: "",
    nombre: "",
    apellidos: "",
    titulo: "", // Solo para docentes
    matricula: "", // Solo para alumnos
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    // Reset form data when role changes
    setFormData({
      user: "",
      password: "",
      nombre: "",
      apellidos: "",
      titulo: "",
      matricula: "",
      fechaNaciemiento: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, role }),
      });

      if (response.ok) {
        const data = await response.json();
        router.push("/login"); // Redirect to login page after successful registration
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Error en el registro.");
      }
    } catch (error) {
      console.error("Error al registrar:", error);
      setError(
        "Ocurrió un error al intentar registrar el usuario. Por favor, inténtalo de nuevo."
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Registro</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <label htmlFor="role" className="block mb-2">
          Role:
        </label>
        <select
          id="role"
          name="role"
          value={role}
          onChange={handleRoleChange}
          className="w-full p-2 border rounded mb-4"
          required
        >
          <option value="">Select Role</option>
          <option value="docente">Docente</option>
          <option value="estudiante">Alumno</option>
        </select>

        <label htmlFor="user" className="block mb-2">
          Email:
        </label>
        <input
          type="email"
          id="user"
          name="user"
          value={formData.user}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-4"
        />

        <label htmlFor="password" className="block mb-2">
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-4"
        />

        <label htmlFor="nombre" className="block mb-2">
          Nombre:
        </label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-4"
        />

        <label htmlFor="apellidos" className="block mb-2">
          Apellidos:
        </label>
        <input
          type="text"
          id="apellidos"
          name="apellidos"
          value={formData.apellidos}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-4"
        />

        {role === "docente" && (
          <>
            <label htmlFor="titulo" className="block mb-2">
              Título:
            </label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded mb-4"
            />
          </>
        )}

        {role === "estudiante" && (
          <>
            <label htmlFor="matricula" className="block mb-2">
              Matrícula:
            </label>
            <input
              type="text"
              id="matricula"
              name="matricula"
              value={formData.matricula}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded mb-4"
            />
            <label htmlFor="fechaNacimiento" className="block mb-2">
              Fecha de Nacimiento:
            </label>
            <input
              type="date"
              id="fechaNaciemiento"
              name="fechaNaciemiento"
              value={formData.fechaNaciemiento}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded mb-4"
            />
          </>
        )}

        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Registrar
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;

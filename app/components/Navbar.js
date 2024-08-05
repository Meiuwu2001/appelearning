"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios"; // Asegúrate de tener axios importado
import { FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const [username, setUsername] = useState("");
  const router = useRouter();
  let iddoc;
  let idalumn;
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const role = localStorage.getItem("role");
      if (role === "estudiante") {
        if (userId) {
          // Simulación de consulta a la API para obtener el nombre del usuario
          const response = await axios.get(
            `/api/alumnos/alumnobydoc/${userId}`
          );
          setUsername(
            `${response.data.message[0].nombre} ${response.data.message[0].apellidos}`
          );
          idalumn = response.data.message[0].id;
          localStorage.setItem("idalumn", idalumn);
        }
      } else if (role === "docente") {
        if (userId) {
          // Simulación de consulta a la API para obtener el nombre del usuario
          const response = await axios.get(
            `/api/docentes/docentesbydoc/${userId}`
          );
          setUsername(
            `${response.data.message[0].nombre} ${response.data.message[0].apellidos}`
          );
          iddoc = response.data.message[0].id;
          localStorage.setItem("iddoc", iddoc);
        }
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const handleLogout = async () => {
    try {
      // Simulación de cierre de sesión
      localStorage.removeItem("token");
      localStorage.removeItem("username");

      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-gray-800 text-white flex items-center justify-between p-4 shadow-lg z-10">
      <div className="text-lg font-bold"></div>
      <div className="flex items-center">
        {username && (
          <span className="mr-4 text-sm">{`Hola, ${username}`}</span>
        )}
        <button
          onClick={handleLogout}
          className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded flex items-center"
        >
          <span className="mr-2">Cerrar sesión</span>
          <FaSignOutAlt className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;

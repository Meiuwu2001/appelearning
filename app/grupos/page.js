"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import Sidebar from "../components/sidebar";
import Modal from "../components/moda";

const Grupos = () => {
  const [grupos, setGrupos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/grupos");
      setGrupos(response.data.message); // Acceder a la lista de usuarios
      setLoading(false);
    } catch (error) {
      console.error("Error fetching alumns:", error);
      setLoading(false);
    }
  };

  const handleDeleteClick = (id) => {
    setUserIdToDelete(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`/api/grupos/${userIdToDelete}`);
      fetchUsers();
      setShowModal(false);
      setUserIdToDelete(null);
    } catch (error) {
      console.error("Error deleting alumns:", error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Administración de Usuarios</h1>
        <Link
          href="/admin/add"
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block"
        >
          Añadir usuario
        </Link>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Grado y grupo</th>
                     <th className="py-2 px-4 border-b">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {grupos.map((grupo) => (
                <tr key={grupo.id}>
                  <td className="py-2 px-4 border-b">{grupo.grado_grupo}</td>
                  <td className="py-2 px-4 border-b">
                    <Link
                      href={`/admin/${grupo.id}`}
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDeleteClick(grupo.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default Grupos;

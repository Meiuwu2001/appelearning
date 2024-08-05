"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { ModalAddDocentes } from "../components/docentes/modalAddDocente"; // Asegúrate de que la ruta sea correcta
import Modal from "../components/docentes/modalDelete";
import { ModalEdit } from "../components/docentes/modalEdit";
import ProtectedRoute from "../components/ProtectedRoute";
import Navbar from "../components/Navbar";

const Docentes = () => {
  const [docentes, setDocentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [docenteIdToDelete, setDocenteIdToDelete] = useState(null);
  const [docenteToEdit, setDocenteToEdit] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    fetchDocentes();
  }, []);

  const fetchDocentes = async () => {
    try {
      const response = await axios.get("/api/docentes");
      setDocentes(response.data.message); // Acceder a la lista de docentes
      setLoading(false);
    } catch (error) {
      console.error("Error fetching docentes:", error);
      setLoading(false);
    }
  };

  const handleDeleteClick = (id) => {
    setDocenteIdToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`/api/docentes/${docenteIdToDelete}`);
      fetchDocentes();
      setShowDeleteModal(false);
      setDocenteIdToDelete(null);
    } catch (error) {
      console.error("Error deleting docente:", error);
    }
  };

  const handleEditClick = (docente) => {
    setDocenteToEdit(docente);
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedDocente = {
        nombre: docenteToEdit.nombre,
        apellidos: docenteToEdit.apellidos,
        titulo: docenteToEdit.titulo,
      };
      await axios.put(`/api/docentes/${docenteToEdit.id}`, updatedDocente);
      fetchDocentes();
      setShowEditModal(false);
      setDocenteToEdit(null);
    } catch (error) {
      console.error("Error updating docente:", error);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setDocenteToEdit((prev) => ({ ...prev, [name]: value }));
  };

  const handleUserAdded = () => {
    fetchDocentes();
  };

  return (
    <ProtectedRoute>
      <div className="flex h-screen">
        <Sidebar setSidebarCollapsed={setSidebarCollapsed} />
        <div
          className={`flex flex-col w-full transition-all duration-300 ${
            sidebarCollapsed ? "ml-20" : "ml-64"
          }`}
        >
          <Navbar />
          <div className="flex-1 overflow-y-auto p-4 mt-16">
            <h1 className="text-2xl font-bold mb-4">
              Administración de Docentes
            </h1>
            <button
              onClick={() => setShowAddUserModal(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block"
            >
              Añadir Docente
            </button>
            {loading ? (
              <p>Cargando...</p>
            ) : (
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Nombre</th>
                    <th className="py-2 px-4 border-b">Apellidos</th>
                    <th className="py-2 px-4 border-b">Título</th>
                    <th className="py-2 px-4 border-b">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {docentes.map((docente) => (
                    <tr key={docente.id}>
                      <td className="text-center py-2 px-4 border-b">
                        {docente.nombre}
                      </td>
                      <td className="text-center py-2 px-4 border-b">
                        {docente.apellidos}
                      </td>
                      <td className="text-center py-2 px-4 border-b">
                        {docente.titulo}
                      </td>
                      <td className="text-center py-2 px-4 border-b">
                        <button
                          onClick={() => handleEditClick(docente)}
                          className="bg-yellow-500 text-white px-2 py-1 rounded ml-2"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeleteClick(docente.id)}
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
        </div>
        <Modal
          show={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
        />
        <ModalEdit
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
        >
          <form onSubmit={handleEditSubmit}>
            <label className="block mb-2">
              Nombre:
              <input
                type="text"
                name="nombre"
                value={docenteToEdit?.nombre || ""}
                onChange={handleEditChange}
                className="border p-2 w-full"
                required
              />
            </label>
            <label className="block mb-2">
              Apellidos:
              <input
                type="text"
                name="apellidos"
                value={docenteToEdit?.apellidos || ""}
                onChange={handleEditChange}
                className="border p-2 w-full"
                required
              />
            </label>
            <label className="block mb-2">
              Título:
              <input
                type="text"
                name="titulo"
                value={docenteToEdit?.titulo || ""}
                onChange={handleEditChange}
                className="border p-2 w-full"
                required
              />
            </label>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Actualizar
            </button>
          </form>
        </ModalEdit>
        <ModalAddDocentes
          isOpen={showAddUserModal}
          onClose={() => setShowAddUserModal(false)}
          onUserAdded={handleUserAdded}
        />
      </div>
    </ProtectedRoute>
  );
};

export default Docentes;

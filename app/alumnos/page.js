"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "@/app/components/Sidebar";
import Modal from "../components/alumnos/modalDelete";
import { ModalEdit } from "../components/alumnos/modalEdit";
import { ModalAddAlumno } from "../components/alumnos/ModalAddAlumno";
import ProtectedRoute from "../components/protectedRoute";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";

const Alumnos = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddAlumnoModal, setShowAddAlumnoModal] = useState(false);
  const [alumnoIdToDelete, setAlumnoIdToDelete] = useState(null);
  const [alumnoToEdit, setAlumnoToEdit] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [role, setRole] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const roleFromLocalStorage = localStorage.getItem("role");
    setRole(roleFromLocalStorage);

    if (roleFromLocalStorage === "estudiante") {
      router.push("/NotAuthorized "); // Redirige a una página de "No autorizado" o cualquier otra página que desees
    } else {
      fetchAlumnos();
    }
  }, [role, router]);

  const fetchAlumnos = async () => {
    try {
      const response = await axios.get("/api/alumnos");
      setAlumnos(response.data.message); // Acceder a la lista de alumnos
      setLoading(false);
    } catch (error) {
      console.error("Error fetching alumnos:", error);
      setLoading(false);
    }
  };

  const handleDeleteClick = (id) => {
    setAlumnoIdToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`/api/alumnos/${alumnoIdToDelete}`);
      fetchAlumnos();
      setShowDeleteModal(false);
      setAlumnoIdToDelete(null);
    } catch (error) {
      console.error("Error deleting alumno:", error);
    }
  };

  const handleEditClick = (alumno) => {
    setAlumnoToEdit(alumno);
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedAlumno = {
        nombre: alumnoToEdit.nombre,
        apellidos: alumnoToEdit.apellidos,
        // Añadir otros campos si es necesario
      };
      await axios.put(`/api/alumnos/${alumnoToEdit.id}`, updatedAlumno);
      fetchAlumnos();
      setShowEditModal(false);
      setAlumnoToEdit(null);
    } catch (error) {
      console.error("Error updating alumno:", error);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setAlumnoToEdit((prev) => ({ ...prev, [name]: value }));
  };

  const handleAlumnoAdded = () => {
    fetchAlumnos();
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
              Administración de Alumnos
            </h1>
            <button
              onClick={() => setShowAddAlumnoModal(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block"
            >
              Añadir alumno
            </button>
            {loading ? (
              <p>Cargando...</p>
            ) : (
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Nombre</th>
                    <th className="py-2 px-4 border-b">Apellidos</th>
                    <th className="py-2 px-4 border-b">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {alumnos.map((alumno) => (
                    <tr key={alumno.id}>
                      <td className="text-center py-2 px-4 border-b">
                        {alumno.nombre}
                      </td>
                      <td className="text-center py-2 px-4 border-b">
                        {alumno.apellidos}
                      </td>
                      <td className="text-center py-2 px-4 border-b">
                        <button
                          onClick={() => handleEditClick(alumno)}
                          className="bg-yellow-500 text-white px-2 py-1 rounded ml-2"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeleteClick(alumno.id)}
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
                value={alumnoToEdit?.nombre || ""}
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
                value={alumnoToEdit?.apellidos || ""}
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
        <ModalAddAlumno
          isOpen={showAddAlumnoModal}
          onClose={() => setShowAddAlumnoModal(false)}
          onAlumnoAdded={handleAlumnoAdded}
        />
      </div>
    </ProtectedRoute>
  );
};

export default Alumnos;

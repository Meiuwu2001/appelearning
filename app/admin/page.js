"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Modal from "../components/users/modalDelete";
import { ModalEdit } from "../components/users/modalEdit";
import { ModalAddUser } from "../components/users/modalAddUser"; // Asegúrate de que la ruta sea correcta
import ProtectedRoute from "../components/ProtectedRoute";
import Navbar from "../components/Navbar";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [userToEdit, setUserToEdit] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/users");
      setUsers(response.data.message); // Acceder a la lista de usuarios
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  const handleDeleteClick = (id) => {
    setUserIdToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`/api/users/${userIdToDelete}`);
      fetchUsers();
      setShowDeleteModal(false);
      setUserIdToDelete(null);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEditClick = (user) => {
    setUserToEdit(user);
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = {
        user: userToEdit.user,
        role: userToEdit.role,
        password: userToEdit.password || undefined,
      };
      await axios.put(`/api/users/${userToEdit.id}`, updatedUser);
      fetchUsers();
      setShowEditModal(false);
      setUserToEdit(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setUserToEdit((prev) => ({ ...prev, [name]: value }));
  };

  const handleUserAdded = () => {
    fetchUsers();
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
            <h1 className="text-2xl font-bold mb-4">Administración de Usuarios</h1>
            <button
              onClick={() => setShowAddUserModal(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block"
            >
              Añadir usuario
            </button>
            {loading ? (
              <p>Cargando...</p>
            ) : (
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Email</th>
                    <th className="py-2 px-4 border-b">Rol</th>
                    <th className="py-2 px-4 border-b">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="text-center py-2 px-4 border-b">
                        {user.user}
                      </td>
                      <td className="text-center py-2 px-4 border-b">
                        {user.role}
                      </td>
                      <td className="text-center py-2 px-4 border-b">
                        <button
                          onClick={() => handleEditClick(user)}
                          className="bg-yellow-500 text-white px-2 py-1 rounded ml-2"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeleteClick(user.id)}
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
              Email:
              <input
                type="email"
                name="user"
                value={userToEdit?.user || ""}
                onChange={handleEditChange}
                className="border p-2 w-full"
                required
              />
            </label>
            <label className="block mb-2">
              Rol:
              <input
                type="text"
                name="role"
                value={userToEdit?.role || ""}
                onChange={handleEditChange}
                className="border p-2 w-full"
                required
              />
            </label>
            <label className="block mb-2">
              Contraseña:
              <input
                type="password"
                name="password"
                value={userToEdit?.password || ""}
                onChange={handleEditChange}
                className="border p-2 w-full"
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
        <ModalAddUser
          isOpen={showAddUserModal}
          onClose={() => setShowAddUserModal(false)}
          onUserAdded={handleUserAdded}
        />
      </div>
    </ProtectedRoute>
  );
};

export default Admin;

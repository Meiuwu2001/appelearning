"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import Sidebar from "../components/sidebar";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // const deleteUser = async (id) => {
  //   try {
  //     await axios.delete(`/api/users/${id}`);
  //     fetchUsers();
  //   } catch (error) {
  //     console.error("Error deleting user:", error);
  //   }
  // };

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
                <th className="py-2 px-4 border-b">Usuario</th>
                <th className="py-2 px-4 border-b">Rol</th>
                <th className="py-2 px-4 border-b">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="py-2 px-4 border-b">{user.user}</td>
                  <td className="py-2 px-4 border-b">{user.role}</td>
                  <td className="py-2 px-4 border-b">
                    <Link
                      href={`/admin/edit/${user.id}`}
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => deleteUser(user.id)}
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
  );
};

export default Admin;

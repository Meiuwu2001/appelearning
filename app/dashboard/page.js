"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Sidebar from "../components/Sidebar";
import ProtectedRoute from "../components/ProtectedRoute";
import Navbar from "../components/Navbar";
import ModalJoinClass from "../components/ModalJoinClass"; // Asegúrate de que la ruta sea correcta
import ModalCreateClass from "../components/ModalCreateClass"; // Asegúrate de que la ruta sea correcta

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [role, setRole] = useState('');
  const [showJoinClassModal, setShowJoinClassModal] = useState(false);
  const [showCreateClassModal, setShowCreateClassModal] = useState(false);

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    setRole(storedRole || '');
  }, []);

  const handleJoinClass = (e) => {
    e.preventDefault();
    // Maneja el unirse a clase aquí
    setShowJoinClassModal(false);
  };

  const handleCreateClass = (e) => {
    e.preventDefault();
    // Maneja la creación de clase aquí
    setShowCreateClassModal(false);
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
            {/* Contenido basado en el rol */}
            {role === 'estudiante' ? (
              <div className="space-y-4">
                <h1 className="text-2xl font-bold mb-4">Mis Clases</h1>
                <button
                  onClick={() => setShowJoinClassModal(true)}
                  className="bg-green-500 text-white px-4 py-2 rounded mb-4"
                >
                  Unirse a Clase
                </button>
                {/* Modal para ingresar código de clase */}
                <ModalJoinClass
                  show={showJoinClassModal}
                  onClose={() => setShowJoinClassModal(false)}
                  onConfirm={handleJoinClass}
                >
                  <form onSubmit={handleJoinClass}>
                    <label className="block mb-2">
                      Código de Clase:
                      <input
                        type="text"
                        name="classCode"
                        className="border p-2 w-full"
                        required
                      />
                    </label>
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Unirse
                    </button>
                  </form>
                </ModalJoinClass>
                {/* Tarjetas de clases */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-white border rounded p-4">
                    <h2 className="text-lg font-bold mb-2">Clase 1</h2>
                    <p>Descripción de la Clase 1.</p>
                  </div>
                  <div className="bg-white border rounded p-4">
                    <h2 className="text-lg font-bold mb-2">Clase 2</h2>
                    <p>Descripción de la Clase 2.</p>
                  </div>
                  <div className="bg-white border rounded p-4">
                    <h2 className="text-lg font-bold mb-2">Clase 3</h2>
                    <p>Descripción de la Clase 3.</p>
                  </div>
                </div>
              </div>
            ) : role === 'docente' ? (
              <div className="space-y-4">
                <h1 className="text-2xl font-bold mb-4">Mis Clases</h1>
                <button
                  onClick={() => setShowCreateClassModal(true)}
                  className="bg-green-500 text-white px-4 py-2 rounded mb-4"
                >
                  Crear Clase
                </button>
                {/* Modal para crear una clase */}
                <ModalCreateClass
                  show={showCreateClassModal}
                  onClose={() => setShowCreateClassModal(false)}
                  onConfirm={handleCreateClass}
                >
                  <form onSubmit={handleCreateClass}>
                    <label className="block mb-2">
                      Nombre de la Clase:
                      <input
                        type="text"
                        name="className"
                        className="border p-2 w-full"
                        required
                      />
                    </label>
                    <label className="block mb-2">
                      Descripción:
                      <textarea
                        name="classDescription"
                        className="border p-2 w-full"
                        required
                      />
                    </label>
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Crear
                    </button>
                  </form>
                </ModalCreateClass>
                {/* Tarjetas de clases */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-white border rounded p-4">
                    <h2 className="text-lg font-bold mb-2">Clase A</h2>
                    <p>Descripción de la Clase A.</p>
                  </div>
                  <div className="bg-white border rounded p-4">
                    <h2 className="text-lg font-bold mb-2">Clase B</h2>
                    <p>Descripción de la Clase B.</p>
                  </div>
                  <div className="bg-white border rounded p-4">
                    <h2 className="text-lg font-bold mb-2">Clase C</h2>
                    <p>Descripción de la Clase C.</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <h1 className="text-2xl font-bold mb-4">Bienvenido al Dashboard</h1>
                <p className="mb-4">Has iniciado sesión correctamente.</p>
                <div className="space-y-4">
                  <Link href="/admin" legacyBehavior>
                    <a className="px-4 py-2 bg-blue-500 text-white rounded">
                      Administrar Usuarios
                    </a>
                  </Link>
                  <Link href="/tasks" legacyBehavior>
                    <a className="px-4 py-2 bg-blue-500 text-white rounded">
                      Administrar Tareas
                    </a>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;

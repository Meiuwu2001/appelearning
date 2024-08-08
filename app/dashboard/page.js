"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Sidebar from "../components/Sidebar";
import ProtectedRoute from "../components/ProtectedRoute";
import Navbar from "../components/Navbar";
import ModalJoinClass from "../components/ModalJoinClass";
import ModalCreateClass from "../components/ModalCreateClass";
import axios from "axios";

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [role, setRole] = useState("");
  const [showJoinClassModal, setShowJoinClassModal] = useState(false);
  const [showCreateClassModal, setShowCreateClassModal] = useState(false);
  const [className, setClassName] = useState("");
  const [classDescription, setClassDescription] = useState("");
  const [classCode, setClassCode] = useState("");
  const [classes, setClasses] = useState([]);
  const storedRole = localStorage.getItem("role");

  useEffect(() => {
    setRole(storedRole);
    if (storedRole === "estudiante") {
      fetchStudentClasses();
    } else if (storedRole === "docente") {
      fetchTeacherClasses();
    }
  }, [storedRole]);

  const fetchStudentClasses = async () => {
    const idalum = localStorage.getItem("idalumn");
    try {
      const response = await axios.get(`/api/alumnos_has_grupo/${idalum}`);
      if (Array.isArray(response.data)) {
        setClasses(response.data);
      } else {
        setClasses([]);
      }
    } catch (error) {
      console.error("Error fetching student classes:", error);
    }
  };

  const fetchTeacherClasses = async () => {
    const iddoc = localStorage.getItem("iddoc");
    try {
      const response = await axios.get(`/api/docentes_has_grupo/${iddoc}`);
      if (Array.isArray(response.data)) {
        setClasses(response.data);
      } else {
        setClasses([]);
      }
    } catch (error) {
      console.error("Error fetching teacher classes:", error);
    }
  };

  const handleJoinClass = async (e) => {
    e.preventDefault();
    try {
      const idAlumno = localStorage.getItem("idalumn");
      const data = {
        codigo: classCode,
        alumnos_id: idAlumno,
      };

      const response = await axios.post("/api/alumnos_has_grupo", data);

      if (response.status === 200) {
        console.log("Se unió a la clase exitosamente:", response.data);
        setClassCode("");
        setShowJoinClassModal(false);
        fetchStudentClasses();
      } else {
        console.error("Error al unirse a la clase:", response.data);
      }
    } catch (error) {
      console.error("Error al unirse a la clase:", error);
    }
  };

  const handleCreateClass = async (e) => {
    e.preventDefault();
    try {
      const id_docente = localStorage.getItem("iddoc");
      const data = {
        titulo: className,
        descripcion: classDescription,
        id_docente,
      };

      const response = await axios.post("/api/grupos", data);

      if (response.status === 200) {
        console.log("Clase creada exitosamente:", response.data);
        setClassName("");
        setClassDescription("");
        setShowCreateClassModal(false);
        fetchTeacherClasses();
      } else {
        console.error("Error al crear la clase:", response.data);
      }
    } catch (error) {
      console.error("Error al crear la clase:", error);
    }
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
            {role === "estudiante" ? (
              <div className="space-y-4">
                <h1 className="text-2xl font-bold mb-4">Mis Clases</h1>
                <button
                  onClick={() => setShowJoinClassModal(true)}
                  className="bg-green-500 text-white px-4 py-2 rounded mb-4"
                >
                  Unirse a Clase
                </button>
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
                        value={classCode}
                        onChange={(e) => setClassCode(e.target.value)}
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {classes.map((clase) => (
                    <div key={clase.id} className="bg-white border rounded p-4">
                      <h2 className="text-lg font-bold mb-2">{clase.titulo}</h2>
                      <p>{clase.descripcion}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : role === "docente" ? (
              <div className="space-y-4">
                <h1 className="text-2xl font-bold mb-4">Mis Clases</h1>
                <button
                  onClick={() => setShowCreateClassModal(true)}
                  className="bg-green-500 text-white px-4 py-2 rounded mb-4"
                >
                  Crear Clase
                </button>
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
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                        required
                      />
                    </label>
                    <label className="block mb-2">
                      Descripción:
                      <textarea
                        name="classDescription"
                        className="border p-2 w-full"
                        value={classDescription}
                        onChange={(e) => setClassDescription(e.target.value)}
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {classes.map((clase) => (
                    <div key={clase.id} className="bg-white border rounded p-4">
                      <h2 className="text-lg font-bold mb-2">{clase.titulo}</h2>
                      <p>{clase.descripcion}</p>
                      <p className="text-sm text-gray-500">
                        Código: {clase.codigo}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <h1 className="text-2xl font-bold mb-4">
                  Bienvenido al Dashboard
                </h1>
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

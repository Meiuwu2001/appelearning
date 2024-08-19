"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import ProtectedRoute from "../../components/protectedRoute";
import Sidebar from "../../../app/components/Sidebar";
import Navbar from "../../../app/components/Navbar";

const TaskPage = ({ params }) => {
  const { id } = params; // Obtener el id del grupo desde la URL
  const [role, setRole] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [students, setStudents] = useState([]); // Para almacenar la lista de estudiantes
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [grupo, setGrupo] = useState({});
  const [showStudents, setShowStudents] = useState(false); // Para alternar entre Tareas y Alumnos
  const storedRole =
    typeof window !== "undefined" ? localStorage.getItem("role") : "";

  useEffect(() => {
    setRole(storedRole);
    if (id) {
      fetchTasks(id);
      fetchGrupo(id);
      fetchStudents(id);
    }
  }, [id, storedRole]);

  const fetchTasks = async (groupId) => {
    try {
      const response = await axios.get(`/api/tareas/${groupId}`);
      if (response.data.rows && Array.isArray(response.data.rows)) {
        setTasks(response.data.rows);
      } else {
        setTasks([]);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const fetchGrupo = async (groupId) => {
    try {
      const response = await axios.get(`/api/grupos/${groupId}`);
      if (response.data.rows && Array.isArray(response.data.rows)) {
        setGrupo(response.data.rows[0]);
      } else {
        console.error("Error al obtener el grupo:", response.data);
      }
    } catch (error) {
      console.error("Error al obtener el grupo:", error);
    }
  };

  const fetchStudents = async (groupId) => {
    try {
      const response = await axios.get(`/api/alumnos/${groupId}`);
      if (response.data.rows && Array.isArray(response.data.rows)) {
        setStudents(response.data.rows);
      } else {
        setStudents([]);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const data = {
        titulo: taskTitle,
        descripcion: taskDescription,
        grupo_idgrupo: id, // Enviar el id del grupo
      };

      const response = await axios.post("/api/tareas", data);

      if (response.status === 200) {
        setTaskTitle("");
        setTaskDescription("");
        setShowTaskModal(false);
        fetchTasks(id);
      } else {
        console.error("Error al crear la tarea:", response.data);
      }
    } catch (error) {
      console.error("Error al crear la tarea:", error);
    }
  };

  const handleDeleteTask = async () => {
    if (!selectedTask) return;

    try {
      const response = await axios.delete(`/api/tareas/${selectedTask.id}`);

      if (response.status === 200) {
        setShowDeleteModal(false);
        fetchTasks(id);
      } else {
        console.error("Error al eliminar la tarea:", response.data);
      }
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
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
            <h1 className="text-2xl font-bold mb-4">
              Clase: {grupo.titulo ? grupo.titulo : "Cargando..."}
            </h1>
            <p className="text-lg mb-4">
              Descripción:{" "}
              {grupo.descripcion ? grupo.descripcion : "Cargando..."}
            </p>
            <div className="flex space-x-4 mb-4">
              <button
                onClick={() => setShowStudents(false)}
                className={`${
                  !showStudents ? "bg-blue-500" : "bg-gray-300"
                } text-white px-4 py-2 rounded`}
              >
                Ver Tareas
              </button>
              <button
                onClick={() => setShowStudents(true)}
                className={`${
                  showStudents ? "bg-blue-500" : "bg-gray-300"
                } text-white px-4 py-2 rounded`}
              >
                Ver Alumnos
              </button>
            </div>

            {!showStudents ? (
              <>
                <h1 className="text-2xl font-bold mb-4">Tareas</h1>
                {role === "docente" && (
                  <button
                    onClick={() => setShowTaskModal(true)}
                    className="bg-green-500 text-white px-4 py-2 rounded mb-4"
                  >
                    Añadir Nueva Tarea
                  </button>
                )}

                {showTaskModal && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                      <form onSubmit={handleCreateTask}>
                        <label className="block mb-2">
                          Título de la Tarea:
                          <input
                            type="text"
                            name="taskTitle"
                            className="border p-2 w-full"
                            value={taskTitle}
                            onChange={(e) => setTaskTitle(e.target.value)}
                            required
                          />
                        </label>
                        <label className="block mb-2">
                          Descripción:
                          <textarea
                            name="taskDescription"
                            className="border p-2 w-full"
                            value={taskDescription}
                            onChange={(e) => setTaskDescription(e.target.value)}
                            required
                          />
                        </label>
                        <div className="flex justify-end space-x-2">
                          <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                          >
                            Crear
                          </button>
                          <button
                            onClick={() => setShowTaskModal(false)}
                            className="bg-red-500 text-white px-4 py-2 rounded"
                          >
                            Cancelar
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}

                {role === "docente" && showDeleteModal && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                      <h2 className="text-xl font-bold mb-4">
                        Confirmar Eliminación
                      </h2>
                      <p>
                        ¿Estás seguro de que deseas eliminar la tarea &quot;
                        {selectedTask?.titulo}&quot;?
                      </p>
                      <div className="flex justify-end space-x-2 mt-4">
                        <button
                          onClick={handleDeleteTask}
                          className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                          Eliminar
                        </button>
                        <button
                          onClick={() => setShowDeleteModal(false)}
                          className="bg-gray-500 text-white px-4 py-2 rounded"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {tasks.length === 0 ? (
                  <p className="text-lg text-gray-500">No hay nada por aquí.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tasks.map((task) => (
                      <div
                        key={task.id}
                        className="bg-white border rounded p-4 shadow-sm cursor-pointer"
                        onClick={() => {
                          setSelectedTask(task);
                          setShowDeleteModal(true);
                        }}
                      >
                        <h2 className="text-lg font-bold mb-2">
                          {task.titulo}
                        </h2>
                        <p>{task.descripcion}</p>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <>
                <h1 className="text-2xl font-bold mb-4">Alumnos</h1>
                {students.length === 0 ? (
                  <p className="text-lg text-gray-500">
                    No hay alumnos registrados en esta clase.
                  </p>
                ) : (
                  <ul className="list-disc list-inside">
                    {students.map((student) => (
                      <li key={student.id} className="text-lg">
                        {student.nombre + " " + student.apellidos}
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default TaskPage;

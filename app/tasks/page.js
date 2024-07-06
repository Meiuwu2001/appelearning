"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import Sidebar from "../components/sidebar";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("/api/tasks");
      setTasks(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setLoading(false);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Administración de Tareas</h1>
        <Link
          href="/tasks/add"
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block"
        >
          Añadir tarea
        </Link>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Título</th>
                <th className="py-2 px-4 border-b">Descripción</th>
                <th className="py-2 px-4 border-b">Asignado</th>
                <th className="py-2 px-4 border-b">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td className="py-2 px-4 border-b">{task.title}</td>
                  <td className="py-2 px-4 border-b">{task.description}</td>
                  <td className="py-2 px-4 border-b">
                    {task.assignedTo.join(", ")}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <Link
                      href={`/tasks/edit/${task.id}`}
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                    >
                      Borrar
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

export default Tasks;

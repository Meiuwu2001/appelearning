"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [students, setStudents] = useState([]);
  const [assignedTo, setAssignedTo] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("/api/users?role=student");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/tasks", { title, description, assignedTo });
      router.push("/tasks");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Añadir Tarea</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Título</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Descripción</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Asignar a estudiantes</label>
          <select
            multiple
            value={assignedTo}
            onChange={(e) =>
              setAssignedTo(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
            className="w-full p-2 border rounded"
          >
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Añadir
        </button>
      </form>
    </div>
  );
};

export default AddTask;

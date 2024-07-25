"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="h-screen w-64 bg-gray-800 text-white">
      <div className="flex items-center justify-center h-20">
        <h1 className="text-2xl font-bold">E-Learning</h1>
      </div>
      <nav className="mt-10">
        <Link href="/dashboard" passHref>
          <div
            className={`cursor-pointer block py-2.5 px-4 rounded transition duration-200 ${
              pathname === "/dashboard"
                ? "bg-gray-700 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            Inicio
          </div>
        </Link>
        <Link href="/admin" passHref>
          <div
            className={`cursor-pointer block py-2.5 px-4 rounded transition duration-200 ${
              pathname === "/admin"
                ? "bg-gray-700 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            Usuarios
          </div>
        </Link>
        <Link href="/tasks" passHref>
          <div
            className={`cursor-pointer block py-2.5 px-4 rounded transition duration-200 ${
              pathname === "/tasks"
                ? "bg-gray-700 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            Tareas
          </div>
        </Link>
        <Link href="/docentes" passHref>
          <div
            className={`cursor-pointer block py-2.5 px-4 rounded transition duration-200 ${
              pathname === "/docentes"
                ? "bg-gray-700 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            Docentes
          </div>
        </Link>
        <Link href="/alumnos" passHref>
          <div
            className={`cursor-pointer block py-2.5 px-4 rounded transition duration-200 ${
              pathname === "/alumnos"
                ? "bg-gray-700 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            Alumnos
          </div>
        </Link>
        <Link href="/grupos" passHref>
          <div
            className={`cursor-pointer block py-2.5 px-4 rounded transition duration-200 ${
              pathname === "/grupos"
                ? "bg-gray-700 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            Grupos
          </div>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;

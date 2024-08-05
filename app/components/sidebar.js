"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FaSignOutAlt,
  FaHome,
  FaUser,
  FaChalkboardTeacher,
  FaUsers,
  FaBars,
} from "react-icons/fa";
import { useState } from "react";

const Sidebar = ({ setSidebarCollapsed }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    setSidebarCollapsed(!isCollapsed);
  };
const role = localStorage.getItem('role')
  const navItems = [
    { href: "/dashboard", label: "Inicio", icon: <FaHome /> },
    // Mostrar según el rol
    ...(role === 'admin' ? [
      { href: "/admin", label: "Usuarios", icon: <FaUser /> },
      { href: "/docentes", label: "Docentes", icon: <FaChalkboardTeacher /> },
      { href: "/alumnos", label: "Alumnos", icon: <FaUsers /> }
    ] : []),
    ...(role === 'docente' ? [
      { href: "/alumnos", label: "Alumnos", icon: <FaUsers /> }
    ] : []),
    ...(role === 'alumno' ? [
    ] : [])
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-gray-800 text-white flex flex-col transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
      style={{ zIndex: 100 }}
    >
      <div className="flex items-center justify-between h-20 p-4">
        {!isCollapsed && (
          <h1 className="text-2xl font-bold transition-opacity duration-300">
            E-Learning
          </h1>
        )}
        <button
          onClick={toggleSidebar}
          className={`flex items-center justify-center w-12 h-12 bg-gray-700 text-white rounded-full transition-transform duration-300 ${
            isCollapsed ? "transform -translate-x-2" : "transform translate-x-0"
          }`}
          style={{ marginLeft: isCollapsed ? "auto" : "0" }}
        >
          <FaBars className="text-xl" />
        </button>
      </div>
      <nav className="mt-10 flex-1">
        {navItems.map(({ href, label, icon }) => (
          <Link key={href} href={href} passHref>
            <div
              className={`flex items-center gap-3 cursor-pointer py-2.5 px-4 rounded transition-all duration-300 ${
                pathname === href
                  ? "bg-gray-700 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              {icon}
              <span className={`${isCollapsed ? "hidden" : "block"}`}>
                {label}
              </span>
            </div>
          </Link>
        ))}
      </nav>
      <div className="p-4 mt-auto">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded transition-all duration-300"
        >
          <FaSignOutAlt />
          <span className={`${isCollapsed ? "hidden" : "block"}`}>
            Cerrar sesión
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

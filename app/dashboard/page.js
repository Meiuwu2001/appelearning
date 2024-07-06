import Link from "next/link";
import Sidebar from "../components/sidebar";

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col items-center justify-center h-screen p-10">
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
    </div>
  );
};

export default Dashboard;

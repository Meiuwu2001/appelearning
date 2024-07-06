import Link from "next/link";

const Dashboard = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <h1>Bienvenido al Dashboard</h1>
      <p>Has iniciado sesión correctamente.</p>
      <Link href="/admin" className="px-4 py-2 bg-blue-500 text-white rounded">
        Administrar Usuarios
      </Link>
    </div>
  );
};

export default Dashboard;

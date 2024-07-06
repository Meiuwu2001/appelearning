import Link from "next/link";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">¡Bienvenido!</h1>
      <Link href="/login" className="px-4 py-2 bg-blue-500 text-white rounded">
        Ir a Login
      </Link>
    </div>
  );
};

export default Home;

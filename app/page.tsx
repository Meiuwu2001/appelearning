"use client"; // Asegúrate de que este archivo se trate como un componente del lado del cliente

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, [router]);

  return null; // No muestra nada
};

export default Home;

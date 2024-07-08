import { NextResponse } from "next/server";
import db from "@/libs/db";

export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM alumnos");
    return NextResponse.json({ message: rows });
  } catch (error) {
    console.error("Error querying the database:", error);
    return NextResponse.json(
      { error: "Error querying the database" },
      { status: 500 }
    );
  }
}

export async function POST() {
  const { nombre, apellidos, id_grupo } = JSON.parse(await request.text());
  try {
    await db.query(
      "INSERT INTO alumnos (nombre, apellidos, id_grupo) VALUES (?,?,?)",
      [nombre, apellidos, id_grupo]
    );
    return NextResponse.json({ message: "Alumno creado correctamente" });
  } catch (error) {
    console.error("Error querying the database:", error);
    return NextResponse.json(
      { error: "Error querying the database" },
      { status: 500 }
    );
  }
}

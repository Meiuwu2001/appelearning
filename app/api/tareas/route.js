import { NextResponse } from "next/server";
import db from "@/libs/db";

export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM tareas");

    return NextResponse.json({
      message: rows,
      status: 200,
    });
  } catch (error) {
    console.error("Error querying the database:", error);
    return NextResponse.json(
      { error: "Error querying the database" },
      { status: 500 }
    );
  }
}
export async function POST() {
  const { titulo, descripcion, grupo_asignada } = await request.json();
  try {
    await db.query(
      "INSERT INTO tareas (titulo, descripcion, grupo_asignada) VALUES (?,?,?)",
      [titulo, descripcion, grupo_asignada]
    );
    return NextResponse.json(
      { message: "Task created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error querying the database:", error);
    return NextResponse.json(
      { error: "Error querying the database" },
      { status: 500 }
    );
  }
}

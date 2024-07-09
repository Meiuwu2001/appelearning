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
export async function POST(request) {
  try {
    const { titulo, descripcion, grupo_asignada } = await request.json();

    const result = await db.query("INSERT INTO tareas SET ?", {
      titulo,
      descripcion,
      grupo_asignada,
    });
    console.log(result);
    const newId = result.insertId;
    return NextResponse.json({
      message: "Task created successfully",
      id: newId,
    });
  } catch (error) {
    console.error("Error querying the database:", error);
    return NextResponse.json(
      { error: "Error querying the database" },
      { status: 500 }
    );
  }
}

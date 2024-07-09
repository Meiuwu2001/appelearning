import { NextResponse } from "next/server";
import db from "@/libs/db";

export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM docentes");
    return NextResponse.json({ message: rows });
  } catch (error) {
    console.log("Error querying the database", error);
    return NextResponse.json(
      { error: "Querying the database" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { nombre, apellidos, titulo } = await request.json();

    const result = await db.query("INSERT INTO docentes SET  ? ", {
      nombre,
      apellidos,
      titulo,
    });
    const newId = result.insertId;

    return NextResponse.json({
      message: "Docente created succesfully",
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

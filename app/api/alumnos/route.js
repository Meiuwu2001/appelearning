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
  } finally {
    connection.release(); // Release the connection back to the pool
  }
}

export async function POST(request) {
  try {
    const { nombre, apellidos, matricula, fechaNacimiento } = JSON.parse(
      await request.text()
    );

    const result = await db.query("INSERT INTO alumnos SET ?", {
      nombre,
      apellidos,
      matricula,
      fechaNacimiento,
    });
    const newId = result.insertId;
    console.log(result);
    return NextResponse.json({
      message: "Alumno creado correctamente",
      id: newId,
    });
  } catch (error) {
    console.error("Error querying the database:", error);
    return NextResponse.json(
      { error: "Error querying the database" },
      { status: 500 }
    );
  } finally {
    connection.release(); // Release the connection back to the pool
  }
}

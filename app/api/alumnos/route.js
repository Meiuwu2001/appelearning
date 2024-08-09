import { NextResponse } from "next/server";
import db from "@/libs/db";
const connection = await db.getConnection();

export async function GET() {
  try {
    const [rows] = await connection.query("SELECT * FROM alumnos");
    return NextResponse.json({ message: rows });
  } catch (error) {
    console.error("Error querying the database:", error);
    return NextResponse.json(
      { error: "Error querying the database" },
      { status: 500 }
    );
  } finally {
    connection.release(); // Release the db back to the pool
  }
}

export async function POST(request) {
  try {
    const { nombre, apellidos, matricula, fechaNacimiento } = JSON.parse(
      await request.text()
    );

    const result = await connection.query("INSERT INTO alumnos SET ?", {
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
    connection.release(); // Release the db back to the pool
  }
}

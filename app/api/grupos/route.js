import { NextResponse } from "next/server";
import db from "@/libs/db";

export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM grupo");
    return NextResponse.json({ message: rows });
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
    const { grado_grupo } = await request.json();

    // Realiza la operación de inserción
    const result = await db.query("INSERT INTO grupo SET ?", { grado_grupo });

    // Obtiene el nuevo idgrupo generado
    const newId = result.insertId;

    // Devuelve una respuesta de éxito junto con el nuevo idgrupo
    return NextResponse.json({
      message: "Grupo creado exitosamente",
      idgrupo: newId,
    });
  } catch (error) {
    console.error("Error querying the database:", error);
    return NextResponse.json(
      { error: "Error querying the database" },
      { status: 500 }
    );
  }
}

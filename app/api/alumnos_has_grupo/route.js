import { NextResponse } from "next/server";
import db from "@/libs/db"; // Asegúrate de tener tu conexión a la base de datos en lib/db


export async function POST(request) {
  try {
    const { codigo, alumnos_id } = await request.json();

    const [result] = await db.query("SELECT * FROM grupo WHERE codigo = ?", [
      codigo,
    ]);

    if (result.length > 0) {
      await db.query("INSERT INTO alumnos_has_grupo SET ?", {
        alumnos_id: alumnos_id,
        grupo_idgrupo: result[0].idgrupo,
      });
      return NextResponse.json({
        message: "Se unió correctamente",
      });
    } else {
      return NextResponse.json(
        { error: "Código de clase no válido" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error querying the database:", error);
    return NextResponse.json(
      { error: "Error querying the database" },
      { status: 500 }
    );
  }
}

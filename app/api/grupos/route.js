import { NextResponse } from "next/server";
import db from "@/libs/db";
const connection = await db.getConnection();

export async function GET() {
  try {
    const [rows] = await connection.query("SELECT * FROM grupo");
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
    const { titulo, descripcion, id_docente } = await request.json();

    // Generación del código de clase
    function generateClassCode(length) {
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let code = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters[randomIndex];
      }
      return code;
    }

    const codigo = generateClassCode(5);

    // Inserta un nuevo grupo en la tabla "grupo"
    const [result] = await connection.query("INSERT INTO grupo SET ?", {
      titulo,
      descripcion,
      codigo,
    });

    // Obtiene el nuevo idgrupo generado
    const newId = result.insertId;

    // Inserta la relación en la tabla "docente_grupo"
    await connection.query("INSERT INTO docentes_has_grupo SET ?", {
      docentes_id: id_docente,
      grupo_idgrupo: newId,
    });

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
  } finally {
    connection.release(); // Release the db back to the pool
  }
}

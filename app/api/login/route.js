import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import db from "@/libs/db";
import bcrypt from "bcryptjs";

const SECRET_KEY = "noloseproyectoquehicesolo"; // Asegúrate de usar una clave secreta fuerte
const connection = await db.getConnection();

export async function POST(request) {
  try {
    const { user, password } = await request.json();

    // Consulta de la base de datos
    const [rows] = await connection.query("SELECT * FROM users WHERE user = ?", [user]);

    if (rows.length > 0) {
      const userRecord = rows[0];

      // Verificar la contraseña
      const isPasswordValid = await bcrypt.compare(
        password,
        userRecord.Password
      );
      if (!isPasswordValid) {
        return NextResponse.json(
          { message: "Credenciales incorrectas" },
          { status: 401 }
        );
      }

      // Generar JWT
      const token = jwt.sign(
        {
          id: userRecord.id,
          user: userRecord.user,
        },
        SECRET_KEY,
        { expiresIn: "1h" }
      );

      return NextResponse.json({
        token,
        userRecord,
        message: "Autenticación exitosa",
      });
    } else {
      return NextResponse.json(
        { message: "Credenciales incorrectas" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error al autenticar:", error);
    return NextResponse.json({ error: "Error al autenticar" }, { status: 500 });
  } finally {
    connection.release(); // Release the db back to the pool
  }
}

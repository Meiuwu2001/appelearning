import { NextResponse } from "next/server";
import db from "@/libs/db";
const connection = await db.getConnection();

export async function GET(request, { params }) {
  try {
    const [rows] = await connection.query("SELECT * FROM docentes WHERE users_id = ?", [
      params.id,
    ]);
    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Alumno no encontrado" },
        { status: 404 }
      );
    }
    return NextResponse.json({
      message: rows,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  } finally {
    connection.release(); // Release the db back to the pool
  }
}

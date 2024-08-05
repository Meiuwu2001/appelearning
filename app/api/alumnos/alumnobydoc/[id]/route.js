import { NextResponse } from "next/server";
import db from "@/libs/db";
export async function GET(request, { params }) {
  try {
    const [rows] = await db.query("SELECT * FROM alumnos WHERE users_id = ?", [
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
  }
}

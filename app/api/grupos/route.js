import { NextResponse } from "next/server";
import db from "@/libs/db";

export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM grupos");
    return NextResponse.json({ message: rows });
  } catch (error) {
    console.error("Error querying the database:", error);
    return NextResponse.json(
      { error: "Error querying the database" },
      { status: 500 }
    );
  }
}
export async function POST() {
  const { grado_grupo } = await request.json();
  try {
    await db.query("INSERT INTO grupos (grado_grupo) VALUES (?)", [
      grado_grupo,
    ]);
    return NextResponse.json({ message: "Grupo creado exitosamente" });
  } catch (error) {
    console.error("Error querying the database:", error);
    return NextResponse.json(
      { error: "Error querying the database" },
      { status: 500 }
    );
  }
}

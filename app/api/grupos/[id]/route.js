import { NextResponse } from "next/server";
import db from "@/libs/db";
export async function GET(request, { params }) {
  try {
    const [rows] = await db.query("SELECT * FROM grupo WHERE idgrupo = ?", [
      params.id,
    ]);
    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Grupo no encontrado" },
        { status: 404 }
      );
    }
    return NextResponse.json({
      rows,
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
export async function DELETE(request, { params }) {
  // Implementación de la función DELETE
  try {
    const result = await db.query("DELETE FROM grupo WHERE idgrupo= ?", [
      params.id,
    ]);
    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "Grupo no encontrado" },
        { status: 404 }
      );
    } else {
      return NextResponse.json(
        { message: "Grupo eliminado correctamente" },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}
export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const result = await db.query("UPDATE grupo SET ? WHERE idgrupo= ? ", [
      data,
      params.id,
    ]);
    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "Grupo no encontrado" },
        { status: 404 }
      );
    }
    const [updatedProduct] = await db.query(
      "SELECT * FROM grupo WHERE idgrupo = ?",
      [params.id]
    );

    return NextResponse.json({
      message: "Grupo Actualizado",
      updatedProduct,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

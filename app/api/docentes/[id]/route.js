import { NextResponse } from "next/server";
import db from "@/libs/db";
export async function GET(request, { params }) {
  try {
    const [rows] = await db.query("SELECT * FROM docentes WHERE id = ?", [
      params.id,
    ]);
    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Docente no encontrado" },
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
    connection.release(); // Release the connection back to the pool
  }
}

export async function DELETE(request, { params }) {
  // Implementación de la función DELETE
  try {
    const result = await db.query("DELETE FROM docentes WHERE id= ?", [
      params.id,
    ]);
    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "Docente no encontrado" },
        { status: 404 }
      );
    } else {
      return NextResponse.json(
        { message: "Docente eliminado correctamente" },
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
  } finally {
    connection.release(); // Release the connection back to the pool
  }
}
export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const result = await db.query("UPDATE docentes SET ? WHERE id=?", [
      data,
      params.id,
    ]);
    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "Docente no encontrado" },
        { status: 404 }
      );
    }
    const [updatedProduct] = await db.query(
      "SELECT * FROM docentes WHERE id = ?",
      [params.id]
    );

    return NextResponse.json({
      message: "Docente Actualizado",
      updatedProduct,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    connection.release(); // Release the connection back to the pool
  }
}

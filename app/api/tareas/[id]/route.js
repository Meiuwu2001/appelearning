import { NextResponse } from "next/server";
import db from "@/libs/db";
const connection = await db.getConnection();

export async function GET(request, { params }) {
  try {
    if (params.id.length > 0) {
      const [rows] = await connection.query(
        "SELECT * FROM tareas WHERE grupo_idgrupo = ?",
        [params.id]
      );
      if (rows.length === 0) {
        return NextResponse.json({
          message: "no hay tareas aqui",
        });
      }
      return NextResponse.json({
        rows,
      });
    } else {
      return NextResponse.json({
        message: "no hay tareas aqui",
      });
    }
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

export async function DELETE(request, { params }) {
  // Implementación de la función DELETE
  try {
    const result = await connection.query("DELETE FROM tareas WHERE id= ?", [
      params.id,
    ]);
    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "Tarea no encontrado" },
        { status: 404 }
      );
    } else {
      return NextResponse.json(
        { message: "Tarea eliminado correctamente" },
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
    connection.release(); // Release the db back to the pool
  }
}
export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const result = await connection.query("UPDATE tareas SET ? WHERE id=?", [
      data,
      params.id,
    ]);
    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "Tarea no encontrado" },
        { status: 404 }
      );
    }
    const [updatedProduct] = await connection.query(
      "SELECT * FROM tareas WHERE id = ?",
      [params.id]
    );

    return NextResponse.json({
      message: "Tarea Actualizado",
      updatedProduct,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    connection.release(); // Release the db back to the pool
  }
}

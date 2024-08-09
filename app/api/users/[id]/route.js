import { NextResponse } from "next/server";
import db from "@/libs/db";
import bcrypt from "bcryptjs";
const connection = await db.getConnection();

export async function GET(request, { params }) {
  try {
    const [rows] = await connection.query("SELECT * FROM users WHERE id = ?", [
      params.id,
    ]);
    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
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
export async function DELETE(request, { params }) {
  // Implementación de la función DELETE
  try {
    const result = await connection.query("DELETE FROM users WHERE id= ?", [params.id]);
    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 404 }
      );
    } else {
      return NextResponse.json(
        { message: "Usuario eliminado correctamente" },
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

    // Solo hashear la contraseña si está presente en los datos
    if (data.password) {
      const salt = await bcrypt.genSalt(10); // Generar salt con 10 rondas
      data.password = await bcrypt.hash(data.password, salt); // Hashear la contraseña
    }

    const result = await connection.query("UPDATE users SET ? WHERE id=?", [
      data,
      params.id,
    ]);
    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 404 }
      );
    }
    const [updatedProduct] = await connection.query(
      "SELECT * FROM users WHERE id = ?",
      [params.id]
    );

    return NextResponse.json({
      message: "Usuario Actualizado",
      updatedProduct,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    connection.release(); // Release the db back to the pool
  }
}

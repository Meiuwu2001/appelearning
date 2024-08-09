import { NextResponse } from "next/server";
import db from "@/libs/db";
import bcrypt from "bcryptjs";
const connection = await db.getConnection();

export async function POST(request) {
  const {
    user,
    password,
    role,
    nombre,
    apellidos,
    titulo,
    matricula,
    fechaNacimiento,
  } = await request.json();

  if (!user || !password || !role) {
    return NextResponse.json(
      { error: "All fields (user, password, role) are required" },
      { status: 400 }
    );
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    // Perform the database operation to insert the user
    const [rows, fields] = await db.execute(
      "INSERT INTO users (user, password, role) VALUES (?, ?, ?)",
      [user, hashedPassword, role]
    );

    const newId = rows.insertId;

    console.log("User inserted with ID:", newId); // Log the new user ID

    // Insert the new user into the related tables (docentes, alumnos)
    if (role === "docente") {
      await connection.query(
        "INSERT INTO docentes (nombre, apellidos, titulo, users_id) VALUES (?, ?, ?, ?)",
        [nombre, apellidos, titulo, newId]
      );
    } else if (role === "estudiante") {
      await connection.query(
        "INSERT INTO alumnos (nombre, apellidos, matricula, fechaNacimiento, users_id) VALUES (?, ?, ?, ?, ?)",
        [nombre, apellidos, matricula, fechaNacimiento, newId]
      );
    }

    return NextResponse.json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  } finally {
    connection.release(); // Release the db back to the pool
  }
}

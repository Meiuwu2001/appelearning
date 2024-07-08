import { NextResponse } from "next/server";
import db from "@/libs/db";

/**
 * This function handles a GET request and retrieves data from the 'docentes' table in the database.
 *
 * @async
 * @returns {NextResponse} - Returns a JSON response with the retrieved data or an error message.
 *
 * @throws Will throw an error if there is a problem querying the database.
 *
 * @example
 * GET()
 *   .then((response) => {
 *     console.log(response);
 *   })
 *   .catch((error) => {
 *     console.error(error);
 *   });
 */
export async function GET() {
  try {
    const [rows] = db.query("SELECT * FROM docentes");
    return NextResponse.json({ message: rows });
  } catch (error) {
    console.log("Error querying the database", error);
    return NextResponse.json(
      { error: "Querying the database" },
      { status: 500 }
    );
  }
}

/**
 * This function handles a POST request to insert a new docente into the 'docentes' table in the database.
 *
 * @async
 * @returns {NextResponse} - Returns a JSON response indicating success or failure of the operation.
 *
 * @throws Will throw an error if there is a problem querying the database.
 *
 * @example
 * POST({ nombre: "John", apellidos: "Doe", titulo: "PhD" })
 *   .then((response) => {
 *     console.log(response);
 *   })
 *   .catch((error) => {
 *     console.error(error);
 *   });  
 *
 * @param {Object} request - The request object containing the JSON data to be inserted.
 * @param {string} request.nombre - The nombre of the docente.
 * @param {string} request.apellidos - The apellidos of the docente.
 * @param {string} request.titulo - The titulo of the docente.
 */
export async function POST() {
  const { nombre, apellidos, titulo } = await request.json();
  try {
    await db.query(
      "INSERT INTO docentes (nombre, apellidos, titulo) VALUES (?,?,?)",
      [nombre, apellidos, titulo]
    );
    return NextResponse.json({ message: "Docente created succesfully" });
  } catch (error) {
    console.error("Error querying the database:", error);
    return NextResponse.json(
      { error: "Error querying the database" },
      { status: 500 }
    );
  }
}

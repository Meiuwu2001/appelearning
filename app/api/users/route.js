// pages/api/your-endpoint.js
import { NextResponse } from "next/server";
import db from "@/libs/db";

/**
 * This function handles GET requests to the API endpoint.
 * It retrieves all users from the database and returns them as a JSON response.
 *
 * @returns {NextResponse} A NextResponse object containing the retrieved users or an error message.
 *
 * @throws Will throw an error if there is a problem querying the database.
 */
export async function GET() {
  try {
    // Perform the query
    const [rows] = await db.query("SELECT * FROM users");

    // Return the result
    return NextResponse.json({ message: rows });
  } catch (error) {
    console.error("Error querying the database:", error);
    return NextResponse.json(
      { error: "Error querying the database" },
      { status: 500 }
    );
  }
}
/**
 * This function handles POST requests to the API endpoint.
 * It creates a new user in the database based on the provided request body.
 *
 * @param {Object} request - The incoming request object.
 * @param {string} request.body.name - The name of the user to be created.
 * @param {string} request.body.password - The password of the user to be created.
 * @param {string} request.body.role - The role of the user to be created.
 *
 * @returns {NextResponse} A NextResponse object containing a success message or an error message.
 *
 * @throws Will throw an error if there is a problem querying the database.
 */
export async function POST() {
  // Parse the request body
  const { name, password, role } = await request.json();
  try {
    // Perform the database operation
    await db.query("INSERT INTO users (name, password, role) VALUES (?,?,?)", [
      name,
      password,
      role,
    ]);

    // Return a success response
    return NextResponse.json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error querying the database:", error);
    return NextResponse.json(
      { error: "Error querying the database" },
      { status: 500 }
    );
  }
}

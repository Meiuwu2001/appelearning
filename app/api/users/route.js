import { NextResponse } from "next/server";
import db from "@/libs/db";
import bcrypt from "bcryptjs";

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
 * @param {string} request.body.user - The name of the user to be created.
 * @param {string} request.body.password - The password of the user to be created.
 * @param {string} request.body.role - The role of the user to be created.
 *
 * @returns {NextResponse} A NextResponse object containing a success message or an error message.
 *
 * @throws Will throw an error if there is a problem querying the database.
 */
export async function POST(request) {
  try {
    // Parse the request body
    const { user, password, role } = await request.json();

    // Validate input
    if (!user || !password || !role) {
      return NextResponse.json(
        { error: "All fields (user, password, role) are required" },
        { status: 400 }
      );
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds
    const hashedPassword = await bcrypt.hash(password, salt);

    // Perform the database operation
    const result = await db.query(
      "INSERT INTO users (user, password, role) VALUES (?, ?, ?)",
      [user, hashedPassword, role]
    );

    // Return a success response
    return NextResponse.json({
      message: "User created successfully",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Error querying the database:", error);
    return NextResponse.json(
      { error: "Error querying the database" },
      { status: 500 }
    );
  } finally {
    connection.release(); // Release the connection back to the pool
  }
}

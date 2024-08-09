import { NextResponse } from "next/server";
import db from "@/libs/db";
import bcrypt from "bcryptjs";
const connection = await db.getConnection();

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
    const [rows] = await connection.query("SELECT * FROM users");

    // Return the result
    return NextResponse.json({ message: rows });
  } catch (error) {
    console.error("Error querying the database:", error);
    return NextResponse.json(
      { error: "Error querying the database" },
      { status: 500 }
    );
  } finally {
    connection.release(); // Release the db back to the pool
  }
}

/**
 * This function handles POST requests to the API endpoint.
 * It creates a new user in the database based on the provided request body.
 *
 * @param {NextRequest} request - The incoming request object.
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
    const result = await connection.query(
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
    connection.release(); // Release the db back to the pool
  }
}

import { NextResponse } from "next/server";
import db from "@/libs/db";

/**
 * Handles a POST request to authenticate a user.
 *
 * @async
 * @function POST
 * @returns {NextResponse} - A NextResponse object with the appropriate JSON response.
 *
 * @throws Will throw an error if the database query fails.
 *
 * @example
 * POST()
 *   .then((response) => console.log(response))
 *   .catch((error) => console.error(error));
 */
export async function POST(request) {
  try {
    // Extract user and password from the request body
    const { user, password } = await request.json();

    // Perform the database operation
    const [rows] = await db.query(
      "SELECT * FROM users WHERE user = ? AND Password = ?",
      [user, password]
    );

    // End the database connection
    await db.end();

    // Return the result
    if (rows.length > 0) {
      return NextResponse.json({
        message: "User authenticated",
        user: rows[0],
      });
    } else {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error querying the database:", error);
    return NextResponse.json(
      { error: "Error querying the database" },
      { status: 500 }
    );
  }
}

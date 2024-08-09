import { NextResponse } from "next/server";
import db from "@/libs/db";
const connection = await db.getConnection();

export async function GET(request, { params }) {
  try {
    // Perform the query
    const [rows] = await connection.query(
      "SELECT * FROM docentes d INNER JOIN docentes_has_grupo dhg ON d.id =dhg.docentes_id INNER JOIN grupo g ON grupo_idgrupo = g.idgrupo WHERE d.id = ? ",
      [params.id]
    );

    // Return the result
    return NextResponse.json(rows);
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

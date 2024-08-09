import { NextResponse } from "next/server";
import db from "@/libs/db";
import { EmailTemplate } from "@/app/components/email-template";
import { Resend } from "resend";
const connection = await db.getConnection();

const resend = new Resend("re_NcZJ369s_DZCogdyXVZdvdddk4iojj9zv");

export async function GET() {
  try {
    const [rows] = await connection.query("SELECT * FROM tareas");

    return NextResponse.json({
      message: rows,
      status: 200,
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
export async function POST(request) {
  try {
    const { titulo, descripcion, grupo_idgrupo } = await request.json();

    // Insertar tarea en la base de datos
    const result = await connection.query("INSERT INTO tareas SET ?", {
      titulo,
      descripcion,
      grupo_idgrupo,
    });

    // Obtener destinatarios
    const [result1] = await connection.query(
      "SELECT u.user FROM tareas t INNER JOIN grupo g ON t.grupo_idgrupo = g.idgrupo INNER JOIN alumnos_has_grupo ahg ON ahg.grupo_idgrupo = g.idgrupo INNER JOIN alumnos a ON ahg.alumnos_id = a.id INNER JOIN users u ON a.users_id = u.id WHERE g.idgrupo = ?",
      [grupo_idgrupo]
    );

    const destinatarios = result1.map((row) => row.user);

    // Enviar correos electrónicos
    for (const destinatario of destinatarios) {
      await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: destinatario, // Utiliza un único destinatario como una cadena
        subject: "Nueva tarea asignada",
        react: EmailTemplate({
          title: titulo,
          description: descripcion,
        }),
        text: "Se ha asignado una nueva tarea",
      });
    }

    return NextResponse.json(
      { message: "Task created successfully and emails sent" },
      { status: 200 }
    );
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

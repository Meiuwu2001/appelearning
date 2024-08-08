interface EmailTemplateProps {
  title: string;
  description: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  title,
  description,
}) => (
  <div>
    <h1>Nueva tarea asignada: {title}</h1>
    <p>Descripción: {description}</p>
  </div>
);

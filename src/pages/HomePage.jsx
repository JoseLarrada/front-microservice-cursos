import { Link } from "react-router-dom";
import { BookOpen, Users } from "lucide-react";

export default function HomePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Bienvenido al sistema de gestión de cursos y alumnos.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Link
          to="/cursos"
          className="flex items-center gap-4 rounded-lg border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <BookOpen className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="font-semibold">Cursos</p>
            <p className="text-sm text-muted-foreground">
              Gestiona los cursos disponibles
            </p>
          </div>
        </Link>

        <Link
          to="/alumnos"
          className="flex items-center gap-4 rounded-lg border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="font-semibold">Alumnos</p>
            <p className="text-sm text-muted-foreground">
              Gestiona los alumnos registrados
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}

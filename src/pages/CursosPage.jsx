import { useCursos } from "@/hooks/useCursos";

export default function CursosPage() {
  const { data: cursos, isLoading, isError, error } = useCursos();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Cargando cursos...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-destructive">
          Error al cargar cursos: {error?.message}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Cursos</h1>
      </div>
      <pre className="text-sm bg-muted p-4 rounded-lg overflow-auto">
        {JSON.stringify(cursos, null, 2)}
      </pre>
    </div>
  );
}

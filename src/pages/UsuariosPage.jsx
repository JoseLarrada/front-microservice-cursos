import { useUsuarios } from "@/hooks/useUsuarios";

export default function UsuariosPage() {
  const { data: usuarios, isLoading, isError, error } = useUsuarios();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Cargando alumnos...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-destructive">
          Error al cargar alumnos: {error?.message}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Alumnos</h1>
      </div>
      <pre className="text-sm bg-muted p-4 rounded-lg overflow-auto">
        {JSON.stringify(usuarios, null, 2)}
      </pre>
    </div>
  );
}

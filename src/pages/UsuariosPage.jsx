import { useUsuarios } from "@/hooks/useUsuarios";
import { Mail, Hash, Users } from "lucide-react";

// Genera un color de avatar determinista a partir del nombre
const AVATAR_COLORS = [
  "bg-blue-500",
  "bg-violet-500",
  "bg-emerald-500",
  "bg-orange-500",
  "bg-rose-500",
  "bg-cyan-500",
  "bg-amber-500",
  "bg-pink-500",
  "bg-indigo-500",
];

function getAvatarColor(name = "") {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function getInitials(name = "") {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

function SkeletonCard() {
  return (
    <div className="rounded-xl border bg-card p-5 flex items-center gap-4 animate-pulse">
      <div className="h-12 w-12 rounded-full bg-muted shrink-0" />
      <div className="space-y-2 flex-1 min-w-0">
        <div className="h-4 bg-muted rounded w-2/3" />
        <div className="h-3 bg-muted rounded w-full" />
        <div className="h-3 bg-muted rounded w-1/3" />
      </div>
    </div>
  );
}

function AlumnoCard({ alumno, index }) {
  const avatarColor = getAvatarColor(alumno.nombre);
  const initials = getInitials(alumno.nombre);

  return (
    <div
      className="animate-fade-in-up group rounded-xl border bg-card shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 p-5 flex items-center gap-4"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Avatar con iniciales */}
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white font-semibold text-sm select-none ${avatarColor} transition-transform duration-300 group-hover:scale-110`}
      >
        {initials || "?"}
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1 space-y-1">
        <p className="font-semibold text-sm leading-tight truncate capitalize" title={alumno.nombre}>
          {alumno.nombre}
        </p>
        <p className="text-xs text-muted-foreground flex items-center gap-1 truncate" title={alumno.correo}>
          <Mail className="h-3 w-3 shrink-0" />
          {alumno.correo}
        </p>
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <Hash className="h-3 w-3" />
          ID: {alumno.id}
        </p>
      </div>
    </div>
  );
}

export default function UsuariosPage() {
  const { data: usuarios, isLoading, isError, error } = useUsuarios();

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold tracking-tight">Alumnos</h1>
        {!isLoading && !isError && (
          <p className="text-sm text-muted-foreground mt-1">
            {usuarios?.length ?? 0} alumno{usuarios?.length !== 1 ? "s" : ""} registrado{usuarios?.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      {/* Estado de error */}
      {isError && (
        <div className="animate-fade-in rounded-xl border border-destructive/40 bg-destructive/5 p-6 text-center">
          <p className="font-medium text-destructive">Error al cargar los alumnos</p>
          <p className="text-sm text-muted-foreground mt-1">{error?.message}</p>
        </div>
      )}

      {/* Grid de cards */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)
          : usuarios?.map((alumno, i) => (
              <AlumnoCard key={alumno.id} alumno={alumno} index={i} />
            ))}
      </div>

      {/* Estado vacío */}
      {!isLoading && !isError && usuarios?.length === 0 && (
        <div className="animate-fade-in flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center">
          <Users className="h-10 w-10 text-muted-foreground/50 mb-3" />
          <p className="font-medium text-muted-foreground">No hay alumnos registrados</p>
        </div>
      )}
    </div>
  );
}

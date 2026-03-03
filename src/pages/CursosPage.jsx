import { useCursos } from "@/hooks/useCursos";
import { BookOpen, Users, Hash } from "lucide-react";

// Paleta de colores por índice para las cards
const ACCENT_COLORS = [
  { bg: "bg-blue-100",   icon: "text-blue-600",   badge: "bg-blue-50 text-blue-700 ring-blue-200" },
  { bg: "bg-violet-100", icon: "text-violet-600", badge: "bg-violet-50 text-violet-700 ring-violet-200" },
  { bg: "bg-emerald-100",icon: "text-emerald-600",badge: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
  { bg: "bg-orange-100", icon: "text-orange-600", badge: "bg-orange-50 text-orange-700 ring-orange-200" },
  { bg: "bg-rose-100",   icon: "text-rose-600",   badge: "bg-rose-50 text-rose-700 ring-rose-200" },
  { bg: "bg-cyan-100",   icon: "text-cyan-600",   badge: "bg-cyan-50 text-cyan-700 ring-cyan-200" },
];

function SkeletonCard() {
  return (
    <div className="rounded-xl border bg-card p-6 space-y-4 animate-pulse">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-muted" />
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-muted rounded w-3/4" />
          <div className="h-3 bg-muted rounded w-1/2" />
        </div>
      </div>
      <div className="h-px bg-border" />
      <div className="flex gap-2">
        <div className="h-6 bg-muted rounded-full w-24" />
        <div className="h-6 bg-muted rounded-full w-20" />
      </div>
    </div>
  );
}

function CursoCard({ curso, index }) {
  const color = ACCENT_COLORS[index % ACCENT_COLORS.length];
  const totalAlumnos = curso.cursosalumnos?.length ?? 0;

  return (
    <div
      className="animate-fade-in-up group rounded-xl border bg-card shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Header colorido */}
      <div className="h-1.5 w-full bg-gradient-to-r from-primary/60 to-primary/20" />

      <div className="p-6 space-y-4">
        {/* Icono + nombre */}
        <div className="flex items-start gap-4">
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${color.bg} transition-transform duration-300 group-hover:scale-110`}>
            <BookOpen className={`h-5 w-5 ${color.icon}`} />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-base leading-tight truncate" title={curso.nombre}>
              {curso.nombre}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
              <Hash className="h-3 w-3" />
              ID: {curso.id}
            </p>
          </div>
        </div>

        <div className="h-px bg-border" />

        {/* Badges de alumnos */}
        <div className="flex items-center justify-between">
          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${color.badge}`}>
            <Users className="h-3 w-3" />
            {totalAlumnos === 0
              ? "Sin alumnos"
              : `${totalAlumnos} alumno${totalAlumnos !== 1 ? "s" : ""}`}
          </span>
          {totalAlumnos === 0 && (
            <span className="text-xs text-muted-foreground italic">Disponible</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CursosPage() {
  const { data: cursos, isLoading, isError, error } = useCursos();

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="animate-fade-in flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Cursos</h1>
          {!isLoading && !isError && (
            <p className="text-sm text-muted-foreground mt-1">
              {cursos?.length ?? 0} curso{cursos?.length !== 1 ? "s" : ""} registrado{cursos?.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>
      </div>

      {/* Estado de error */}
      {isError && (
        <div className="animate-fade-in rounded-xl border border-destructive/40 bg-destructive/5 p-6 text-center">
          <p className="font-medium text-destructive">Error al cargar los cursos</p>
          <p className="text-sm text-muted-foreground mt-1">{error?.message}</p>
        </div>
      )}

      {/* Grid de cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : cursos?.map((curso, i) => <CursoCard key={curso.id} curso={curso} index={i} />)}
      </div>

      {/* Estado vacío */}
      {!isLoading && !isError && cursos?.length === 0 && (
        <div className="animate-fade-in flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center">
          <BookOpen className="h-10 w-10 text-muted-foreground/50 mb-3" />
          <p className="font-medium text-muted-foreground">No hay cursos registrados</p>
        </div>
      )}
    </div>
  );
}

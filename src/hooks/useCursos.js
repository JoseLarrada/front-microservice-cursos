import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { cursosService } from "@/services/cursosService";

// ─── Query Keys ────────────────────────────────────────────────────────────────
export const cursosKeys = {
  all: ["cursos"],
  lists: () => [...cursosKeys.all, "list"],
  list: (filters) => [...cursosKeys.lists(), { filters }],
  details: () => [...cursosKeys.all, "detail"],
  detail: (id) => [...cursosKeys.details(), id],
};

// ─── Queries ───────────────────────────────────────────────────────────────────

/**
 * Hook para obtener todos los cursos
 */
export function useCursos(options = {}) {
  return useQuery({
    queryKey: cursosKeys.lists(),
    queryFn: cursosService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutos
    ...options,
  });
}

/**
 * Hook para obtener un curso por ID
 * @param {number|string} id
 */
export function useCurso(id, options = {}) {
  return useQuery({
    queryKey: cursosKeys.detail(id),
    queryFn: () => cursosService.getById(id),
    enabled: !!id,
    ...options,
  });
}

// ─── Mutations ─────────────────────────────────────────────────────────────────

/**
 * Hook para crear un curso
 */
export function useCrearCurso() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cursosService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cursosKeys.lists() });
    },
  });
}

/**
 * Hook para actualizar un curso
 */
export function useActualizarCurso() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => cursosService.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: cursosKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: cursosKeys.lists() });
    },
  });
}

/**
 * Hook para eliminar un curso
 */
export function useEliminarCurso() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cursosService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cursosKeys.lists() });
    },
  });
}

/**
 * Hook para asignar un alumno a un curso
 */
export function useAsignarAlumno() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ cursoId, alumnoId }) =>
      cursosService.asignarAlumno(cursoId, alumnoId),
    onSuccess: (_, { cursoId }) => {
      queryClient.invalidateQueries({ queryKey: cursosKeys.detail(cursoId) });
    },
  });
}

/**
 * Hook para eliminar un alumno de un curso
 */
export function useEliminarAlumnoDeCurso() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ cursoId, alumnoId }) =>
      cursosService.eliminarAlumno(cursoId, alumnoId),
    onSuccess: (_, { cursoId }) => {
      queryClient.invalidateQueries({ queryKey: cursosKeys.detail(cursoId) });
    },
  });
}

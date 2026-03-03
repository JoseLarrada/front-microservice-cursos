import cursosClient from "@/api/cursosClient";

/**
 * Service para el microservicio de Cursos (puerto 8082)
 * Imagen: juliomoli/mscv-cursos:v1
 */

export const cursosService = {
  /**
   * Obtiene todos los cursos
   * @returns {Promise<Array>} lista de cursos
   */
  getAll: () => cursosClient.get("/cursos").then((res) => res.data),

  /**
   * Obtiene un curso por ID
   * @param {number|string} id
   * @returns {Promise<Object>} curso
   */
  getById: (id) => cursosClient.get(`/cursos/${id}`).then((res) => res.data),

  /**
   * Crea un nuevo curso
   * @param {Object} data - datos del curso
   * @returns {Promise<Object>} curso creado
   */
  create: (data) => cursosClient.post("/cursos", data).then((res) => res.data),

  /**
   * Actualiza un curso existente
   * @param {number|string} id
   * @param {Object} data - datos actualizados
   * @returns {Promise<Object>} curso actualizado
   */
  update: (id, data) =>
    cursosClient.put(`/cursos/${id}`, data).then((res) => res.data),

  /**
   * Elimina un curso por ID
   * @param {number|string} id
   * @returns {Promise<void>}
   */
  remove: (id) => cursosClient.delete(`/cursos/${id}`).then((res) => res.data),

  /**
   * Asigna un alumno a un curso
   * @param {number|string} cursoId
   * @param {number|string} alumnoId
   * @returns {Promise<Object>}
   */
  asignarAlumno: (cursoId, alumnoId) =>
    cursosClient
      .put(`/cursos/asignar-alumno/${cursoId}`, alumnoId)
      .then((res) => res.data),

  /**
   * Elimina un alumno de un curso
   * @param {number|string} cursoId
   * @param {number|string} alumnoId
   * @returns {Promise<Object>}
   */
  eliminarAlumno: (cursoId, alumnoId) =>
    cursosClient
      .delete(`/cursos/eliminar-alumno/${cursoId}`, { data: alumnoId })
      .then((res) => res.data),
};

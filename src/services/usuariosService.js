import usuariosClient from "@/api/usuariosClient";

/**
 * Service para el microservicio de Alumnos/Usuarios (puerto 8080)
 * Imagen: juliomoli/mscv-alumnos:v1
 */

export const usuariosService = {
  /**
   * Obtiene todos los alumnos
   * @returns {Promise<Array>} lista de alumnos
   */
  getAll: () => usuariosClient.get("/alumnos").then((res) => res.data),

  /**
   * Obtiene un alumno por ID
   * @param {number|string} id
   * @returns {Promise<Object>} alumno
   */
  getById: (id) => usuariosClient.get(`/alumnos/${id}`).then((res) => res.data),

  /**
   * Crea un nuevo alumno
   * @param {Object} data - datos del alumno
   * @returns {Promise<Object>} alumno creado
   */
  create: (data) =>
    usuariosClient.post("/alumnos", data).then((res) => res.data),

  /**
   * Actualiza un alumno existente
   * @param {number|string} id
   * @param {Object} data - datos actualizados
   * @returns {Promise<Object>} alumno actualizado
   */
  update: (id, data) =>
    usuariosClient.put(`/alumnos/${id}`, data).then((res) => res.data),

  /**
   * Elimina un alumno por ID
   * @param {number|string} id
   * @returns {Promise<void>}
   */
  remove: (id) =>
    usuariosClient.delete(`/alumnos/${id}`).then((res) => res.data),
};

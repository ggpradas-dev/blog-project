import validator from "validator";
const { isEmpty, isLength } = validator;

/**
 * Contiene las funciones de validación para los datos del artículo.
 * Se asegura de que los campos requeridos cumplan con los requisitos
 * mínimos antes de procesarlos o guardarlos en la base de datos.
*/

/**
 * Verifica si el contenido JSON generado por Tiptap está vacío.
 * Se considera vacío si solo contiene un párrafo sin texto.
 *
 * @param {string} jsonStr - Contenido del editor en formato JSON (stringificado).
 * @returns {boolean} true si está vacío, false en caso contrario.
 */
function isTiptapJsonEmpty(jsonStr) {
  try {
    const obj = JSON.parse(jsonStr);
    if (
      obj.type === "doc" &&
      Array.isArray(obj.content) &&
      obj.content.length === 1
    ) {
      const singleNode = obj.content[0];
      if (singleNode.type === "paragraph" && !singleNode.content) {
        return true;
      }
    }
  } catch (error) {
    // Si el contenido no es JSON válido, se ignora la validación específica.
  }
  return false;
}

/**
 * Valida los campos obligatorios de un artículo.
 * Verifica el título, contenido y autor según criterios definidos.
 *
 * @param {Object} params - Datos del artículo a validar.
 * @throws Error si algún campo no cumple con las validaciones.
 */
const articleValidator = (params) => {

  // El título no debe estar vacío y debe tener entre 5 y 60 caracteres
  let validateTitle = !isEmpty(params.title) &&
    isLength(params.title, { min: 5, max: 60 });

  // El contenido no debe estar vacío
  let validateContent = !isTiptapJsonEmpty(params.content);

  // El autor no debe estar vacío y debe tener entre 5 y 25 caracteres
  let validateWriter = !isEmpty(params.writer) &&
    isLength(params.writer, { min: 5, max: 25 });

  // Lanza un error si alguna validación no se cumple
  if (!validateTitle || !validateContent || !validateWriter) {
    throw new Error("Datos inválidos para el artículo.");
  }
};

// Exporta el validador para su uso en rutas o controladores
export default articleValidator;
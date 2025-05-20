/**
 * Verifica si el contenido generado por el editor Tiptap está vacío.
 *
 * - Analiza el JSON serializado que representa el documento de Tiptap.
 * - Considera vacío si el documento es del tipo `doc` y contiene un único
 *   nodo `paragraph` sin contenido.
 * - También devuelve `true` si el string está vacío o no es JSON válido.
 *
 * @param {string} contentStr - Contenido en formato JSON (stringificado) proveniente de Tiptap.
 * @returns {boolean} `true` si el contenido se considera vacío, `false` en caso contrario.
 */
export const isTiptapJsonEmpty = (contentStr) => {
  // No recibió nada
  if (!contentStr) return true; 

  try {
    const obj = JSON.parse(contentStr);
    // Detecta estructura típica de un editor vacío: un único párrafo sin contenido
    if (
      obj.type === "doc" &&
      Array.isArray(obj.content) &&
      obj.content.length === 1
    ) {
      const firstNode = obj.content[0];
      if (firstNode.type === "paragraph" && !firstNode.content) {
        return true;
      }
    }
  } catch (error) {
    // Si no se puede parsear y el string está vacío o en blanco
    if (!contentStr.trim()) return true;
  }

  return false;
};
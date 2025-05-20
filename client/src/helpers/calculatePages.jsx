/**
 * Función utilitaria para paginar una lista de elementos.
 *
 * - Divide una colección en páginas según el número de elementos por página.
 * - Devuelve los elementos correspondientes a la página actual y el total de páginas.
 *
 * @param {Array} items - Lista completa de elementos a paginar.
 * @param {number} currentPage - Página actual (basada en 1).
 * @param {number} itemsPerPage - Cantidad de elementos por página.
 * @returns {{ totalPages: number, currentItems: Array }} Objeto con la cantidad de páginas y los elementos actuales.
 */
export const paginate = (items, currentPage, itemsPerPage) => {
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);
  return {
    totalPages,
    currentItems,
  };
};
import { generateHTML } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Underline from '@tiptap/extension-underline';

/**
 * Convierte un contenido en formato JSON generado por Tiptap a HTML.
 *
 * - Utiliza `@tiptap/core` y extensiones como `StarterKit` y `Underline`.
 * - Si el contenido no es un JSON válido (ya es HTML o está mal formado),
 *   simplemente lo devuelve tal cual o como cadena vacía.
 *
 * @param {string} stringJSON - Contenido serializado de Tiptap (formato JSON).
 * @returns {string} HTML resultante o el valor original si no se pudo parsear.
 */
export const convertToHtml = (stringJSON) => {
    try { 
        const json = JSON.parse(stringJSON);
        return generateHTML(json, [StarterKit, Underline]);
    } catch (error) {
        return stringJSON || '';
    }
};
import { useState } from "react";
import { isTiptapJsonEmpty } from "../helpers/isTipTapJsonEmpty";
import { toast } from "react-toastify";

/**
 * Custom Hook para gestionar formularios en React.
 * 
 * - Permite serializar datos de formularios HTML.
 * - Valida campos básicos como título, contenido y autor.
 * - Integra `react-toastify` para mostrar errores.
 * 
 * Ideal para formularios de artículos en esta aplicación.
 */
export const useForm = (initialObject = {}) => {
  const [form, setForm] = useState(initialObject);

  /**
   * Convierte los datos de un formulario HTML en un objeto JavaScript plano.
   *
   * @param {HTMLFormElement} form - El formulario a serializar.
   * @returns {Object} Objeto con pares clave-valor de los campos del formulario.
   */
  const serializeForm = (form) => {
    const formData = new FormData(form);
    const fullObject = {};

    for (let [name, value] of formData) {
      fullObject[name] = value;
    }

    return fullObject;
  }

  /**
   * Maneja el envío del formulario con validaciones personalizadas.
   * Si todo es válido, actualiza el estado y ejecuta `onSuccess` (si se proporciona).
   *
   * @param {Event} e - Evento de envío del formulario.
   * @param {Function} onSuccess - Callback a ejecutar si el formulario es válido.
   */
  const handleSubmit = (e, onSuccess) => {
    e.preventDefault();
    const serializedData = serializeForm(e.target);

    // Validaciones del título
    if (!serializedData.title) return toast.error("El título está vacío");
    if (serializedData.title.trim().length < 5) return toast.error("El título es muy corto");
    if (serializedData.title.trim().length > 60) return toast.error("El título es demasiado largo");

    // Validación del contenido (Tiptap)
    if (isTiptapJsonEmpty(serializedData.content)) {
      toast.error("El contenido está vacío");
      return;
    }

    // Validaciones del autor
    if (!serializedData.writer) return toast.error("El autor está vacío");
    if (serializedData.writer.trim().length < 5) return toast.error("El nombre del autor es muy corto");
    if (serializedData.writer.trim().length > 25) return toast.error("El nombre del autor es demasiado largo");
    
    // Actualiza el estado con los datos
    setForm(serializedData);

    if (typeof onSuccess === "function") {
      onSuccess(serializedData);
    }
  };

  /**
   * Maneja cambios en campos de formulario tipo input, textarea, etc.
   *
   * @param {Object} target - Elemento HTML que disparó el cambio.
   */
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setForm({
      ...form,
      [name]: value
    });
  }

  // Valores expuestos por el hook
  return {
    form, 
    setForm,
    handleSubmit,
    handleChange
  }
}
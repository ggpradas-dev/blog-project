import { useState } from "react";
import { useForm } from "../../../hooks/useForm";
import { Global } from "../../../helpers/Global";
import { ajaxRequest } from "../../../helpers/ajaxRequest";
import { TipTapEditor } from "../../shared/TextEditor/TipTapEditor";
import { UploadButton } from "../../ui/UploadButton/UploadButton";
import { toast } from 'react-toastify';
import "../../../styles/form-styles.css";
import 'react-toastify/dist/ReactToastify.css';

/**
 * Componente `Create`
 *
 * Página para crear un nuevo artículo en el blog.
 * - Utiliza un formulario controlado con el custom hook `useForm`.
 * - Envía los datos a la API mediante una solicitud POST.
 * - Permite añadir una imagen opcional usando un input personalizado.
 * - Muestra notificaciones con `react-toastify`.
 */
export const Create = () => {
  const { form, handleChange, setForm, handleSubmit } = useForm({ title: "", content: "", writer: "" }); 
  const [resetTrigger, setResetTrigger] = useState(0); 

  /**
   * Envía los datos del artículo y opcionalmente una imagen a la API.
   * @param {object} formData - Datos recogidos del formulario.
   */
  const saveArticle = async ( formData ) => {

    console.log("Entrando a Save Article");
  
    try {
      const { data } = await ajaxRequest(`${Global.url}nuevo-articulo`, "POST", formData);
  
      if (!data || data.status !== "success") {
        toast.error("Faltan datos para crear el artículo");
        return;
      }

      toast.success("¡Artículo creado!");
      
      // Subida de imagen (si existe archivo)
      const fileInput = document.getElementById("file");

      if (fileInput && fileInput.files[0]) {

        const formData = new FormData();
        formData.append("file", fileInput.files[0]); // Inserta el "file" en formData
  
        try {
          await ajaxRequest(
            `${Global.url}nueva-imagen/${data.article._id}`,
            "POST",
            formData, 
            true 
          );
        } catch (error) { 
          toast.error("Error al subir la imagen."); 
        }
      }

      resetForm();
    } catch (error) {
      toast.error("Error inesperado.");
    }
  };

  /**
   * Reinicia el formulario y sus campos.
   */
  const resetForm = () => {
    // Reiniciar valores del formulario
    setForm({ title: "", writer: "", content: "" });

    // Borra el input de archivo
    document.getElementById("file").value = "";

    // Trigger para que el editor y el botón de subida se limpien "por dentro".
    setResetTrigger((prev) => prev + 1);
  };

  return (
    <div>
      <form className="form" onSubmit={(e) => handleSubmit(e, saveArticle)}>

        <h1>Crear un artículo</h1>

        <div className="form-group">
          <input
            type="text"
            name="title"
            value={form.title}
            placeholder="Título del artículo"
            onChange={handleChange} 
          />

          {/* Editor de texto para el contenido del artículo */}
          <div className="editor">
            <TipTapEditor
              key={resetTrigger}
              onChange={(contentJSON) =>
                setForm((prev) => ({ ...prev, content: contentJSON }))
              }
            />
          </div>

          {/* Campo oculto para que serializeForm recoja el 'content' */}
          <input
            type="hidden"
            name="content"
            value={form.content || ""}
          />

          <input
            type="text"
            name="writer"
            value={form.writer}
            placeholder="Autor"
            onChange={handleChange}
          ></input>

          {/* Componente para subir una imagen */}
          <UploadButton
            key={resetTrigger}
          />
          
          <div className="save-btn">
            <input type="submit" className="btn" value="Guardar" />
          </div>

        </div>
      </form>
    </div>
  );
};
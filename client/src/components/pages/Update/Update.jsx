import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "../../../hooks/useForm";
import { Global } from "../../../helpers/Global";
import { ajaxRequest } from "../../../helpers/ajaxRequest";
import { TipTapEditor } from "../../shared/TextEditor/TipTapEditor";
import { UploadButton } from "../../ui/UploadButton/UploadButton";
import { toast } from "react-toastify";
import defaultImage from "/src/assets/images/default-image.png";
import "../../../styles/form-styles.css";

/**
 * Componente `Update`
 *
 * Permite editar un artículo existente en el blog.
 * - Obtiene los datos del artículo por su ID a través de la API.
 * - Carga esos datos en un formulario controlado mediante `useForm`.
 * - Permite modificar el título, contenido, autor y subir una nueva imagen.
 * - Envía los datos actualizados al backend utilizando peticiones PUT y POST.
 */
export const Update = () => {

  const [article, setArticle] = useState({}); 
  const { form, setForm, handleChange, handleSubmit } = useForm(article); 
  const params = useParams(); 

  // Al montar el componente, obtiene los datos del artículo desde la API
  useEffect(() => {
    getArticleById();
  }, []);

  // Cuando el artículo es recibido, actualiza los valores del formulario
  useEffect(() => {
    setForm(article);
  }, [article]);

  /**
   * Realiza una solicitud GET a la API para obtener el artículo por su ID.
   */
  const getArticleById = async () => {
    const { data } = await ajaxRequest(`${Global.url}articulo/${params.id}`, "GET");

    if (data?.status === "success") {
      setArticle(data.article);
    }
  };

   /**
   * Envía los datos del formulario a la API para actualizar el artículo.
   * También maneja la subida de una nueva imagen si se proporciona.
   *
   * @param {object} formData - Datos actuales del formulario.
   */
  const updateArticle = async ( formData ) => {

    // Se crea un nuevo objeto con los valores actuales o los del formulario
    let newArticle = {
      ...article, // (...) mantiene las propiedades del artículo
      title: form.title || article.title,
      content: form.content || article.content,
      writer: form.writer || article.writer
    };

    try {
      // Realiza la solicitud PUT para actualizar el artículo
      const { data } = await ajaxRequest(`${Global.url}articulo/${params.id}`, "PUT", newArticle);

      if (data.status && data.status === "success") {
        toast.success("¡Artículo actualizado!")
      } else {
        toast.error("El artículo no ha sido modificado")
      }

      // Obtiene la referencia al input de tipo archivo
      const fileInput = document.getElementById("file");

      // Si se seleccionó una imagen, realiza la subida
      if (fileInput && fileInput.files[0]) {
      
        const formData = new FormData();
        formData.append("file", fileInput.files[0]);

        try {
          // Solicitud POST para subir la imagen al servidor
          const uploadImage = await ajaxRequest(
            `${Global.url}nueva-imagen/${data.updatedArticle._id}`,
            "POST",
            formData,
            true // Indica que es multipart/form-data
          );

          // Actualiza el estado local del artículo con la nueva imagen
          setArticle((prev) => ({
            ...prev, 
            image: uploadImage.data.updatedImage.image, 
          }));
        } catch (error) {
          toast.error("Error al subir la imagen."); 
        }
      }
    } catch (error) {
      toast.error("Error inesperado.");
    }
  };

  return (
    <div>
      {/* Formulario para editar el artículo */}
      <form className="form" onSubmit={(e) => handleSubmit(e, updateArticle)}>

        <h1>Editar un artículo</h1>

        <div className="form-group">
          {/* Mostrar la imagen del artículo o una imagen predeterminada */}
          <div>
            {article.image !== "default.png"
              ? (<img src={`${Global.url}image/${article.image}`} alt="Artículo" />)
              : (<img src={defaultImage} alt="Default" />)
            }
          </div>

          <input
            type="text"
            name="title"
            defaultValue={article.title}
            onChange={handleChange}
          />

          {/* Editor de texto para el contenido del artículo */}
          <div className="editor">
            <TipTapEditor
              defaultValue={article.content}
              onChange={(contentJSON) =>
                setForm((prev) => ({ ...prev, content: contentJSON }))
              }
            />
          </div>

          {/* input oculto para que serializeForm lo recoja */}
          <input type="hidden" name="content" value={form.content || ""} />

          <input
            type="text"
            name="writer"
            onChange={handleChange}
            defaultValue={article.writer}
          ></input>

          {/* Componente para subir una imagen */}
          <UploadButton />

          <div className="save-btn">
            <input type="submit" className="btn" value="Guardar" />
          </div>
        </div>
      </form>
    </div>
  );
};
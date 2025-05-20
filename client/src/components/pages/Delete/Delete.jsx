import { useState, useEffect } from "react";
import { ajaxRequest } from "../../../helpers/ajaxRequest";
import { Global } from "../../../helpers/Global";
import Trash from "/src/assets/icons/trash.svg?react";
import Close from "/src/assets/icons/close.svg?react";
import Warning from "/src/assets/icons/warning.svg?react";
import "./delete.css";

/**
 * Componente `Delete`
 *
 * Permite eliminar un artículo mostrando un modal de confirmación.
 * - Envía una solicitud DELETE a la API.
 * - Actualiza la lista de artículos tras la eliminación.
 * - Controla la visibilidad del modal con estado local.
 */
export const Delete = ({ articleId, articles, setArticles, message }) => {
  const [showModal, setShowModal] = useState(false); 

  // Añade o elimina la clase del <body> según si el modal está visible
  useEffect(() => {
    document.body.classList.toggle("modal-open", showModal);
  }, [showModal]);

  /**
   * Elimina el artículo mediante una solicitud DELETE
   * y actualiza el estado de la lista de artículos.
   */
  const handleDelete = async () => {
    setShowModal(false);

    const { data } = await ajaxRequest(Global.url + "articulo/" + articleId, "DELETE");
    
    if (data.status === "success") {
      // Actualiza el estado de la lista de artículos
      const updatedArticles = articles.filter(article => article._id !== articleId);
      setArticles(updatedArticles);
    }
  };

  return (
    <>
      <button
        className="btn btn-delete"
        onClick={(e) => {
          e.stopPropagation(); 
          setShowModal(true);
        }}
      >
        <Trash /> 
      </button>

      {/* Modal de confirmación de eliminación */}
      <div
        className={`modal-overlay ${showModal ? "show blur" : ""}`}
        onClick={(e) => e.stopPropagation()} 
      >
        <div className={`modal-content ${showModal ? "show" : ""}`}>
          
          <div className="modal-close" onClick={() => setShowModal(false)}>
            <Close />
          </div>

          <div className="icon">
            <Warning />
          </div>

          <span>{message}</span>
          
          <div className="modal-buttons">
            <button className="btn btn-delete" onClick={handleDelete}>
              Confirmar
            </button>
            <button className="btn btn-update" onClick={() => setShowModal(false)}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
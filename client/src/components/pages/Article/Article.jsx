import { useState, useEffect } from "react";
import { Global } from "../../../helpers/Global";
import { ajaxRequest } from "../../../helpers/ajaxRequest";
import { useParams } from "react-router-dom";
import { convertToHtml } from "../../../helpers/convertToHtml";
import defaultImage from "/src/assets/images/default-image.png";
import "./article.css";

/**
 * Componente `Article`
 *
 * Página de detalle para un artículo individual.
 * - Obtiene los datos del artículo desde la API utilizando el ID de la URL.
 * - Muestra la imagen, título, contenido formateado (HTML), autor y fecha.
 */
export const Article = () => {
  const [article, setArticle] = useState({}); 
  const params = useParams();

  // Cargar el artículo al montar el componente
  useEffect(() => {
    getArticle();
  }, []);

  /**
   * Solicita los datos del artículo desde la API según el ID en la URL.
   */
  const getArticle = async () => {
    const { data } = await ajaxRequest(`${Global.url}articulo/${params.id}`, "GET");

    if (data?.status === "success") {
      setArticle(data.article);
    }
  };

  return (
    <div className="article">
      <div>
        {article.image !== "default.png"
          ? (<img src={`${Global.url}image/${article.image}`} alt={`${article.title}`} />)
          : (<img src={defaultImage} alt="Default" />)}
      </div>

      <div className="article-content">
        <h1>{article.title}</h1>
        <div
          dangerouslySetInnerHTML={{
            __html: convertToHtml(article.content), // Convierte el contenido a HTML seguro
          }}
        ></div>
        
        <div className="writer-box">
        <span>{`Escrito por ${article.writer}`}</span>
        <span>
          Creado el {new Date(article.date).toLocaleString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </span>
        </div>
      </div>
    </div>
  );
};
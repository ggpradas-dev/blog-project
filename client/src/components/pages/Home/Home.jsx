import { useEffect, useState } from "react";
import { Global } from "../../../helpers/Global";
import { ajaxRequest } from "../../../helpers/ajaxRequest";
import { convertToHtml } from "../../../helpers/convertToHtml";
import { useNavigate } from "react-router-dom";
import defaultImage from "/src/assets/images/default-image.png";
import "./home.css";

/**
 * Componente `Home`
 *
 * Página principal del blog.
 * - Muestra una vista previa de los últimos tres artículos.
 * - Adapta el contenido a dispositivos móviles o escritorio.
 * - Permite navegar al detalle de cada artículo.
 */
export const Home = () => {
  const [articles, setArticles] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  // Detecta si la pantalla es móvil o escritorio
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Móvil si el ancho es menor o igual a 768px
    };

    handleResize(); 
    window.addEventListener("resize", handleResize); // Detecta cambios en tamaño de pantalla
    return () => window.removeEventListener("resize", handleResize); // "Limpia" el evento
  }, []);

  // Carga los artículos al montar el componente
  useEffect(() => {
      getArticles();
  }, []);

  /**
   * Obtiene los artículos desde la API y los guarda en estado.
   */
  const getArticles = async () => {
    const { data } = await ajaxRequest(`${Global.url}articulos/`, "GET");

    if (data.status === "success") {
      setArticles(data.articles);
    }
  };

  /**
   * Trunca el contenido a una longitud específica.
   * @param {string} text - Contenido en HTML como string.
   * @param {number} length - Longitud máxima.
   * @returns {string}
   */
  const truncateText = (text, length) => {
    return text.length > length ? text.slice(0, length) + "..." : text;
  };

  // Navega al detalle del artículo
  const handleNavigateToArticle = (id) => {
    navigate(`/article/${id}`);
  };

  return (
    <div className="blog-home">
      <h1>Los artículos más interesantes en un clic</h1>

      {/* Sección destacada de artículos */}
      <div className="blog-featured">
        {articles.slice(0, 3).map((article) => {
          const htmlContent = convertToHtml(article.content);
          const truncated = truncateText(htmlContent, isMobile ? 50 : 200);

          return (
            <div
              key={article._id}
              className="article-card"
              onClick={() => handleNavigateToArticle(article._id)}
            >
            <div>
              {article.image !== "default.png" ? (
                <img src={`${Global.url}image/${article.image}`} alt={`${article.title}`} />
              ) : (
                <img src={defaultImage} alt="Default" />
              )}
            </div>
            <div className="article-data">
              <h3 className="title">{article.title}</h3>
              <div
                  dangerouslySetInnerHTML={{
                    __html: truncated,
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
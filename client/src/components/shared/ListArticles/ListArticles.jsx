import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Global } from '../../../helpers/Global';
import { convertToHtml } from '../../../helpers/convertToHtml';
import { paginate } from '../../../helpers/calculatePages';
import { Delete } from "../../pages/Delete/Delete";
import defaultImage from "/src/assets/images/default-image.png";
import Edit from "/src/assets/icons/edit.svg?react";
import "./list-articles.css";

/**
 * Componente `ListArticles`
 *
 * Renderiza una lista de artículos con soporte de paginación.
 * - Muestra la imagen, título y contenido resumido de cada artículo.
 * - Incluye acciones para editar o eliminar artículos.
 * - Permite navegar a la vista detallada del artículo.
 */
export const ListArticles = ({ articles, setArticles }) => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; 

  // Paginación de artículos
  const { totalPages, currentItems: currentArticles } = paginate(
    articles,
    currentPage,
    itemsPerPage
  );

  /**
   * Trunca un texto si excede una longitud determinada.
   * @param {string} text - Texto original.
   * @param {number} length - Longitud máxima.
   * @returns {string}
   */
  const truncateText = (text, length) => {
    return text.length > length ? text.slice(0, length) + "..." : text;
  };

  // Redirige a la vista del artículo
  const handleNavigateToArticle = (id) => {
    navigate(`/article/${id}`);
  };

  // Cambia la página actual
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {/* Renderizamos la lista de artículos paginados */}
      {currentArticles.map((article) => (
        <article
          key={article._id}
          className="articles-list"
          onClick={() => handleNavigateToArticle(article._id)}
        >
          <div>
            {/* Imagen del artículo */}
            {article.image !== "default.png" ? (
              <img src={`${Global.url}image/${article.image}`} alt={`${article.title}`} />
            ) : (
              <img src={defaultImage} alt="Default" />
            )}
          </div>

          <div className="articles-content">
            <h3 className="title">{article.title}</h3>

            {/* Contenido convertido y truncado */}
            <div
              dangerouslySetInnerHTML={{
                __html: truncateText(convertToHtml(article.content), 290),
              }}
            ></div>

            <div className="articles-btn">
              {/* Botón de edición */}
              <button
                className="btn btn-update"
                onClick={(e) => {
                  e.stopPropagation(); // Evitamos que el clic también navegue al artículo
                  navigate(`/update/${article._id}`);
                }}
              >
                <Edit />
              </button>

              {/* Botón de eliminación */}
              <Delete
                articleId={article._id}
                articles={articles}
                setArticles={setArticles}
                message="¿Estás seguro de que deseas eliminar este artículo?"
              />
            </div>
          </div>
        </article>
      ))}

      {/* Paginación */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={page === currentPage ? "btn active" : "btn"}
          >
            {page}
          </button>
        ))}
      </div>
    </>
  );
};
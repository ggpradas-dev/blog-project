import { useState, useEffect } from "react";
import { Global } from "../../../helpers/Global";
import { ajaxRequest } from "../../../helpers/ajaxRequest";
import { ListArticles } from "../../shared/ListArticles/ListArticles";
import { useParams } from "react-router-dom";
import { InputSearch } from "../../shared/InputSearch/InputSearch";
import SadFace from "/src/assets/icons/sad-face.svg?react";

/**
 * Componente `Search`
 *
 * Página que gestiona la búsqueda de artículos según un término ingresado por el usuario.
 * - Realiza una solicitud a la API cuando cambia el término en la URL.
 * - Muestra los resultados con `ListArticles` o un mensaje si no hay coincidencias.
 */
export const Search = () => {
  const [articles, setArticles] = useState([]);
  const params = useParams();

  // Ejecuta la búsqueda cuando cambian los parámetros de la URL
  useEffect(() => {
    getArticlesBySearch();
  }, [params]);

  /**
   * Solicita a la API artículos que coincidan con el término de búsqueda.
   * Actualiza el estado `articles` con los resultados.
   */
  const getArticlesBySearch = async () => {
    const { data } = await ajaxRequest(`${Global.url}search/${params.search}`, "GET");

    if (data?.status === "success") {
      setArticles(data.articles);
    } else {
      setArticles([]);
    }
  };

  return (
    <>
      <InputSearch />

      {articles.length >= 1 ? (
        <ListArticles articles={articles} setArticles={setArticles} />
      ) : (
        <div className="search-false">
          <SadFace />
          <span>¡Ooops, no hay artículos para <strong>{params.search}</strong>!</span>
          <span>Por favor, vuelve a intentarlo.</span>
        </div>
      )}
    </>
  );
};
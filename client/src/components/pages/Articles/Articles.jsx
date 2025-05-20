import { useState, useEffect } from "react";
import { Global } from "../../../helpers/Global";
import { ajaxRequest } from "../../../helpers/ajaxRequest";
import { ListArticles } from "../../shared/ListArticles/ListArticles";
import { InputSearch } from "../../shared/InputSearch/InputSearch";

/**
 * Componente `Articles`
 *
 * Página que muestra todos los artículos disponibles.
 * - Recupera los artículos desde la API al montar el componente.
 * - Integra el componente de búsqueda (`InputSearch`) y el listado (`ListArticles`).
 */
export const Articles = () => {
  const [articles, setArticles] = useState([]);

  // Obtiene artículos al cargar el componente
  useEffect(() => {
    getArticles();
  }, []);

  /**
   * Llama a la API para obtener la lista de artículos y actualiza el estado.
   */
  const getArticles = async () => {
    const { data } = await ajaxRequest(`${Global.url}articulos`, "GET");

    if (data?.status === "success") {
      setArticles(data.articles);
    }
  };

  return (
    <>
      {/* Componente de búsqueda */}
      <InputSearch />

      {articles.length >= 1 
      ? ( <ListArticles articles={articles} setArticles={setArticles} />) 
      : (<h2>No hay artículos para mostrar</h2>)}
    </>
  );
};
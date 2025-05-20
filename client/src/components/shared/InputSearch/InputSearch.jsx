import { useNavigate } from "react-router-dom"; 
import Search from "/src/assets/icons/search.svg?react";
import "./input-search.css"; 

/**
 * Componente `InputSearch`
 *
 * Renderiza una barra de búsqueda que permite redirigir al usuario
 * a una ruta dinámica basada en el término ingresado.
 * Utiliza React Router para manejar la navegación.
 */
export const InputSearch = () => {
  const navigate = useNavigate();

  /**
   * Maneja el envío del formulario de búsqueda.
   * Redirige a una ruta dinámica con el término ingresado.
   *
   * @param {React.FormEvent} e - Evento del formulario.
   */
  const searchArticle = (e) => {
    e.preventDefault(); 
    
    let searchField = e.target.search_field.value.trim();

    if (searchField === "") return;

    navigate(
      `/search-article/${encodeURIComponent(searchField)}`, 
      { replace: true }
    );
  };

  return (
    <div>
      <div className="search">
        <form onSubmit={searchArticle}>
          <button>
            <Search />
          </button>
          <input 
            type="text" 
            name="search_field" 
            placeholder="¿Qué artículo estás buscando?" 
          />
        </form>
      </div>
    </div>
  );
};
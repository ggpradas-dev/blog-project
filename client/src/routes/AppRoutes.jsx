import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Header } from "../components/layout/Header";
import { Nav } from "../components/layout/Nav";
import { Footer } from "../components/layout/Footer";
import { Home } from "../components/pages/Home/Home";
import { Article } from "../components/pages/Article/Article";
import { Articles } from "../components/pages/Articles/Articles";
import { Create } from "../components/pages/Create/Create";
import { Update } from "../components/pages/Update/Update";
import { Search } from "../components/pages/Search/Search";

/**
 * Componente que define las rutas principales de la aplicación usando React Router.
 * Incluye la estructura base de la SPA, con cabecera, navegación, contenido dinámico y pie de página.
 */
export const AppRoutes = () => {
  return (
    <BrowserRouter>
      {/* Componentes de cabecera y navegación */}
      <Header />
      <Nav />

      {/* Contenido dinámico según la ruta actual */}
      <section id="content" className="content">
        <Routes>
          {/* Página principal */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />

          {/* Listado, creación y búsqueda de artículos */}
          <Route path="/articles" element={<Articles />} />
          <Route path="/create-article" element={<Create />} />
          <Route path="/search-article/:search" element={<Search />} />

          {/* Detalle y edición de un artículo */}
          <Route path="/article/:id" element={<Article />} />
          <Route path="/update/:id" element={<Update />} />

          {/* Página no encontrada */}
          <Route path="*" element={
            <div className="search-false">
              <h2>Error 404</h2>
              <span>Página no encontrada</span>
            </div>
          }/>
        </Routes>
      </section>

      {/* Componente para el pie de página */}  
      <Footer />
    </BrowserRouter>
  );
};
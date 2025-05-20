import { useState, useEffect } from "react";
import LightMode from "/src/assets/icons/light-mode.svg?react";
import DarkMode from "/src/assets/icons/dark-mode.svg?react";
import "./theme-toggler.css";

/**
 * Componente `ThemeToggler`
 *
 * Permite al usuario alternar entre tema claro y oscuro.
 * - Aplica la clase correspondiente al `<body>` para cambiar el tema visual.
 * - Persiste la elección del usuario en `localStorage`.
 * - Muestra un ícono distinto según el tema activo (luz u oscuridad).
 */
export const ThemeToggler = () => {

  // Estado inicial: se carga desde localStorage o se establece como "dark-theme"
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark-theme";
  });

  // Efecto que aplica el tema y actualiza localStorage cuando cambia
  useEffect(() => {
    document.body.classList.remove("light-theme", "dark-theme");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Alterna entre los temas claro y oscuro
  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === 'light-theme' ? 'dark-theme' : 'light-theme'
    );
  };

  return (
    <div onClick={toggleTheme}>
      {/* Ícono dinámico según el tema actual */}
      {theme === 'light-theme' ? <LightMode /> : <DarkMode />}
    </div>
  );
};
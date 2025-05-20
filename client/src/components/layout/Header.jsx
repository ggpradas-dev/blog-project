import { ThemeToggler } from "../ui/ThemeToggler/ThemeToggler";
import { useNavigate } from "react-router-dom";
import Logo from "/src/assets/icons/logo.svg?react";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="logo" onClick={() => navigate(`/home`)}>
        <h1>BLOG PROJECT</h1>
      </div>

      <div className="theme-btn">
        <ThemeToggler />
      </div>
    </header>
  );
};
import React, { useState } from "react";
import { useAuth } from "../../Auth/UseAuth";
import { AlignJustify, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import "./HeaderStyle.css";

const Header: React.FC = () => {
  const { logout, isAuthenticated } = useAuth();
  const leave = (): void => {
    logout();
  };

  const [showMObileHeader, setShowMObileHeader] = useState<boolean>(false);

  return (
    <>
      <button
        onClick={() => setShowMObileHeader(!showMObileHeader)}
        className="button-mobile-header"
      >
        <AlignJustify className="icon-mobile-button" color="red" size={30} />
      </button>
      <header className={showMObileHeader ? "header-mobile" : "header"}>
        <div className="div-header">
          <Link to="/" className="link-logo">
            G Flix
          </Link>
        </div>
        <div className="div-header-nav">
          <Link className="link-header" to="/">
            Home
          </Link>

          <Link className="link-header" to="/pesquisar">
            Pesquisar
          </Link>
          <Link className="link-header" to="/Favoritos">
            Favoritos
          </Link>
          <Link className="link-header" to="/add-videos">
            Adicionar video
          </Link>
        </div>
        <div className="div-header">
          {isAuthenticated ? (
            <button className="logout" onClick={() => leave()}>
              Sair
              <LogOut color="red" className="icon-logout" />
            </button>
          ) : (
            ""
          )}
        </div>
      </header>
    </>
  );
};

export default Header;

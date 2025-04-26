import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../Auth/UseAuth";
import { AlignJustify, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import "./HeaderStyle.css";

const Header: React.FC = () => {
  const { logout, isAuthenticated } = useAuth();
  const [showMObileHeader, setShowMObileHeader] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const leave = (): void => {
    logout();
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      const target = event.target as Node;

      if (menuRef.current && !menuRef.current.contains(target)) {
        setShowMObileHeader(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <button
        onClick={() => setShowMObileHeader(!showMObileHeader)}
        className={!showMObileHeader ? "button-mobile-header" : "none"}
      >
        <AlignJustify className="icon-mobile-button" color="red" size={30} />
      </button>
      <header
        ref={menuRef}
        className={showMObileHeader ? "header-mobile" : "header"}
      >
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
              <LogOut className="icon-logout" />
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

import "../styles/index.css";
import "../styles/header/Header.css";
import { FaUserCircle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { LogOut } from "lucide-react";
import { HamburgerMenu } from "./HamburgerMenu";
import logo from "../assets/images/logo.png";

export const HeaderLinks = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const userMenuRef = useRef<HTMLDivElement>(null);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const location = useLocation();
  const handleHamMenu = (open: boolean) => {
    setIsOpen(open);
  };

  const isHistoryPage = location.pathname === "/history";

  const handleSignOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/auth");
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className={`wrapper ${isHistoryPage ? "history-page" : ""}`}>
        <div className="head">
          <div className="header-link">
            <Link to="/" className="logo-link">
              <img className="logo" src={logo} alt="RivzAI Logo" />
              <span className="logo-name">
                Rivz<span className="logo-ai-name">AI</span>
              </span>
            </Link>
          </div>

          <div
            className={
              isOpen ? "header-links-list-mobile" : "header-links-list"
            }
          >
            <Link className="link" to="/teacher-mode">
              Teacher Mode
            </Link>

            <Link to="/history" className="link">
              History
            </Link>

            {user ? (
              <div className="user-menu-container" ref={userMenuRef}>
                <button
                  className="get-started-btn user-btn"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                >
                  <FaUserCircle className="user-icon" />
                </button>
                {isUserMenuOpen && (
                  <div className="user-dropdown">
                    <div className="user-dropdown-info">
                      <span className="user-dropdown-username">
                        {user.username}
                      </span>
                      <span className="user-dropdown-email">{user.email}</span>
                    </div>
                    <div className="user-dropdown-divider" />
                    <button
                      className="user-dropdown-signout"
                      onClick={handleSignOut}
                    >
                      <LogOut size={16} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/auth" className="get-started-btn">
                Get Started Free
              </Link>
            )}
          </div>

          <HamburgerMenu isOpen={isOpen} handleHamMenu={handleHamMenu} />
        </div>
        <div className={isOpen ? "mobile-menu" : ""}></div>
      </div>
    </>
  );
};

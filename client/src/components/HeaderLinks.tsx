import "../styles/index.css";
import "../styles/header/Header.css";
import { FaUserCircle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { LogOut, ArrowLeft } from "lucide-react";
import { HamburgerMenu } from "./HamburgerMenu";
import logo from "../assets/images/logo.png";

export const HeaderLinks = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [showMobileUserMenu, setShowMobileUserMenu] = useState(false);
  const navigate = useNavigate();
  const userMenuRef = useRef<HTMLDivElement>(null);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const location = useLocation();
  const handleHamMenu = (open: boolean) => {
    setIsOpen(open);
    if (!open) setShowMobileUserMenu(false);
  };

  const handleUserClick = () => {
    if (window.innerWidth <= 720) {
      setShowMobileUserMenu(true);
    } else {
      setIsUserMenuOpen(!isUserMenuOpen);
    }
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
            {isOpen && showMobileUserMenu && user ? (
              <div className="mobile-user-panel">
                <div className="mobile-user-header">
                  <button
                    className="mobile-user-back"
                    onClick={() => setShowMobileUserMenu(false)}
                  >
                    <ArrowLeft size={24} />
                  </button>
                </div>
                <div className="mobile-user-info">
                  <span className="mobile-user-username">{user.username}</span>
                  <span className="mobile-user-email">{user.email}</span>
                </div>
                <button className="mobile-user-signout" onClick={handleSignOut}>
                  <LogOut size={18} /> Log Out
                </button>
              </div>
            ) : (
              <>
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
                      onClick={handleUserClick}
                    >
                      <FaUserCircle className="user-icon" />
                    </button>
                    {isUserMenuOpen && !isOpen && (
                      <div className="user-dropdown">
                        <div className="user-dropdown-info">
                          <span className="user-dropdown-username">
                            {user.username}
                          </span>
                          <span className="user-dropdown-email">
                            {user.email}
                          </span>
                        </div>
                        <div className="user-dropdown-divider" />
                        <button
                          className="user-dropdown-signout"
                          onClick={handleSignOut}
                        >
                          <LogOut size={16} /> Log Out
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link to="/auth" className="get-started-btn">
                    Get Started Free
                  </Link>
                )}
              </>
            )}
          </div>

          <HamburgerMenu isOpen={isOpen} handleHamMenu={handleHamMenu} />
        </div>
        <div className={isOpen ? "mobile-menu" : ""}></div>
      </div>
    </>
  );
};

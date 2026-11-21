
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../src/AuthContext";

function Layout() {
  const navigate = useNavigate();
  const { user, isAdmin, logout } = useAuth();

  const navigationLinks = [
    { label: "Home", path: "/" },
    { label: "About Me", path: "/about" },
    { label: "Projects", path: "/project" },
    { label: "Education", path: "/education" },
    { label: "Services", path: "/services" },
    { label: "Contact Me", path: "/contact" },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Signout error:", error.message);
      navigate("/");
    }
  };

  return (
    <header className="site-header">
      <div className="container navigation-wrapper">
        <NavLink className="brand" to="/">
          <span className="logo-mark">FR</span>
          <span className="brand-name">Fadi Rizk</span>
        </NavLink>

        <nav aria-label="Main navigation">
          {navigationLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              {link.label}
            </NavLink>
          ))}

          {!user && (
            <>
              <NavLink
                to="/signin"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Sign In
              </NavLink>

              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Sign Up
              </NavLink>
            </>
          )}

          {user && (
            <>
              {isAdmin && (
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Admin Dashboard
                </NavLink>
              )}

              <span className="nav-link">
                {user.name}
              </span>

              <button
                type="button"
                className="nav-link logout-button"
                onClick={handleLogout}
              >
                Sign Out
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Layout;

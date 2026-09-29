import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logoutUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="app-header">
      <div className="header-container">
        <Link to="/dashboard" className="brand-logo">
          <div className="logo-badge">1S</div>
          <span className="brand-title">one<span className="brand-accent">Sub</span></span>
        </Link>

        {user && (
          <nav className="nav-links">
            <Link to="/dashboard" className={`nav-item ${isActive("/dashboard") ? "active" : ""}`}>
              Dashboard
            </Link>
            <Link to="/subscriptions" className={`nav-item ${isActive("/subscriptions") ? "active" : ""}`}>
              Subscriptions
            </Link>
            <Link to="/add-subscription" className={`nav-item ${isActive("/add-subscription") ? "active" : ""}`}>
              + Add New
            </Link>
            <Link to="/profile" className={`nav-item ${isActive("/profile") ? "active" : ""}`}>
              Profile
            </Link>
          </nav>
        )}

        {user ? (
          <div className="user-profile-menu">
            <span className="user-greeting">Hi, <strong>{user.name || "User"}</strong></span>
            <button className="btn-logout" onClick={handleLogout} title="Logout">
              Logout
            </button>
          </div>
        ) : (
          <div className="auth-nav-buttons">
            <Link to="/login" className="btn-secondary">Login</Link>
            <Link to="/register" className="btn-primary">Register</Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;

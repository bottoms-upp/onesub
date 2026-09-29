import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <div className="page-container">
      <Navbar />

      <main className="content-body profile-content">
        <div className="profile-card glass-card">
          <div className="profile-avatar">
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>

          <h2>{user?.name || "User Profile"}</h2>
          <p className="profile-email">{user?.email || "user@onesub.com"}</p>

          <div className="profile-badges">
            <span className="badge-chip">ID: #{user?.id || "1"}</span>
            <span className="badge-chip success">College Project Demo</span>
          </div>

          <div className="profile-info-grid">
            <div className="info-item">
              <span className="info-label">Account Name</span>
              <strong className="info-value">{user?.name}</strong>
            </div>

            <div className="info-item">
              <span className="info-label">Email Address</span>
              <strong className="info-value">{user?.email}</strong>
            </div>

            <div className="info-item">
              <span className="info-label">Database Mode</span>
              <strong className="info-value">H2 File DB (Plug & Play)</strong>
            </div>

            <div className="info-item">
              <span className="info-label">Project Status</span>
              <strong className="info-value">Fully Operational</strong>
            </div>
          </div>

          <div className="profile-actions">
            <Link to="/dashboard" className="btn-secondary">
              Go to Dashboard
            </Link>
            <button className="btn-primary danger" onClick={handleLogout}>
              Logout Account
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;

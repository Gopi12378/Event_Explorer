import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleEventsClick = (e) => {
    if (!user) {
      e.preventDefault(); // stop navigation
      alert("⚠️ Please login first to access Events"); // popup
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="brand">Home</Link>
      </div>
      <div className="nav-right">
        {user ? (
          <>
            <Link to="/events" className="auth-link">Events</Link>
            <Link to="/profile" className="auth-link">Profile</Link> {/* Added Profile */}
            <span className="user-email">{user.email}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/events" onClick={handleEventsClick} className="auth-link">Events</Link>
            <Link to="/login" className="auth-link">Login</Link>
            <Link to="/signup" className="auth-link">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

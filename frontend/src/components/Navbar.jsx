import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  function handleLogout() {
    // Remove all login information
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("name");

    // Go to login page
    navigate("/login");
  }

  return (
    <nav>
      {/* Logo */}

      <Link to="/" className="logo">
        JobTrack
      </Link>

      {/* Navigation */}

      <div className="nav-links">

        {/* Public pages */}

        <Link to="/">
          Home
        </Link>

        <Link to="/jobs">
          Jobs
        </Link>

        <Link to="/about">
          About
        </Link>

        {/* Logged-in user pages */}

        {token && (
          <Link to="/dashboard">
            Dashboard
          </Link>
        )}

        {token && (
          <Link to="/profile">
            Profile
          </Link>
        )}

        {/* Login / Logout */}

        {token ? (
          <button
            onClick={handleLogout}
            className="logout-button"
          >
            Logout
          </button>
        ) : (
          <Link to="/login">
            Login
          </Link>
        )}

      </div>
    </nav>
  );
}

export default Navbar;
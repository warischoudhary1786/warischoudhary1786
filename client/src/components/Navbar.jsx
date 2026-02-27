import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Link className="brand" to={token ? "/feed" : "/login"}>
          ProConnect
        </Link>

        <nav className="topbar-nav">
          {token ? (
            <>
              <Link to="/feed">Feed</Link>
              {user?.id && <Link to={`/profile/${user.id}`}>Profile</Link>}
              <button className="btn-link" type="button" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

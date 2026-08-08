// Import useContext so we can read AuthContext data
import { useContext } from "react";
import { Link } from "react-router-dom";
// Import useNavigate so we can change pages
import { useNavigate } from "react-router-dom";

// Import our authentication context
import { AuthContext } from "../context/AuthContext";
import useAuth from "../hooks/useAuth";

function Navbar() {
  // Get logout function from AuthContext
  const { logout } = useContext(AuthContext);
  //   const { logout } = useAuth();

  // Create navigation function
  const navigate = useNavigate();

  // Function that handles logout
  function handleLogout() {
    // Remove login status
    logout();

    // Send user back to login page
    navigate("/");
  }

  return (
    <nav className="navbar bg-dark">
      <div className="container">
        <div className="row w-100 align-items-center">
          {/* Logo */}
          <div className="col-md-4">
            <a className="navbar-brand text-white">Teacher Assistant</a>
          </div>

          {/* Menu */}
          <div className="col-md-4">
            <ul className="nav justify-content-center">
              <li className="nav-item">
                <Link className="nav-link" to="/home">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/create-class">
                  Create Class
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/add-student">
                  Add Student
                </Link>
              </li>
            </ul>
          </div>

          {/* Logout */}
          <div className="col-md-4 text-end">
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

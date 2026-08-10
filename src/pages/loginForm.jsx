import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  async function handleSubmit(event) {
    event.preventDefault();
    let newErrors = {};

    if (!email) {
      newErrors.email = "email is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }

    // Temporary login checking

    setError({});
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      console.log(data);
      navigate("/home");
      login(data.token);

    
    } catch (error) {
      console.error(error);
      alert("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mt-5">
      <div className="card" id="login-card">
        <div className="card-body">
          <h5 className="card-title">Login</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">email</label>
              <input
                type="email"
                className={`form-control ${error.email ? "is-invalid" : ""}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
              />
              {error.email && (
                <p className="text-danger">{error.email}</p>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className={`form-control ${error.password ? "is-invalid" : ""}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
              {error.password && (
                <p className="text-danger">{error.password}</p>
              )}
            </div>
            <button type="submit" className="btn btn-primary">
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;

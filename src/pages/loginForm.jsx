import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function fakeLogin(username, password) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (username === "admin" && password === "123456") {
        resolve({
          success: true,
        });
      } else {
        resolve({
          success: false,
          message: "Invalid username or password",
        });
      }
    }, 1000);
  });
}

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  async function handleSubmit(event) {
    event.preventDefault();
    let newErrors = {};

    if (!username) {
      newErrors.username = "Username is required";
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
      // const response = await fetch("http://localhost:5173/login", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     username,
      //     password,
      //   }),
      // });



      const response = await fakeLogin(username, password);

      // const data = await response.json();
      if (response.success) {
        // localStorage.setItem("token", data.token);
        // alert("Login Successful!");
        login(); // Change isLoggedIn from false to true
        navigate("/dashboard");
      } else {
        alert("Invalid username or password.");
      }
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
              <label className="form-label">Username</label>
              <input
                type="text"
                className={`form-control ${error.username ? "is-invalid" : ""}`}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
              />
              {error.username && (
                <p className="text-danger">{error.username}</p>
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

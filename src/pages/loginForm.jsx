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

    setLoading(true);

    try {
      const hosting = {
        dev: "http://localhost:5000/api/auth/login",
        localhost: "http://192.168.1.31:5000/api/auth/login",
      };

      const response = await fetch(hosting.localhost, {
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

      // console.log(data.map);
      if(data.success){
        navigate("/home");
        login(data.token);
        alert(data.success);

      }
      else if (data.error){
        alert(data.error);
      }
      else
        alert(data.server);
      

    } catch (error) {
      console.error(error);
      alert("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="text-center mb-4">Teacher Assistant</h2>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>

            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e =>setEmail(e.target.value))}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-2">
            <label className="form-label">Password</label>

            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e =>setPassword(e.target.value))}
              required
            />
          </div>

          {/* Forgot password */}
          <div className="text-end mb-3">
            <a href="/forgot-password">Forgot password?</a>
          </div>

          {/* Login */}
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>

        {/* Signup */}
        <div className="text-center mt-4">
          <span>Don't have an account? </span>

          <a href="/signup">Sign up</a>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;

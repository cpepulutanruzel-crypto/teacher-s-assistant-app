import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hosting = {
      dev: "http://localhost:5000/api/auth/forgotpassword",
      localhost: "http://192.168.1.31:5000/api/auth/forgotpassword",
    };

    const response = await fetch(hosting.localhost, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email,
      }),
    });

    const data = await response.json();

    console.log(data);
    
  };

  return (
    <div className="forgot-page">
      <div className="forgot-card">
        {/* Header */}
        <div className="forgot-header">
          <h2>Forgot Password?</h2>

          <p>
            Enter your email address and we'll help you reset your password.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="forgot-input-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Button */}
          <button type="submit">Send Reset Link</button>
        </form>

        {/* Back to Login */}
        <div className="forgot-footer">
          <a href="/">← Back to Login</a>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;

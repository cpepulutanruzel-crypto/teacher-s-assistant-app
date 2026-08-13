import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const navigate = useNavigate;

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConPassw] = useState("");
  const { token } = useParams();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (confirmPassword !== password) {
      alert("Password not matched!");
    }

    const hosting = {
      dev: "http://localhost:5000/api/auth/reset-password",
      localhost: "http://192.168.1.31:5000/api/auth/reset-password",
    };
    const response = await fetch(hosting.localhost, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        token,
        password,
      }),
    });

    const data = await response.json();

    console.log(data);
  };
  return (
    <div className="reset-page">
      <div className="reset-card">
        {/* Header */}
        <div className="reset-header">
          <h2>Reset Password</h2>

          <p>Create a new password for your account.</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* New Password */}
          <div className="reset-input-group">
            <label>New Password</label>

            <input
              type="password"
              placeholder="Enter new password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Confirm Password */}
          <div className="reset-input-group">
            <label>Confirm Password</label>

            <input
              type="password"
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(e) => setConPassw(e.target.value)}
              required
            />
          </div>

          {/* Reset Password */}
          <button type="submit">Reset Password</button>
        </form>

        {/* Back to Login */}
        <div className="reset-footer">
          <a href="/">← Back to Login</a>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;

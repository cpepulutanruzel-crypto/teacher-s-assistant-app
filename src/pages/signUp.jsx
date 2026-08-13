import { useState, useSyncExternalStore } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function Signup() {
  // Stores the teacher's name
  const navigate = useNavigate();
  const [given_name, setName] = useState("");
  const [middleName, setMi] = useState("");
  const [lastName, setLastName] = useState("");

  //Teachers Department
  const [region, setRegion] = useState("");
  const [schoolID, setSchoolId] = useState("");
  const [division, setDiv] = useState("");
  const [schoolName, setSchoolName] = useState("");

  // Stores the teacher's email
  const [email, setEmail] = useState("");

  // Stores the teacher's password
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const hosting = {
      dev: "http://localhost:5000/api/auth/signup",
      localhost: "http://192.168.1.31:5000/api/auth/signup",
    };
    const response = await fetch(hosting.localhost, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        given_name,
        middleName,
        lastName,
        region,
        schoolID,
        schoolName,
        division,
        email,
        password,

      }),
    });
    if (conPassword !== password) {
      alert("Password not matched");
    }
    const data = await response.json();
    if (data.success) {
      alert("Account Successfully Created");
      navigate("/");
      console.log(data);
    }
    else if(data.exist){
      alert(data.error);
    }
    else{
      alert(data);
    }
  }

  return (
    <div className="signup-page">
      <div className="signup-card">
        {/* Header */}
        <div className="text-center mb-4">
          <h2>Sign up</h2>
          <p className="text-muted mb-0">
            Register to manage your classes and students.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* =========================
              PERSONAL INFORMATION
          ========================== */}
          <div className="signup-section">
            <h5 className="section-title">Personal Information</h5>

            <div className="row g-2">
              {/* First Name */}
              <div className="col-12 col-md-4">
                <label className="form-label">First Name</label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="First Name"
                  value={given_name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* Middle Name */}
              <div className="col-12 col-md-4">
                <label className="form-label">Middle Name</label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Middle Name"
                  value={middleName}
                  onChange={(e) => setMi(e.target.value)}
                  required
                />
              </div>

              {/* Last Name */}
              <div className="col-12 col-md-4">
                <label className="form-label">Last Name</label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* =========================
              SCHOOL INFORMATION
          ========================== */}
          <div className="signup-section">
            <h5 className="section-title">School Information</h5>

            {/* Region */}
            <div className="mb-3">
              <label className="form-label">Region</label>

              <input
                type="text"
                className="form-control"
                placeholder="Enter your region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                required
              />
            </div>

            {/* School Name */}
            <div className="mb-3">
              <label className="form-label">School Name</label>

              <input
                type="text"
                className="form-control"
                placeholder="Enter your school name"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                required
              />
            </div>

            {/* School ID */}
            <div>
              <label className="form-label">School ID</label>

              <input
                type="text"
                className="form-control"
                placeholder="Enter your school ID"
                value={schoolID}
                onChange={(e) => setSchoolId(e.target.value)}
                required
              />
            </div>
          </div>

          {/* =========================
              ACCOUNT INFORMATION
          ========================== */}
          <div className="signup-section">
            <h5 className="section-title">Account Information</h5>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label">Email</label>

              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="form-label">Password</label>

              <input
                type="password"
                className="form-control"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="form-label">Confirm Password</label>

              <input
                type="password"
                className="form-control"
                placeholder="Confirm your password"
                value={conPassword}
                onChange={(e) => setConPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Submit */}
          <button type="submit" className="btn btn-primary w-100 mt-2">
            Create Account
          </button>
        </form>

        {/* Login */}
        <div className="text-center mt-4">
          <span>Already have an account? </span>

          <a href="/">Login</a>
        </div>
      </div>
    </div>
  );
}

export default Signup;

import express from "express";
import cors from "cors";
import pool from "./db.js";
import bcrypt from "bcrypt";
import { generateToken } from "./token.js";

const app = express();

app.use(cors());
app.use(express.json());

// SIGN UP API
app.post("/api/auth/signup", async (req, res) => {
  const { given_name, email, password } = req.body;

  try {
    const passhash = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO public.tblteacheruser
                (given_name, email, password_hash)
             VALUES
                ($1, $2, $3)
             RETURNING id, given_name, email, created_at`,
      [given_name, email, passhash],
    );

    res.status(201).json({
      message: "Teacher created successfully",
      teacher: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create teacher",
    });
  }
});

// LOGIN API
app.post("/api/auth/login", async (req, res) => {
  // Get email and password sent by React
  const { email, password } = req.body;

  try {
    // Find the teacher using their email
    const result = await pool.query(
      `SELECT id, given_name, email, password_hash
             FROM public.tblteacheruser
             WHERE email = $1`,
      [email],
    );

    // Teacher does not exist
    if (result.rows.length === 0) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    // Get the teacher record
    const teacher = result.rows[0];

    // Compare the password from React
    // with the hash stored in PostgreSQL
    const passwordMatch = await bcrypt.compare(password, teacher.password_hash);

    // Password is incorrect
    if (!passwordMatch) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    // Login successful
    const token = generateToken(teacher);
    res.status(200).json({
      success: "Login successful",
      token: token,
      teacher: {
        id: teacher.id,
        given_name: teacher.given_name,
        email: teacher.email,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      server: "Server error",
    });
  }
});

// DEBUG API

const host = {
  dev : "http://localhost:5000",
  local : "http://192.168.1.31:5000"
}

app.listen(5000, () => {
  console.log(`server is running on ${host.dev}`);
});

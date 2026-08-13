import express from "express";
import cors from "cors";
import pool from "./db.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { generateToken } from "./token.js";


const app = express();

app.use(cors());
app.use(express.json());

// SIGN UP API
app.post("/api/auth/signup", async (req, res) => {
  const {
    given_name,
    middleName,
    lastName,
    region,
    schoolID,
    schoolName,
    division,
    email,
    password,
  } = req.body;

  try {
    const passhash = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO public.tblteacheruser
                (
                email, 
                password_hash,
                region,
                school_name,
                school_id,
                division,
                given_name, 
                middle_init,
                last_name)
             VALUES
                ($1, $2, $3, $4, $5, $6, $7, $8, $9)
             RETURNING id, given_name, email, created_at`,
      [
        email,
        passhash,
        region,
        schoolName,
        schoolID,
        division,
        given_name,
        middleName,
        lastName,
      ],
    );

    res.status(201).json({
      success: "Teacher created successfully",
      teacher: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to create teacher",
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

//FORGOT PASS API
app.post("/api/auth/forgotpassword", async (req, res) => {
  // Get the email sent by React
  const { email } = req.body;

  try {
    // Find the teacher using their email
    const result = await pool.query(
      `SELECT id
             FROM public.tblteacheruser
             WHERE email = $1`,
      [email],
    );

    // Don't reveal whether an email exists
    if (result.rows.length === 0) {
      return res.status(200).json({
        message: "If the email exists, a reset link will be sent.",
      });
    }

    // Get teacher ID
    const teacherId = result.rows[0].id;

    // Generate a secure random token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Hash the token before storing it
    const tokenHash = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Set token expiration to 15 minutes
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    // Store the hashed token
    await pool.query(
      `INSERT INTO public.tblpasswordreset
                (teacher_id, token_hash, expires_at)
             VALUES
                ($1, $2, $3)`,
      [teacherId, tokenHash, expiresAt],
    );

    // TEMPORARY:
    // We are returning the token so we can test the process.
    // Later this will be sent through email.
    res.status(200).json({
      message: "Password reset request created.",

      resetToken: resetToken,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error.",
    });
  }
});



// RESET PASSWORD API
app.post("/api/auth/reset-password", async (req, res) => {

    // Get token and new password from React
    const { token, password } = req.body;

    try {

        // Make sure both values were provided
        if (!token || !password) {
            return res.status(400).json({
                message: "Token and password are required."
            });
        }


        // Hash the token received from React
        const tokenHash = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");


        // Find the reset token
        const result = await pool.query(
            `SELECT id, teacher_id
             FROM public.tblpasswordreset
             WHERE token_hash = $1
             AND expires_at > CURRENT_TIMESTAMP
             AND used = FALSE`,
            [tokenHash]
        );


        // Token doesn't exist or is expired/used
        if (result.rows.length === 0) {

            return res.status(400).json({
                message: "Invalid or expired reset token."
            });

        }


        // Get reset record
        const resetRecord = result.rows[0];


        // Hash the new password
        const passwordHash = await bcrypt.hash(password, 10);


        // Update teacher password
        await pool.query(
            `UPDATE public.tblteacheruser
             SET password_hash = $1
             WHERE id = $2`,
            [
                passwordHash,
                resetRecord.teacher_id
            ]
        );


        // Mark token as used
        await pool.query(
            `UPDATE public.tblpasswordreset
             SET used = TRUE
             WHERE id = $1`,
            [resetRecord.id]
        );


        // Send success response
        res.status(200).json({
            message: "Password has been reset successfully."
        });


    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error."
        });

    }

});

// DEBUG API

const host = {
  dev: "http://localhost:5000",
  local: "http://192.168.1.31:5000",
};

app.listen(5000,"0.0.0.0", () => {
  console.log(`server is running on ${host.local}`);
});

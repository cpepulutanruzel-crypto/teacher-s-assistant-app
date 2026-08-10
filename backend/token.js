import jwt from "jsonwebtoken";

const JWT_SECRET = "teacher-app-secret";

export function generateToken(teacher) {

    return jwt.sign(
        {
            id: teacher.id,
            email: teacher.email
        },

        JWT_SECRET,

        {
            expiresIn: "1h"
        }
    );
}
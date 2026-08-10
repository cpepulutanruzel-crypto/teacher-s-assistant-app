import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
    host: "localhost",
    port: 5432,
    database: "dbteacherapp",
    user: "postgres",
    password: "postgres123"
});

export default pool;
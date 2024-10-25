import pkg from "pg"
const { Pool } = pkg

export const pool = new Pool({
    user: 'postgres',      // Database username
    host: 'localhost',         // Database host (default is localhost)
    database: 'latihanfullstack',   // Database name
    password: '@Muh12345',   // Database password
    port: 5432,                // Default PostgreSQL port
});
import { pool } from "../db.js"
import bcrypt from "bcryptjs"

class UserModel {
    constructor(parameters) {

    }

    async register({ email, username, password }) {
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)
        try {
            const existingUsername = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
            const existingEmail = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

            if (existingUsername.rows.length > 0) {
                return { error: { message: "Username already taken", type: "username" } };
            }
            if (existingEmail.rows.length > 0) {
                return { error: { message: "Email already taken", type: "email" } };
            }
            const result = await pool.query('INSERT INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING *',
                [email, username, hashedPassword])
            return result.rows[0]
        } catch (error) {

        }
    }

    async login({ username, password }) {

        try {
            const result = await pool.query(`SELECT * FROM users WHERE username = $1`,
                [username]
            )
            if (result.rows.length == 0) {
                return ({ error: "invalid credentials" })
            }
            const hashedPassword = bcrypt.compareSync(password, result.rows[0].password)
            if (!hashedPassword) {
                return ({ error: "invalid credentials" })
            }
            return result.rows[0]
        } catch (error) {
            console.log(error)
        }
    }
}

export default UserModel
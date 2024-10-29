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
            const result = await pool.query('INSERT INTO users (email, username, password, profile_picture) VALUES ($1, $2, $3, $4) RETURNING *',
                [email, username, hashedPassword, "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"])
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

    async getUserById(userId) {
        try {
            const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [userId])

            return result.rows[0]
        } catch (error) {
            console.log(error)
        }
    }
    async getFollowedUsers(userId) {
        try {
            const result = await pool.query(`
                SELECT u.id, u.username, u.profile_picture 
                FROM users u
                INNER JOIN follows f ON u.id = f.followed_id
                WHERE f.follower_id = $1
            `, [userId]);

            return result.rows; // List of followed users
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getUnfollowedUsers({ userId }) {
        try {
            const result = await pool.query(`
                SELECT u.id, u.username, u.profile_picture 
                FROM users u
                WHERE u.id != $1 
                AND u.id NOT IN (
                    SELECT followed_id FROM follows WHERE follower_id = $1
                )
            `, [userId]);

            return result.rows; // List of unfollowed users
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

}

export default UserModel
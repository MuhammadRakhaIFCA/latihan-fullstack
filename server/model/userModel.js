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
                [email, username, hashedPassword, ""])
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
    async getFollowers(userId) {
        try {
            const result = await pool.query(`
                SELECT u.id, u.username, u.profile_picture 
                FROM users u
                INNER JOIN follows f ON u.id = f.follower_id
                WHERE f.followed_id = $1
            `, [userId]);

            return result.rows; // List of followed users
        } catch (error) {
            console.error(error);
            throw error;
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

    async editUser({ username, profile_picture, location, website, userId }) {
        try {
            const existingUsername = await pool.query(
                'SELECT * FROM users WHERE username = $1 AND id != $2',
                [username, userId]
            );

            if (existingUsername.rows.length > 0) {
                return { error: { message: "Username already taken", type: "username" } };
            }

            const result = await pool.query(
                `UPDATE users SET username = $1, profile_picture = $2, 
                location = $3, website = $4 WHERE id = $5 RETURNING *`,
                [username, profile_picture || "", location, website, userId]
            );

            return result.rows[0]
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error updating profile" });
        }
    }

    async getAllUsers() {
        try {
            const result = await pool.query(`SELECT * FROM users`)
            return result.rows
        } catch (error) {
            console.log(error)
        }
    }

    async searchUsers(query) {
        try {
            const result = await pool.query(
                `SELECT id, username, profile_picture 
                 FROM users 
                 WHERE LOWER(username) LIKE LOWER($1)`,
                [`%${query}%`]
            );
            return result.rows;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getFollowRecommendations(userId) {
        try {
            const result = await pool.query(`
                SELECT u.id AS user_id, u.username, u.profile_picture, COUNT(f.follower_id) AS follow_count
                FROM follows f
                INNER JOIN users u ON u.id = f.followed_id
                WHERE f.follower_id IN (
                    SELECT followed_id
                    FROM follows
                    WHERE follower_id = $1
                ) 
                AND f.followed_id NOT IN (
                    SELECT followed_id
                    FROM follows
                    WHERE follower_id = $1
                )
                AND f.followed_id != $1
                GROUP BY u.id, u.username, u.profile_picture
                ORDER BY follow_count DESC
                LIMIT 3;
            `, [userId]);


            return result.rows; // Returns top 3 recommended users with additional info
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getUserWithChat(userId) {
        try {
            const result = await pool.query(`SELECT DISTINCT
        u.id,
        u.username,
        u.profile_picture
        FROM users as u
        JOIN chats as c
        ON u.id = c.sender_id OR u.id = c.receiver_id
        WHERE c.sender_id = $1 OR receiver_id = $1;       
        `, [userId])
            return result.rows
        } catch (error) {

        }
    }

}

export default UserModel
import { pool } from "../db.js"

class PostModel {
    constructor(parameters) {

    }

    async getPost() {
        try {
            const result = await pool.query(`SELECT * FROM posts`)
            return result.rows
        } catch (error) {

        }
    }
    async addPost({ description, image, userId }) {
        try {
            const result = await pool.query(`INSERT INTO posts (description, image, user_id) VALUES ($1, $2, $3)
                RETURNING *,
                `, [description, image, userId])
            return result.rows[0]
        } catch (error) {
            console.log(error)
        }
    }
}

export default PostModel
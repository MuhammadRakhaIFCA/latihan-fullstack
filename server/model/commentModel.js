import { pool } from "../db.js"

class commentModel {
    constructor(parameters) {

    }

    async addComment({ userId, postId, content }) {
        try {
            const result = await pool.query(`INSERT INTO comments (user_id, post_id, content)
                VALUES ($1, $2, $3) RETURNING *`, [userId, postId, content])
            return result.rows[0]
        } catch (error) {
            console.log(error)
        }
    }

    async deleteComment({ commentId }) {
        try {
            await pool.query(`DELETE FROM comments WHERE id = $1`, [commentId])
        } catch (error) {
            console.log(error)
        }
    }

    async getComment(postId) {
        try {
            const result = await pool.query(`
                SELECT 
                c.id AS comment_id,
                c.content AS content,
                c.post_id,
                u.id AS user_id,
                u.username,
                u.profile_picture
            FROM comments AS c
            JOIN users AS u ON c.user_id = u.id
            JOIN posts AS p ON c.post_id = p.id
            WHERE p.id = $1`, [postId])
            return result.rows
        } catch (error) {
            console.log(error)
        }
    }
}

export default commentModel
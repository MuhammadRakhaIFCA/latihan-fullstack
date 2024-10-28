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
    async getFollowedPost({ userId }) {
        try {
            const result = await pool.query(`
            SELECT 
                p.id AS post_id,
                p.description,
                p.image,
                p.user_id,
                u.username,
                u.profile_picture
            FROM posts AS p
            JOIN users AS u ON p.user_id = u.id
            JOIN follows AS f ON f.followed_id = p.user_id
            WHERE f.follower_id = $1`, [userId])
            return result.rows
        } catch (error) {

        }
    }
    async getMyPost(userId) {
        try {
            const result = await pool.query(`SELECT * FROM posts WHERE user_id = $1`, [userId])
            return result.rows
        } catch (error) {

        }
    }
    async addPost({ description, image, userId }) {
        try {
            const result = await pool.query(`INSERT INTO posts (description, image, user_id) VALUES ($1, $2, $3)
                RETURNING *
                `, [description, image, userId])
            return result.rows[0]
        } catch (error) {
            console.log(error)
        }
    }
    async deletePost({ postId, userId }) {
        try {
            const result = await pool.query(`DELETE`)
        } catch (error) {
            console.log(error)
        }
    }
}

export default PostModel
import { pool } from "../db.js"

class followModel {
    constructor(parameters) {

    }

    async follow({ followerId, followedId }) {
        try {
            const result = await pool.query(`INSERT INTO follows (follower_id, followed_id)
                VALUES ($1, $2)`, [followerId, followedId])
            await pool.query('UPDATE users SET follower_count = follower_count + 1 WHERE id = $1', [followedId])
            await pool.query('UPDATE users SET following_count = following_count + 1 WHERE id = $1', [followerId])
            return result.rows[0]
        } catch (error) {
            console.log(error)
        }
    }

    async unfollow({ followerId, followedId }) {
        try {
            const result = await pool.query(`DELETE FROM follows
                WHERE follower_id = $1 AND following_id = $2`, [followerId, followedId])
            if (!result) {
                return error
            }
            await pool.query('UPDATE users SET follower_count = follower_count - 1 WHERE id = $1', [followedId])
            await pool.query('UPDATE users SET following_count = following_count - 1 WHERE id = $1', [followerId])
            return result.rows[0]
        } catch (error) {
            console.log(error)
        }
    }

    async getFollower({ userId }) {
        try {
            const result = await pool.query(`SELECT u.id, u.username, u.location, u.website
                FROM follows f
                JOIN users u ON f.follower_id = u.id
                WHERE f.followed_id = $1`, [userId])
            return result.rows
        } catch (error) {
            console.log(error)
        }
    }
    async getFollowing({ userId }) {
        try {
            const result = await pool.query(`SELECT u.id, u.username, u.location, u.website
                FROM follows f
                JOIN users u ON f.followed_id = u.id
                WHERE f.follower_id = $1`, [userId])
            return result.rows
        } catch (error) {
            console.log(error)
        }
    }
}

export default followModel
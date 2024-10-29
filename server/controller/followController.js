import followModel from "../model/followModel.js"

const follows = new followModel()

export const follow = async (req, res) => {
    const { followerId, followedId } = req.body
    try {
        const data = await follows.follow({ followerId, followedId })
        res.status(200).json({ message: "user followed", data: data })
    } catch (error) {
        console.log(error)
    }
}
export const unfollow = async (req, res) => {
    const { followerId, followedId } = req.body
    try {
        const data = await follows.unfollow({ followerId, followedId })
        res.status(200).json({ message: "user unfollowed", data: data })
    } catch (error) {
        console.log(error)
    }
}

export const getFollower = async (req, res) => {
    const { userId } = req.body
    try {
        const data = await follows.getFollower({ userId })
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
    }
}
export const getFollowing = async (req, res) => {
    const { userId } = req.body
    try {
        const data = await follows.getFollowing({ userId })
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
    }
}

export const followStatus = async (req, res) => {
    const { followerId, followedId } = req.query
    try {
        const isFollowing = await follows.followStatus({ followerId, followedId })
        res.status(200).json({ isFollowing });
    } catch (error) {
        console.log(error)
    }
}
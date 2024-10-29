import PostModel from "../model/postModel.js";

const posts = new PostModel()

export const getPost = async (req, res) => {
    try {
        const data = await posts.getPost()
        res.status(200).json(data)
    } catch (error) {

    }
}

export const getFollowedPost = async (req, res) => {
    const userId = req.params.userId

    try {
        const data = await posts.getFollowedPost(userId)
        res.status(200).json(data)
    } catch (error) {

    }
}
export const getUnfollowedPost = async (req, res) => {
    const userId = req.params.userId

    try {
        const data = await posts.getUnfollowedPost(userId)
        res.status(200).json(data)
    } catch (error) {

    }
}

export const getMyPost = async (req, res) => {
    const userId = req.params.userId

    try {
        const data = await posts.getMyPost(userId)
        res.status(200).json(data)
    } catch (error) {

    }
}


export const addPost = async (req, res) => {
    const { description, userId } = req.body
    const image = req.file ? req.file.filename : null
    try {
        const data = await posts.addPost({ description, image, userId })
        res.status(201).json(data)
    } catch (error) {
        console.log(error)
    }
}
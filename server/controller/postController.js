import PostModel from "../model/postModel.js";

const posts = new PostModel()

export const getPost = async (req, res) => {
    try {
        const data = await posts.getPost()
        res.status(200).json(data)
    } catch (error) {

    }
}

export const addPost = async (req, res) => {
    const { description, image, userId } = req.body
    try {
        const data = await posts.addPost({ description, image, userId })
        res.status(201).json(data)
    } catch (error) {
        console.log(error)
    }
}
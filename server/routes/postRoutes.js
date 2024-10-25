import express from "express"
import { addPost, getFollowedPost, getPost } from "../controller/postController.js"

const postRoutes = express.Router()

postRoutes.get("/", getPost)
postRoutes.get("/get", getFollowedPost)
postRoutes.post("/add", addPost)

export default postRoutes
import express from "express"
import { addPost, getFollowedPost, getMyPost, getPost } from "../controller/postController.js"

const postRoutes = express.Router()

postRoutes.get("/", getPost)
postRoutes.get("/get", getFollowedPost)
postRoutes.get("/my/:userId", getMyPost)
postRoutes.post("/add", addPost)

export default postRoutes
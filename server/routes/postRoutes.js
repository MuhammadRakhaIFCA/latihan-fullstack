import express from "express"
import { addPost, getFollowedPost, getMyPost, getPost, getUnfollowedPost } from "../controller/postController.js"
import upload from "../middleware/upload.js"


const postRoutes = express.Router()

postRoutes.get("/", getPost)
postRoutes.get("/get/:userId", getFollowedPost)
postRoutes.get("/explore/:userId", getUnfollowedPost)
postRoutes.get("/my/:userId", getMyPost)
postRoutes.post("/add", upload.single("image"), addPost);


export default postRoutes
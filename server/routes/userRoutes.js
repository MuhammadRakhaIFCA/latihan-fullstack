import express from "express"
import { editUser, getAllUsers, getFollowedUsers, getFollowers, getFollowRecommendations, getUnfollowedUsers, getUserById, login, logout, register, searchUsers, getUserWithChat } from "../controller/userController.js"
import upload from "../middleware/upload.js"

const userRoutes = express.Router()

userRoutes.post("/register", register)
userRoutes.post("/login", login)
userRoutes.post("/logout", logout)
userRoutes.post("/edit", upload.single("profile_picture"), editUser);
userRoutes.get("/get", getAllUsers)
userRoutes.get("/get/:userId", getUserById)
userRoutes.get("/follower/:userId", getFollowers)
userRoutes.get("/followed/:userId", getFollowedUsers)
userRoutes.get("/unfollowed/:userId", getUnfollowedUsers)
userRoutes.get("/search", searchUsers)
userRoutes.get("/recommended/:userId", getFollowRecommendations)
userRoutes.get("/chat/:userId", getUserWithChat)


export default userRoutes
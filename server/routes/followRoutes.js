import express from "express"
import { follow, getFollower, getFollowing, unfollow } from "../controller/followController.js"



const followRoutes = express.Router()

followRoutes.post("/follow", follow)
followRoutes.post("/unfollow", unfollow)
followRoutes.get("/getFollower", getFollower)
followRoutes.get("/getFollowing", getFollowing)


export default followRoutes
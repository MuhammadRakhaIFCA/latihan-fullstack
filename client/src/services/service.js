import { axiosExpress } from "@/lib/axios";

export const fetchUserById = async (id) => {
    try {
        const data = await axiosExpress.get("/users/get/" + id)
        return data.data
    } catch (error) {

    }
}
export const fetchFollowedUser = async (id) => {
    try {
        const data = await axiosExpress.get("/users/followed", {
            userId: id
        })
        return data.data
    } catch (error) {

    }
}
export const fetchUnfollowedUser = async (id) => {
    try {
        const data = await axiosExpress.get("/users/unfollowed", {
            userId: id
        })
        return data.data
    } catch (error) {

    }
}
export const follow = async (followerId, followedId) => {
    try {
        const data = await axiosExpress.post("/follow", {
            followerId,
            followedId
        })
        return data.data
    } catch (error) {

    }
}
export const unfollow = async (followerId, followedId) => {
    try {
        const data = await axiosExpress.post("/unfollows", {
            followerId,
            followedId
        })
        return data.data
    } catch (error) {

    }
}
export const getFollowing = async (userId) => {
    try {
        const data = await axiosExpress.get("/getFollowing", {
            userId
        })
        return data.data
    } catch (error) {

    }
}
export const getFollower = async (userId) => {
    try {
        const data = await axiosExpress.get("/getFollower", {
            userId
        })
        return data.data
    } catch (error) {

    }
}

export const getAllPost = async () => {
    try {
        const data = await axiosExpress.get("/posts")
        return data.data
    } catch (error) {

    }
}
export const getFollowedPost = async (userId) => {
    try {
        const data = await axiosExpress.get("/posts/get", {
            userId
        })
        return data.data
    } catch (error) {

    }
}

export const addPost = async (description, image, userId) => {
    try {
        const data = await axiosExpress.post("/posts/add", {
            description,
            image,
            userId
        })
    } catch (error) {

    }
}

export const getComment = async (postId) => {
    try {
        const data = await axiosExpress.get("/comments/get", {
            postId
        })
    } catch (error) {

    }
}
export const addComment = async (userId, postId, content) => {
    try {
        const data = await axiosExpress.post("/comments/add", {
            userId,
            postId,
            content
        })
    } catch (error) {

    }
}
export const deleteComment = async (commentId) => {
    try {
        const data = await axiosExpress.delete("/comments/delete", {
            data: {
                commentId
            }
        })
    } catch (error) {

    }
}
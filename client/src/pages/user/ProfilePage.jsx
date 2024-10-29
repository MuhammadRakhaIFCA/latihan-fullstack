
import profilePic from "@/assets/default.jpg"
import dayTree from "@/assets/day-tree.jpg"

import { useContext, useEffect, useState } from "react"
import { Post } from "@/components/Post"
import { FaFacebook, FaInstagram, FaLinkedin, FaPinterest, FaTwitter } from "react-icons/fa"
import { FaLocationDot } from "react-icons/fa6";
import { IoGlobeOutline } from "react-icons/io5"
import { Button } from "@/components/ui/button"
import { axiosExpress } from "@/lib/axios"
import SignedInPage from "@/guard/SignedInPage"
import { Navigate, redirect, useParams } from "react-router-dom"
import { AuthContext } from "@/context/AuthContext"
import { getMyPost } from "@/services/service"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Input } from "@/components/ui/input"


const ProfilePage = () => {
    const params = useParams()
    const { currentUser } = useContext(AuthContext)
    const [user, setUser] = useState()
    const [isFollowing, setIsFollowing] = useState(false);
    const [loading, setLoading] = useState(false);
    const queryClient = useQueryClient();
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);

    const handleFollow = async () => {
        try {
            setLoading(true)
            const data = await axiosExpress.post("/follow", {
                followerId: currentUser.id,
                followedId: user.id
            })
            return data.data
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }
    const handleUnfollow = async () => {
        try {
            setLoading(true)
            const data = await axiosExpress.post("/unfollow", {
                followerId: currentUser.id,
                followedId: user.id
            })
            return data.data
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }

    const getUserById = async () => {
        try {
            const data = await axiosExpress.get(`/users/get/${params.userId}`)
            setUser(data.data)
        } catch (error) {

        }
    }

    useEffect(() => {
        getUserById()
    }, [])

    useEffect(() => {

        const checkFollowStatus = async () => {
            setLoading(true)
            try {
                const { data } = await axiosExpress.get('/follow/status', {
                    params: {
                        followerId: currentUser.id,
                        followedId: user.id,
                    },
                });
                setIsFollowing(data.isFollowing);
            } catch (error) {
                console.error("Error checking follow status:", error);
            } finally {
                setLoading(false)
            }
        };

        if (currentUser && user) {
            checkFollowStatus();
        }

    }, [currentUser, user, isFollowing]);

    const handleLogout = async () => {
        try {
            setLoading(true)
            await axiosExpress.post("/users/logout")
            localStorage.clear("user")
            return <Navigate to="/" />

        } catch (error) {

        } finally {
            setLoading(false)
        }
    }

    const { data: posts = [], isLoading: loadingPosts } = useQuery({
        queryKey: ["posts"], // Unique query key per post
        queryFn: () => axiosExpress.get(`/posts/my/${currentUser.id}`).then((res) => res.data),
    });

    // Mutation to add a new comment
    const { mutate: addPost, isLoading: addingPost } = useMutation({
        mutationFn: async (formData) => {
            await axiosExpress.post("/posts/add", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["posts", currentUser.id]);
            setDescription("");
            setImage(null); // Reset file input
        },
    });



    const handleFileChange = (e) => {
        setImage(e.target.files[0]); // Store the selected file
    };

    const handleAddPost = async () => {
        if (description.trim() || image) {
            const formData = new FormData();
            formData.append("description", description);
            formData.append("userId", currentUser.id);
            if (image) formData.append("image", image); // Append file if available

            addPost(formData); // Call mutation with form data
        }
    };
    return (
        <SignedInPage>
            <div className="w-full overflow-x-hidden justify-center grid">
                <div className="relative mb-5">
                    <img src={dayTree} alt="" className="w-full" />
                    <img
                        src={profilePic}
                        alt=""
                        className="rounded-full h-[30%] absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-4 border-white "
                    />
                </div>
                <div className="w-[90%] border justify-self-center">
                    <div className="mt-16">
                        <p>{user ? user.username : "Loading..."}</p>
                    </div>
                    <div className="grid grid-cols-3 justify-between items-center p-5">
                        <div className="flex justify-start gap-2">
                            <FaFacebook className="w-6 h-6" />
                            <FaInstagram className="w-6 h-6" />
                            <FaTwitter className="w-6 h-6" />
                            <FaLinkedin className="w-6 h-6" />
                            <FaPinterest className="w-6 h-6" />
                        </div>
                        <div className="flex justify-between">
                            <FaLocationDot className="w-6 h-6" />
                            <span>location</span>
                            <IoGlobeOutline className="w-6 h-6" />
                            <span>website</span>
                        </div>
                        <div>
                            <p>Following: {user ? user.following_count : 0}</p>
                            <p>Follower: {user ? user.follower_count : 0}</p>
                        </div>
                    </div>
                    <div className="my-5 gap-3 flex flex-row justify-center">
                        {currentUser.id == params.userId ?
                            <>
                                <Button variant="destructive" onClick={() => handleLogout()}>
                                    Logout
                                </Button>
                                <Button variant="secondary" onClick={() => console.log(posts)}>
                                    Edit Profile
                                </Button>
                            </>
                            :
                            isFollowing ? (
                                <Button variants="alert" onClick={handleUnfollow} disabled={loading}>
                                    Unfollow
                                </Button>
                            ) : (
                                <Button variants="danger" onClick={handleFollow} disabled={loading}>
                                    Follow
                                </Button>
                            )

                        }


                    </div>
                </div>
                <div className="w-[90%] grid grid-cols-[5%_75%_15%] mt-7 gap-2 items-start justify-self-center">
                    <img src={profilePic} alt="" className="rounded-full" />
                    <div className="items-end gap-3">
                        <Input
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Write a description..."
                        />
                        <Input
                            className="cursor-pointer"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>

                    <Button
                        onClick={handleAddPost}
                        disabled={addingPost || (!description.trim() && !image)}
                    >
                        {addingPost ? "Posting..." : "Post"}
                    </Button>

                </div>
                <div className="my-10 grid justify-items-stretch">
                    {
                        posts.map((post) => {
                            return (
                                <>
                                    <Post
                                        key={post.id}
                                        id={post.id}
                                        userId={post.user_id}
                                        description={post.description}
                                        profile_picture={currentUser.profile_picture}
                                        username={post.username}
                                        postImage={post.image}
                                    />
                                </>
                            )
                        })
                    }
                </div>
            </div>
        </SignedInPage>
    )
}

export default ProfilePage
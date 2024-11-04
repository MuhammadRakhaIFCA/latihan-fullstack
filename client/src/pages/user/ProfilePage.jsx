
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
import { Link, Navigate, redirect, useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "@/context/AuthContext"
import { getMyPost } from "@/services/service"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Input } from "@/components/ui/input"
import { SheetComponent } from "@/components/SheetComponent"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { ProductCard } from "@/components/ProductCard"


const ProfilePage = () => {
    const params = useParams()
    const { currentUser } = useContext(AuthContext)
    // const [user, setUser] = useState()
    // const [isFollowing, setIsFollowing] = useState(false);
    const [loading, setLoading] = useState(false);
    const queryClient = useQueryClient();
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [openProducts, setOpenProducts] = useState(false)
    const formData = new FormData();

    const { data: user, isLoading: loadingUser } = useQuery({
        queryKey: ["user"],
        queryFn: () => axiosExpress.get(`/users/get/${params.userId}`).then((res) => res.data),
    });

    const { data: products, isLoading: loadingProduct } = useQuery({
        queryKey: ["products"],
        queryFn: () => axiosExpress.get(`/products/get/${params.userId}`).then((res) => res.data)
    })


    const { data: followStatus, isLoading: followStatusLoading } = useQuery({
        queryKey: ["followStatus", currentUser?.id, user?.id], // Unique key based on both user IDs
        queryFn: () =>
            axiosExpress.get('/follow/status', {
                params: { followerId: currentUser.id, followedId: user.id },
            }).then((res) => res.data.isFollowing), // Extract "isFollowing" directly
        enabled: !!user && !!currentUser, // Run query only when user and currentUser exist
    });


    const { mutate: unfollow, isLoading: loadingUnfollow } = useMutation({
        mutationFn: async () => {
            const { data } = await axiosExpress.post('/unfollow', {
                followerId: currentUser.id,
                followedId: user.id
            })
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["followStatus"]);
            queryClient.invalidateQueries(["user"]);
            setIsFollowing(false); // Update follow state optimistically
        },

    });
    const { mutate: follow, isLoading: loadingFollow } = useMutation({
        mutationFn: async () => {
            const { data } = await axiosExpress.post('/follow', {
                followerId: currentUser.id,
                followedId: user.id
            })
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["followStatus"]);
            queryClient.invalidateQueries(["user"]);
            setIsFollowing(true); // Update follow state optimistically
        },

    });
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
        queryFn: () => axiosExpress.get(`/posts/my/${params.userId}`).then((res) => res.data),
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

            formData.append("description", description);
            formData.append("userId", currentUser.id);
            if (image) formData.append("image", image); // Append file if available

            addPost(formData); // Call mutation with form data
        }
    };
    useEffect(() => {
        queryClient.invalidateQueries(["user", params.userId]); // Invalidate and refetch if userId changes
    }, [params.userId, queryClient]);

    if (loadingUser) {
        return <p>loading user</p>
    }
    if (loadingPosts) {
        return <p>loading post</p>
    }
    if (loadingFollow) {
        return <p>following</p>
    }
    if (loadingUnfollow) {
        return <p>unfollowing</p>
    }
    if (followStatusLoading) {
        return <p>loading</p>
    }
    return (
        <SignedInPage>
            {/* {console.log(user)} */}
            <div className="w-full overflow-x-hidden justify-center grid">
                <div className="relative mb-5">
                    <img src={dayTree} alt="" className="w-full" />
                    {
                        user.profile_picture ?
                            <img
                                src={`/uploads/${user.profile_picture}`}
                                alt={profilePic}
                                className="rounded-full w-[15%] h-[30%] absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                            />
                            :
                            <img
                                src={profilePic}
                                alt={profilePic}
                                className="rounded-full w-[15%] h-[30%] absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                            />
                    }
                </div>
                <div className="w-[90%] border justify-self-center">
                    <div className="mt-16">
                        <p>{user.username}</p>
                        {/* <p>{user ? user.username : "Loading..."}</p> */}
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
                            <span>{user.location}</span>
                            <IoGlobeOutline className="w-6 h-6" />
                            <span>{user.website}</span>
                        </div>
                        <div className="cursor-pointer">
                            <SheetComponent
                                count={user.following_count}
                                userId={user.id}
                            >
                                Following
                            </SheetComponent>
                            <SheetComponent
                                count={user.follower_count}
                                userId={user.id}
                            >
                                Follower
                            </SheetComponent>
                        </div>
                    </div>
                    <div className="my-5 gap-3 flex flex-row justify-center">
                        {currentUser.id == params.userId ?
                            <>
                                <Button variant="destructive" onClick={() => handleLogout()}>
                                    <Link to="/">
                                        Logout
                                    </Link>
                                </Button>
                                <Link to="/profile/edit">
                                    <Button variant="secondary">
                                        Edit Profile
                                    </Button>
                                </Link>
                            </>
                            :
                            followStatus ? (
                                <div>
                                    <Button variant="secondary" onClick={unfollow} disabled={loadingUnfollow}>
                                        Unfollow
                                    </Button>
                                    <Link to={`/chat/${user.id}`}>
                                        <Button variant="outline">
                                            chat
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <Button variant="danger" onClick={follow} disabled={loadingFollow}>
                                    Follow
                                </Button>
                            )

                        }


                    </div>
                </div>
                {
                    openProducts ?
                        <div>
                            <Button onClick={() => setOpenProducts(false)}>posts</Button>
                        </div>
                        :
                        <div>
                            <Button onClick={() => setOpenProducts(true)}>posts</Button>
                        </div>
                }
                {
                    currentUser.id == params.userId ?
                        <div className="w-[90%] grid grid-cols-[5%_75%_15%] mt-7 gap-2 items-start justify-self-center">
                            <img src={`/uploads/${user.profile_picture}`} alt="" className="rounded-full w-8 h-8" />
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
                        : null
                }

                <div className="my-10 grid justify-items-stretch">
                    {
                        openProducts ?
                            <div>

                                <div className="grid grid-cols-2 gap-4 justify-center">
                                    {
                                        loadingProduct ? <p>loading product...</p>
                                            :
                                            products ?
                                                products.map((product) => {
                                                    return (
                                                        <ProductCard
                                                            id={product.id}
                                                            name={product.name}
                                                            description={product.description}
                                                            price={product.price}
                                                            stock={product.stock}
                                                        ></ProductCard>
                                                    )
                                                })
                                                : <p>this user don't have product</p>
                                    }
                                    {/* {console.log(products)} */}
                                </div>
                            </div>
                            :
                            posts.map((post) => {
                                return (
                                    <>

                                        <Post
                                            key={post.id}
                                            id={post.id}
                                            userId={post.user_id}
                                            description={post.description}
                                            profile_picture={user.profile_picture}
                                            username={post.username}
                                            postImage={post.image}
                                            created_at={post.created_at}
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
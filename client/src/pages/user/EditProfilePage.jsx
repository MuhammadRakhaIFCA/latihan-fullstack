import { useContext, useState, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { axiosExpress } from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const EditProfilePage = () => {
    const { currentUser } = useContext(AuthContext);
    const queryClient = useQueryClient();


    const [error, setError] = useState("");
    const navigate = useNavigate()

    const { data: user = null, isLoading: loadingUser } = useQuery({
        queryKey: ["user"],
        queryFn: () => axiosExpress.get(`/users/get/${currentUser.id}`).then((res) => res.data),
    });
    if (loadingUser) return <p>loading user</p>
    const [username, setUsername] = useState(user.username);
    const [location, setLocation] = useState(user.location || "");
    const [website, setWebsite] = useState(user.website || "");
    const [profilePicture, setProfilePicture] = useState(null);

    const { mutate: editUser, isLoading } = useMutation({
        mutationFn: async (formData) => {
            await axiosExpress.post("/users/edit", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["user", currentUser.id]);
            alert("Profile updated successfully!");
        },
        onError: (error) => {
            setError(error.response?.data.message || "An error occurred");
        },
    });

    const handleFileChange = (e) => {
        setProfilePicture(e.target.files[0]);
    };

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append("userId", currentUser.id);
        formData.append("username", username);
        formData.append("location", location);
        formData.append("website", website);
        if (profilePicture) formData.append("profile_picture", profilePicture);

        editUser(formData);
        navigate(`/profile/${currentUser.id}`)
    };

    return (
        <div className="w-full max-w-lg mx-auto mt-10 p-5 border rounded-md shadow-lg">
            <h1 className="text-2xl font-semibold mb-5">Edit Profile</h1>

            {error && <p className="text-red-500">{error}</p>}

            <div className="mb-4">
                <label className="block font-medium mb-2">Username</label>
                <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                />
            </div>

            <div className="mb-4">
                <label className="block font-medium mb-2">Location</label>
                <Input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter your location"
                />
            </div>

            <div className="mb-4">
                <label className="block font-medium mb-2">Website</label>
                <Input
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="Enter your website URL"
                />
            </div>

            <div className="mb-4">
                <label className="block font-medium mb-2">Profile Picture</label>
                <Input type="file" accept="image/*" onChange={handleFileChange} />
            </div>

            <Button onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
            </Button>
        </div>
    );
};

export default EditProfilePage;

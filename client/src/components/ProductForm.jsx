import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
export const ProductForm = (props) => {
    const { trigger, onSubmit, cardTitle, defaultId, defaultName, defaultPrice, defaultStock, defaultImage, defaultDescription } = props;

    const form = useForm({
        defaultValues: {
            userId: defaultId || 2,
            name: defaultName || "",
            description: defaultDescription || "",
            price: defaultPrice || 0,
            stock: defaultStock || 0,
            image: defaultImage || "",
        },
    });

    const [selectedImage, setSelectedImage] = useState(null);

    // Handle image file selection
    const handleFileChange = (e) => {
        setSelectedImage(e.target.files[0]);
    };

    // Handle form submission
    const handleSubmit = async (data) => {
        const formData = new FormData();

        // Append all fields to FormData
        formData.append("userId", data.userId);
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", data.price);
        formData.append("stock", data.stock);

        // Append image file if available
        if (selectedImage) {
            formData.append("image", selectedImage);
        }

        // Call onSubmit with the FormData
        await onSubmit(formData);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                {/* <Button variant="outline">Add new product</Button> */}
                {trigger}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add new product</DialogTitle>
                    <DialogDescription>Add new product</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full max-w-[540px]">
                        <Card>
                            <CardHeader>
                                <CardTitle>{cardTitle || "Add Product"}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-2">
                                {/* User ID (Disabled) */}
                                <FormField
                                    control={form.control}
                                    name="userId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>User ID</FormLabel>
                                            <FormControl>
                                                <Input {...field} disabled={true} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                {/* Name */}
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                {/* Price */}
                                <FormField
                                    control={form.control}
                                    name="price"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Price</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="number" />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                {/* Stock */}
                                <FormField
                                    control={form.control}
                                    name="stock"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Stock</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="number" />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                {/* Image */}
                                <FormItem>
                                    <FormLabel>Product Image</FormLabel>
                                    <FormControl>
                                        <Input type="file" accept="image/*" onChange={handleFileChange} />
                                    </FormControl>
                                </FormItem>
                                {/* Description */}
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="text" />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                            <DialogClose asChild>
                                <CardFooter>
                                    <Button type="submit">Add</Button>
                                </CardFooter>
                            </DialogClose>
                        </Card>
                    </form>
                </Form>
                <DialogFooter></DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
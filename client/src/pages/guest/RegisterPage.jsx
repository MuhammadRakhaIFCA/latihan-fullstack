import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import GuestPage from "@/guard/GuestPage"
import { axiosExpress } from "@/lib/axios"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"

const RegisterPage = () => {
    const form = useForm({
        defaultValues: {
            email: "",
            username: "",
            password: ""
        },
        reValidateMode: "onChange"
    })

    const handleRegister = async (values, e) => {
        e.preventDefault()
        try {
            console.log("Submitting form with values: ", values);
            const result = await axiosExpress.post("/users/register", {
                username: values.username,
                email: values.email,
                password: values.password
            })
            alert(`registered, name = ${result.data.username}`)
        } catch (error) {
            if (error.response.data.type == "username") {
                form.setError("username", { message: error.response.data.message })
            }
            else {
                form.setError("email", { message: error.response.data.message })
            }
        }
    }
    return (
        <GuestPage>
            <div className="bg-slate-300 w-full min-h-screen items-center justify-center m-0 flex">
                <Card className="w-[50%] py-5">
                    <CardHeader>
                        <CardTitle className="text-3xl">Create Account</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field, fieldState }) => (
                                        <FormItem>
                                            <FormLabel>Username</FormLabel>
                                            <FormControl>
                                                <Input placeholder="username" {...field} />
                                            </FormControl>
                                            <FormMessage>{fieldState.error?.message}</FormMessage>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field, fieldState }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="email" {...field} />
                                            </FormControl>
                                            <FormMessage>{fieldState.error?.message}</FormMessage>

                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input placeholder="password" type="password" {...field} />
                                            </FormControl>
                                            <FormDescription>

                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex justify-end">
                                    <Button>Register</Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <span>Already have an account?</span>
                        <Link to="/">
                            <a className="text-blue-600"> Login</a>
                        </Link>

                    </CardFooter>
                </Card>
            </div>
        </GuestPage>


    )
}

export default RegisterPage
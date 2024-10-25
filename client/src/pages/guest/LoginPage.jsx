import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthContext } from "@/context/AuthContext"
import GuestPage from "@/guard/GuestPage"
import { useContext } from "react"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"

const LoginPage = () => {
    const { login } = useContext(AuthContext)
    const form = useForm({
        defaultValues: {
            username: "",
            password: ""
        }
    })

    const handleLogin = async (values, e) => {
        e.preventDefault
        try {
            await login(values)
            alert('logged in')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <GuestPage>
            <div className="bg-slate-300 w-full h-screen items-center justify-center m-0 flex">
                <Card className="w-[50%] py-5">
                    <CardHeader>
                        <CardTitle className="text-3xl">Welcome back</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Username</FormLabel>
                                            <FormControl>
                                                <Input placeholder="username" {...field} />
                                            </FormControl>
                                            <FormDescription>

                                            </FormDescription>
                                            <FormMessage />
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
                                <div className="flex justify-between">
                                    <Button variant="outline">Forgot password</Button>
                                    <Button>Login</Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <span>Don't have an account? </span>
                        <Link to="/register">
                            <a className="text-blue-600"> Register</a>
                        </Link>

                    </CardFooter>
                </Card>
            </div>
        </GuestPage>


    )
}

export default LoginPage
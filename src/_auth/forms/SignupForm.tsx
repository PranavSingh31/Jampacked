import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SignupValidation } from "@/lib/validation"
import { Loader } from "@/components/shared/loader"
import { z } from "zod"

const SignupForm = () => {
    const isLoading = false;
    const form = useForm<z.infer<typeof SignupValidation>>({
        resolver: zodResolver(SignupValidation),
        defaultValues: {
            businessname: '',
            location: '',
            email: '',
            password: '',
        },
    })

    function handleGoogleLogin() {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log('google login')
    }

    function handleMetaLogin() {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log('meta login')
    }

    function onSubmit(values: z.infer<typeof SignupValidation>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }
    return (
        <Form {...form}>
            <div className="sm:w-420 flex-center flex-col">
                
                <img src="/assets/images/logo.png" alt="logo" className="min-w-30 h-auto pt-4" />
                <h2 className="h3-bold md:h2-bold"> Create a new account </h2>
                <p className="text-light-3 small-medium md:base-regular mt-2"> Please enter your account details </p>
            
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">

                    <FormField
                        control={form.control}
                        name="businessname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Business Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="" className="shad-input" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                    <Input placeholder="" className="shad-input" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="" className="shad-input" {...field} />
                                </FormControl>
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
                                    <Input type="password" placeholder="" className="shad-input" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex flex-row justify-center gap-4 mt-6">
                        <Button onClick={handleGoogleLogin} className="shad-button_google flex-1">
                            <img src="/assets/images/google.png" alt="Google" className="w-auto h-5" />
                            Google
                        </Button>
                        <Button onClick={handleMetaLogin} className="shad-button_meta">
                            <img src="/assets/images/meta.png" alt="Meta" className="w-auto h-5" />
                            Meta
                        </Button>
                    </div>
                    <Button type="submit" className="shad-button_primary">
                        {isLoading ? (
                            <div className="flex center gap-2">
                                <Loader /> Creating Account...
                            </div>
                        ) : (
                            <div className="flex center gap-2">
                                Create Account
                            </div>
                        )}
                    </Button>
                    <p className="text-small-regular text-dark-1 text-center mt-2">
                        Already have an account? 
                        <Link to="/sign-in" className="text-orange text-small-semibold ml-1">Log in</Link>
                    </p>
                </form>
            </div>
        </Form>
    )
}

export default SignupForm
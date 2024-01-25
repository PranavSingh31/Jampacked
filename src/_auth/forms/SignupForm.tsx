import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SignupValidation } from "@/lib/validation"
import { Loader } from "@/components/shared/loader"
import { z } from "zod"
// import { createUserAccount } from "@/lib/appwrite/api"

// import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
// const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;

const SignupForm = () => {
    const isLoading = false;
    const navigate = useNavigate();
    const form = useForm<z.infer<typeof SignupValidation>>({
        resolver: zodResolver(SignupValidation),
        defaultValues: {
            number: '',
            email: '',
            password: '',
        },
    })

    async function onSubmit(values: z.infer<typeof SignupValidation>) {
        console.log(values);
        navigate('/business-details',{state:{...values}});
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
                        name="number"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone Number</FormLabel>
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
                    {/* <div className="flex flex-row justify-center mt-0">
                        <GoogleLogin
                            clientId={CLIENT_ID}
                            buttonText="Login with Google"
                            onSuccess={handleGoogleLogin}
                            onFailure={handleGoogleFailure}
                            cookiePolicy={'single_host_origin'}
                            render={renderProps => (
                                <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="shad-button_google">
                                    <img src="/assets/images/google.png" alt="Google" className="w-auto h-6" />
                                    Google
                                </button>
                            )}
                        />
                    </div>
                    <div className="flex flex-row justify-center gap-0 mt-0">
                        <Button onClick={handleMetaLogin} className="shad-button_meta">
                            <img src="/assets/images/meta.png" alt="Meta" className="w-auto h-5" />
                            Meta
                        </Button>
                    </div> */}
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



    // function handleGoogleLogin(response: GoogleLoginResponse | GoogleLoginResponseOffline) {
    //     if ('profileObj' in response) {
    //         console.log("Login Success: currentUser:", response.profileObj);
    //     } else {
    //         console.log("Offline access token:", response);
    //     }
    // }

    // function handleGoogleFailure(response: any) {
    //     console.error("Login Failed:", response);
    // }

    // function handleMetaLogin() {
    //     console.log('meta login')
    // }
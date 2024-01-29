import { Button } from "@/components/ui/button"
import { useNavigate, useLocation } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { BusinessValidation, SignupValidation } from "@/lib/validation"
import { Loader } from "@/components/shared/loader"
import { z } from "zod"
import { useToast } from "@/components/ui/use-toast"
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"
import { v4 as uuidv4 } from 'uuid';

const BusinessForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {toast} = useToast();
    const {checkAuthUser} = useUserContext();

    const { mutateAsync: createUserAccount, isPending : isCreatingUser} = useCreateUserAccount();
    const { mutateAsync: signInAccount,} = useSignInAccount();


    const signupData = location.state as z.infer<typeof SignupValidation>;
    const accountId = uuidv4();
    const form = useForm<z.infer<typeof BusinessValidation>>({
        resolver: zodResolver(BusinessValidation),
        defaultValues: {
            businessname: '',
            location: '',
        },
    });

    const onSubmit = async (businessValues: z.infer<typeof BusinessValidation>) => {
    
        const combinedData = {
            accountId,
            ...signupData,
            ...businessValues
        }
    
        try {
            const newUser = await createUserAccount(combinedData);

            if(newUser===null) {
                return toast({
                    title: 'Phone number/Email already exists. Please try again later.'
                });
            }
            console.log('new account created')
            const session = await signInAccount({
                email: combinedData.email,
                password: combinedData.password,
            });

            if(!session) {
                return toast({
                    title: 'Sign in failed. Please try again later.'
                });
            }

            const isLoggedIn = await checkAuthUser();

            if(isLoggedIn){
                form.reset();
                navigate('/swiggy-zomato');
            } else {
                toast({
                    title: 'Sign in failed. Please try again later.'
                });
            }

        } catch (error) {
            if ((error as Error).message.includes("A user with the same id, email, or phone already exists")) {
                toast({
                    title: 'An account with the provided email or phone number already exists.'
                });
            } else {
                toast({
                    title: 'An unexpected error occurred. Please try again later.'
                });
            }
        }
    }
    
    

    return (
        <Form {...form}>
            <div className="sm:w-420 flex-center flex-col">
                <img src="/assets/images/logo.png" alt="logo" className="min-w-30 h-auto pt-4" />
                <h2 className="h3-bold md:h2-bold"> Welcome Back !!! </h2>
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
                    <Button type="submit" className="shad-button_primary">
                        {isCreatingUser ? (
                            <div className="flex center gap-2">
                                <Loader /> Logging into Account...
                            </div>
                        ) : (
                            <div className="flex center gap-2">
                                Log in
                            </div>
                        )}
                    </Button>
                </form>
            </div>
        </Form>
    )
}

export default BusinessForm
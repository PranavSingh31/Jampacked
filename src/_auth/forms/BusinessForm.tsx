import { Button } from "@/components/ui/button"
import { useNavigate, useLocation } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { BusinessValidation, SignupValidation } from "@/lib/validation"
import { Loader } from "@/components/shared/loader"
import { z } from "zod"
import { createUserAccount } from "@/lib/appwrite/api"

const BusinessForm = () => {
    const isLoading = false;
    const location = useLocation();
    const navigate = useNavigate();

    const signupData = location.state as z.infer<typeof SignupValidation>;

    const form = useForm<z.infer<typeof BusinessValidation>>({
        resolver: zodResolver(BusinessValidation),
        defaultValues: {
            businessname: '',
            location: '',
        },
    });

    const onSubmit = async (businessValues: z.infer<typeof BusinessValidation>) => {
        
        const combinedData = {
            ...signupData,
            ...businessValues
        }

        console.log(combinedData);

        try {
            const response = await createUserAccount(combinedData);
            console.log('New User Created: ', response);
            navigate('/swiggy-zomato');
        } catch (error) {
            console.log('Error Creating User: ', error);
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
                        {isLoading ? (
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
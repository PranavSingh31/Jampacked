import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { BusinessValidation } from "@/lib/validation"
import { Loader } from "@/components/shared/loader"
import { z } from "zod"

const BusinessForm = () => {
    const isLoading = false;
    const form = useForm<z.infer<typeof BusinessValidation>>({
        resolver: zodResolver(BusinessValidation),
        defaultValues: {
            businessname: '',
            location: '',
        },
    })
    function onSubmit(values: z.infer<typeof BusinessValidation>) {
        console.log(values)
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
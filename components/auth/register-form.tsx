"use client"

import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from  "@hookform/resolvers/zod"
import * as z from "zod"
import { RegisterSchema } from "@/schemas"
// import { register } from "@/actions/register"

import { CardWrapper } from "@/components/auth/card-wrapper"
import { Input }from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FormError } from "@/components/from-error"
import { FormSuccess } from "@/components/from-success"

import { 
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useRouter } from "next/navigation"


export const RegisterForm = ()  => {
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition()

    const { push } = useRouter();

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            name: "",
        }
    })

    const onSubmit = (values:  z.infer<typeof RegisterSchema>) => {
        setError("")
        setSuccess("")
        
        // startTransition(() => {
        //     register(values)
        //     .then((data) => {
        //         console.log(data);
                
        //         setError(data?.error)
        //         setSuccess(data?.success)

        //         push("/auth/login")
        //     })
        //     .catch(e => {
        //         console.log(e);                
        //     })
        // })
    }

    return (
        <CardWrapper
        headerLabel="Create an account"
        backButtonLabel="Already have an account?"
        backButtonHref="/auth/login"
        // showSocial
        >
            <Form {...form}>
                <form 
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
                >
                    <div className="space-y-4">
                        <FormField 
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <label>Username</label>
                                    <FormControl>
                                        <Input 
                                        {...field}
                                        placeholder="Johnny"
                                        type="text"
                                        disabled={isPending}
                                        />
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
                                    <label>Email</label>
                                    <FormControl>
                                        <Input 
                                        {...field}
                                        placeholder="johndoe@email.com"
                                        type="email"
                                        disabled={isPending}
                                        />
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
                                    <label>Password</label>
                                    <FormControl>
                                        <Input 
                                        {...field}
                                        type="password"
                                        disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                
                            )}
                        />
                    </div>

                    <FormError message={error} />
                    <FormSuccess message={success} />

                    <Button
                    type="submit"
                    className="w-full"
                    disabled={isPending}
                    >
                        Register
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}
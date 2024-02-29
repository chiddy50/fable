"use client"

import { CardWrapper } from "@/components/auth/card-wrapper"
import { Input }from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from  "@hookform/resolvers/zod"
import * as z from "zod"
import { LoginSchema } from "@/schemas"

import { 
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Button } from "@/components/ui/button"
import { FormError } from "@/components/from-error"
import { FormSuccess } from "@/components/from-success"
import { login } from "@/actions/login"
import { useContext, useEffect, useState, useTransition } from "react"

import { useSearchParams } from 'next/navigation';
import { AppContext } from "@/context/StoryContext"

export const LoginForm = ()  => {
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition()
    const { loginRedirectPage } = useContext(AppContext)
    
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = (values:  z.infer<typeof LoginSchema>) => {
        setError("")
        setSuccess("")
        
        startTransition(() => {
            login(values)
            .then((data) => {
                setError(data?.error)
                setSuccess(data?.success)
            })
            .catch(e => {
                console.log(e);                
            })
        })
    }

    return  (
        <CardWrapper
        headerLabel="Welcome back"
        backButtonLabel="Don't have an account?"
        backButtonHref={"/auth/register"}
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
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
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
                                    <FormLabel>Password</FormLabel>
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
                    className="w-full flex items-center justify-center"
                    disabled={isPending}
                    >                        
                        { !isPending && "Login" }
                        { isPending && <i className='bx bx-loader bx-spin bx-rotate-270 text-white'></i> }

                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}
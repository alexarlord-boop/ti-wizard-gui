import {zodResolver} from "@hookform/resolvers/zod";
import {useForm, FormProvider} from "react-hook-form";
import {z} from "zod";
import {Button} from "../../components/ui/button.jsx";
import {Input} from "../../components/ui/input.jsx";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "../../components/ui/form.jsx";
import {toast} from "sonner";
import apiClient from "../../api/client.js";
import React from "react";

const FormSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),

});

export default function LoginForm() {
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const handleLogin = async (data) => {

        try {

            console.log(data);
            const username = data.username;
            // Send login request with credentials using apiClient
            const loginResponse = await apiClient.post('/token/', data);

            if (loginResponse.status === 200) {
                // Store the JWT token in local storage
                const data = loginResponse.data;
                console.log(data);
                localStorage.setItem('username', username);
                localStorage.setItem('access_token', data.access);
                localStorage.setItem('refresh_token', data.refresh);
                // alert('Login successful!');
                toast.success('Login successful!');
                setTimeout(() => {window.location.href = '/';}, 1000);
                // redirect the user to the dashboard page

            }
        } catch (error) {
            console.log(error)
            if (error.response && error.response.status === 401) {
            //     add error to form description
                form.setError('general', {
                    type: 'manual',
                    message: 'Invalid credentials.'
                });

            } else {
                form.setError('An error occurred.');
                console.log(error);
            }
        }
    };


    function onSubmit(data) {

        console.log(data);
        toast.success('Login successful!');

    }

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(handleLogin)} className="text-start space-y-6">
                <FormField
                    control={form.control}
                    name="username"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="Username"
                                    {...field} />
                            </FormControl>

                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    {...field} />
                            </FormControl>

                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormDescription className="text-red-500">
                    {form.formState.errors.general?.message}
                </FormDescription>
                <Button type="submit" className="w-full">Submit</Button>
            </form>
        </FormProvider>
    );
}
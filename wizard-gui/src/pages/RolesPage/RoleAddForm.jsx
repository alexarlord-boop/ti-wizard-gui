"use client"

import React, {useEffect, useState} from "react";

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"

import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {DialogFooter} from "../../components/ui/dialog.jsx";
import {Button} from "../../components/ui/button.jsx";
import {Card, CardContent, CardHeader} from "../../components/ui/card.jsx";
import {useUpdateRoleMutation} from "../../hooks/useUpdateRoleMutation.jsx";
import {useTranslation} from "react-i18next";
import {toast} from "sonner";

const FormSchema = z.object({
    displayName: z.string().min(2, {
        message: "Display name must be at least 2 characters.",
    }),
    // TODO:- improve file format validation
    imageUrl: z.string().url({
        message: "Invalid file format",
    }),
})

export default function RoleAddForm(
    {
        isRoleDetailsOpen, setIsRoleDetailsOpen,
        entityType, setEntityType,
    }
) {
    const {t} = useTranslation();
    const [imageUrl, setImageUrl] = useState("");
    const [displayName, setDisplayName] = useState("");

    const handleModalTermination = () => {
        setDisplayName("");
        setImageUrl("");
        form.reset();
    }
    const handleAddRole = (formData) => {
        updateRoleMutation.mutate({
            entityType: entityType,
            isActive: true,
            displayName: formData.displayName,
            imageUrl: formData.imageUrl
        });
    }

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            displayName: "",
            imageUrl: "",
        },
    })


    function onSubmit(data) {
        handleAddRole(data);
        handleModalTermination();
        setIsRoleDetailsOpen(false);
    }


    const updateRoleMutation = useUpdateRoleMutation()


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImageUrl(e.target.result);
                form.setValue("imageUrl", e.target.result); // Set the image URL in the form state
                form.clearErrors("imageUrl");
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
       handleModalTermination();
    }, [entityType]);



    return (
        <Dialog open={isRoleDetailsOpen} onOpenChange={setIsRoleDetailsOpen}>
            <DialogContent className="max-w-[90%]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <DialogHeader>
                            <DialogTitle>Add local identity role: {entityType.split("_").join(" ")}</DialogTitle>
                            <DialogDescription></DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-2 gap-10 py-5">

                            <div className="grid gap-5">
                                <Card className="h-[40dvh]">
                                    <CardHeader><p className="font-bold">Display information</p></CardHeader>
                                    <CardContent>
                                        <div className="grid w-full items-center gap-1.5">
                                            <FormField
                                                control={form.control}
                                                name="displayName"
                                                render={({field}) => (
                                                    <FormItem>
                                                        <FormLabel htmlFor="display-name">Display name</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                id="display-name"
                                                                type="text"
                                                                placeholder={t("Enter display name")}
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormDescription>
                                                            {form.formState.errors.displayName?.message}
                                                        </FormDescription>
                                                    </FormItem>
                                                )}
                                            />

                                        </div>
                                        <br/>
                                        <div className="flex items-center justify-between h-[80px]">
                                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                                <FormField
                                                    control={form.control}
                                                    name="imageUrl"
                                                    render={({field}) => (
                                                        <FormItem>
                                                            <FormLabel htmlFor="image-url">Logo Image</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    id="image-url"
                                                                    type="file"
                                                                    accept="image/png, image/gif, image/jpeg"
                                                                    placeholder={t("Select image logo")}
                                                                    onChange={handleFileChange} // Use handleFileChange
                                                                />

                                                            </FormControl>
                                                            <FormDescription>
                                                                {form.formState.errors.imageUrl?.message}
                                                            </FormDescription>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <img src={imageUrl} alt="logo" className="max-w-[100px] max-h-[80px]"/>

                                        </div>
                                    </CardContent>

                                </Card>
                                <Card><CardHeader><p className="font-bold">Supported entity categories</p>
                                </CardHeader></Card>
                            </div>
                            <Card><CardHeader><p className="font-bold">Security settings</p></CardHeader> </Card>

                        </div>
                        <DialogFooter>
                            <Button type="submit">Add Role</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
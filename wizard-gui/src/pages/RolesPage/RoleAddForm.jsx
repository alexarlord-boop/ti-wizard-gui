"use client"

import React, {useEffect, useState} from "react";

import {useStore} from "../../hooks/store.jsx";


import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"

import {Input} from "@/components/ui/input";

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

import {useTranslation} from "react-i18next";
import {useAddRoleMutation} from "../../hooks/useAddRoleMutation.jsx";
import AccordionCard from "../../components/custom/AccordionCard.jsx";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const FormSchema = z.object({

    display_name: z.string().min(2, {
        message: "Display name must be at least 2 characters.",
    }).refine((display_name) => {
        const roles = useStore.getState().roles;
        return !roles.some(role => role.display_name === display_name);
    }, {
        message: "Display name must be unique.",
    }),
    // TODO:- improve file format validation
    // FIle for logo_image should be in file instance
    // logo_image: z.any()
        // .refine(
        //     (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
        //     "Only .jpg, .jpeg, .png and .webp formats are supported."
        // )

    entity_id: z.string().includes("https://", {
        message: "Entity ID must be a valid URL.",
    }).refine((entity_id) => {
        const roles = useStore.getState().roles;
        return !roles.some(role => role.entity_id === entity_id);
    }, {
        message: "Entity ID must be unique.",
    }),

})

export default function RoleAddForm(
    {
        isRoleDetailsOpen, setIsRoleDetailsOpen,
        entity_type, setEntityType,
    }
) {
    const {t} = useTranslation();
    const [logo_image, setImageUrl] = useState("");
    const [display_name, setDisplayName] = useState("");

    const handleModalTermination = () => {
        setDisplayName("");
        setImageUrl("");
        form.reset();
    }


    const addRole = useStore((state) => state.addRole);
    const handleAddRole = (formData) => {
        const data = {
            entity_type: entity_type,
            is_active: false,
            entity_id: formData.entity_id,
            display_name: formData.display_name,
            logo_image: formData.logo_image
        }
        // console.log(data)
        // addRoleMutation.mutate(data);
        addRole(data);
    }

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            entity_id: "",
            display_name: "",
            logo_image: "",
        },
    })


    function onSubmit(data) {
        handleAddRole(data);
        handleModalTermination();
        setIsRoleDetailsOpen(false);
    }


    const addRoleMutation = useAddRoleMutation()


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImageUrl(e.target.result);
                form.setValue("logo_image", e.target.result); // Set the image URL in the form state
                form.clearErrors("logo_image");
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
       handleModalTermination();
    }, [entity_type]);



    return (
        <Dialog open={isRoleDetailsOpen} onOpenChange={setIsRoleDetailsOpen}>
            <DialogContent className="max-w-[90%] max-h-[90vh]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} >
                        <DialogHeader>
                            <DialogTitle>Add local identity role: {entity_type.split("_").join(" ")}</DialogTitle>
                            <DialogDescription></DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-2 gap-10 py-5">

                            <div className="grid gap-5">



                                <AccordionCard header="Entity information" isOpened={true}>
                                    <div className="grid w-full items-center gap-1.5">
                                        <FormField
                                            control={form.control}
                                            name="entity_id"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel htmlFor="entity_id">Entity ID</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            id="entity_id"
                                                            type="text"
                                                            placeholder={t("Enter entity ID")}
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormDescription>
                                                        {form.formState.errors.entity_id?.message}
                                                    </FormDescription>
                                                </FormItem>
                                            )}
                                        />
                                        <br/>
                                        <FormField
                                            control={form.control}
                                            name="display_name"
                                            render={({ field }) => (
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
                                                        {form.formState.errors.display_name?.message}
                                                    </FormDescription>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <br />
                                    <div className="flex items-center justify-between h-[80px]">
                                        <div className="grid w-full max-w-sm items-center gap-1.5">
                                            <FormField
                                                control={form.control}
                                                name="logo_image"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel htmlFor="image-url">Logo Image</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                id="image-url"
                                                                type="file"
                                                                accept="image/png, image/gif, image/jpeg, image/jpg, image/webp"
                                                                placeholder={t("Select image logo")}
                                                                onChange={handleFileChange}
                                                            />
                                                        </FormControl>
                                                        <FormDescription>
                                                            {form.formState.errors.logo_image?.message}
                                                        </FormDescription>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <img src={logo_image} alt="logo" className="max-w-[100px] max-h-[80px]" />
                                    </div>
                                </AccordionCard>

                                <AccordionCard header="Supported entity categories">

                                </AccordionCard>

                            </div>
                            <AccordionCard header="Security settings"></AccordionCard>
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
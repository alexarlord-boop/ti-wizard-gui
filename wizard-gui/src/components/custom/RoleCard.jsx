import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";

import {
    Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card";
import {cn} from "../../lib/utils.js";
import {Button} from "../ui/button.jsx";
import {MoreHorizontal, Pen, Pencil, Settings, Space, Trash2Icon} from "lucide-react";
import RolePreviewDialog from "./RolePreviewDialog.jsx";
import {useTranslation} from "react-i18next";
import {Badge} from "@/components/ui/badge"
import {ReloadIcon} from "@radix-ui/react-icons"; // Assuming you have a Spinner component


import {getEntityTypeString} from "../../services/roleService.js";
import {Label} from "../ui/label.jsx";
import {Input} from "postcss";
import {Avatar, AvatarFallback} from "../ui/avatar.jsx";
import {Switch} from "../ui/switch.jsx";
import RoleDropdown from "../../pages/RolesPage/RoleDropdown.jsx";
import {useChangeActiveStatusRoleMutation} from "../../hooks/useChangeActiveStatusRoleMutation.jsx";
import ConfirmationModal from "./ConfirmationModal.jsx";

export default function RoleCard({role, onAdd, onDelete}) {
    const changeActiveStatusRoleMutation = useChangeActiveStatusRoleMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);

const handleDelete = () => {
    console.log("Delete role");
    setIsModalOpen(true);
}

    const confirmDelete = () => {
        onDelete();
        setIsModalOpen(false);
    };

    return (

        <Card id={role.entity_type} className="h-[200px] border-2 border-black">
            <CardHeader className="text-left pb-0">
                <CardTitle>
                    {role.display_name}

                    <Badge variant="outline" className="float-end p-2">
                        {getEntityTypeString(role.entity_type)}
                        <Switch
                            checked={role.is_active}
                            onClick={
                                () => {
                                    changeActiveStatusRoleMutation.mutate({
                                        role_id: role.id,
                                        entity_name: role.display_name,
                                        is_active: !role.is_active
                                    });
                                }
                            }
                            className="ms-2 data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
                        />
                    </Badge>

                </CardTitle>
                <CardDescription>


                </CardDescription>
            </CardHeader>

            <CardContent className="flex justify-between py-0 h-[90px]">
                <div>
                    {role.image_url ?
                        <img src={role.image_url} alt="Role Logo" className=" max-w-[70px] max-h-[70px]"/>
                        :
                        <Avatar className="scale-2" >
                            <AvatarFallback title="role logo is missing"></AvatarFallback>
                        </Avatar>

                    }
                </div>
                <RoleDropdown role={role} handleDelete={handleDelete} />

            </CardContent>

            <CardFooter className="flex float-end justify-between items-baseline align-bottom py-0">


            </CardFooter>

            <ConfirmationModal
                isOpen={isModalOpen}
                onConfirm={confirmDelete}
                allowConfirmation={!role.is_active}
                onClose={() => {setIsModalOpen(false)}}
                title={`Delete ${role.entity_type}`}
                description={role.is_active ? "This role is active. Deactivate role first" : "All related entities will be removed"}/>

        </Card>


    )
}

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

export default function RoleCard({role, onAdd, onDelete}) {
    const {t} = useTranslation();
    const [loading, setLoading] = useState(false); // New loading state


    return (

        <Card id={role.entity_type} className="h-[200px] border-2 border-black">
            <CardHeader className="text-left pb-0">
                <CardTitle>
                    {role.display_name}

                    <Badge variant="outline" className="float-end p-2">
                        {getEntityTypeString(role.entity_type)}
                        <Switch
                            // checked={status}
                            // onClick={handleToggle}
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
                <RoleDropdown role={role} onDelete={onDelete} />

            </CardContent>

            <CardFooter className="flex float-end justify-between items-baseline align-bottom py-0">


            </CardFooter>
        </Card>

        // <Card className={cn(role.is_active && "border border-black")} id={role.entity_type}>
        //     {role.is_active
        //         ? (
        //             <>
        //                 <CardHeader className="text-left">
        //                     <CardTitle>{role.display_name}</CardTitle>
        //                     <CardDescription>
        //                         Role description text
        //                         <Badge variant="outline" className="border-black float-end">
        //                             {getEntityTypeString(role.entity_type)}
        //                         </Badge>
        //                     </CardDescription>
        //                 </CardHeader>
        //
        //                 <CardFooter className="flex justify-between items-baseline align-bottom">
        //                     {role.image_url &&
        //                         <img src={role.image_url} alt="Role Logo" className=" max-w-[70px] max-h-[70px]"/>}
        //                     <DropdownMenu>
        //                         <DropdownMenuTrigger asChild>
        //                             <Button variant="ghost" className="h-8 w-8 p-0">
        //                                 <span className="sr-only">Open menu</span>
        //                                 <MoreHorizontal className="h-4 w-4"/>
        //                             </Button>
        //                         </DropdownMenuTrigger>
        //                         <DropdownMenuContent align="end">
        //                             <DropdownMenuLabel>Actions</DropdownMenuLabel>
        //                             <DropdownMenuItem onClick={() => console.log("editing")}>
        //                                 <Pen size="16"/> Edit Role
        //                             </DropdownMenuItem>
        //                             <DropdownMenuItem onClick={onDelete} className="text-red-500 cursor-pointer">
        //                                 <Trash2Icon size="16"/> Delete Role
        //                             </DropdownMenuItem>
        //                             <DropdownMenuSeparator/>
        //                             <DropdownMenuItem onClick={() => navigator.clipboard.writeText(role.id)}>
        //                                 Copy role ID
        //                             </DropdownMenuItem>
        //                             <DropdownMenuItem>Export configuration</DropdownMenuItem>
        //                         </DropdownMenuContent>
        //                     </DropdownMenu>
        //                 </CardFooter>
        //             </>
        //         )
        //         : (
        //             <>
        //                 <CardHeader className="text-left">
        //                     <CardTitle>Local Role: {getEntityTypeString(role.entity_type)}</CardTitle>
        //                     <CardDescription>Add your new identity role in one-click.</CardDescription>
        //                 </CardHeader>
        //
        //                 <CardFooter className="flex justify-between">
        //                     <p></p>
        //                     <Button onClick={() => onAdd(role.entity_type)}>{t('roles.cardBtn.create')}</Button>
        //                 </CardFooter>
        //             </>
        //         )
        //
        //     }
        //
        // </Card>
    )
}

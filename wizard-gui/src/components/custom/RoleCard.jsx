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

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator} from "../ui/dropdown-menu.jsx";
import {getEntityTypeString} from "../../services/roleService.js";
import {Label} from "../ui/label.jsx";
import {Input} from "postcss";

export default function RoleCard({role, onAdd, onDelete}) {
    const {t} = useTranslation();
    const [loading, setLoading] = useState(false); // New loading state


    return (
        // <Card className={cn(role.isActive && "border border-black", "h-[20dvh]")} id={role.entityType}>
        //     <CardHeader className="text-left">
        //         <CardTitle>
        //             {role.isActive ? (
        //                 <>
        //                     <RolePreviewDialog>{role.displayName}</RolePreviewDialog>
        //                     <Badge variant="outline" className="border-black float-end">
        //                         {getEntityTypeString(role.entityType)}
        //                     </Badge>
        //                 </>
        //             ) : (
        //                 <>
        //                     {getEntityTypeString(role.entityType)}
        //                     <Badge variant="outline" className="border-black float-end">
        //                         {getEntityTypeString(role.entityType)}
        //                     </Badge>
        //                 </>
        //             )}
        //         </CardTitle>
        //     </CardHeader>
        //
        //     <CardFooter className="flex justify-between">
        //         {loading ? (
        //             <Button variant={role.isActive ? "destructive" : "default"} disabled>
        //                 <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
        //                 {role.isActive ? "Removing role" : "Adding role"}
        //             </Button>
        //         ) : role.isActive ? (
        //             <>
        //                 {role.imageUrl && <img src={role.imageUrl} alt="Role Logo" className="max-w-[100px] max-h-[80px]" />}
        //                 <DropdownMenu>
        //                     <DropdownMenuTrigger asChild>
        //                         <Button variant="ghost" className="h-8 w-8 p-0">
        //                             <span className="sr-only">Open menu</span>
        //                             <MoreHorizontal className="h-4 w-4" />
        //                         </Button>
        //                     </DropdownMenuTrigger>
        //                     <DropdownMenuContent align="end">
        //                         <DropdownMenuLabel>Actions</DropdownMenuLabel>
        //                         <DropdownMenuItem onClick={() => console.log("editing")}>
        //                             <Pen size="16" /> Edit Role
        //                         </DropdownMenuItem>
        //                         <DropdownMenuItem onClick={onDelete} className="text-red-500 cursor-pointer">
        //                             <Trash2Icon size="16" /> Delete Role
        //                         </DropdownMenuItem>
        //                         <DropdownMenuSeparator />
        //                         <DropdownMenuItem onClick={() => navigator.clipboard.writeText(role.id)}>
        //                             Copy role ID
        //                         </DropdownMenuItem>
        //                         <DropdownMenuItem>Export configuration</DropdownMenuItem>
        //                     </DropdownMenuContent>
        //                 </DropdownMenu>
        //             </>
        //         ) : (
        //             <Button onClick={() => onAdd(role.entityType)}>{t('roles.cardBtn.create')}</Button>
        //         )}
        //     </CardFooter>
        // </Card>

        <Card className={cn(role.isActive && "border border-black")} id={role.entityType}>
            {role.isActive
                ? (
                    <>
                        <CardHeader className="text-left">
                            <CardTitle>{role.displayName}</CardTitle>
                            <CardDescription>
                                Role description text
                                <Badge variant="outline" className="border-black float-end">
                                    {getEntityTypeString(role.entityType)}
                                </Badge>
                            </CardDescription>
                        </CardHeader>

                        <CardFooter className="flex justify-between items-baseline align-bottom">
                            {role.imageUrl &&
                                <img src={role.imageUrl} alt="Role Logo" className=" max-w-[70px] max-h-[70px]"/>}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                        <span className="sr-only">Open menu</span>
                                        <MoreHorizontal className="h-4 w-4"/>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuItem onClick={() => console.log("editing")}>
                                        <Pen size="16"/> Edit Role
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={onDelete} className="text-red-500 cursor-pointer">
                                        <Trash2Icon size="16"/> Delete Role
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator/>
                                    <DropdownMenuItem onClick={() => navigator.clipboard.writeText(role.id)}>
                                        Copy role ID
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>Export configuration</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </CardFooter>
                    </>
                )
                : (
                    <>
                        <CardHeader className="text-left">
                            <CardTitle>Local Role: {getEntityTypeString(role.entityType)}</CardTitle>
                            <CardDescription>Add your new identity role in one-click.</CardDescription>
                        </CardHeader>

                        <CardFooter className="flex justify-between">
                            <p></p>
                            <Button onClick={() => onAdd(role.entityType)}>{t('roles.cardBtn.create')}</Button>
                        </CardFooter>
                    </>
                )

            }

        </Card>
    )
}

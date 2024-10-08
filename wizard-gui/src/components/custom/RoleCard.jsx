import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";

import {
    Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card";
import {cn} from "../../lib/utils.js";
import {Button} from "../ui/button.jsx";
import {MoreHorizontal, Settings} from "lucide-react";
import RolePreviewDialog from "./RolePreviewDialog.jsx";
import {useTranslation} from "react-i18next";
import {toast} from "sonner";
import { Badge } from "@/components/ui/badge"
import {ReloadIcon} from "@radix-ui/react-icons"; // Assuming you have a Spinner component

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator} from "../ui/dropdown-menu.jsx";
import {useUpdateRoleMutation} from "../../hooks/useUpdateRoleMutation.jsx";

export default function RoleCard({role, handleSwitchChange}) {
    const {t} = useTranslation();
    // const [isActive, setActive] = useState(isActive);
    const [loading, setLoading] = useState(false); // New loading state


    return (
        <Card className={cn(role.isActive && "border border-black bg-accent")} id={role.entityType}>
            <CardHeader className={cn("text-left")}>
                {role.isActive ? (
                    <>
                        <CardTitle>
                            <RolePreviewDialog>{role.displayName}</RolePreviewDialog>
                            <Badge variant="outline" className="border-black float-end">{role.entityType.split("_").join(" ")}</Badge>
                        </CardTitle>
                    </>
                ) : (
                    <>
                        <CardTitle>
                            {t('roles.card.displayName')}
                            <Badge variant="outline" className="border-black float-end">{role.entityType.split("_").join(" ")}</Badge>
                        </CardTitle>
                    </>
                )}
            </CardHeader>

            {/*<CardContent>*/}
            {/*    {isActive ? <p>{data.entityId}</p> : <p>{t('roles.card.entityId')}</p>}*/}
            {/*</CardContent>*/}

            <CardFooter className={cn("flex justify-between")}>
                {loading ? (
                    <Button variant={role.isActive ? "destructive" : "default"} disabled>
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin"/>
                        {role.isActive ? "Removing role" : "Adding role"}
                    </Button>
                ) : role.isActive ? (
                    <>
                        {/*<Button variant="destructive" onClick={() => {handleSwitchChange(role.entityType, role.isActive)}}>*/}
                        {/*    {t('roles.cardBtn.delete')}*/}
                        {/*</Button>*/}



                        {role.imageUrl && <img src={role.imageUrl} alt="Role Logo" className="max-w-[100px] max-h-[80px]" />}


                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem> <Link to={`/roles/edit/${role.entityType}`}>Edit Role</Link></DropdownMenuItem>

                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => navigator.clipboard.writeText(payment.id)}
                                >
                                    Copy role ID
                                </DropdownMenuItem>
                                <DropdownMenuItem>Export configuration</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>


                    </>
                ) : (
                    <Button onClick={() => {handleSwitchChange(role.entityType, role.isActive)}}>{t('roles.cardBtn.create')}</Button>
                )}
            </CardFooter>
        </Card>
    );
}

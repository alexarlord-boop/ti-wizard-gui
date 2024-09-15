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

export default function RoleCard({data, entityType, id}) {
    const {t} = useTranslation();
    const [isActive, setActive] = useState(data[data.entityType].isActive);
    const [loading, setLoading] = useState(false); // New loading state

    function handleToggle(isActive) {
        setLoading(true);
        setTimeout(() => {
            const btnText = isActive ? "roles.card.removed" : "roles.card.added";
            setActive(isActive => !isActive);
            setLoading(false);
            toast(t(btnText),
                {
                    // description: "description description",
                    action: {
                        label: "OK",
                        onClick: () => console.log("OK"),
                    },
                }
            );
        }, 1500)
    }

    const handleAdd = () => {
        handleToggle(isActive);
    };

    const handleRemove = () => {
       handleToggle(isActive);
    };

    return (
        <Card className={cn(isActive && "border border-black bg-accent")} id={id}>
            <CardHeader className={cn("text-left")}>
                {isActive ? (
                    <>
                        <CardTitle>
                            <RolePreviewDialog>{data.displayName}</RolePreviewDialog>
                            <Badge variant="outline" className="border-black float-end">{entityType}</Badge>
                        </CardTitle>
                    </>
                ) : (
                    <>
                        <CardTitle>
                            {t('roles.card.displayName')}
                            <Badge variant="outline" className="border-black float-end">{entityType}</Badge>
                        </CardTitle>
                    </>
                )}
            </CardHeader>

            {/*<CardContent>*/}
            {/*    {isActive ? <p>{data.entityId}</p> : <p>{t('roles.card.entityId')}</p>}*/}
            {/*</CardContent>*/}

            <CardFooter className={cn("flex justify-between")}>
                {loading ? (
                    <Button variant={isActive ? "destructive" : "default"} disabled>
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin"/>
                        {isActive ? "Removing role" : "Adding role"}
                    </Button>
                ) : isActive ? (
                    <>
                        <Button variant="destructive" onClick={handleRemove}>
                            {t('roles.cardBtn.delete')}
                        </Button>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem> <Link to={`/roles/edit/${entityType}`}>Edit Role</Link></DropdownMenuItem>

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
                    <Button onClick={handleAdd}>{t('roles.cardBtn.create')}</Button>
                )}
            </CardFooter>
        </Card>
    );
}

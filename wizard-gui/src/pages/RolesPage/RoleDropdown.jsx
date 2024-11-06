import {Button} from "../../components/ui/button.jsx";
import {MoreHorizontal, Pen, Trash2Icon} from "lucide-react";
import {DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator} from "../../components/ui/dropdown-menu.jsx";
import React from "react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function RoleDropdown({onDelete, role}) {
    return (
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
    )
}
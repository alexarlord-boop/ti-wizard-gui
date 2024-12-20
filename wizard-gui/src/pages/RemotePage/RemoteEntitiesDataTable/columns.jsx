import React from 'react';
import {ArrowUpDown} from "lucide-react";
import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {MoreHorizontal} from "lucide-react";
import StatusToggle from "./EntityStatusToggle.jsx";
import {toast} from "sonner";
import EntityNameWithTooltip from "../../../components/custom/EntityNameTooltip.jsx";
import {DropdownMenuCheckboxItem} from "@radix-ui/react-dropdown-menu";  // Import the updated StatusToggle component


export const columns = (handleViewDetails, handleDelete, ...args) => [
    {
        id: "name",
        accessorKey: "name",
        header: ({column}) => {
            return (
                <div className="text-center">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Name
                        <ArrowUpDown className="ml-2 h-4 w-4"/>
                    </Button>
                </div>
            );
        },
        cell: ({row}) => {
            const entity = row.original;
            const {name} = row.original;
            return <div className="text-left truncate max-w-md hover:underline cursor-pointer">
                {/*<span className="truncate flex max-w-sm"*/}
                {/*      onClick={() => handleViewDetails(entity)}>{name}</span>*/}
                <span onClick={() => handleViewDetails(entity)}><EntityNameWithTooltip entityName={name}/></span>
            </div>;
        },
    },
    {
        id: "Registered in",
        accessorKey: "RA",
        header: () => <div className="text-center">Registered in</div>,
    },
    {
        accessorKey: "role",
        header: ({column}) => {

            return (
                <div className="text-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">Filter by role</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            {["SAML IDP", "SAML SP", "OIDC OP", "OIDC RP"].map((role) => (
                                <DropdownMenuCheckboxItem
                                    key={role}
                                    checked={selectedRoles.includes(role)}
                                    onCheckedChange={() => handleRoleChange(role)}

                                >
                                    {role}
                                </DropdownMenuCheckboxItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        },
    },
    {
        id: "status",
        accessorKey: "status",
        header: () => <div className="text-center">Status</div>,
        cell: ({row}) => {
            const {status} = row.original;
            return <StatusToggle initialStatus={status}/>;
        },
    },
    {
        id: "actions",
        accessorKey: "actions",
        header: () => <div className="text-center">Actions</div>,
        cell: ({row}) => {
            const entity = row.original;

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
                        <DropdownMenuItem onClick={
                            () => {
                                navigator.clipboard.writeText(entity.id);
                                toast("Entity ID copied to clipboard");
                            }

                        }>
                            Copy entity ID
                        </DropdownMenuItem>
                        <DropdownMenuItem>Refresh metadata</DropdownMenuItem>
                        <DropdownMenuItem>Restart entity</DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem onClick={() => handleDelete(entity.id)} className="text-red-500">
                            Delete
                        </DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

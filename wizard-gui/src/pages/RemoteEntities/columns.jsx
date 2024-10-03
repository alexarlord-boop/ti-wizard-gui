import React from 'react';
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import StatusToggle from "./EntityStatusToggle.jsx";  // Import the updated StatusToggle component


const onDetailsClick = (entity) => {
    console.log(entity);
}
export const columns = (handleViewDetails) => [

    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <div className="text-center">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Resource name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            );
        },
    },
    {
        accessorKey: "registrationAuthority",
        header: () => <div className="text-center">Registration Authority</div>,
    },
    {
        accessorKey: "role",
        header: () => <div className="text-center">Role</div>,
    },
    // {
    //     accessorKey: "status",
    //     header: ({ column }) => {
    //         return (
    //             <div className="text-center">
    //                 <Button
    //                     variant="ghost"
    //                     onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //                 >
    //                     Status
    //                     <ArrowUpDown className="ml-2 h-4 w-4" />
    //                 </Button>
    //             </div>
    //         );
    //     },
    // },
    {
        id: "status-toggle",
        accessorKey: "status",
        header: () => <div className="text-center">Status</div>,
        cell: ({ row }) => {
            const { status } = row.original;
            return <StatusToggle initialStatus={status} />;
        },
    },
    {
        id: "actions",
        accessorKey: "actions",
        header: () => <div className="text-center">Actions</div>,
        cell: ({ row }) => {
            const entity = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleViewDetails(entity)}>
                            View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(entity.id)}>
                            Copy entity ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View entity details</DropdownMenuItem>
                        <DropdownMenuItem>Export configuration</DropdownMenuItem>
                        <DropdownMenuItem>Restart entity</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

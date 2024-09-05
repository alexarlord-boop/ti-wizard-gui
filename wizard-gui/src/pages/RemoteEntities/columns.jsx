"use client"


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
import { ArrowUpDown } from "lucide-react"


import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {MoreHorizontal} from "lucide-react";

export const columns = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <div className="text-center">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}

                    >
                        Display name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )
        },
    },
    {
        accessorKey: "role",
        // header: ({ column }) => {
        //     return (
        //         <div className="text-center">
        //         <Button
        //             variant="ghost"
        //             onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        //
        //         >
        //             Role
        //             <ArrowUpDown className="ml-2 h-4 w-4" />
        //         </Button>
        //         </div>
        //     )
        // },
        header: () => <div className="text-center">Role</div>,
    },

    {
        accessorKey: "status",
        // header: () => <div className="text-center">Status</div>,
        header: ({ column }) => {
            return (
                <div className="text-center">
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}

                >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
                </div>
            )
        },
    },

    {
        id: "actions",
        accessorKey: "Actions",
        header: () => <div className="text-center">Actions</div>,
        cell: ({ row }) => {
            const payment = row.original

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
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(payment.id)}
                        >
                            Copy entity ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View entity details</DropdownMenuItem>
                        <DropdownMenuItem>Export configuration</DropdownMenuItem>
                        <DropdownMenuItem>Restart entity</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

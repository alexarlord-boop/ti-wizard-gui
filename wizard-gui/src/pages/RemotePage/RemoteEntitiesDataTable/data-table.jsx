"use client"

import {
    getSortedRowModel,
    getFilteredRowModel,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {Input} from "@/components/ui/input"

import React, {useEffect, useLayoutEffect, useState} from "react";
import {Button} from "../../../components/ui/button.jsx";
import {Checkbox} from "../../../components/ui/checkbox.jsx";
import {Select, SelectContent, SelectLabel, SelectTrigger, SelectValue} from "@radix-ui/react-select";
import {SelectGroup, SelectItem} from "../../../components/ui/select.jsx";
import {DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator} from "@radix-ui/react-dropdown-menu";
import {ScrollArea} from "@radix-ui/react-scroll-area";
import {ArrowUpDown, MoreHorizontal} from "lucide-react";
import EntityNameWithTooltip from "../../../components/custom/EntityNameTooltip.jsx";
import StatusToggle from "./EntityStatusToggle.jsx";
import {toast} from "sonner";

export function DataTable({
                              handleViewDetails,
                              handleDelete,
                              data,
                          }) {
    const [sorting, setSorting] = React.useState([])
    const [columnFilters, setColumnFilters] = React.useState([])
    const [columnVisibility, setColumnVisibility] = React.useState({})
    const [selectedRoles, setSelectedRoles] = React.useState([]);
    const [filteredData, setFilteredData] = React.useState(data);
    const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

    useEffect(() => {
        setFilteredData(data);
    }, [data]);

    const handleRoleChange = (role) => {
        const updatedRoles = selectedRoles.includes(role)
            ? selectedRoles.filter((r) => r !== role)
            : [...selectedRoles, role];

        setSelectedRoles(updatedRoles);

        const newFilteredData = data.filter((row) =>
            updatedRoles.length === 0 || updatedRoles.includes(row.role)
        );

        setFilteredData(newFilteredData);
    };


    const columns = [
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
                        {/*<Button variant="outline" className="" onClick={() => {console.log('role title')}}>Role</Button>*/}
                        <DropdownMenu open={isRoleDropdownOpen} onOpenChange={setIsRoleDropdownOpen}>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">Role</Button>
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


    const table = useReactTable({
        data: filteredData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
        },
    })

    return (
        <div>
            {/* TABLE HEADER */}
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter names..."
                    value={(table.getColumn("name")?.getFilterValue()) ?? ""}
                    onChange={(event) =>
                        table.getColumn("name")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />

                {/*<div className="ms-4">*/}
                {/*    <DropdownMenu>*/}
                {/*        <DropdownMenuTrigger asChild>*/}
                {/*            <Button variant="outline">Filter by role</Button>*/}
                {/*        </DropdownMenuTrigger>*/}
                {/*        <DropdownMenuContent className="w-56">*/}
                {/*            {["SAML IDP", "SAML SP", "OIDC OP", "OIDC RP"].map((role) => (*/}
                {/*                <DropdownMenuCheckboxItem*/}
                {/*                    key={role}*/}
                {/*                    checked={selectedRoles.includes(role)}*/}
                {/*                    onCheckedChange={() => handleRoleChange(role)}*/}

                {/*                >*/}
                {/*                    {role}*/}
                {/*                </DropdownMenuCheckboxItem>*/}
                {/*            ))}*/}
                {/*        </DropdownMenuContent>*/}
                {/*    </DropdownMenu>*/}
                {/*</div>*/}

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter(
                                (column) => column.getCanHide()
                            )
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* TABLE */}
            <ScrollArea className="h-[60dvh] overflow-y-scroll rounded-md border">
                <Table>
                    <TableHeader className="sticky top-0 bg-secondary z-10">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>

                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}

                    </TableBody>
                </Table>
            </ScrollArea>

        </div>
    )
}

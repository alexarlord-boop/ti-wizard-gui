import React, {useEffect, useLayoutEffect, useState} from "react";
import { getSortedRowModel, getFilteredRowModel, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Table } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import {ArrowUpDown, MoreHorizontal} from "lucide-react";
import EntityNameWithTooltip from "../../../components/custom/EntityNameTooltip.jsx";
import StatusToggle from "./EntityStatusToggle.jsx";
import { toast } from "sonner";
import RoleFilter from "./RoleFilter";
import ColumnVisibilityToggle from "./ColumnVisibilityToggle";

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {Button} from "../../../components/ui/button.jsx";
import DataTableHeader from "./TableHeader.jsx";
import DataTableBody from "./TableBody.jsx";
import RegistrationFilter from "./RegistrationFilter.jsx";


export function DataTable({ handleViewDetails, handleDelete, data }) {
    const [sorting, setSorting] = useState([{ id: "status", desc: false }]);
    const [columnFilters, setColumnFilters] = useState([]);
    const [columnVisibility, setColumnVisibility] = useState({});
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [selectedRegistrations, setSelectedRegistrations] = useState([]);
    const [filteredData, setFilteredData] = useState(data);
    const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
    const [isRegistrationDropdownOpen, setIsRegistrationDropdownOpen] = useState(false);


    useLayoutEffect(() => {
        let newFilteredData = data;

        if (selectedRoles.length > 0) {
            newFilteredData = newFilteredData.filter((row) =>
                selectedRoles.includes(row.role)
            );
        }

        if (selectedRegistrations.length > 0) {
            newFilteredData = newFilteredData.filter((row) =>
                selectedRegistrations.includes(row.RA)
            );
        }

        setFilteredData(newFilteredData);
    }, [data, selectedRoles, selectedRegistrations]);

    useLayoutEffect(() => {
        const availableRoles = selectedRegistrations.length > 0
            ? [...new Set(data.filter((row) => selectedRegistrations.includes(row.RA)).map((row) => row.role))]
            : [...new Set(data.map((row) => row.role))];

        setSelectedRoles((prevSelectedRoles) =>
            prevSelectedRoles.filter((role) => availableRoles.includes(role))
        );
    }, [selectedRegistrations, data]);

    const handleRoleChange = (role) => {
        const updatedRoles = selectedRoles.includes(role)
            ? selectedRoles.filter((r) => r !== role)
            : [...selectedRoles, role];

        setSelectedRoles(updatedRoles);
    };

    const handleRegistrationChange = (registration) => {
        const updatedRegistrations = selectedRegistrations.includes(registration)
            ? selectedRegistrations.filter((r) => r !== registration)
            : [...selectedRegistrations, registration];

        setSelectedRegistrations(updatedRegistrations);

        const newFilteredData = data.filter((row) =>
            updatedRegistrations.length === 0 || updatedRegistrations.includes(row.RA)
        );

        setFilteredData(newFilteredData);
    };


    const handleStatusChange = (rowId, newStatus) => {
        const updatedData = filteredData.map((row) =>
            row.id === rowId ? { ...row, status: newStatus } : row
        );
        setFilteredData(updatedData);
    };

    const nameColWidth = "w-[40em]";
    const mdColWidth = "w-[9em]";
    const smColWidth = "w-[6em]";

    const availableRegistrations = [...new Set(data.map((row) => row.RA))];
    const availableRoles = selectedRegistrations.length > 0
        ? [...new Set(data.filter((row) => selectedRegistrations.includes(row.RA)).map((row) => row.role))]
        : [...new Set(data.map((row) => row.role))];



    const columns = [
        {
            id: "name",
            accessorKey: "name",
            header: ({ column }) => (
                <div className={` text-center ${nameColWidth}`}>
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            ),
            cell: ({ row }) => {
                const entity = row.original;
                const { name } = row.original;
                return (
                    <div className="text-left truncate max-w-md hover:underline cursor-pointer">
                        <span onClick={() => handleViewDetails(entity)}>
                            <EntityNameWithTooltip entityName={name} />
                        </span>
                    </div>
                );
            },
        },
        {
            id: "Registered in",
            accessorKey: "RA",
            header: ({ column }) => (
                <div className={`text-center ${mdColWidth}`}>
                    <RegistrationFilter
                        selectedRegistrations={selectedRegistrations}
                        handleRegistrationChange={handleRegistrationChange}
                        isRegistrationDropdownOpen={isRegistrationDropdownOpen}
                        setIsRegistrationDropdownOpen={setIsRegistrationDropdownOpen}
                        availableRegistrations={availableRegistrations}
                    />
                </div>
            ),
            cell: ({ row }) => {

                const { RA } = row.original;
                return (
                    <div className="text-center truncate w-[12em]">
                        {RA}
                    </div>
                );
            },
        },

        {
            accessorKey: "role",
            header: ({ column }) => (
                <div className={`text-center ${mdColWidth}`}>
                    <RoleFilter
                        selectedRoles={selectedRoles}
                        handleRoleChange={handleRoleChange}
                        isRoleDropdownOpen={isRoleDropdownOpen}
                        setIsRoleDropdownOpen={setIsRoleDropdownOpen}
                        availableRoles={availableRoles}
                    />
                </div>
            ),
        },
        {
            id: "status",
            accessorKey: "status",
            header: () => <div className={`text-center ${smColWidth}`}>Status</div>,
            cell: ({ row }) => {
                const { status, id } = row.original;
                return <StatusToggle initialStatus={status} onStatusChange={(newStatus) => handleStatusChange(id, newStatus)} />;
            },
            sortingFn: (rowA, rowB) => {
                const statusA = rowA.original.status;
                const statusB = rowB.original.status;
                if (statusA === "active" && statusB !== "active") return -1;
                if (statusA !== "active" && statusB === "active") return 1;
                return 0;
            },
        },
        {
            id: "actions",
            accessorKey: "actions",
            header: () => <div className={`text-center ${smColWidth}`}>Actions</div>,
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
                            <DropdownMenuItem onClick={() => {
                                navigator.clipboard.writeText(entity.id);
                                toast("Entity ID copied to clipboard");
                            }}>
                                Copy entity ID
                            </DropdownMenuItem>
                            <DropdownMenuItem>Refresh metadata</DropdownMenuItem>
                            <DropdownMenuItem>Restart entity</DropdownMenuItem>
                            <DropdownMenuSeparator />
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
    });

    return (
        <div>
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter names..."
                    value={table.getColumn("name")?.getFilterValue() ?? ""}
                    onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
                    className="max-w-sm"
                />
                <ColumnVisibilityToggle table={table} />
            </div>
            <ScrollArea className="h-[60dvh] overflow-y-scroll rounded-md border">
                <Table>
                    <DataTableHeader table={table} />
                    <DataTableBody table={table} columns={columns} />
                </Table>
            </ScrollArea>
        </div>
    );
}
import React from 'react';
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";

const DataTableHeader = ({ table }) => (
    <TableHeader className="sticky top-0 bg-secondary z-10">
        {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                        {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                ))}
            </TableRow>
        ))}
    </TableHeader>
);

export default DataTableHeader;
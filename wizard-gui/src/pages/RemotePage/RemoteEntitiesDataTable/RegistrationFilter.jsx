import React, { useState, useEffect } from "react";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button.jsx";

const RegistrationFilter = ({ selectedRegistrations, handleRegistrationChange, isRegistrationDropdownOpen, setIsRegistrationDropdownOpen, availableRegistrations }) => {
    return (
        <DropdownMenu open={isRegistrationDropdownOpen} onOpenChange={setIsRegistrationDropdownOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="relative">
                    <span className="sr-only">Open menu</span>
                    Registered in
                    {selectedRegistrations.length > 0 && (
                        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-0 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                            {selectedRegistrations.length}
                        </span>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {availableRegistrations.map((registration) => (
                    <DropdownMenuCheckboxItem
                        key={registration}
                        checked={selectedRegistrations.includes(registration)}
                        onCheckedChange={() => handleRegistrationChange(registration)}
                    >
                        {registration}
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default RegistrationFilter;
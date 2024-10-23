import React from 'react';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";

const RoleFilter = ({selectedRoles, handleRoleChange, isRoleDropdownOpen, setIsRoleDropdownOpen, availableRoles}) => (
    <DropdownMenu open={isRoleDropdownOpen} onOpenChange={setIsRoleDropdownOpen}>
        <DropdownMenuTrigger asChild>
            <Button variant="outline" className="relative">
                Role
                {selectedRoles.length > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-0 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                            {selectedRoles.length}
                        </span>
                )}
            </Button>

        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
            {["SAML IDP", "SAML SP", "OIDC OP", "OIDC RP"].map((role) => (
                <DropdownMenuCheckboxItem
                    key={role}
                    checked={selectedRoles.includes(role)}
                    onCheckedChange={() => handleRoleChange(role)}
                    disabled={!availableRoles.includes(role)}
                >
                    {role}
                </DropdownMenuCheckboxItem>
            ))}
        </DropdownMenuContent>
    </DropdownMenu>
);

export default RoleFilter;
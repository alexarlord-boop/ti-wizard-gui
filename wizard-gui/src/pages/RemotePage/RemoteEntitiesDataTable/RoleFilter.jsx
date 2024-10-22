import React from 'react';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";

const RoleFilter = ({selectedRoles, handleRoleChange, isRoleDropdownOpen, setIsRoleDropdownOpen}) => (
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
);

export default RoleFilter;
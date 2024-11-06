import React from "react";
import RoleCard from "../../components/custom/RoleCard.jsx";
import {Button} from "../../components/ui/button.jsx";
import {PlusCircle, PlusIcon} from "lucide-react";
import {humanReadableTypes, types} from "../../lib/roles_utils.js";

function RoleCards({ roles, handleAddRole, handleDeleteRole }) {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="role-cards">
            {
                types.map((type, index) => {
                    const role = roles.find(role => role.entity_type === type);
                    if (role) {
                    return (
                        <RoleCard
                            key={type}
                            role={role}
                            onAdd={() => handleAddRole(type)}
                            onDelete={() => handleDeleteRole(role.id)}
                        />
                    )} else {
                       return (
                           <Button key={type} size="lg" variant="outline" onClick={() => {handleAddRole(type)}} className="h-[200px] text-lg border-4 border-dashed"><PlusCircle className="me-3"/> {humanReadableTypes[type]}</Button>
                       )
                    }
                })



               }
        </div>
    );
}

export default RoleCards;
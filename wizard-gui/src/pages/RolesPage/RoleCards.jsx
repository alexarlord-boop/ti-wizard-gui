import React from "react";
import RoleCard from "../../components/custom/RoleCard.jsx";
import {Button} from "../../components/ui/button.jsx";

function RoleCards({ roles, handleAddRole, handleDeleteRole }) {
    const types = [
        "SAML_IDP",
        "SAML_SP",
        "OIDC_OP",
        "OIDC_RP",
    ]
    const humanReadableTypes = {
        "SAML_IDP": "SAML Identity Provider",
        "SAML_SP": "SAML Service Provider",
        "OIDC_OP": "OIDC Provider",
        "OIDC_RP": "OIDC Relying Party",
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="role-cards">
            {
                types.map((type, index) => {
                    const role = roles.find(role => role.entity_type === type);
                    if (role) {
                    return (
                        <RoleCard
                            key={index}
                            role={role}
                            onAdd={() => handleAddRole(type)}
                            onDelete={() => handleDeleteRole(role.id)}
                        />
                    )} else {
                       return (
                           <Button size="lg" variant="outline" onClick={() => {handleAddRole(type)}} className="h-[200px] text-lg border-4 border-dashed">+ {humanReadableTypes[type]}</Button>
                       )
                    }
                })



               }
        </div>
    );
}

export default RoleCards;
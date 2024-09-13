import React from "react";
import { useQuery } from "react-query";
import RoleCard from "../components/custom/RoleCard.jsx";
import Breadcrumbs from "../components/custom/Breadcrumbs.jsx";
import { getRolesData } from "../services/roleService.js";
import { Spinner } from "../components/ui/Loader.jsx";

function RolesPage() {
    const { data: roles, isLoading, isError } = useQuery('roles', getRolesData);

    if (isLoading) {
        return <Spinner size="small" className="mt-20" />;
    }

    if (isError) {
        return <div>Error fetching roles</div>;
    }

    return (
        <>
            <Breadcrumbs itemList={[{ path: '/', label: 'Home' }, { path: '/roles', label: 'My Roles' }]} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {roles.map((role, index) => (
                    <RoleCard key={index} data={role.data} entityType={role.type}/>
                ))}
            </div>
        </>
    );
}

export default RolesPage;

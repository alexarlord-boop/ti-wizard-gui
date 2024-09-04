import RoleCard from "../components/custom/RoleCard.jsx";
import Breadcrumbs from "../components/custom/Breadcrumbs.jsx";
import {useEffect, useState} from "react";
import {getRolesData} from "../services/roleService.js";
import {Spinner} from "../components/ui/Loader.jsx";


function RolesPage() {

    const [roles, setRoles] = useState([]);

    useEffect(() => {
        const fetchRoles = async () => {
            const roles = await getRolesData();
            setRoles(roles);
        };

        fetchRoles();
    }, []);


    return (
        <>
            <Breadcrumbs itemList={[{ path: '/roles', label: 'My Roles' }]} />
            <h1 className="text-2xl font-bold">Welcome to the Roles Page</h1>
            {roles.length > 0 ? (
                <>
                    <div className="mt-[5%] grid grid-cols-1 md:grid-cols-2 gap-4">
                        {roles.map((role, index) => (
                            <RoleCard key={index} data={role.data} />
                        ))}
                    </div>
                </>
            ) : (
                <Spinner size="small" className="mt-20" />
            )}
        </>
    );
}

export default RolesPage;

import RoleCard from "../components/custom/RoleCard.jsx";
import Breadcrumbs from "../components/custom/Breadcrumbs.jsx";


function RolesPage() {
    return (
        <>
            <Breadcrumbs itemList={[{path: '/roles', label: 'My Roles'}]}/>

            <h1 className="text-2xl font-bold">Welcome to the Roles Page</h1>
            <div className="mt-[5%] grid grid-cols-1 md:grid-cols-2 gap-4">
                <RoleCard title="SAML IDP"/>
                <RoleCard title="SAML SP" isActive/>
                <RoleCard title="OIDC OP" isActive/>
                <RoleCard title="OIDC RP" isActive/>
            </div>
        </>
    );
}

export default RolesPage;

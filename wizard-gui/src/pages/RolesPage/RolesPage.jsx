import React, {useState} from "react";
import RoleCard from "../../components/custom/RoleCard.jsx";
import Breadcrumbs from "../../components/custom/Breadcrumbs.jsx";
import {Spinner} from "../../components/ui/Loader.jsx";
import usePageTour from "../../hooks/usePageTour.jsx";

import {useRolesQuery} from "../../hooks/useRolesQuery.jsx";

import RoleAddForm from "./RoleAddForm.jsx";

const steps = [
    {
        element: '#role-cards',
        popover: {
            title: 'Role Cards',
            description: 'Each card represents a potential deployment identity role. Clicking on a card allows you to configure and manage specific roles, such as SAML IdP, OIDC OP, SAML SP, or OIDC RP. Explore each card to understand the role’s configuration options and settings.',
            side: 'left',
            align: 'start'
        }
    },
    {
        element: '#SAML_IDP',
        popover: {
            title: 'SAML IdP',
            description: 'The SAML Identity Provider (IdP) is responsible for authenticating users and providing identity information to service providers. It plays a crucial role in Single Sign-On (SSO) systems using the SAML protocol.',
            side: 'left',
            align: 'start'
        }
    },
    {
        element: '#SAML_SP',
        popover: {
            title: 'SAML SP',
            description: 'The SAML Service Provider (SP) relies on an Identity Provider to authenticate users. It uses the SAML protocol to receive and validate authentication assertions from the IdP, allowing users to access protected resources.',
            side: 'left',
            align: 'start'
        }
    },
    {
        element: '#OIDC_OP',
        popover: {
            title: 'OIDC OP',
            description: 'The OpenID Connect (OIDC) Provider (OP) is responsible for authenticating users and providing identity information using the OIDC protocol. It enables Single Sign-On (SSO) and identity verification for applications.',
            side: 'left',
            align: 'start'
        }
    },
    {
        element: '#OIDC_RP',
        popover: {
            title: 'OIDC RP',
            description: 'The OpenID Connect (OIDC) Relying Party (RP) is an application that relies on an OIDC Provider to authenticate users and obtain identity information. It interacts with the OIDC OP to handle authentication and access user data.',
            side: 'left',
            align: 'start'
        }
    }
];


function RolesPage() {
    const [isRoleDetailsOpen, setIsRoleDetailsOpen] = useState(false);
    const [entityType, setEntityType] = useState("");
    usePageTour(steps);  // Use the custom hook with steps


    const {status, data: roles} = useRolesQuery();

    if (status === "success") {
        console.log(roles);
    }


    const handleSwitchChange = (entityType, isActive) => {
        console.log("open");
        setIsRoleDetailsOpen(true);
        setEntityType(entityType);
    };


    if (status === "loading") {
        return <Spinner size="small" className="mt-20"/>;
    }

    if (status === "error") {
        return <div>Error fetching roles</div>;
    }
    return (
        <>
            <Breadcrumbs itemList={[{path: '/', label: 'Home'}, {path: '/roles', label: 'My Roles'}]}/>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="role-cards">
                {roles.map((role, index) => (
                    <RoleCard
                        key={index}
                        role={role}
                        handleSwitchChange={() => {
                            handleSwitchChange(role.entityType, role.isActive)
                        }}
                    />
                ))}
            </div>

            <RoleAddForm
                entityType={entityType}
                setEntityType={setEntityType}
                isRoleDetailsOpen={isRoleDetailsOpen}
                setIsRoleDetailsOpen={setIsRoleDetailsOpen}
            />

        </>
    );
}

export default RolesPage;

import React from "react";
import { useQuery } from "react-query";
import RoleCard from "../components/custom/RoleCard.jsx";
import Breadcrumbs from "../components/custom/Breadcrumbs.jsx";
import { getRolesData } from "../services/roleService.js";
import { Spinner } from "../components/ui/Loader.jsx";
import usePageTour from "../hooks/usePageTour.jsx";

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
    const { data: roles, isLoading, isError } = useQuery('roles', getRolesData);
    usePageTour(steps);  // Use the custom hook with steps


    if (isLoading) {
        return <Spinner size="small" className="mt-20" />;
    }

    if (isError) {
        return <div>Error fetching roles</div>;
    }

    return (
        <>
            <Breadcrumbs itemList={[{ path: '/', label: 'Home' }, { path: '/roles', label: 'My Roles' }]} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="role-cards">
                {roles.map((role, index) => (
                    <RoleCard key={index} data={role.data} entityType={role.type} id={role.type}/>
                ))}
            </div>
        </>
    );
}

export default RolesPage;

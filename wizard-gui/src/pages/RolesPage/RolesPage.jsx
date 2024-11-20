import React, {useState} from "react";
import {useStore} from "../../hooks/store.jsx";

import RoleCard from "../../components/custom/RoleCard.jsx";
import Breadcrumbs from "../../components/custom/Breadcrumbs.jsx";
import {Spinner} from "../../components/ui/Loader.jsx";
import usePageTour from "../../hooks/usePageTour.jsx";

import {useRolesQuery} from "../../hooks/useRolesQuery.jsx";

import RoleAddForm from "./RoleAddForm.jsx";
import {useUpdateRoleMutation} from "../../hooks/useUpdateRoleMutation.jsx";
import {useDeleteRoleMutation} from "../../hooks/useDeleteRoleMutation.jsx";
import RoleCards from "./RoleCards.jsx";
import {Button} from "../../components/ui/button.jsx";

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
    const [entity_type, setEntityType] = useState("");
    usePageTour(steps);  // Use the custom hook with steps


    const roles = useStore((state) => state.roles);


    const handleAddRole = (entity_type) => {
        setIsRoleDetailsOpen(true);
        setEntityType(entity_type);
    };

    return (
        <>
            <Breadcrumbs itemList={[{path: '/', label: 'Home'}, {path: '/roles', label: 'My Roles'}]}/>


            <RoleCards roles={roles} handleAddRole={handleAddRole}/>


            <RoleAddForm
                entity_type={entity_type}
                setEntityType={setEntityType}
                isRoleDetailsOpen={isRoleDetailsOpen}
                setIsRoleDetailsOpen={setIsRoleDetailsOpen}
            />

        </>
    );
}

export default RolesPage;

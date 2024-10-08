import React, {useState} from "react";
import {useQuery} from "react-query";
import RoleCard from "../components/custom/RoleCard.jsx";
import Breadcrumbs from "../components/custom/Breadcrumbs.jsx";
import {getRolesData} from "../services/roleService.js";
import {Spinner} from "../components/ui/Loader.jsx";
import usePageTour from "../hooks/usePageTour.jsx";
import {useFederationsQuery} from "../hooks/useFederationsQuery.jsx";
import {useUpdateFederationMutation} from "../hooks/useUpdateFederationMutation.jsx";
import {useRolesQuery} from "../hooks/useRolesQuery.jsx";
import {useUpdateRoleMutation} from "../hooks/useUpdateRoleMutation.jsx";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {DialogFooter} from "../components/ui/dialog.jsx";
import {Button} from "../components/ui/button.jsx";
import {Separator} from "../components/ui/separator.jsx";
import {Card, CardContent, CardHeader} from "../components/ui/card.jsx";
import {useTranslation} from "react-i18next";

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
    const [isRoleDetailsOpen, setIsRoleDetailsOpen] = React.useState(false);
    const [currentRole, setCurrentRole] = React.useState("");
    const [imageUrl, setImageUrl] = useState("");
    const {t} = useTranslation();
    usePageTour(steps);  // Use the custom hook with steps

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const {status, data: roles} = useRolesQuery();

    const updateRoleMutation = useUpdateRoleMutation()

    const handleSwitchChange = (entityType, isActive) => {
        console.log("open");
        setIsRoleDetailsOpen(true);
        setCurrentRole(entityType);
        // updateRoleMutation.mutate({
        //     entityType: entityType,
        //     status: !isActive
        // });
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
                        data={role.data}
                        isActive={role.isActive}
                        entityType={role.type}
                        id={role.type}
                        handleSwitchChange={() => {handleSwitchChange(role.type, role.isActive)}}
                    />
                ))}
            </div>

            <Dialog open={isRoleDetailsOpen} onOpenChange={setIsRoleDetailsOpen}>
                <DialogContent className="max-w-[90%]">
                    <DialogHeader>
                        <DialogTitle>Add local identity role: {currentRole.split("_").join(" ")}</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-10">
                        <div className="grid gap-5">
                            <Card className="h-[30dvh]">
                                <CardHeader><p className="font-bold">Display information</p></CardHeader>
                                <CardContent>
                                    <div className="grid w-full items-center gap-1.5">
                                        <Label htmlFor="display-name">Name</Label>
                                        <Input
                                            id="display-name"
                                            type="text"
                                            placeholder={"Enter display name"}
                                        />
                                    </div>
                                    <br/>
                                    <div className="flex items-center justify-between h-[80px]">
                                        <div className="grid w-full max-w-sm items-center gap-1.5">
                                            <Label htmlFor="display-name">Logo</Label>
                                            <Input
                                                id="display-name"
                                                type="file"
                                                placeholder={t("Enter display name")}
                                                onChange={handleFileChange}

                                            />

                                        </div>
                                        <img src={imageUrl} alt="logo" className="max-w-[100px] max-h-[80px]"/>

                                    </div>
                                </CardContent>

                            </Card>
                            <Card><CardHeader><p className="font-bold">Supported entity categories</p>
                            </CardHeader></Card>
                        </div>
                        <Card><CardHeader><p className="font-bold">Security settings</p></CardHeader> </Card>

                    </div>
                    <DialogFooter>
                        <Button>Add Role</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default RolesPage;

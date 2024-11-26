import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useStore} from "../../hooks/store.jsx";

import {
    Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card";
import {cn} from "../../lib/utils.js";
import {Button} from "../ui/button.jsx";
import {MoreHorizontal, Pen, Pencil, Settings, Space, Trash2Icon} from "lucide-react";
import RolePreviewDialog from "./RolePreviewDialog.jsx";
import {useTranslation} from "react-i18next";
import {Badge} from "@/components/ui/badge"
import {ReloadIcon} from "@radix-ui/react-icons"; // Assuming you have a Spinner component


import {getEntityTypeString} from "../../services/roleService.js";
import {Label} from "../ui/label.jsx";
import {Input} from "postcss";
import {Avatar, AvatarFallback} from "../ui/avatar.jsx";
import {Switch} from "../ui/switch.jsx";
import RoleDropdown from "../../pages/RolesPage/RoleDropdown.jsx";
import {useChangeActiveStatusRoleMutation} from "../../hooks/useChangeActiveStatusRoleMutation.jsx";
import ConfirmationModal from "./ConfirmationModal.jsx";
import {humanReadableTypes, typeRelations} from "../../lib/roles_utils.js";
import {Checkbox} from "../ui/checkbox.jsx";
import ChangeStatusConfirmationModal from "./ChangeStatusConfirmationModal.jsx";

export default function RoleCard({role, onAdd}) {
    const changeActiveStatusRoleMutation = useChangeActiveStatusRoleMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [isEntityDeletionChecked, setIsEntityDeletionChecked] = useState(false);

    const beforeDelete = () => {
        console.log("Delete role");
        setIsModalOpen(true);
    }

    const entities = useStore((state) => state.remoteEntities);
    const possibleToChangeEntities = useStore((state) => state.getPossibleToChangeEntities);
    const changeRoleActiveStatus = useStore((state) => state.changeRoleActiveStatus);
    const deleteRole = useStore((state) => state.deleteRole);
    const updateEntitiesByRole = useStore((state) => state.updateEntitiesByRole);
    const deleteEntitiesByRole = useStore((state) => state.deleteEntitiesByRole);
    const possibleToChangeEntitiesCount = possibleToChangeEntities(null,role.entity_type).length;

    const beforeChangeStatus = () => {
        if (possibleToChangeEntitiesCount > 0){
            setIsStatusModalOpen(true);
        } else {
            handleActivation(role.entity_id, !role.is_active);
        }

    }

    const confirmChangeStatus = () => {
        handleActivation(role.entity_id, !role.is_active);
        setIsStatusModalOpen(false)
    }

    const handleActivation = (entity_id, status) => {
        console.log(role)
        changeRoleActiveStatus(entity_id, status);
        updateEntitiesByRole(role.entity_type, status);

    }

    const handleDelete = () => {
        deleteRole(role.entity_id);
        if (isEntityDeletionChecked) {
            deleteEntitiesByRole(role.entity_type);
        }
    }


    const confirmDelete = () => {
        handleDelete();
        setIsModalOpen(false);
    };

    console.log(entities)
    return (

        <Card id={role.entity_type} className="h-[200px] border-2 border-black">
            <CardHeader className="text-left pb-0">
                <CardTitle>
                    {role.display_name}

                    <Badge variant="outline" className="float-end p-2">
                        {getEntityTypeString(role.entity_type)}
                        <Switch
                            checked={role.is_active}
                            onClick={
                                () => {
                                    beforeChangeStatus();
                                }
                            }
                            className="ms-2 data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
                        />
                    </Badge>

                </CardTitle>
                <CardDescription>


                </CardDescription>
            </CardHeader>

            <CardContent className="flex justify-between py-0 h-[90px]">
                <div>
                    {role.image_url ?
                        <img src={role.image_url} alt="Role Logo" className=" max-w-[70px] max-h-[70px]"/>
                        :
                        <Avatar className="scale-2">
                            <AvatarFallback title="role logo is missing"></AvatarFallback>
                        </Avatar>

                    }
                </div>
                <RoleDropdown role={role} handleDelete={beforeDelete}/>

            </CardContent>

            <CardFooter className="flex float-end justify-between items-baseline align-bottom py-0">


            </CardFooter>

            <ConfirmationModal
                isOpen={isModalOpen}
                onConfirm={confirmDelete}
                allowConfirmation={!role.is_active}
                onClose={() => {
                    setIsModalOpen(false)
                }}
                title={`Delete ${humanReadableTypes[role.entity_type]}`}
                description={role.is_active ? "This role is active. Deactivate role first" : "After deletion of a role, entities related to this role won't operate."}
                content={
                    (
                        !role.is_active &&
                        <>
                        <span className="flex ">
                        <Checkbox
                            id="deletion"
                            checked={isEntityDeletionChecked} // Ensure the checkbox reflects the state
                            onCheckedChange={() => {
                                console.log(isEntityDeletionChecked)
                                setIsEntityDeletionChecked(!isEntityDeletionChecked);
                            }}
                        />
                        <label
                            htmlFor="deletion"
                            className="ms-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Delete all related entities
                        </label>
                    </span>
                            <ul>
                                {entities.filter(e => e.entity_type === typeRelations[role.entity_type]).map(e => <li
                                    key={e.id}>{e.resourceName}</li>)}
                            </ul>
                        </>

                    )

                }/>


            {(role && possibleToChangeEntitiesCount > 0) &&
                    <ChangeStatusConfirmationModal
                        objectType={"role"}
                        activationOf={role}
                        readableTitle={humanReadableTypes[role.entity_type]}
                        readableDescription={humanReadableTypes[typeRelations[role.entity_type]]}
                        filterBy={(e) => e.entity_type === typeRelations[role.entity_type]}
                        entities={possibleToChangeEntities(null, role.entity_type)}
                        isOpen={isStatusModalOpen}
                        onConfirm={confirmChangeStatus}
                        setIsOpen={setIsStatusModalOpen}
                    />
                }


        </Card>


    )
}

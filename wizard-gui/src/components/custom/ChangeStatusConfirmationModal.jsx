import ConfirmationModal from "./ConfirmationModal.jsx";
import {humanReadableTypes, typeRelations} from "../../lib/roles_utils.js";
import React from "react";
import {Badge} from "@/components/ui/badge"


export default function ChangeStatusConfirmationModal({objectType, readableTitle, readableDescription, activationOf, filterBy, entities, isOpen, setIsOpen, onConfirm}) {
    return (
        <ConfirmationModal
            isOpen={isOpen}
            onConfirm={onConfirm}
            onClose={() => {
                setIsOpen(false);
            }}
            title={`${activationOf.is_active ? "Deactivate" : "Activate"} ${readableTitle}`}
            description={
                <html>
                {activationOf.is_active ? "Deactivation" : "Activation"}
                &nbsp; of this {objectType} will {activationOf.is_active ? <Badge className=" bg-red-500">suspend</Badge> : <Badge className=" bg-green-500">activate</Badge>} related {readableDescription} entities:
                </html>
            }
            content={
                //     just a list of names
                <ul>
                    {entities.filter(e => filterBy(e)).map(e => <li
                        key={e.id}>{e.resourceName}</li>)}
                </ul>

            }
        />
    );
}
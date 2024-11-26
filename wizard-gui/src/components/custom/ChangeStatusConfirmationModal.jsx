import ConfirmationModal from "./ConfirmationModal.jsx";
import {humanReadableTypes, typeRelations} from "../../lib/roles_utils.js";
import React, {useEffect, useState} from "react";
import {Badge} from "@/components/ui/badge"
import {Checkbox} from "../ui/checkbox.jsx";


export default function ChangeStatusConfirmationModal({
                                                          objectType,
                                                          readableTitle,
                                                          readableDescription,
                                                          activationOf,
                                                          filterBy,
                                                          entities,
                                                          isOpen,
                                                          setIsOpen,
                                                          onConfirm
                                                      }) {
    const [selectedEntities, setSelectedEntities] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    useEffect(() => {
        if (selectAll) {
            setSelectedEntities(entities.map(e => e.id));
        } else {
            setSelectedEntities([]);
        }
    }, [selectAll, entities]);

    const handleEntityChange = (id) => {

        setSelectedEntities(prev =>
            prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
        );

    };

    const handleSelectAllChange = () => {
        setSelectAll(!selectAll);
    };


    return (
        <ConfirmationModal
            isOpen={isOpen}
            onConfirm={
                () => {onConfirm(selectedEntities)}

            }
            onClose={() => {
                setIsOpen(false);
            }}
            title={`${activationOf.is_active ? "Deactivate" : "Activate"} ${readableTitle}`}
            description={
                <div>
                    {activationOf.is_active ? "Deactivation" : "Activation"}
                    &nbsp; of this {objectType} will {activationOf.is_active ?
                    <Badge className=" bg-red-500">suspend</Badge> :
                    <Badge className=" bg-green-500">activate</Badge>} related {readableDescription} entities:
                </div>
            }
            content={
            activationOf.is_active ?
                <ul>
                    {entities.filter(e => filterBy(e)).map(e =>
                        <li key={e.id}>{e.resourceName}</li>
                    )}
                </ul>

                :
                <ul>
                    <li key="all" className="flex items-center">
                        <Checkbox
                            id="all"
                            checked={selectAll}
                            onCheckedChange={handleSelectAllChange}
                            className="mr-2"
                        />
                        <label htmlFor="all">Select All</label>
                    </li>
                    {entities.filter(e => filterBy(e)).map(e =>
                        <li key={e.id} className="flex items-center">
                            <Checkbox
                                id={e.id}
                                checked={selectedEntities.includes(e.id)}
                                onCheckedChange={() => handleEntityChange(e.id)}
                                className="mr-2"
                            />
                            <label htmlFor={e.id}>{e.resourceName}</label>
                        </li>
                    )}
                </ul>
            }
        />
    );
}
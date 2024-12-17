import React, {useEffect, useState} from "react";
import {useStore} from "../../hooks/store.jsx";

import {Card, CardContent, CardFooter, CardHeader} from "../ui/card.jsx";
import {Avatar, AvatarFallback} from "../ui/avatar.jsx";
import {useUpdateEntityMutation} from "../../hooks/useUpdateEntityMutation.jsx";
import {Button} from "../ui/button.jsx";
import {toast} from "sonner";
import {CheckCircle, Divide} from "lucide-react";
import {getRemoteEntityName} from "../../services/remoteEntityService.js";
import EntityNameWithTooltip from "./EntityNameTooltip.jsx";

const EntityDetails = ({entity, entity_type, hostedEntities, withAction}) => {
    // const updateEntityMutation = useUpdateEntityMutation();
    const addEntity = useStore((state) => state.addEntity);
    const deleteEntity = useStore((state) => state.deleteEntity);
    let entities = useStore((state) => state.entities);

    const [entityState, setEntityState] = useState({
        is_active: entity?.is_active || false,
        resourceName: entity?.resourceName || "",
        resourceProvider: entity?.resourceProvider || {},
        entityID: entity?.entityID || "",
        id: entity?.id || "",
        resourceContacts: entity?.resourceContacts || {},
        logo: entity?.logo || ""
    });

    const entityPublishedIn = hostedEntities?.find((activeEntity) => activeEntity?.id === entity?.id) || null;

    useEffect(() => {
        if (entity) {
            setEntityState({
                entity_type: entity_type,
                is_active: entity.is_active,
                resourceName: entity.resourceName,
                resourceProvider: entity.resourceProvider,
                entityID: entity.entityID,
                id: entity.id,
                resourceContacts: entity.resourceContacts,
                logo: entity.logo
            });
        }
    }, [entity]);

    if (!entity) {
        return <p>Select entity to preview details.</p>;
    }


    const handleAdd = () => {
        // check that entity is not already added
        console.log(entity);
        const entityExists = entities.find((e) => e.id === entityState.id);
        if (entityExists) {

            deleteEntity(entity.id);
            return;
        }

        addEntity(entity);
        // updateEntityMutation.mutate(
        //     {
        //         entity: entity,
        //         status: !entityState.is_active,
        //     },
        //     {
        //         onSuccess: () => {
        //             setEntityState((prevState) => ({
        //                 ...prevState,
        //                 is_active: !prevState.is_active
        //             }));
        //             toast("Entity updated successfully");
        //         },
        //         onError: () => {
        //             toast("Failed to update entity");
        //         },
        //     }
        // );
    };

    const name = getRemoteEntityName(entity);

    // console.log(entity);
    const isHosted = (entity) => hostedEntities.some(e => e.id === entity.id);

    return (
        <Card>
            <CardHeader>
                <h1 className="font-bold text-xl truncate max-w-[30rem]">
                    {name}
                </h1>
                {withAction &&
                    <Button onClick={handleAdd}>{isHosted(entity) ? "- Remove" : "+ Add"}</Button>}
            </CardHeader>

            <CardContent>
                {entityPublishedIn?.ra && <p>
                    <strong>Published in:</strong> {entityPublishedIn.ra}
                </p>}

                <p><strong>Hashed ID:</strong> {entityState.id}</p>
                <p><strong>Entity ID:</strong> {entityState.entityID}</p>
                <p>
                    <strong>Provider Name:</strong>{" "}
                    {entityState.resourceProvider?.name?.en || "Not available"}
                </p>

                <p>
                    <strong>Provider URL:</strong>{" "}
                    {<a href={entityState.resourceProvider?.url?.en} target="_blank"
                        className="text-blue-700 underline">{entityState.resourceProvider?.url?.en}</a> || "Not available"}
                </p>
                <br/>
                <h3 className="text-lg font-bold">Contacts</h3>
                <p>
                    <strong>Technical:</strong> {entityState.resourceContacts?.technical?.name || "N/A"} - {<a
                    href={'mailto:' + entityState.resourceContacts?.technical?.email} target="_blank"
                    className="text-blue-700 underline">{entityState.resourceContacts?.technical?.email}</a> || "N/A"}
                </p>
                <p>
                    <strong>Support:</strong> {entityState.resourceContacts?.support?.name || "N/A"} - {<a
                    href={'mailto:' + entityState.resourceContacts?.support?.email}
                    className="text-blue-700 underline">{entityState.resourceContacts?.support?.email}</a> || "N/A"}
                </p>
            </CardContent>
            <CardFooter className="flex mx-auto justify-center">
                {entityState.logo ? (
                    <img src={entityState.logo} alt={`${entityState.resourceName}`} className="max-h-[100px]"/>
                ) : (
                    <Avatar className="scale-2">
                        <AvatarFallback>{entityState.resourceName?.[0] || "E"}</AvatarFallback>
                    </Avatar>
                )}
            </CardFooter>
        </Card>
    );
};

export default EntityDetails;
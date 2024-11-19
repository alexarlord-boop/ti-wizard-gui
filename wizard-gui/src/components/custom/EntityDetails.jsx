import React, {useEffect, useState} from "react";
import {Card, CardContent, CardFooter, CardHeader} from "../ui/card.jsx";
import {Avatar, AvatarFallback} from "../ui/avatar.jsx";
import {useUpdateEntityMutation} from "../../hooks/useUpdateEntityMutation.jsx";
import {Button} from "../ui/button.jsx";
import {toast} from "sonner";
import {CheckCircle, Divide} from "lucide-react";
import {getRemoteEntityName} from "../../services/remoteEntityService.js";
import EntityNameWithTooltip from "./EntityNameTooltip.jsx";
import {useCreateEntityMutation} from "../../hooks/useCreateEntityMutation.jsx";
import {remoteEntitiesApi} from "../../api/index.js";
import {useDeleteEntityMutation} from "../../hooks/useDeleteEntityMutation.jsx";

const EntityDetails = ({entity, entity_type, hostedEntities, withAction}) => {

    const types = {
        "idps": "SAML_IDP",
        "sps": "SAML_SP"
    }

    const updateEntityMutation = useUpdateEntityMutation();
    const createEntityMutation = useCreateEntityMutation();
    const deleteEntityMutation = useDeleteEntityMutation();

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
                ra: entity.ra,
                entity_type: entity_type,
                is_active: entity.is_active,
                resourceName: entity.resource_name,
                resourceProvider: entity.resourceProvider,
                entityID: entity.entityID || entity.entity_id,
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
        console.log(entityState);
        createEntityMutation.mutate(
            {
                entity_id: entityState.entityID,
                internal_id: entityState.id,
                resource_name: entityState.resourceName,
                entity_type: types[entity_type],
                is_active: entityState.is_active,
                published_in: entityState.ra,

            },
            {
                onSuccess: () => {
                    setEntityState((prevState) => ({
                        ...prevState,
                        is_active: !prevState.is_active
                    }));
                    toast("Entity added successfully");
                },
                onError: () => {
                    toast("Failed to add entity");
                },
            }
        );
    };

    const handleDelete = () => {
        const id = hostedEntities.find(activeEntity => activeEntity.internal_id === entityState.id).id;
        deleteEntityMutation.mutate(
            {
                id: id
            },
            {
                onSuccess: () => {
                    setEntityState((prevState) => ({
                        ...prevState,
                        is_active: !prevState.is_active
                    }));
                    toast("Entity removed successfully");
                },
                onError: () => {
                    toast("Failed to remove entity");
                },
            }
        );
    }

    const name = getRemoteEntityName(entity);

    const isHosted = (entity) => {
        return hostedEntities.some(activeEntity => activeEntity.internal_id === entity.id);
    }

    // console.log(entity);

    return (
        <Card>
            <CardHeader>
                <h1 className="font-bold text-xl truncate max-w-[30rem]">
                    {name}
                </h1>
                {withAction && (
                    isHosted(entityState) ?
                        <Button onClick={handleDelete}>{"- Remove"}</Button> :
                        <Button onClick={handleAdd}>{"+ Add"}</Button>
                )}
            </CardHeader>

            <CardContent>
                {entityPublishedIn?.ra && <p>
                    <strong>Published in:</strong> {entityPublishedIn.ra}
                </p>}

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
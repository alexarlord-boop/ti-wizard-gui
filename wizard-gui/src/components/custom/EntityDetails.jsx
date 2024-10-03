import {useEffect, useState} from "react";
import {Card, CardContent, CardFooter, CardHeader} from "../ui/card.jsx";
import {Avatar, AvatarFallback} from "../ui/avatar.jsx";
import {useUpdateEntityMutation} from "../../hooks/useUpdateEntityMutation.jsx";
import {Button} from "../ui/button.jsx";
import {toast} from "sonner";

const EntityDetails = ({entity, entityType, withAction}) => {
    const updateEntityMutation = useUpdateEntityMutation();

    const [entityState, setEntityState] = useState({
        isActive: entity?.isActive || false,
        resourceName: entity?.resourceName || "",
        resourceProvider: entity?.resourceProvider || {},
        entityID: entity?.entityID || "",
        id: entity?.id || "",
        resourceContacts: entity?.resourceContacts || {},
        logo: entity?.logo || ""
    });

    useEffect(() => {
        if (entity) {
            setEntityState({
                entityType: entityType,
                isActive: entity.isActive,
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
        return <p>No entity data available.</p>;
    }


    const handleAdd = () => {
        updateEntityMutation.mutate(
            {
                entity: entity,
                status: !entityState.isActive,
            },
            {
                onSuccess: () => {
                    setEntityState((prevState) => ({
                        ...prevState,
                        isActive: !prevState.isActive
                    }));
                    toast("Entity updated successfully");
                },
                onError: () => {
                    toast("Failed to update entity");
                },
            }
        );
    };

    return (
        <Card>
            <CardHeader>
                <h1 className="font-bold">{entityState.resourceName}</h1>
                {withAction &&
                    <Button onClick={handleAdd}>{entityState.isActive ? "- Remove" : "+ Add"}</Button>}
            </CardHeader>
            <br/>
            <CardContent>
                <p><strong>Entity ID:</strong> {entityState.entityID}</p>
                <p>
                    <strong>Provider Name:</strong>{" "}
                    {entityState.resourceProvider?.name?.en || "Not available"}
                </p>
                <p>
                    <strong>Provider URL:</strong>{" "}
                    {entityState.resourceProvider?.url?.en || "Not available"}
                </p>

                <br/>
                <h3 className="text-xl">Contacts</h3>
                <p>
                    <strong>Technical:</strong> {entityState.resourceContacts?.technical?.name || "N/A"} - {entityState.resourceContacts?.technical?.email || "N/A"}
                </p>
                <p>
                    <strong>Support:</strong> {entityState.resourceContacts?.support?.name || "N/A"} - {entityState.resourceContacts?.support?.email || "N/A"}
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
// RemotePage.jsx
import {useState, useEffect, useLayoutEffect} from "react";
import {useQuery} from "react-query";
import {useRolesQuery} from "../../hooks/useRolesQuery.jsx";
import {useFederationsQuery} from "../../hooks/useFederationsQuery.jsx";
import {useEntitiesQuery} from "../../hooks/useEntitiesQuery.jsx";
import {getAvailableOptions, isDisabled} from "../../lib/remote_page_utils.js";
import {getRemoteEntityName} from "../../services/remoteEntityService.js";
import {remoteEntitiesApi} from "../../api/index.js";
import {toast} from "sonner";

import {DataTable} from "./RemoteEntitiesDataTable/data-table.jsx";
import {columns} from './RemoteEntitiesDataTable/columns.jsx';
import {Spinner} from "../../components/ui/Loader.jsx";
import BreadcrumbsComponent from "./Breadcrumbs.jsx";
import AddEntityButtons from "./AddEntityButtons.jsx";
import FederationEntityDialog from "./FederationEntityDialog.jsx";
import EntityDetails from "../../components/custom/EntityDetails.jsx";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import {useHostedEntitiesQuery} from "../../hooks/useHostedEntities.jsx";
import {entityTitles, entityTypes} from "../../constants.js";

const titles = {
    idps: 'SAML IDP',
    sps: 'SAML SP',
};

function RemotePage() {
    const [data, setData] = useState([]);
    const [isEntityDetailsOpen, setIsEntityDetailsOpen] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedEntityType, setSelectedEntityType] = useState(null);
    const [selectedFederation, setSelectedFederation] = useState(null);
    const [selectedEntity, setSelectedEntity] = useState(null);
    const [searchFederation, setSearchFederation] = useState("");
    const [searchEntity, setSearchEntity] = useState("");

    const {status, data: roles} = useRolesQuery();
    const {fedStatus, data: fedData} = useFederationsQuery();
    const {status: entityStatus, data: entities, refetch} = useEntitiesQuery(selectedFederation, selectedEntityType);
    const {status: hostedEntityStatus, data: hostedEntities, hostedRefetch} = useHostedEntitiesQuery();


    useEffect(() => {
        if (hostedEntities) {
            const dt = hostedEntities.map(entity => ({
                id: entity.id,
                name: getRemoteEntityName(entity),
                role: entityTitles[entity.entity_type.toLowerCase()],
                RA: entity.published_in,
                is_active: entity.is_active,
            }));
            setData(dt);
        }
    }, [hostedEntities]);

    // TODO:- probably is not needed
    useEffect(() => {
        if (selectedFederation) {
            refetch();
        }
    }, [selectedFederation]);

    useEffect(() => {
        setSelectedEntity(null);

    }, [selectedFederation]);

    useEffect(() => {
        setSelectedFederation(null);
        setSelectedEntity(null);
        setSearchEntity("");

    }, [isDialogOpen]);

    if (status === "loading" || fedStatus === "loading") {
        return <Spinner size="sm"/>;
    }
    if (status === "error" || fedStatus === "error") {
        return <div>Error fetching roles</div>;
    }

    if (hostedEntityStatus === "loading") {
        return <Spinner size="sm"/>;
    }

    if (hostedEntityStatus === "error") {
        return <div>Error fetching hosted entities</div>;
    }

    const options = getAvailableOptions(roles);

    const handleAddEntityButtonClick = (entity_type) => {
        setSelectedEntityType(entity_type);
        setIsDialogOpen(true);
    };

    const handleDelete = (entityId) => {
        const confirmed = window.confirm("Are you sure you want to delete this entity?");
        if (confirmed) {
            remoteEntitiesApi.delete(entityId);
            toast("Entity deleted");
            setData(prevData => prevData.filter(entity => entity.id !== entityId));
        }
    };

    const handleViewDetails = (entity) => {
        const activeEntity = hostedEntities.find(e => e.id === entity.id);
        setSelectedEntity(activeEntity);
        setSelectedEntityType(activeEntity.entity_type);
        setIsEntityDetailsOpen(true);
    };


    return (
        <>
            <BreadcrumbsComponent/>
            <AddEntityButtons options={options} handleAddEntityButtonClick={handleAddEntityButtonClick}/>
            <FederationEntityDialog
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
                selectedEntityType={selectedEntityType}
                filteredFederations={fedData?.filter(federation => federation.is_active && federation.name.toLowerCase().includes(searchFederation.toLowerCase())) || []}
                entities={entities}
                hostedEntities={hostedEntities}
                entityStatus={entityStatus}
                handleFederationClick={setSelectedFederation}
                selectedFederation={selectedFederation}
                handleEntityClick={setSelectedEntity}
                searchEntity={searchEntity}
                setSearchEntity={setSearchEntity}
                selectedEntity={selectedEntity}
            />
            <DataTable handleViewDetails={handleViewDetails} handleDelete={handleDelete} data={data}/>

            <Dialog open={isEntityDetailsOpen} onOpenChange={setIsEntityDetailsOpen}>
                <DialogTitle></DialogTitle>
                <DialogDescription></DialogDescription>
                <DialogContent className="max-w-[50%] p-10">
                    {selectedEntity && <EntityDetails entity={selectedEntity}/>}
                </DialogContent>
            </Dialog>
        </>
    );
}

export default RemotePage;
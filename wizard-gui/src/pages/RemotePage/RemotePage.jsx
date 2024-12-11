// RemotePage.jsx
import React, {useState, useEffect} from "react";
import {useStore} from "../../hooks/store.jsx";

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
import ConfirmationModal from "../../components/custom/ConfirmationModal.jsx";
import {humanReadableTypes} from "../../lib/roles_utils.js";

const titles = {
    'SAML_IDP': 'SAML IDP',
    'SAML_SP': 'SAML SP',
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


    const roles = useStore((state) => state.roles);
    const federations = useStore((state) => state.federations);
    const activeEntities = useStore((state) => state.entities);

    const {status: entityStatus, data: entities, refetch} = useEntitiesQuery(selectedFederation, selectedEntityType);


    // console.log(federations);
    // // TODO:- probably is not needed
    // useEffect(() => {
    //     if (selectedFederation) {
    //         refetch();
    //     }
    // }, [selectedFederation]);

    useEffect(() => {
        setSelectedEntity(null);

    }, [selectedFederation]);


    useEffect(() => {
        setSelectedFederation(null);
        setSelectedEntity(null);
        setSearchEntity("");

        // const activeEntities = JSON.parse(localStorage.getItem('activeEntities') || '[]');
        let dt = activeEntities?.map(entity => ({
            id: entity.id,
            name: getRemoteEntityName(entity),
            role: titles[entity.entity_type],
            RA: entity.ra,
            is_active: entity.is_active,
        }));
        setData(dt);
    }, [isDialogOpen]);

    useEffect(
        () => {
            let dt = activeEntities?.map(entity => ({
                id: entity.id,
                name: getRemoteEntityName(entity),
                role: titles[entity.entity_type],
                RA: entity.ra,
                is_active: entity.is_active,
            }));
            setData(dt);
        },
        [activeEntities]
    )



    const options = getAvailableOptions(roles);

    const handleAddEntityButtonClick = (entity_type) => {
        setSelectedEntityType(entity_type);
        setIsDialogOpen(true);
    };




    const handleViewDetails = (entity) => {
        // const activeEntities = JSON.parse(localStorage.getItem('activeEntities') || '[]');
        const activeEntity = activeEntities.find(e => e.id === entity.id);
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
                filteredFederations={federations?.filter(federation => federation.is_active && federation.name.toLowerCase().includes(searchFederation.toLowerCase())) || []}
                entities={entities}
                entityStatus={entityStatus}
                handleFederationClick={setSelectedFederation}
                selectedFederation={selectedFederation}
                handleEntityClick={setSelectedEntity}
                searchEntity={searchEntity}
                setSearchEntity={setSearchEntity}
                selectedEntity={selectedEntity}
            />
            <DataTable handleViewDetails={handleViewDetails} data={data}/>

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
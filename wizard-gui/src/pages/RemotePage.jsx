import {useState, useEffect} from "react";
import Breadcrumbs from "../components/custom/Breadcrumbs.jsx";
import {DataTable} from "./RemoteEntities/data-table.jsx";
import {columns} from './RemoteEntities/columns.jsx';
import {Button} from "../components/ui/button.jsx";
import {Spinner} from "../components/ui/Loader.jsx";
import usePageTour from "../hooks/usePageTour.jsx";
import {useRolesQuery} from "../hooks/useRolesQuery.jsx";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import {useFederationsQuery} from "../hooks/useFederationsQuery.jsx";
import {ScrollArea} from "@radix-ui/react-scroll-area";
import {useQuery} from "react-query";
import {cn} from "../lib/utils.js";
import FederationSelect from "../components/custom/FederationSelect.jsx";
import {
    getAvailableOptions,
    isDisabled
} from "../lib/remote_page_utils.js";
import {useEntitiesQuery} from "../hooks/useEntitiesQuery.jsx";
import EntityDetails from "../components/custom/EntityDetails.jsx";
import {DialogFooter} from "../components/ui/dialog.jsx";
import {Select, SelectContent, SelectGroup, SelectItem} from "@radix-ui/react-select";
import {CheckCircle} from "lucide-react";

const steps = [
    {
        element: '#add-row',
        popover: {
            title: 'Add remote entities',
            description: "<img src='https://i.imgur.com/EAQhHu5.gif' style='height: 202.5px; width: 270px;' /><span style='font-size: 15px; display: block; margin-top: 10px; text-align: center;'>Yet another highlight example.</span>",
            side: 'left',
            align: 'start'
        }
    },
];

const titles = {
    idps: 'SAML IDP',
    sps: 'SAML SP',
}

function RolesPage() {
    const [data, setData] = useState([]);
    const [isEntityDetailsOpen, setIsEntityDetailsOpen] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedEntityType, setSelectedEntityType] = useState(null);
    const [selectedFederation, setSelectedFederation] = useState(null);
    const [selectedEntity, setSelectedEntity] = useState(null);
    const [searchFederation, setSearchFederation] = useState("");
    const [searchEntity, setSearchEntity] = useState("");


    usePageTour(steps);  // Use the custom hook with steps
    const {status, data: roles} = useRolesQuery();

    const {fedStatus, data: fedData} = useFederationsQuery();
    // Filter federations based on the search input
    const filteredFederations = fedData?.filter(federation =>
        federation.isActive && federation.name.toLowerCase().includes(searchFederation.toLowerCase())) || [];


    const handleFederationClick = (federationName) => {
        if (federationName) {
            setSelectedFederation(federationName);
            setSelectedEntity(null);
        }
    };

    const handleEntityClick = (entity) => {
        if (entity) {
            setSelectedEntity(entity);
        }
    }

    const handleViewDetails = (entity) => {
        const activeEntities = JSON.parse(localStorage.getItem('activeEntities') || '[]');
        const activeEntity = activeEntities.find(e => e.id === entity.id);
        console.log(activeEntity);
        setSelectedEntity(activeEntity);
        setSelectedEntityType(activeEntity.entityType);
        setIsEntityDetailsOpen(true);
    };

    const {status: entityStatus, data: entities, refetch} = useEntitiesQuery(selectedFederation, selectedEntityType);

    useEffect(() => {
        if (selectedFederation) {
            refetch();  // Manually trigger the query only when a federation is selected
        }


    }, [selectedFederation, refetch]);

    useEffect(() => {
        setSelectedFederation(null)
        setSelectedEntity(null)

        const activeEntities = JSON.parse(localStorage.getItem('activeEntities') || '[]');
        console.log(activeEntities);
        let dt = activeEntities?.map(entity => {
            return {
                id: entity.id,
                name: entity.resourceName,
                role: titles[entity.entityType],
                RA: entity.ra,
                status: entity.isActive ? "on" : "off",

            };
        });
        setData(dt);
    }, [isDialogOpen]);

    if (status === "loading" || fedStatus === "loading") {
        return <Spinner size="sm"/>;
    }
    if (status === "error" || fedStatus === "error") {
        return <div>Error fetching roles</div>;
    }


    const options = getAvailableOptions(roles);

    const handleAddEntityButtonClick = (entityType) => {
        setSelectedEntityType(entityType);
        setIsDialogOpen(true);

    };

    return (
        <>
            <Breadcrumbs
                itemList={[{path: '/', label: 'Home'}, {path: '/remotes-entities', label: 'Remote Entities'}]}/>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4" id="add-row">
                <Button disabled={isDisabled('SAML_IDP', options)}
                        onClick={() => handleAddEntityButtonClick('idps')}>+ IDP</Button>
                <Button disabled={isDisabled('SAML_SP', options)}
                        onClick={() => handleAddEntityButtonClick('sps')}>+ SP</Button>
                <Button disabled={isDisabled('OIDC_OP', options)}
                        onClick={() => handleAddEntityButtonClick('ops')}>+ OP</Button>
                <Button disabled={isDisabled('OIDC_RP', options)}
                        onClick={() => handleAddEntityButtonClick('rps')}>+ RP</Button>
            </div>


            {/* Dialog window */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <span></span>
                </DialogTrigger>
                <DialogContent className={cn("max-w-[85%]", "h-[80%]", "block")}>
                    <DialogHeader>
                        <DialogTitle>Add Remote Entities</DialogTitle>
                        <DialogDescription>
                            Choose a federation to preview the {selectedEntityType} entities.
                        </DialogDescription>
                    </DialogHeader>
                    {/* Federation Search and List */}
                    <div className="max-h-80 grid grid-cols-2 gap-5 mt-5">
                        <div className="grid grid-cols-1">
                            <div>
                                <h3 className="font-bold">Federations ({filteredFederations.length}):</h3>
                                <FederationSelect items={filteredFederations}
                                                  onItemClick={handleFederationClick}/>
                                {/* Entities Search and Preview */}
                                {/* Entities Search and Preview */}
                                <div className="mt-10">
                                    <h3 className="font-bold">{titles[selectedEntityType]} ({entities?.length || 0}):</h3>
                                    <input
                                        type="text"
                                        placeholder="Search entities..."
                                        className="p-2 border outline-black mb-2 w-full"
                                        value={searchEntity}
                                        onChange={(e) => setSearchEntity(e.target.value)}
                                    />
                                    <ScrollArea className="h-80 overflow-y-scroll rounded-md border">
                                        {entityStatus === "success" &&

                                            (entities.filter(entity => entity.resourceName.toLowerCase().includes(searchEntity.toLowerCase()))
                                                .map(entity => (
                                                    <div
                                                        key={entity.id}
                                                        className={cn(
                                                            "cursor-pointer p-2 hover:bg-gray-200 flex justify-between",
                                                            selectedEntity?.id === entity?.id ? "bg-gray-100" : ""
                                                        )}
                                                        onClick={() => handleEntityClick(entity)}
                                                    >
                                                        <span>{entity.resourceName}</span>
                                                        <span
                                                            className="flex items-center align-middle ">{entity.isActive ?
                                                            <CheckCircle size="15" className="mr-5"/>
                                                            : ""}</span>
                                                    </div>
                                                )))
                                        }
                                    </ScrollArea>
                                </div>

                            </div>
                        </div>
                        <div className="">
                            <h3 className="font-bold">Selected entity:</h3>
                            <EntityDetails entity={selectedEntity} entityType={selectedEntityType} withAction></EntityDetails>

                        </div>
                    </div>
                </DialogContent>
            </Dialog>


            <br/>
            <DataTable columns={columns(handleViewDetails)} data={data} />

            <Dialog open={isEntityDetailsOpen} onOpenChange={setIsEntityDetailsOpen}>
                <DialogTitle></DialogTitle>
                <DialogDescription></DialogDescription>
                <DialogContent className="max-w-[50%] p-10">
                    {selectedEntity && <EntityDetails entity={selectedEntity} />}
                </DialogContent>
            </Dialog>
        </>
    );
}


export default RolesPage;

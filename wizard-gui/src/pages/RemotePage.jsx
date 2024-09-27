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
    idps: 'SAML IdPs',
    sps: 'SAML SPs',
}

function RolesPage() {
    const [data, setData] = useState([]);
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
        }
    };

    const handleEntityClick = (entity) => {
        if (entity) {
            setSelectedEntity(entity);
        }
    }

    const {status: entityStatus, data: entities, refetch} = useEntitiesQuery(selectedFederation, selectedEntityType);

    useEffect(() => {
        if (selectedFederation) {
            refetch();  // Manually trigger the query only when a federation is selected
        }
    }, [selectedFederation, refetch]);

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
                                <h3 className="font-bold">Active Federations ({filteredFederations.length}):</h3>
                                <FederationSelect items={filteredFederations}
                                                  onItemClick={handleFederationClick}/>
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
                                        <ul>
                                            {entities && entities
                                                .filter(entity => entity.resourceName.toLowerCase().includes(searchEntity.toLowerCase()))
                                                .map(entity => (
                                                    <li key={entity.id} className={`cursor-pointer p-2  hover:bg-gray-200 ${selectedEntity.id === entity.id ? "bg-gray-100" : ""}`}
                                                        onClick={() => handleEntityClick(entity)}>
                                                        {entity.resourceName}
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </ScrollArea>
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <h3 className="font-bold">Selected entity:</h3>
                            <EntityDetails entity={selectedEntity}></EntityDetails>

                            {/*<ScrollArea className="max-h-80 overflow-y-scroll rounded-md border">*/}
                            {/*     */}

                            {/*</ScrollArea>*/}


                        </div>
                    </div>
                </DialogContent>
            </Dialog>


            <br/>
            <DataTable columns={columns} data={data}/>
        </>
    );
}


export default RolesPage;

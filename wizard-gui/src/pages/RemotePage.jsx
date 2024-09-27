import {useState, useEffect} from "react";
import Breadcrumbs from "../components/custom/Breadcrumbs.jsx";
import {DataTable} from "./RemoteEntities/data-table.jsx";
import {columns} from './RemoteEntities/columns.jsx';
import {Button} from "../components/ui/button.jsx";
import {Spinner} from "../components/ui/Loader.jsx";
import usePageTour from "../hooks/usePageTour.jsx";
import {entityTypes} from "../constants.js";
import {useRolesQuery} from "../hooks/useRolesQuery.jsx";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {useFederationsQuery} from "../hooks/useFederationsQuery.jsx";
import {Separator} from "@radix-ui/react-select";
import {ScrollArea} from "@radix-ui/react-scroll-area";
import {useQuery} from "react-query";
import {cn} from "../lib/utils.js";

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


    const fetchEntities = async (entityType) => {
        console.log(selectedFederation);

        const response = await fetch(`https://md.tiw.incubator.geant.org/md/fed/${selectedFederation.toLowerCase()}/${entityType.toLowerCase()}.json`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    };

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

    // React Query fetch based on selected federation
    const {data: entities, refetch} = useQuery(
        ['entities', selectedFederation, selectedEntityType],
        () => fetchEntities(selectedEntityType),
        {
            enabled: false,  // Disable automatic fetching
        }
    );

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


    const getAvailableOptions = (roles) => {
        let options = [];
        roles.forEach(role => {
            switch (role.type) {
                case 'SAML_IDP':
                    options.push({entityType: 'SAML_SP', value: role.isActive});
                    break;
                case 'SAML_SP':
                    options.push({entityType: 'SAML_IDP', value: role.isActive});
                    break;
                case 'OIDC_OP':
                    options.push({entityType: 'OIDC_RP', value: role.isActive});
                    break;
                case 'OIDC_RP':
                    options.push({entityType: 'OIDC_OP', value: role.isActive});
                    break;
                default:
                    break;
            }
        });
        return options;
    };

    const options = getAvailableOptions(roles);

    const getButtonVariant = (entityType, options) => {
        const option = options.find(opt => opt.entityType === entityType);
        return option && option.value ? "" : "outline";
    };

    const isDisabled = (entityType, options) => {
        const option = options.find(opt => opt.entityType === entityType);
        return !(option && option.value);
    };

    const handleButtonClick = (entityType) => {
        setSelectedEntityType(entityType);
        setIsDialogOpen(true);

    };


    return (
        <>
            <Breadcrumbs
                itemList={[{path: '/', label: 'Home'}, {path: '/remotes-entities', label: 'Remote Entities'}]}/>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4" id="add-row">
                <Button variant={getButtonVariant('SAML_IDP', options)} disabled={isDisabled('SAML_IDP', options)}
                        onClick={() => handleButtonClick('idps')}>+ IDP</Button>
                <Button variant={getButtonVariant('SAML_SP', options)} disabled={isDisabled('SAML_SP', options)}
                        onClick={() => handleButtonClick('sps')}>+ SP</Button>
                <Button variant={getButtonVariant('OIDC_OP', options)} disabled={isDisabled('OIDC_OP', options)}
                        onClick={() => handleButtonClick('ops')}>+ OP</Button>
                <Button variant={getButtonVariant('OIDC_RP', options)} disabled={isDisabled('OIDC_RP', options)}
                        onClick={() => handleButtonClick('rps')}>+ RP</Button>
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
                                                    <li key={entity.id} className="cursor-pointer p-2 hover:bg-gray-200"
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

                            <h3 className="font-bold">{selectedEntity?.resourceName}:</h3>

                            <ScrollArea className="max-h-80 overflow-y-scroll rounded-md border">
                                    <pre>
                                        {selectedEntity && JSON.stringify(selectedEntity, null, 2)}
                                    </pre>
                            </ScrollArea>


                        </div>
                    </div>
                </DialogContent>
            </Dialog>


            <br/>
            <DataTable columns={columns} data={data}/>
        </>
    );
}

function FederationSelect({items, onItemClick}) {
    return (
        <Select onValueChange={onItemClick}> {/* consumes value from select item */}
            <SelectTrigger>
                <SelectValue placeholder="Select a federation"/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {items.map(fed => (
                        <SelectItem
                            value={fed.name}
                            key={fed.url}
                        >
                            {fed.name}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}

export default RolesPage;

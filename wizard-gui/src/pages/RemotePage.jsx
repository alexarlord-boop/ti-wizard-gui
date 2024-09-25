import { useState, useEffect } from "react";
import Breadcrumbs from "../components/custom/Breadcrumbs.jsx";
import { DataTable } from "./RemoteEntities/data-table.jsx";
import { columns } from './RemoteEntities/columns.jsx';
import { Button } from "../components/ui/button.jsx";
import { Spinner } from "../components/ui/Loader.jsx";
import usePageTour from "../hooks/usePageTour.jsx";
import { entityTypes } from "../constants.js";
import { useRolesQuery } from "../hooks/useRolesQuery.jsx";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {useFederationsQuery} from "../hooks/useFederationsQuery.jsx";
import {Separator} from "@radix-ui/react-select";

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

function RolesPage() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedEntityType, setSelectedEntityType] = useState(null);
    const [entities, setEntities] = useState([]);
    const [selectedFederation, setSelectedFederation] = useState(null);

    usePageTour(steps);  // Use the custom hook with steps
    const { status, data: roles } = useRolesQuery();

    const {fedStatus, data: fedData} = useFederationsQuery();
    const filteredFederations = fedData?.filter(federation=> federation.isActive) || [];

    if (status === "loading" || fedStatus === "loading") {
        return <Spinner size="sm" />;
    }
    if (status === "error" || fedStatus === "error") {
        return <div>Error fetching roles</div>;
    }

    console.log(fedStatus, fedData)


    const getAvailableOptions = (roles) => {
        let options = [];
        roles.forEach(role => {
            switch (role.type) {
                case 'SAML_IDP':
                    options.push({ entityType: 'SAML_SP', value: role.isActive });
                    break;
                case 'SAML_SP':
                    options.push({ entityType: 'SAML_IDP', value: role.isActive });
                    break;
                case 'OIDC_OP':
                    options.push({ entityType: 'OIDC_RP', value: role.isActive });
                    break;
                case 'OIDC_RP':
                    options.push({ entityType: 'OIDC_OP', value: role.isActive });
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


    // const handleFederationClick = (federation) => {
    //     setSelectedFederation(federation);
    //     const url = `/md/fed/${federation.toLowerCase()}/${selectedEntityType.toLowerCase()}.json`; // API call based on entity type
    //     fetchEntities(url).then(setEntities);
    // };

    return (
        <>
            <Breadcrumbs
                itemList={[{ path: '/', label: 'Home' }, { path: '/remotes-entities', label: 'Remote Entities' }]} />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4" id="add-row">
                <Button variant={getButtonVariant('SAML_IDP', options)} disabled={isDisabled('SAML_IDP', options)} onClick={() => handleButtonClick('IDP')}>+ IDP</Button>
                <Button variant={getButtonVariant('SAML_SP', options)} disabled={isDisabled('SAML_SP', options)} onClick={() => handleButtonClick('SP')}>+ SP</Button>
                <Button variant={getButtonVariant('OIDC_OP', options)} disabled={isDisabled('OIDC_OP', options)} onClick={() => handleButtonClick('OP')}>+ OP</Button>
                <Button variant={getButtonVariant('OIDC_RP', options)} disabled={isDisabled('OIDC_RP', options)} onClick={() => handleButtonClick('RP')}>+ RP</Button>
            </div>

            {/* Dialog window */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <span></span>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Select Federation and Preview Entities</DialogTitle>
                        <DialogDescription>
                            Choose a federation to preview the {selectedEntityType} entities.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="max-h-80 overflow-y-auto">
                            <h3>Federations</h3>
                            <ul>
                                {filteredFederations && filteredFederations.map(fed => (
                                    <li
                                        key={fed.url}
                                        // onClick={() => handleFederationClick(fed)}
                                        className="cursor-pointer p-2 hover:bg-gray-200"
                                    >
                                        {fed.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3>Entities Preview ({selectedEntityType})</h3>
                            <ul>
                                {entities.map(entity => (
                                    <li key={entity}>{entity.name}</li>
                                ))}
                            </ul>
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

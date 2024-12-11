import React, {useEffect, useState} from 'react';
import {ScrollArea} from "@/components/ui/scroll-area";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";
import Breadcrumbs from "../components/custom/Breadcrumbs.jsx";
import {Switch} from "@/components/ui/switch";  // Import Switch from ShadCN
import {Input} from "@/components/ui/input";
import {Spinner} from "../components/ui/Loader.jsx";
import {useFederationsQuery} from "../hooks/useFederationsQuery.jsx";
import {useUpdateFederationMutation} from "../hooks/useUpdateFederationMutation.jsx";
import {useStore} from "../hooks/store.jsx";
import {humanReadableTypes, typeRelations} from "../lib/roles_utils.js";
import ChangeStatusConfirmationModal from "../components/custom/ChangeStatusConfirmationModal.jsx";

const FederationSelectionPage = () => {
    const {t, i18n} = useTranslation();
    const [searchTerm, setSearchTerm] = useState(''); // State to manage search term
    const [loadingFederations, setLoadingFederations] = useState({}); // State to manage loading status of each federation

    const entities = useStore((state) => state.entities);
    const possibleToChangeEntities = useStore((state) => state.getPossibleToChangeEntities);
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const initializeFederations = useStore((state) => state.initializeFederations);
    const [clickedFederation, setClickedFederation] = useState(null);
    const federations = useStore((state) => state.federations);
    const changeFederationActiveStatus = useStore((state) => state.changeFederationActiveStatus);
    const updateEntitiesByFederation = useStore((state) => state.updateEntitiesByFederation);

    const beforeChangeStatus = (federation) => {
        console.log(possibleToChangeEntities(federation.name).length);
        if (entities.some(e => e.ra === federation?.name) && possibleToChangeEntities(federation.name).length > 0) {
            setIsStatusModalOpen(true);
        } else {

            handleActivation(federation, !federation?.is_active);
        }

    }

    const confirmChangeStatus = (ids) => {
        console.log(clickedFederation);
        handleActivation(clickedFederation, !clickedFederation.is_active, ids);
        setIsStatusModalOpen(false)
    }

    const handleActivation = (federation, status, ids) => {

        console.log(federation);
        changeFederationActiveStatus(federation.url, status);
        updateEntitiesByFederation(federation.name, status, ids);
    }


    useEffect(() => {
        // Fetch data from the JSON server
        if (federations.length === 0) {
            const fetchFederations = async () => {
                try {
                    const response = await fetch('https://md.tiw.incubator.geant.org/md/ra.json');
                    const data = await response.json();
                    const toFilterOut = "https://www.edugain.org";
                    delete data[toFilterOut];
                    console.log(data);
                    initializeFederations(data); // Populate the state
                } catch (error) {
                    console.error('Failed to fetch federations:', error);
                }
            };

            fetchFederations();
        }
    }, [initializeFederations]);

    // Filter federations based on search term
    const filteredFederations = federations?.filter(federation =>
        federation.name.toLowerCase().includes(searchTerm)
    ) || [];

    const handleSwitchChange = (federation) => {
        // setLoadingFederations(prev => ({...prev, [federation.url]: true}));
        // console.log(federation);
        // updateFederationMutation.mutate({
        //     id: federation.id,
        //     status: !federation.is_active,
        //     url: federation.url,
        // }, {
        //     onSettled: () => {
        //         setLoadingFederations(prev => ({...prev, [federation.url]: false}));
        //     }
        // });
        changeFederationActiveStatus(federation.url, !federation.is_active);
    };


    return (
        <>
            <Breadcrumbs
                itemList={[
                    {path: '/', label: 'Home'},
                    {path: '/sources', label: 'Sources'},
                    {path: '/federations', label: 'National Federations'}
                ]}
            />

            {
                status === "loading" ? (
                    <Spinner size="sm"/>
                ) : status === "error" ? (
                    <div>Error!</div>
                ) : (
                    <div className="w-2/3 mx-auto">
                        {/* Search Input */}
                        <div className="mb-4">
                            <Input
                                type="text"
                                placeholder={t("Search federations...")}
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </div>

                        {/* Accordion with Federations */}
                        <ScrollArea className="h-[70dvh] rounded-md border p-4">
                            <Accordion type="multiple" className="mx-auto">
                                {filteredFederations.length > 0 ? filteredFederations.map(federation => (
                                    <AccordionItem key={federation.url} value={federation.url}>
                                        <div className="flex justify-between items-center p-2">
                                            <AccordionTrigger>{federation.name}</AccordionTrigger>

                                            <div className="flex w-[50px] me-5">
                                                <Switch
                                                    key={federation.url}
                                                    checked={federation.is_active}
                                                    onClick={
                                                        () => {
                                                            setClickedFederation(federation);
                                                            beforeChangeStatus(federation);
                                                        }
                                                    }
                                                    className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
                                                />
                                                {
                                                    loadingFederations[federation.url] &&
                                                    <Spinner size="sm" className="mx-auto"/>
                                                }
                                            </div>

                                        </div>
                                        <AccordionContent>
                                            <div className="entity-list text-left ms-10">
                                                {federation.md_url.map((entity, index) => (
                                                    <div key={federation.url}>
                                                        <label key={index}>
                                                            {entity}
                                                        </label>
                                                        <br/>
                                                    </div>
                                                ))}
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                )) : <div>{t("No federations found")}</div>}
                            </Accordion>
                        </ScrollArea>
                    </div>
                )
            }
            {
                clickedFederation &&
                <ChangeStatusConfirmationModal
                    objectType={"federation"}
                    activationOf={clickedFederation}
                    readableTitle={clickedFederation.name}
                    readableDescription={""}
                    filterBy={(e) => e.ra === clickedFederation.name}
                    entities={possibleToChangeEntities(clickedFederation.name)}
                    isOpen={isStatusModalOpen}
                    onConfirm={confirmChangeStatus}
                    setIsOpen={setIsStatusModalOpen}
                />
            }
        </>
    );
};

export default FederationSelectionPage;

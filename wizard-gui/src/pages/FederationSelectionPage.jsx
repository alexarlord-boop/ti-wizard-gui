import React, {useState} from 'react';
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
import {useUpdateFederationMutation} from "../hooks/useUpdateFederationMutation.jsx";  // Import Spinner

const FederationSelectionPage = () => {
    const {t, i18n} = useTranslation();
    const [searchTerm, setSearchTerm] = useState(''); // State to manage search term
    const [loadingFederations, setLoadingFederations] = useState({}); // State to manage loading status of each federation


    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const {status, data} = useFederationsQuery();
    const updateFederationMutation = useUpdateFederationMutation()

    // Filter federations based on search term
    const filteredFederations = data?.filter(federation =>
        federation.name.toLowerCase().includes(searchTerm)
    ) || [];

    const handleSwitchChange = (federation) => {
        setLoadingFederations(prev => ({...prev, [federation.url]: true}));
        updateFederationMutation.mutate({
            id: federation.internalId,
            status: !federation.isActive,
            url: federation.url,
        }, {
            onSettled: () => {
                setLoadingFederations(prev => ({...prev, [federation.url]: false}));
            }
        });
    };

    return (
        <>
            <Breadcrumbs
                itemList={[
                    {path: '/', label: 'Home'},
                    {path: '/sources', label: 'Sources'},
                    {path: '/sources/federations', label: 'National Federations'}
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
                                                    checked={federation.isActive}
                                                    onCheckedChange={() => handleSwitchChange(federation)}
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
        </>
    );
};

export default FederationSelectionPage;

import { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Breadcrumbs from "../components/custom/Breadcrumbs.jsx";
import { Switch } from "@/components/ui/switch";  // Import Switch from ShadCN
import { Input } from "@/components/ui/input";
import { Spinner } from "../components/ui/Loader.jsx";  // Import Spinner

const FederationSelectionPage = () => {
    const { t, i18n } = useTranslation();
    let { entityType } = useParams();
    const [selectedEntities, setSelectedEntities] = useState({});
    const [activeFederations, setActiveFederations] = useState({}); // State to manage active federations
    const [searchTerm, setSearchTerm] = useState(''); // State to manage search term


    const handleFederationToggle = (federation) => {
        setActiveFederations(prev => ({
            ...prev,
            [federation]: !prev[federation],
        }));
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    // TODO:- populate with attribute isActive, store in global state
    const fetchFederations = async () => {
        const response = await fetch('https://md.tiw.incubator.geant.org/md/ra.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    };

    const { data: federations, isLoading, error } = useQuery(['federations'], fetchFederations);

    // Check if the query has successfully fetched data before mapping
    const federationArray = federations ? Object.entries(federations).map(([url, details]) => ({
        url,
        ...details
    })) : [];

    // Filter federations based on the search term
    const filteredFederations = federationArray.filter(federation =>
        federation.name.toLowerCase().includes(searchTerm)
    );

    return (
        <>
            <Breadcrumbs
                itemList={[
                    { path: '/', label: 'Home' },
                    { path: '/sources', label: 'Sources' },
                    { path: '/sources/federations', label: 'National Federations' }
                ]}
            />

            {
                isLoading ? (
                    <Spinner size="sm" />
                ) : error ? (
                    <div>Error: {error.message}</div>
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
                                            <Switch
                                                checked={activeFederations[federation.url] || false}
                                                onCheckedChange={() => handleFederationToggle(federation.url)}
                                            />
                                        </div>
                                        <AccordionContent>
                                            <div className="entity-list">
                                                {federation.md_url.map((entity, index) => (
                                                    <label key={index}>
                                                        {entity}
                                                    </label>
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

// FederationEntityDialog.jsx
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription} from "@/components/ui/dialog";
import {ScrollArea} from "@radix-ui/react-scroll-area";
import {CheckCircle} from "lucide-react";
import FederationSelect from "../../components/custom/FederationSelect.jsx";
import {Spinner} from "../../components/ui/Loader.jsx";
import EntityNameWithTooltip from "../../components/custom/EntityNameTooltip.jsx";
import EntityDetails from "../../components/custom/EntityDetails.jsx";
import {cn} from "../../lib/utils.js";
import {getRemoteEntityName} from "../../services/remoteEntityService.js";
import {useStore} from "../../hooks/store.jsx";

const titles = {
    idps: 'SAML IDP',
    sps: 'SAML SP',
}

const types = {
    'SAML_IDP': 'idps',
    'SAML_SP': 'sps',
}


const FederationEntityDialog = ({
                                    isDialogOpen,
                                    setIsDialogOpen,
                                    selectedEntityType,
                                    filteredFederations,
                                    entities,
                                    entityStatus,
                                    handleFederationClick,
                                    selectedFederation,
                                    handleEntityClick,
                                    searchEntity,
                                    setSearchEntity,
                                    selectedEntity
                                }) => {
    // const hostedEntities = JSON.parse(localStorage.getItem('hostedEntities') || '[]');
    const hostedEntities = useStore((state) => state.entities);
    console.log(hostedEntities);
    console.log(selectedFederation);
    console.log(selectedEntityType);
    const hostedEntitiesCount = filteredFederations.reduce((acc, federation) => {
        acc[federation.name] = hostedEntities.filter(entity => types[entity.entity_type] === selectedEntityType && entity.ra === federation.name).length;
        return acc;
    }, {});
    const isHosted = (entity) => hostedEntities.some(e => e.id === entity.id);
    const isInSelectedFederation = (entity) => hostedEntities.some(e => e.id === entity.id && e.ra === selectedFederation);
    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className={cn("max-w-[85%]", "h-[75%]", "block")}>
                <DialogHeader>
                    <DialogTitle>Add Remote Entities</DialogTitle>
                    <DialogDescription>
                        Choose a federation to preview the {selectedEntityType} entities.
                    </DialogDescription>
                </DialogHeader>
                <div className="max-h-80 grid grid-cols-2 gap-5 mt-5">
                    <div className="grid grid-cols-1">
                        <div>
                            <h3 className="font-bold">Federations <span
                                className="text-muted-foreground text-sm">({filteredFederations.length})</span></h3>
                            <FederationSelect items={filteredFederations} onItemClick={handleFederationClick}
                                              hostedEntitiesCount={hostedEntitiesCount}/>
                            <div className="mt-10">
                                <h3 className="font-bold">{titles[selectedEntityType]} <span
                                    className="text-muted-foreground text-sm">({entities?.length || 0})</span>
                                </h3>
                                <input
                                    type="text"
                                    placeholder="Search entities..."
                                    className="p-2 border outline-black mb-2 w-full"
                                    value={searchEntity}
                                    onChange={(e) => setSearchEntity(e.target.value)}
                                />
                                <ScrollArea className="h-80 overflow-y-scroll rounded-md border">
                                    {entityStatus === "loading" && <Spinner size="sm" className="mt-20"/>}
                                    {entityStatus === "success" && (
                                        entities.length === 0 ? (
                                            <div className="text-center p-4">No entities found</div>
                                        ) : (
                                            entities
                                                .filter(entity => getRemoteEntityName(entity).toLowerCase().includes(searchEntity.toLowerCase()))
                                                .sort((a, b) => isHosted(b) - isHosted(a))
                                                .map(entity => {
                                                        const entityName = getRemoteEntityName(entity);
                                                        // console.log(selectedFederation);

                                                        return (
                                                            <div
                                                                key={entity.id}
                                                                className={cn(
                                                                    "cursor-pointer p-1 hover:bg-gray-200 flex  text-left",
                                                                    selectedEntity?.id === entity?.id ? "bg-gray-100" : ""
                                                                )}
                                                                onClick={() => {
                                                                    console.log(entity);
                                                                    handleEntityClick(entity)
                                                                }}
                                                            >
                                                               <span className="flex items-center align-middle ">
                                                        {(isHosted(entity) && isInSelectedFederation(entity)) ?
                                                            <CheckCircle size="15"
                                                                         className="mr-3 text-green-600"/>
                                                            :
                                                            (isHosted(entity) && !isInSelectedFederation(entity)) ?
                                                                <CheckCircle size="15"
                                                                             className="mr-3 text-black"/>
                                                                :
                                                                ""

                                                        }
                                                    </span>
                                                                {
                                                                    entityName.length > 70 ? (
                                                                        <EntityNameWithTooltip
                                                                            entityName={entityName}/>
                                                                    ) : (
                                                                        entityName
                                                                    )
                                                                }

                                                            </div>

                                                        )
                                                    }
                                                )
                                        )
                                    )}

                                </ScrollArea>
                            </div>
                            <div className="mt-2 ">
                                <span className="flex text-center items-center text-sm"><CheckCircle size="15"
                                                                                                     className="mr-3 text-green-600"/>Published in {selectedFederation ? selectedFederation : "selected federation"}</span>
                                <span className="flex text-center items-center text-sm"><CheckCircle size="15"
                                                                                                     className="mr-3 text-black"/> Published in another federation</span>

                            </div>
                        </div>
                    </div>
                    <div className="">
                        <h3 className="font-bold">Entity details:</h3>
                        <EntityDetails entity={selectedEntity} entity_type={selectedEntityType} hostedEntities={hostedEntities}
                                       withAction></EntityDetails>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );

};

export default FederationEntityDialog;
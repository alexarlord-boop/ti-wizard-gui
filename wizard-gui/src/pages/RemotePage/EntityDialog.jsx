// EntityDialog.jsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { CheckCircle } from "lucide-react";
import FederationSelect from "../../components/custom/FederationSelect.jsx";
import {Spinner} from "../../components/ui/Loader.jsx";
import EntityNameWithTooltip from "../../components/custom/EntityNameTooltip.jsx";
import EntityDetails from "../../components/custom/EntityDetails.jsx";
import {cn} from "../../lib/utils.js";
import {getRemoteEntityName} from "../../services/remoteEntityService.js";

const titles = {
    idps: 'SAML IDP',
    sps: 'SAML SP',
}


const EntityDialog = ({ isDialogOpen, setIsDialogOpen, selectedEntityType, filteredFederations, entities, entityStatus, handleFederationClick, handleEntityClick, searchEntity, setSearchEntity, selectedEntity }) => (
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
                        <h3 className="font-bold">Federations ({filteredFederations.length}):</h3>
                        <FederationSelect items={filteredFederations} onItemClick={handleFederationClick} />
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
                                {entityStatus === "loading" && <Spinner size="sm" className="mt-20" />}
                                {entityStatus === "success" && (
                                    entities.length === 0 ? (
                                        <div className="text-center p-4">No entities found</div>
                                    ) : (
                                        entities.filter(entity => getRemoteEntityName(entity).toLowerCase().includes(searchEntity.toLowerCase()))
                                            .map(entity => (
                                                <div
                                                    key={entity.id}
                                                    className={cn(
                                                        "cursor-pointer p-2 hover:bg-gray-200 flex justify-between",
                                                        selectedEntity?.id === entity?.id ? "bg-gray-100" : ""
                                                    )}
                                                    onClick={() => handleEntityClick(entity)}
                                                >
                                                    <EntityNameWithTooltip entityName={getRemoteEntityName(entity)} />
                                                    <span className="flex items-center align-middle ">
                                                        {entity.isActive ? <CheckCircle size="15" className="mr-3 text-green-600" /> : ""}
                                                    </span>
                                                </div>
                                            ))
                                    )
                                )}
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
);

export default EntityDialog;
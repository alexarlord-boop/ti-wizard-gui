import EntityDetails from "../../components/custom/EntityDetails.jsx";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export default function DetailsDialog(isEntityDetailsOpen, setIsEntityDetailsOpen, selectedEntity) {
    return (
        <Dialog open={isEntityDetailsOpen} onOpenChange={setIsEntityDetailsOpen}>
            <DialogTitle></DialogTitle>
            <DialogDescription></DialogDescription>
            <DialogContent className="max-w-[50%] p-10">
                {selectedEntity && <EntityDetails entity={selectedEntity}/>}
            </DialogContent>
        </Dialog>
    );
}
"use client"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"


const EntityNameWithTooltip = ({entityName}) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <span className="truncate">{entityName}</span>
                </TooltipTrigger>
                <TooltipContent side="top" align="center" className="bg-black text-white p-2 rounded">
                    {entityName}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default EntityNameWithTooltip;
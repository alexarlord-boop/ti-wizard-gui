import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "../ui/select.jsx";

export default function FederationSelect({items, onItemClick, activeEntitiesCount}) {
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
                            className="w-full align-baseline justify-between items-center" // updated className
                        >
                            <div className="inline justify-between">
                                {fed.name}
                            </div>
                            {activeEntitiesCount[fed.name.toLowerCase()] > 0 && (
                                <span className="float-end bg-green-500 text-white rounded-full px-2 py-0 text-xs ml-2">
                                    {activeEntitiesCount[fed.name.toLowerCase()] }
                                </span>
                            )}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}

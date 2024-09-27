import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "../ui/select.jsx";

export default function FederationSelect({items, onItemClick}) {
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
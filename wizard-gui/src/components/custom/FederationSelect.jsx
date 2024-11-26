import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "../ui/select.jsx";
import {Route} from "react-router-dom";
import FederationSelectionPage from "../../pages/FederationSelectionPage.jsx";

export default function FederationSelect({items, onItemClick, hostedEntitiesCount}) {
    return (
        <Select onValueChange={onItemClick}> {/* consumes value from select item */}
            <SelectTrigger>
                <SelectValue placeholder="Select a federation"/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {items.length > 0 ? items
                            // .sort((a, b) => hostedEntitiesCount[b.name.toLowerCase()] - hostedEntitiesCount[a.name.toLowerCase()])
                            .sort((a, b) => a.name.localeCompare(b.name)) // sort alphabetically
                            .map(fed => (
                                <SelectItem
                                    value={fed.name}
                                    key={fed.url}
                                    className="w-full cursor-pointer justify-between items-center" // updated className
                                >
                                    <div className="inline justify-between">
                                        {fed.name}
                                    </div>
                                    {hostedEntitiesCount[fed.name] > 0 && (
                                        <span className="bg-green-500 text-white rounded-full px-2 py-0 text-xs ml-2">
                                    {hostedEntitiesCount[fed.name]}
                                </span>
                                    )}
                                </SelectItem>
                            ))
                        :
                        <SelectItem value="No federations found" >
                            No federations found

                        </SelectItem>
                    }
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}

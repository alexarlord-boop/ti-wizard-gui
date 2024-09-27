import {Link} from "react-router-dom";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "../ui/card.jsx";
import {Avatar, AvatarFallback, AvatarImage} from "../ui/avatar.jsx";
import {Separator} from "@radix-ui/react-select";
import {Button} from "../ui/button.jsx";
import {Spinner} from "../ui/Loader.jsx"; // Assuming you're using React Router for routing


const EntityDetails = ({entity}) => {
    // Add a conditional check to make sure entity is defined
    if (!entity) {
        return <p>No entity data available.</p>;
    }

    console.log(entity);

    const {
        resourceName,
        resourceProvider,
        entityID,
        resourceContacts,
        logo,
    } = entity;

    return (
        <Card>
            <CardHeader>
                <h1 className="font-bold">{resourceName}</h1>
            </CardHeader>
            <CardContent>
                <p><strong>Entity ID:</strong> {entityID}</p>
                <p>
                    <strong>Provider Name:</strong>{' '}
                    {resourceProvider?.name?.en || 'Not available'}
                </p>
                <p>
                    <strong>Provider URL:</strong>{' '}
                    {resourceProvider?.url?.en || 'Not available'}
                </p>

                <h3>Contacts</h3>
                <p>
                    <strong>Technical:</strong> {resourceContacts?.technical?.name || 'N/A'} - {resourceContacts?.technical?.email || 'N/A'}
                </p>
                <p>
                    <strong>Support:</strong> {resourceContacts?.support?.name || 'N/A'} - {resourceContacts?.support?.email || 'N/A'}
                </p>
            </CardContent>
            <CardFooter className="flex mx-auto justify-center">
                <>
                    {logo ? (
                            <img src={logo} alt={`${resourceName}`} className="max-h-[100px] "/>
                        ) :
                        (
                            <Avatar className="scale-2">

                                <AvatarFallback>{resourceName?.[0] || 'E'}</AvatarFallback>

                            </Avatar>
                        )
                    }
                </>
            </CardFooter>
        </Card>
    );
};


export default EntityDetails;

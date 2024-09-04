import React, {useState} from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {cn} from "../../lib/utils.js";
import {Button} from "../ui/button.jsx";
import {Edit} from "lucide-react";
import RolePreviewDialog from "./RolePreviewDialog.jsx"; // Assuming you're using lucide-react for icons

export default function RoleCard({type, data}) {

    const [isActive, setActive] = React.useState(data[data.entityType].isActive);
    const handleAdd = () => {
        setActive(true);
    }

    const handleRemove = () => {
        setActive(false);
    }

    return (
        <>

            {/* Role Card */}

            <Card className={cn(isActive && "border border-black bg-accent")}>
                <CardHeader className={cn("text-left")}>
                    {isActive ? (
                        <CardTitle><RolePreviewDialog>{data.displayName}</RolePreviewDialog></CardTitle>
                    ) : (
                        <CardTitle>{data.displayName}</CardTitle>
                    )}
                    <CardDescription>{data.protocol}</CardDescription>
                </CardHeader>

                <CardContent>
                    <p>{data.entityId}</p>
                </CardContent>

                <CardFooter className={cn("flex justify-between")}>
                    {isActive ? (
                        <>
                            {/* Render remove button if card is active */}
                            <Button variant="destructive" onClick={() => handleRemove()}>Remove</Button>

                            {/* Render edit icon button if card is active */}
                            <Button variant="outline" size="icon" className="ml-2 p-2 bg-accent hover:bg-white">
                                <Edit className=""/>
                            </Button>
                        </>
                    ) : (

                        <Button onClick={() => handleAdd()}>Add</Button>

                    )}
                </CardFooter>
            </Card>
        </>
    );
}

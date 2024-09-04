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

export default function RoleCard({title, isActive}) {

    return (
        <>

            {/* Role Card */}

            <Card className={cn(isActive && "border border-black bg-accent")}>
                <CardHeader className={cn("text-left")}>
                    {isActive ? (
                        <CardTitle><RolePreviewDialog>{title}</RolePreviewDialog></CardTitle>
                    ) : (
                        <CardTitle>{title}</CardTitle>
                    )}
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>

                <CardContent>
                    <p>Card Content</p>
                </CardContent>

                <CardFooter className={cn("flex justify-between")}>
                    {isActive ? (
                        <>
                            {/* Render remove button if card is active */}
                            <Button variant="destructive">Remove</Button>

                            {/* Render edit icon button if card is active */}
                            <Button variant="ghost" className="ml-2 p-2">
                                <Edit className="h-4 w-4"/>
                            </Button>
                        </>
                    ) : (

                        <Button>Add</Button>

                    )}
                </CardFooter>
            </Card>
        </>
    );
}

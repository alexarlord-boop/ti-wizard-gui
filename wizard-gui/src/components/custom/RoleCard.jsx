import React, {useState} from "react";
import {
    Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card";
import {cn} from "../../lib/utils.js";
import {Button} from "../ui/button.jsx";
import {Edit} from "lucide-react";
import RolePreviewDialog from "./RolePreviewDialog.jsx";
import {useTranslation} from "react-i18next";
import {toast} from "sonner";
import { Badge } from "@/components/ui/badge"
import {ReloadIcon} from "@radix-ui/react-icons"; // Assuming you have a Spinner component

export default function RoleCard({data, entityType}) {
    const {t} = useTranslation();
    const [isActive, setActive] = useState(data[data.entityType].isActive);
    const [loading, setLoading] = useState(false); // New loading state

    function handleToggle(isActive) {
        setLoading(true);
        setTimeout(() => {
            const btnText = isActive ? "roles.card.removed" : "roles.card.added";
            setActive(isActive => !isActive);
            setLoading(false);
            toast(t(btnText),
                {
                    // description: "description description",
                    action: {
                        label: "OK",
                        onClick: () => console.log("OK"),
                    },
                }
            );
        }, 1500)
    }

    const handleAdd = () => {
        handleToggle(isActive);
    };

    const handleRemove = () => {
       handleToggle(isActive);
    };

    return (
        <Card className={cn(isActive && "border border-black bg-accent")}>
            <CardHeader className={cn("text-left")}>
                {isActive ? (
                    <>
                        <CardTitle>
                            <RolePreviewDialog>{data.displayName}</RolePreviewDialog>
                            <Badge variant="outline" className="border-black float-end">{entityType}</Badge>
                        </CardTitle>
                    </>
                ) : (
                    <>
                        <CardTitle>
                            {t('roles.card.resourceName')}
                            <Badge variant="outline" className="border-black float-end">{entityType}</Badge>
                        </CardTitle>
                    </>
                )}
            </CardHeader>

            {/*<CardContent>*/}
            {/*    {isActive ? <p>{data.entityId}</p> : <p>{t('roles.card.entityId')}</p>}*/}
            {/*</CardContent>*/}

            <CardFooter className={cn("flex justify-between")}>
                {loading ? (
                    <Button variant={isActive ? "destructive" : "default"} disabled>
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin"/>
                        {isActive ? "Removing role" : "Adding role"}
                    </Button>
                ) : isActive ? (
                    <>
                        <Button variant="destructive" onClick={handleRemove}>
                            {t('roles.cardBtn.delete')}
                        </Button>
                        <Button variant="outline" size="icon" className="ml-2 p-2 bg-accent hover:bg-white">
                            <Edit/>
                        </Button>
                    </>
                ) : (
                    <Button onClick={handleAdd}>{t('roles.cardBtn.create')}</Button>
                )}
            </CardFooter>
        </Card>
    );
}

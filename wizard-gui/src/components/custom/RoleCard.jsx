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
import RolePreviewDialog from "./RolePreviewDialog.jsx";
import {useTranslation} from "react-i18next";
import {toast} from "sonner"; // Assuming you're using lucide-react for icons

export default function RoleCard({type, data}) {
    const { t, i18n } = useTranslation();

    const [isActive, setActive] = React.useState(data[data.entityType].isActive);
    const handleAdd = () => {
        setTimeout(() => {
            setActive(true);
            toast("Role has been added.",
                {
                    // description: "description description",
                    action: {
                        label: "OK",
                        onClick: () => console.log("OK"),
                    },
                })
        }, 1000);

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
                        <>
                            <CardTitle><RolePreviewDialog>{data.displayName}</RolePreviewDialog></CardTitle>
                            <CardDescription>{data.protocol}</CardDescription>
                        </>
                    ) : (
                        <>
                            <CardTitle>{t('roles.card.displayName')}</CardTitle>
                            <CardDescription>{t('roles.card.protocol')}</CardDescription>

                        </>
                        
                    )}
                   
                </CardHeader>

                <CardContent>
                    {isActive ? (
                        <p>{data.entityId}</p>
                    ) : (
                        <p>{t('roles.card.entityId')}</p>
                    )}
                </CardContent>

                <CardFooter className={cn("flex justify-between")}>
                    {isActive ? (
                        <>
                            {/* Render remove button if card is active */}
                            <Button variant="destructive" onClick={() => handleRemove()}>{t('roles.cardBtn.delete')}</Button>

                            {/* Render edit icon button if card is active */}
                            <Button variant="outline" size="icon" className="ml-2 p-2 bg-accent hover:bg-white">
                                <Edit className=""/>
                            </Button>
                        </>
                    ) : (

                        <Button onClick={() => handleAdd()}>{t('roles.cardBtn.create')}</Button>

                    )}
                </CardFooter>
            </Card>
        </>
    );
}

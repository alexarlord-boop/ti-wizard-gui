import {Link, useNavigate, useParams} from "react-router-dom";
import Breadcrumbs from "../components/custom/Breadcrumbs.jsx";
import {Card, CardContent, CardFooter, CardHeader} from "../components/ui/card.jsx";
import {useTranslation} from "react-i18next";
import React from "react";


function RoleEditPage() {
    const { t, i18n } = useTranslation();
    let { entityType } = useParams();

    return (
        <>
            <Breadcrumbs itemList={[
                { path: '/', label: 'Home' },
                { path: '/roles', label: 'My Roles' },
                { path: '/roles', label: `Edit ${entityType}`}
            ]} />
            <br/>

            <h1 className="text-2xl font-bold">{t('roleEdit.header')}</h1>
            <p className="mt-4">{t('roleEdit.description')}</p>


        </>
    );
}


export default RoleEditPage;

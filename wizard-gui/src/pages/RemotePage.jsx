import {useEffect, useState} from "react";
import Breadcrumbs from "../components/custom/Breadcrumbs.jsx";
import {DataTable} from "./RemoteEntities/data-table.jsx";
import {columns} from './RemoteEntities/columns.jsx';
import {Button} from "../components/ui/button.jsx";
import usePageTour from "../hooks/usePageTour.jsx";
import {Link} from "react-router-dom";
import {entityTypes} from "../constants.js";

const steps = [
    {
        element: '#add-row',
        popover: {
            title: 'Add remote entities',
            description: "<img src='https://i.imgur.com/EAQhHu5.gif' style='height: 202.5px; width: 270px;' /><span style='font-size: 15px; display: block; margin-top: 10px; text-align: center;'>Yet another highlight example.</span>",

            side: 'left',
            align: 'start'
        }
    },

];

function RolesPage() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    usePageTour(steps);  // Use the custom hook with steps


    useEffect(() => {
        async function fetchData() {
            // Fetch data from your API here.
            const fetchedData = [
                {
                    id: "1",
                    role: "SAML IDP",
                    name: "eduGAIN",
                    status: "on"
                },
                {
                    id: "2",
                    role: "OIDC OP",
                    name: "Microsoft Azure AD",
                    status: "on"
                },
                {
                    id: "3",
                    role: "OIDC RP",
                    name: "ORCID",
                    status: "off"
                },
                {
                    id: "4",
                    role: "SAML SP",
                    name: "GEANT Cloud Services",
                    status: "off"
                },
                {
                    id: "1",
                    role: "SAML IDP",
                    name: "eduGAIN",
                    status: "on"
                },
                {
                    id: "2",
                    role: "OIDC OP",
                    name: "Microsoft Azure AD",
                    status: "on"
                },
                {
                    id: "3",
                    role: "OIDC RP",
                    name: "ORCID",
                    status: "off"
                },
                {
                    id: "4",
                    role: "SAML SP",
                    name: "GEANT Cloud Services",
                    status: "off"
                },
                {
                    id: "1",
                    role: "SAML IDP",
                    name: "eduGAIN",
                    status: "on"
                },
                {
                    id: "2",
                    role: "OIDC OP",
                    name: "Microsoft Azure AD",
                    status: "on"
                },
                {
                    id: "3",
                    role: "OIDC RP",
                    name: "ORCID",
                    status: "off"
                },
                {
                    id: "4",
                    role: "SAML SP",
                    name: "GEANT Cloud Services",
                    status: "off"
                },
            ];

            setData(fetchedData);
            setLoading(false);
        }

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Breadcrumbs
                itemList={[{path: '/', label: 'Home'}, {path: '/remotes-entities', label: 'Remote Entities'}]}/>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4" id="add-row">
                <Button variant=""><Link to={`/remote-entities/add/${entityTypes.saml_idp}`}> + IDP</Link></Button>
                <Button variant=""><Link to={`/remote-entities/add/${entityTypes.saml_sp}`}> + SP</Link></Button>
                <Button variant="outline"><Link to={`/remote-entities/add/${entityTypes.oidc_op}`}> + OP</Link></Button>
                <Button variant="outline"><Link to={`/remote-entities/add/${entityTypes.oidc_rp}`}> + RP</Link></Button>
            </div>
            <br/>

            <DataTable columns={columns} data={data}/>
        </>
    );
}

export default RolesPage;

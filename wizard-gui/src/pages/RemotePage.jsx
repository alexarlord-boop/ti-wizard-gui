import { useEffect, useState } from "react";
import Breadcrumbs from "../components/custom/Breadcrumbs.jsx";
import { DataTable } from "./RemoteEntities/data-table.jsx";
import { columns } from './RemoteEntities/columns.jsx';
import {Button} from "../components/ui/button.jsx";

function RolesPage() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            // Fetch data from your API here.
            const fetchedData = [
                {
                    id: "1",
                    role: "SAML IDP",
                    name: "eduGAIN",
                    status: "active"
                },
                {
                    id: "2",
                    role: "OIDC OP",
                    name: "Microsoft Azure AD",
                    status: "active"
                },
                {
                    id: "3",
                    role: "OIDC RP",
                    name: "ORCID",
                    status: "inactive"
                },
                {
                    id: "4",
                    role: "SAML SP",
                    name: "GEANT Cloud Services",
                    status: "inactive"
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
            <Breadcrumbs itemList={[{path: '/', label: 'Home'}, { path: '/remotes-entities', label: 'Remote Entities' }]} />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Button variant="">+ IDP</Button>
                <Button variant="">+ SP</Button>
                <Button variant="outline">+ OP</Button>
                <Button variant="outline">+ RP</Button>
            </div>
            <br/>

            <DataTable columns={columns} data={data} />
        </>
    );
}

export default RolesPage;

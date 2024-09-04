import Breadcrumbs from "../components/custom/Breadcrumbs.jsx";


function RolesPage() {
    return (
        <>
            <Breadcrumbs itemList={[{path: '/remotes-entities', label: 'Remote Entities'}]}/>

            <h1 className="text-2xl font-bold">Welcome to the Remote Entity Page</h1>
        </>
    );
}

export default RolesPage;

import Breadcrumbs from "../components/custom/Breadcrumbs.jsx";


function HomePage() {
    return (
        <>
            <Breadcrumbs/>

            <h1 className="text-2xl font-bold">Welcome to the Home Page</h1>
            <p className="mt-4">This is the main content area of the homepage.</p>
        </>
    );
}

export default HomePage;

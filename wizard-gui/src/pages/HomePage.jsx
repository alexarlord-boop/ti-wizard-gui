import {Link, useNavigate} from "react-router-dom";
import Breadcrumbs from "../components/custom/Breadcrumbs.jsx";
import {Card, CardContent, CardFooter, CardHeader} from "../components/ui/card.jsx";


function HomePage() {
    return (
        <>
            <Breadcrumbs/>

            <h1 className="text-2xl font-bold">Welcome to the Home Page</h1>
            <p className="mt-4">This is the main content area of the homepage.</p>
            <br/>
            <br/>
            <div className=" grid  md:grid-cols-4 gap-10 h-[300px]">
                <CCard href='/roles' title="My Roles"/>
                <CCard href='/remote-entities' title="Remote Entities"/>
                <CCard href='' title='Metadata Sources'/>
                <CCard href='' title='Proxy'/>

            </div>
        </>
    );
}

const CCard = ({href, title}) => {
    const navigate = useNavigate();
    return (
        <Card className="cursor-pointer bg-black text-white hover:scale-105 transition duration-200"
        onClick={()=>navigate(href)}
        >
            <CardHeader className="text-2xl"></CardHeader>
            <CardHeader className="text-2xl">{title}</CardHeader>
            <CardContent>
                Content
            </CardContent>
            <CardFooter className=""></CardFooter>
        </Card>

    );
}

export default HomePage;

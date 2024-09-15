import {Link, useNavigate} from "react-router-dom";
import Breadcrumbs from "../components/custom/Breadcrumbs.jsx";
import {Card, CardContent, CardFooter, CardHeader} from "../components/ui/card.jsx";
import {useTranslation} from "react-i18next";
import {driver} from "driver.js";
import "driver.js/dist/driver.css";
import {useTour} from "../components/context/TourContext.jsx";
import {useEffect} from "react";
import usePageTour from "../hooks/usePageTour.jsx";


const steps = [
    {
        element: '#navbar',
        popover: {
            title: 'Navigation Bar',
            description: 'The navigation bar contains links to all key sections of the site, including settings and main application components. This is your main access point for navigating through different configurations and settings.',
            side: 'left',
            align: 'start'
        }
    },
    {
        element: '#home-cards',
        popover: {
            title: 'Home Cards Overview',
            description: 'These cards provide quick access to different functionalities and settings of your instance. You can manage roles, remote entities, sources, and proxy configurations directly from here.',
            side: 'left',
            align: 'start'
        }
    },
    {
        element: '#roles',
        popover: {
            title: 'My Roles',
            description: 'This section allows you to configure the deployment identity by adding roles such as SAML IdP, OIDC OP, SAML SP, or OIDC RP. You can set a Display Name and Logo for each role and configure additional settings based on the selected role.',
            side: 'left',
            align: 'start'
        }
    },
    {
        element: '#remotes',
        popover: {
            title: 'Remote Entities',
            description: 'Manage and add metadata for remote entities that your deployment should trust. Depending on the configured roles, you can add metadata for SAML SPs, OIDC OPs, or other entities from files or URLs, and configure redirect URIs for OIDC clients.',
            side: 'left',
            align: 'start'
        }
    },
    {
        element: '#sources',
        popover: {
            title: 'Sources',
            description: 'Here you can add and manage data sources such as MDQ sources. This allows your instance to trust and retrieve data from specified sources. Future versions may include additional features for managing advanced data sources.',
            side: 'left',
            align: 'start'
        }
    },
    {
        element: '#proxy',
        popover: {
            title: 'Proxy Settings',
            description: 'Configure proxy settings if you have at least one SAML IdP or OIDC OP role and one SAML SP or OIDC RP role. You can set up identity and profile attribute mappings, allowing your instance to act as a proxy between different roles and federations.',
            side: 'left',
            align: 'start'
        }
    },
];


function HomePage() {
    const {t, i18n} = useTranslation();
    const {setStartTour} = useTour();

    usePageTour(steps);  // Use the custom hook with steps


    return (
        <>
            <Breadcrumbs/>
            <br/>

            <h1 className="text-2xl font-bold">{t('home.header')}</h1>
            <p className="mt-4">{t('home.description')}</p>
            <br/>
            <br/>
            <div className=" grid  md:grid-cols-4 gap-10 h-[300px]" id="home-cards">
                <CCard className="rolecard" href='/roles' title={t('home.roleCard.title')}
                       content={t('home.roleCard.content')} id="roles"/>
                <CCard className="rolecard" href='/remote-entities' title={t('home.remoteCard.title')}
                       content={t('home.remoteCard.content')} id="remotes"/>
                <CCard className="rolecard" href='' title={t('home.sourceCard.title')}
                       content={t('home.sourceCard.content')} id="sources"/>
                <CCard className="rolecard" href='' title={t('home.proxyCard.title')}
                       content={t('home.proxyCard.content')} id="proxy"/>
            </div>
        </>
    );
}

const CCard = ({href, title, content, id}) => {
    const navigate = useNavigate();
    return (
        <Card className="cursor-pointer bg-black text-white hover:scale-105 transition duration-200"
              onClick={() => navigate(href)}
              id={id}
        >
            <CardHeader className="text-2xl"></CardHeader>
            <CardHeader className="text-2xl">{title}</CardHeader>
            <CardContent>
                {content}
            </CardContent>
            <CardFooter className=""></CardFooter>
        </Card>

    );
}

export default HomePage;

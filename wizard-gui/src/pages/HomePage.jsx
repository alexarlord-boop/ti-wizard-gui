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
        popover: {title: 'Navigation', description: 'Here are the cards for navigation.', side: "left", align: 'start'}
    },
    {
        element: '#home-cards',
        popover: {title: 'Home Cards', description: 'Here are the cards for navigation.', side: "left", align: 'start'}
    },
    {
        element: '#roles',
        popover: {title: 'Home Cards', description: 'Here are the cards for navigation.', side: "left", align: 'start'}
    },
    {
        element: '#remotes',
        popover: {title: 'Home Cards', description: 'Here are the cards for navigation.', side: "left", align: 'start'}
    },
    {
        element: '#sources',
        popover: {title: 'Home Cards', description: 'Here are the cards for navigation.', side: "left", align: 'start'}
    },
    {
        element: '#proxy',
        popover: {title: 'Home Cards', description: 'Here are the cards for navigation.', side: "left", align: 'start'}
    },
    // Add more steps as needed
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

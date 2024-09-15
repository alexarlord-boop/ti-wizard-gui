import {Link, useNavigate} from "react-router-dom";
import Breadcrumbs from "../components/custom/Breadcrumbs.jsx";
import {Card, CardContent, CardFooter, CardHeader} from "../components/ui/card.jsx";
import {useTranslation} from "react-i18next";


function HomePage() {
    const { t, i18n } = useTranslation();

    return (
        <>
            <Breadcrumbs/>
            <br/>

            <h1 className="text-2xl font-bold">{t('home.header')}</h1>
            <p className="mt-4">{t('home.description')}</p>
            <br/>
            <br/>
            <div className=" grid  md:grid-cols-4 gap-10 h-[300px]">
                <CCard href='/roles' title={t('home.roleCard.title')} content={t('home.roleCard.content')}/>
                <CCard href='/remote-entities' title={t('home.remoteCard.title')} content={t('home.remoteCard.content')}/>
                <CCard href='' title={t('home.sourceCard.title')} content={t('home.sourceCard.content')}/>
                <CCard href='' title={t('home.proxyCard.title')} content={t('home.proxyCard.content')}/>
            </div>
        </>
    );
}

const CCard = ({href, title, content}) => {
    const navigate = useNavigate();
    return (
        <Card className="cursor-pointer bg-black text-white hover:scale-105 transition duration-200"
        onClick={()=>navigate(href)}
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

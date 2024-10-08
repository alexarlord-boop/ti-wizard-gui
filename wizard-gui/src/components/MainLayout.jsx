import NavBar from "./custom/NavBar.jsx";
import {TourProvider} from "./context/TourContext.jsx";
import {SiteFooter} from "./custom/Footer.jsx";


export default function MainLayout({children}) {
    return (
        <TourProvider>
            <NavBar/>
            <main className=" container mx-auto p-4">
                {children}
            </main>
           <SiteFooter/>
        </TourProvider>

    )
}
import NavBar from "./custom/NavBar.jsx";
import {TourProvider} from "./context/TourContext.jsx";


export default function MainLayout({children}) {
    return (
        <TourProvider>
            <NavBar/>
            <main className=" container mx-auto p-4">
                {children}
            </main>
        </TourProvider>

    )
}
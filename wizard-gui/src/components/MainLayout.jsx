import NavBar from "./custom/NavBar.jsx";


export default function MainLayout({children}) {
    return (
        <>
            <NavBar/>
            <main className="flex-grow container mx-auto p-4">
                {children}
            </main>

        </>

    )
}
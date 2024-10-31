// components/custom/ProfileDropdown.jsx
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {useTour} from '../context/TourContext';
import {useTranslation} from 'react-i18next';
import {EnterIcon, ExitIcon, GearIcon, PersonIcon} from "@radix-ui/react-icons";
import {toast} from "sonner";
import PrivateComponent from "./PrivateComponent.jsx";
import PrivateRoute from "./PrivteRoute.jsx";

export default function ProfileDropdown({children}) {
    const {t} = useTranslation();
    const {startTour, setStartTour} = useTour();

    const handleTour = () => {
        if (startTour) {
            startTour();  // Trigger the tour for the current page
        } else {
            console.log("No tour is set for this page");
            toast.error('No tour is set for this page');
        }
    };

    const handleLogin = () => {
        window.location.href = '/login';
    }

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none flex items-center">
                <PersonIcon className="h-5 w-5 mr-2 bg-gray-100 rounded-full"/>
                {localStorage.getItem('access_token') !== null && localStorage.getItem('username')}


            </DropdownMenuTrigger>

            <DropdownMenuContent className="mt-2 w-48 bg-white rounded-md shadow-lg">
                <PrivateComponent>
                    <DropdownMenuItem className="hover:bg-gray-100">
                        <a href="/profile" className="flex items-center w-full text-gray-700">
                            <GearIcon className="mr-2"/>
                            Settings
                        </a>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator/>
                </PrivateComponent>


                <DropdownMenuItem onClick={handleTour}>{t('navbar.startTour')}</DropdownMenuItem>
                <PrivateComponent> <DropdownMenuItem>{t('navbar.logs')}</DropdownMenuItem></PrivateComponent>
                <PrivateComponent><DropdownMenuItem>{t('navbar.cronTab')}</DropdownMenuItem></PrivateComponent>

                <DropdownMenuSeparator/>

                <PrivateComponent fallback={
                    <DropdownMenuItem className="hover:bg-red-100 text-green-700" onClick={handleLogin}>
                        <EnterIcon className="mr-2"/>
                        Login
                    </DropdownMenuItem>
                }>
                    <DropdownMenuItem className="hover:bg-red-100 text-red-700" onClick={handleLogout}>
                        <ExitIcon className="mr-2"/>
                        Logout
                    </DropdownMenuItem>
                </PrivateComponent>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

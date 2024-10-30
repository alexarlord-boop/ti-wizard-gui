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
import {ExitIcon, GearIcon, PersonIcon} from "@radix-ui/react-icons";
import {useState} from "react";

export default function ProfileDropdown({children}) {
    const {t} = useTranslation();
    const {startTour, setStartTour} = useTour();

    const handleTour = () => {
        if (startTour) {
            startTour();  // Trigger the tour for the current page
        } else {
            console.log("No tour is set for this page");
        }
    };

    // return (
    //     <DropdownMenu>
    //         <DropdownMenuTrigger className="focus:outline-none">{children}</DropdownMenuTrigger>
    //         <DropdownMenuContent>
    //             <DropdownMenuSeparator />
    //             <DropdownMenuItem className="bg-green-100" onClick={handleTour}>{t('navbar.startTour')}</DropdownMenuItem>
    //             <DropdownMenuItem>{t('navbar.logs')}</DropdownMenuItem>
    //             <DropdownMenuItem>{t('navbar.cronTab')}</DropdownMenuItem>
    //             <DropdownMenuItem>{t('navbar.contactDetails')}</DropdownMenuItem>
    //         </DropdownMenuContent>
    //     </DropdownMenu>
    // );

    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        // Implement your logout logic here
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        // Optionally redirect the user to the login page
        window.location.href = '/login';
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none flex items-center">
                <PersonIcon className="h-5 w-5 mr-2"/>
                {/*{children}*/}
                { localStorage.getItem('username') }


            </DropdownMenuTrigger>

            <DropdownMenuContent className="mt-2 w-48 bg-white rounded-md shadow-lg">
                <DropdownMenuItem className="hover:bg-gray-100">
                    <a href="/profile" className="flex items-center w-full text-gray-700">
                        <GearIcon className="mr-2"/>
                        Settings
                    </a>
                </DropdownMenuItem>

                <DropdownMenuSeparator/>
                <DropdownMenuItem onClick={handleTour}>{t('navbar.startTour')}</DropdownMenuItem>
                <DropdownMenuItem>{t('navbar.logs')}</DropdownMenuItem>
                <DropdownMenuItem>{t('navbar.cronTab')}</DropdownMenuItem>


                <DropdownMenuSeparator/>

                <DropdownMenuItem className="hover:bg-red-100 text-red-700" onClick={handleLogout}>
                    <ExitIcon className="mr-2"/>
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

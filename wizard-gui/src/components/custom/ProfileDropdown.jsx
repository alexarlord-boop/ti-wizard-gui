// components/custom/ProfileDropdown.jsx
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTour } from '../context/TourContext';
import { useTranslation } from 'react-i18next';

export default function ProfileDropdown({ children }) {
    const { t } = useTranslation();
    const { startTour, setStartTour } = useTour();

    const handleTour = () => {
        if (startTour) {
            console.log("Tour is being triggered");  // Add this log for debugging
            startTour();  // Trigger the tour for the current page
        } else {
            console.log("No tour is set for this page");
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">{children}</DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleTour}>{t('navbar.startTour')}</DropdownMenuItem>
                <DropdownMenuItem>{t('navbar.logs')}</DropdownMenuItem>
                <DropdownMenuItem>{t('navbar.cronTab')}</DropdownMenuItem>
                <DropdownMenuItem>{t('navbar.contactDetails')}</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

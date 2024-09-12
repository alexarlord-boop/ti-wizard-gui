import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export default function ProfileDropdown({children}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">{children}</DropdownMenuTrigger>
            <DropdownMenuContent>
                {/*<DropdownMenuLabel><GearIcon/> Settings</DropdownMenuLabel>*/}
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>

    );
}
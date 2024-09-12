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
                <DropdownMenuItem>Dashboard</DropdownMenuItem>
                <DropdownMenuItem>Logs</DropdownMenuItem>
                <DropdownMenuItem>Cron Tab</DropdownMenuItem>
                <DropdownMenuItem>Contact details</DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>

    );
}
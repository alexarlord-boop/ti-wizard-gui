import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import React from "react";
import {cn} from "../../lib/utils.js";
import {NavigationMenuLinkItem} from "../ui/navigation-menu.jsx";
import ProfileDropdown from "./ProfileDropdown.jsx";
import {GearIcon} from "@radix-ui/react-icons";

export default function NavBar() {

    return (
        <NavigationMenu id="navbar">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuLinkItem href="/">Home</NavigationMenuLinkItem>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuLinkItem href="/roles">My Roles</NavigationMenuLinkItem>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuLinkItem href="/remote-entities">Remote Entities</NavigationMenuLinkItem>
                    {/*<NavigationMenuContent>*/}
                    {/*    <NavigationMenuLink>Content</NavigationMenuLink>*/}
                    {/*</NavigationMenuContent>*/}
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuTrigger>Sources</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="text-left grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                            <ListItem href="/sources/federations" title="National Federations">
                                Registration Authorities (RAs)
                            </ListItem>
                            {/*<ListItem href="/source/xml" title="+ MDX Source">*/}
                            {/*    Remote XML file for SAML*/}
                            {/*</ListItem>*/}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                <NavigationMenuTrigger>Proxy configuration</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="text-left grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                            <li className="row-span-3">
                                <NavigationMenuLink asChild>
                                    <a
                                        className="flex h-full w-full select-none flex-col rounded-md bg-gradient-to-b from-muted/50 to-muted p-4 no-underline outline-none focus:shadow-md"
                                        href="/roles"
                                    >
                                        <div className="mb-2 text-lg font-medium">
                                            Feature is not available
                                        </div>
                                        <p className="text-sm leading-tight text-muted-foreground ">
                                            One IdP / OP and one SP / RP roles are required in "My Roles"
                                        </p>
                                    </a>
                                </NavigationMenuLink>
                            </li>
                            <ListItem href="/proxy/attributes" title="Attribute mappings" disabled>
                                Setup attribute translations.
                            </ListItem>
                            <ListItem href="/proxy/visualisation" title="Visualisation" disabled>
                                Preview the graph of current connections
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

            </NavigationMenuList>

            <div className="flex">
                <ProfileDropdown>Settings</ProfileDropdown>
            </div>

        </NavigationMenu>

    );
}

const ListItem = React.forwardRef(({ className, title, children, disabled, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
                        disabled
                            ? "bg-gray-200 text-gray-500 cursor-not-allowed"  // Styles when disabled
                            : "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",  // Styles when not disabled
                        className
                    )}
                    {...props}
                    onClick={disabled ? (e) => e.preventDefault() : undefined}  // Prevent click if disabled
                    aria-disabled={disabled}  // Accessibility for screen readers
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    );
});

ListItem.displayName = "ListItem";

// components/custom/NotificationCenter.jsx
import React, { useEffect, useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { BellIcon } from "@radix-ui/react-icons";
import axios from 'axios';
import apiClient from "../../api/client.js";
import {useQuery} from "react-query";


const fetchNotifications = async () => {
    const response = await apiClient.get('/entities/updated/', {
        params: {
            // polling_frequency: 5,
        },
    });
    return response.data;
};


export default function NotificationCenter() {
    const { data: notifications = [], error } = useQuery(['notifications'], fetchNotifications, {
        refetchInterval: 1000,
    });

    if (error) {
        console.error('Error fetching notifications:', error);
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none flex items-center">
                <BellIcon className="" />
                {notifications.length > 0 && <span className="text-black mr-0  ">{notifications.length}</span>}
            </DropdownMenuTrigger>

            <DropdownMenuContent className="mt-2 w-80 bg-white rounded-md shadow-lg">
                {notifications.length === 0 ? (
                    <DropdownMenuItem className="text-gray-700">No notifications for the past 5 min</DropdownMenuItem>
                ) : (
                    notifications.map(notification => (
                        <DropdownMenuItem key={notification.timestamp} className="text-gray-700">
                            <>
                                <p ><a href="#" className="font-bold hover:underline">{notification.remote_entity.resource_name}</a> updated</p>
                                <p className="text-xs float-end">{new Date(notification.timestamp).toLocaleString()}</p>

                            </>
                        </DropdownMenuItem>
                    ))
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
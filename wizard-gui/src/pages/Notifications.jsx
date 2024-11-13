import apiClient from "../api/client.js";
import {useLogsQuery} from "../hooks/useLogsQuery.jsx";
import {ScrollArea} from "../components/ui/scroll-area.jsx";
import {useEffect, useState} from "react";

export default function NotificationsPage() {


    const [messages, setMessages] = useState([]);



    return (
        <div>
            <h2>Notifications</h2>

        </div>
    );
}
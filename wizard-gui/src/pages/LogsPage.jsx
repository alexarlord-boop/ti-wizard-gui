import apiClient from "../api/client.js";
import {useLogsQuery} from "../hooks/useLogsQuery.jsx";
import {ScrollArea} from "../components/ui/scroll-area.jsx";

export default function LogsPage() {

    const {status, data: logs} = useLogsQuery();
    const bgColorOnStatus = (status) => {
    //     color different types of statuses
        console.log(status / 100 % 100);
        if (status === 200) {
            return 'bg-green-50';
        } else if (Math.floor(status / 100) === 4  || Math.floor(status / 100) === 5) {
            return 'bg-red-50';
        } else {
            return '';
        }
    }


    return (
        <div>
            {status === "loading" && <div>Loading...</div>}
            {status === "error" && <div>Error fetching logs</div>}
            {/*logs show in reverse order*/}


           <ScrollArea className="h-[70vh]">
               {status === "success" && logs && logs.slice().reverse().map((log, index) => {
                   const formattedTime = new Date(log.time).toLocaleString();
                   return (
                       <div key={log.time} className={`grid-container grid grid-cols-12 border-2 border-white hover:border-2 hover:border-black ${bgColorOnStatus(log.status)}`}>
                           <p className="text-left col-span-2">{log.user ? log.user : "---"}</p>
                           <p className="text-left col-span-4">{formattedTime}</p>
                           <p className="text-left col-span-5">{log.path ? log.path : log.message}</p>
                           <p className="text-left col-span-1">{log.status ? log.status : "---"}</p>
                       </div>
                   );
               })}
           </ScrollArea>
        </div>
    );
}
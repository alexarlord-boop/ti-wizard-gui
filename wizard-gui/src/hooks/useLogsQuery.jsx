import {useQuery} from "react-query";
import {logsApi} from "../api/index.js";

export const useLogsQuery = () =>
    useQuery({
        queryKey: 'logs',
        queryFn: logsApi.list,
    })


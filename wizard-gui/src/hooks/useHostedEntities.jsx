import {useQuery} from "react-query";
import {remoteEntitiesApi} from "../api/index.js";


export const useHostedEntitiesQuery = () => useQuery(
    {
        queryKey: ['entities'],
        queryFn: () => remoteEntitiesApi.list(),
    }
);
import {useQuery} from "react-query";
import {remoteEntitiesApi} from "../api/index.js";


export const useEntitiesQuery = (federation, entityType) => useQuery(
    {
        queryKey: ['entities', federation, entityType],
        queryFn: () => remoteEntitiesApi.list_all(federation, entityType),
    }
);
import {useQuery} from "react-query";
import {rolesApi} from "../api/index.js";

export const useRolesQuery = () =>
    useQuery({
        queryKey: 'roles',
        queryFn: rolesApi.list,
    })


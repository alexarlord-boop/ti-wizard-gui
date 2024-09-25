import {useMutation, useQueryClient} from "react-query";
import {rolesApi} from "../api/index.js";


export const useUpdateRoleMutation = () => {
    const queryClient = useQueryClient();
    return useMutation(
        ({entityType, status}) => rolesApi.update({entityType, status}),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('roles');
            }
        }
    )
}
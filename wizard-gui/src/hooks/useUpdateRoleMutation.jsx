import {useMutation, useQueryClient} from "react-query";
import {rolesApi} from "../api/index.js";


export const useUpdateRoleMutation = () => {
    const queryClient = useQueryClient();
    return useMutation(
        ({entityType, isActive, displayName, imageUrl}) => rolesApi.update({entityType, isActive, displayName, imageUrl}),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('roles');
            }
        }
    )
}
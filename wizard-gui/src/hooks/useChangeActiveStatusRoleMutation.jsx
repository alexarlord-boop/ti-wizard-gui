import {useMutation, useQueryClient} from "react-query";
import {rolesApi} from "../api/index.js";


export const useChangeActiveStatusRoleMutation = () => {
    const queryClient = useQueryClient();
    return useMutation(
        ({role_id, entity_name, is_active}) => rolesApi.activate({role_id, entity_name, is_active}),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('roles');
            }
        }
    )
}
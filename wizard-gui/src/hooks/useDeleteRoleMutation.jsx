import {useMutation, useQueryClient} from "react-query";
import {rolesApi} from "../api/index.js";


export const useDeleteRoleMutation = () => {
    const queryClient = useQueryClient();
    return useMutation(
        ({role_id}) => rolesApi.delete({role_id}),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('roles');
            }
        }
    )
}
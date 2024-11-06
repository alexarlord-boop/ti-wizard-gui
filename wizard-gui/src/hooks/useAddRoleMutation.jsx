import {useMutation, useQueryClient} from "react-query";
import {rolesApi} from "../api/index.js";


export const useAddRoleMutation = () => {
    const queryClient = useQueryClient();
    return useMutation(
        ({entity_type, is_active, display_name, logo_image}) => rolesApi.add({entity_type, is_active, display_name, logo_image}),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('roles');
            }
        }
    )
}
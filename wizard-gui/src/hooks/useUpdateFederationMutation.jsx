import {useMutation, useQueryClient} from "react-query";
import {federationsApi} from "../api/index.js";
import {toast} from "sonner";


export const useUpdateFederationMutation = () => {
    const queryClient = useQueryClient();
    return useMutation(
        ({id, status, url}) => federationsApi.update({id, status, url}),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('federations');
            }
        }
    )
}
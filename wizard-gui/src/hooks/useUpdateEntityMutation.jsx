import {useMutation, useQueryClient} from "react-query";
import {remoteEntitiesApi} from "../api/index.js";


export const useUpdateEntityMutation = () => {
    const queryClient = useQueryClient();
    return useMutation(
        ({id, status}) => remoteEntitiesApi.update({id, status}),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('entities');
            }
        }
    )
}
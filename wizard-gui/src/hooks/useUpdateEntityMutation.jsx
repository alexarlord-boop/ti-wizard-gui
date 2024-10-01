import {useMutation, useQueryClient} from "react-query";
import {remoteEntitiesApi} from "../api/index.js";


export const useUpdateEntityMutation = () => {
    const queryClient = useQueryClient();
    return useMutation(
        ({entity, status}) => remoteEntitiesApi.update(entity, status),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('entities');
            }
        }
    )
}
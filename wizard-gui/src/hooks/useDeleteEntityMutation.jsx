import {useMutation, useQueryClient} from "react-query";
import {remoteEntitiesApi} from "../api/index.js";


export const useDeleteEntityMutation = () => {
    const queryClient = useQueryClient();
    return useMutation(
        ({id}) => remoteEntitiesApi.delete({id}),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('entities');
            }
        }
    )
}
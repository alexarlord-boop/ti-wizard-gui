import {useMutation, useQueryClient} from "react-query";
import {remoteEntitiesApi} from "../api/index.js";


export const useCreateEntityMutation = () => {
    const queryClient = useQueryClient();
    return useMutation(
        ({resource_name, entity_type, is_active, published_in, entity_id, internal_id, resource_provider}) => remoteEntitiesApi.add({resource_name, entity_type, is_active, published_in, entity_id, internal_id, resource_provider}),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('entities');
            }
        }
    )
}
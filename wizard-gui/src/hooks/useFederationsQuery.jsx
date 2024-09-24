import {useQuery} from "react-query";
import {federationsApi} from "../api/index.js";

export const useFederationsQuery = () =>
    useQuery({
        queryKey: 'federations',
        queryFn: federationsApi.list,
    })


// {
// const { t } = useTranslation();
// const { data, error, isLoading } = useQuery('federations', async () => {
//     const response = await fetch(`${process.env.REACT_APP_API_URL}/federations`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//         }
//     });
//     if (!response.ok) {
//         throw new Error(t('errors.fetchFederations'));
//     }
//     return response.json();
// });
// return { data, error, isLoading };
// return { data: null, error: null, isLoading: false };
// }
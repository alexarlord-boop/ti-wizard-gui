// src/services/roleService.js
import roleIdpData from '../assets/json-mock/roles/role_idp.json';
import roleSpData from '../assets/json-mock/roles/role_sp.json';
import roleOpData from '../assets/json-mock/roles/role_op.json';
import roleRpData from '../assets/json-mock/roles/role_rp.json';

const mockData = [
    {type: 'SAML_IDP', data: roleIdpData},
    {type: 'SAML_SP', data: roleSpData},
    {type: 'OIDC_OP', data: roleOpData},
    {type: 'OIDC_RP', data: roleRpData},
    // Add other mock data sources here if needed
];

export const getRolesData = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                if (process.env.NODE_ENV === 'development') {
                    resolve(mockData); // Return mock data in development mode
                } else {
                    // Simulate an API call here if needed for production
                    resolve(mockData); // For now, just returning mock data
                }
            } catch (error) {
                console.error('Failed to fetch role data:', error);
                reject(null); // Reject the promise if there's an error
            }
        }, 1000); // Simulate a 1-second delay
    });
};

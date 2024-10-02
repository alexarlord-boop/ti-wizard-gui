import roleIdpData from '../assets/json-mock/roles/role_idp.json';
import roleSpData from '../assets/json-mock/roles/role_sp.json';
import roleOpData from '../assets/json-mock/roles/role_op.json';
import roleRpData from '../assets/json-mock/roles/role_rp.json';

export const federationsApi = {
    async list() {
        const response = await fetch('https://md.tiw.incubator.geant.org/md/ra.json');

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // make a delay to simulate a network request
        await new Promise(resolve => setTimeout(resolve, 500));
        const data = await response.json();

        // Ensure data is an array
        return data ? Object.entries(data).map(([url, details]) => ({
            url,
            isActive: JSON.parse(localStorage.getItem('activeFederations') || '[]').includes(url),
            ...details
        })) : [];
    },


    async update({id, status}) {
        await new Promise(resolve => setTimeout(resolve, 300));

        // Update localStorage
        const activeFederations = JSON.parse(localStorage.getItem('activeFederations') || '[]');
        if (status) {
            activeFederations.push(id);
        } else {
            const index = activeFederations.indexOf(id);
            if (index > -1) {
                activeFederations.splice(index, 1);
            }
        }
        localStorage.setItem('activeFederations', JSON.stringify(activeFederations));
    }
}

export const rolesApi = {

    list() {
        const activeRoles = JSON.parse(localStorage.getItem('activeRoles') || '[]');

        return [
            {type: 'SAML_IDP', data: roleIdpData, isActive: activeRoles.includes("SAML_IDP")},
            {type: 'SAML_SP', data: roleSpData, isActive: activeRoles.includes("SAML_SP")},
            {type: 'OIDC_OP', data: roleOpData, isActive: activeRoles.includes("OIDC_OP")},
            {type: 'OIDC_RP', data: roleRpData, isActive: activeRoles.includes("OIDC_RP")},
        ];

    },
    update({entityType, status}) {
        // update activeRoles depending on role type
        const activeRoles = JSON.parse(localStorage.getItem('activeRoles') || '[]');
        if (status) {
            activeRoles.push(entityType);
        } else {
            const index = activeRoles.indexOf(entityType);
            if (index > -1) {
                activeRoles.splice(index, 1);
            }
        }
        localStorage.setItem('activeRoles', JSON.stringify(activeRoles));

    }
}

export const remoteEntitiesApi = {
    async list(federation, entityType) {
        const response = await fetch(`https://md.tiw.incubator.geant.org/md/fed/${federation.toLowerCase()}/${entityType.toLowerCase()}.json`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        await new Promise(resolve => setTimeout(resolve, 500));
        const data = await response.json();
        const activeEntities = JSON.parse(localStorage.getItem('activeEntities') || '[]');
        return data ? Object.entries(data).map(([id, details]) => {
            const isActive = activeEntities.some(activeEntity => activeEntity.id === details.id);
            return {
                id,
                isActive,
                entityType,
                ...details
            };
        }) : [];
    },

    async update(entity, status) {
        await new Promise(resolve => setTimeout(resolve, 300));

        const activeEntities = JSON.parse(localStorage.getItem('activeEntities') || '[]');

        if (status && !activeEntities.some(activeEntity => activeEntity.id === entity.id)) {
            activeEntities.push(entity);
        } else {
            const index = activeEntities.findIndex(activeEntity => activeEntity.id === entity.id);
            if (index > -1) {
                activeEntities.splice(index, 1);
            }
        }
        localStorage.setItem('activeEntities', JSON.stringify(activeEntities));
    }
}
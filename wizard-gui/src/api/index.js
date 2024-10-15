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

    defaultRoles: [
        {entityType: 'SAML_IDP', isActive: false, displayName: '', imageUrl: ''},
        {entityType: 'SAML_SP', isActive: false, displayName: '', imageUrl: ''},
        {entityType: 'OIDC_OP', isActive: false, displayName: '', imageUrl: ''},
        {entityType: 'OIDC_RP', isActive: false, displayName: '', imageUrl: ''}
    ],

    initializeRoles() {
        if (!localStorage.getItem('roles')) {
            localStorage.setItem('roles', JSON.stringify(this.defaultRoles));
        }
    },

    list: () => {
        rolesApi.initializeRoles();
        const roles = JSON.parse(localStorage.getItem('roles') || '[]');
        return roles;
    },

    update({entityType, isActive, displayName, imageUrl}) {
        console.log(displayName);
        const roles = JSON.parse(localStorage.getItem('roles') || '[]');
        const roleIndex = roles.findIndex(role => role.entityType === entityType);

        if (roleIndex > -1) {
            roles[roleIndex] = {entityType, isActive, displayName, imageUrl};
        } else {
            roles.push({entityType, isActive, displayName, imageUrl});
        }

        localStorage.setItem('roles', JSON.stringify(roles));
    },

    delete(entityType) {
        let roles = JSON.parse(localStorage.getItem('roles') || '[]');
        roles = roles.filter(role => role.entityType !== entityType);
        localStorage.setItem('roles', JSON.stringify(roles));
    }
}

export const remoteEntitiesApi = {
    async list(federation, entityType) {
        if (federation && entityType) {
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
        }
        return [];
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
    },

    delete(id) {
        let activeEntities = JSON.parse(localStorage.getItem('activeEntities') || '[]');
        activeEntities = activeEntities.filter(activeEntity => activeEntity.id !== id);
        localStorage.setItem('activeEntities', JSON.stringify(activeEntities));
    }
}
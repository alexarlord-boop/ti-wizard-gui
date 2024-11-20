import {create} from 'zustand'
import {persist, createJSONStorage} from 'zustand/middleware'


export const useStore = create(
    persist(
        (set) => ({
            roles: [],
            federations: [],

            remoteEntities: [],


            // Role management
            addRole: (role) => set((state) => ({roles: [...state.roles, role]})),
            updateRole: (id, data) =>
                set((state) => ({
                    roles: state.roles.map((r) => (r.id === id ? {...r, ...data} : r)),
                })),
            changeRoleActiveStatus: (id, status) => set((state) => ({
                roles: state.roles.map((r) => (r.id === id ? {...r, is_active: status} : r)),
            })),
            deleteRole: (id) =>
                set((state) => ({roles: state.roles.filter((r) => r.id !== id)})),


            // Federation management
            changeFederationActiveStatus: (url, status) =>
                set((state) => ({
                    federations: state.federations.map((f) =>
                        f.url === url ? {...f, is_active: status} : f
                    ),
                    remoteEntities: state.remoteEntities.map((entity) =>
                        entity.federationUrl === url ? {...entity, is_active: status} : entity
                    ),
                })),

            // Initialize federations from server
            initializeFederations: (fetchedData) => {
                const transformedFederations = Object.entries(fetchedData).map(([url, details]) => ({
                    url,
                    name: details.name,
                    country_code: details.country_code,
                    md_url: details.md_url,
                    is_active: false, // Default to false
                }));
                set(() => ({ federations: transformedFederations }));
            },


            // Entity management
            addEntity: (entity) => set((state) => ({remoteEntities: [...state.remoteEntities, entity]})),
            updateEntity: (id, data) =>
                set((state) => ({
                    remoteEntities: state.remoteEntities.map((r) => (r.id === id ? {...r, ...data} : r)),
                })),
            changeEntityActiveStatus: (id, status) => set((state) => ({
                remoteEntities: state.remoteEntities.map((r) => (r.id === id ? {...r, is_active: status} : r)),
            })),
            deleteEntity: (id) => set((state) => ({remoteEntities: state.remoteEntities.filter((r) => r.id !== id)})),


            // Sync with server
            syncWithServer:
                async () => {
                    const data = await fetch('/api/sync').then((res) => res.json());
                    set(data);
                },

            // Helper methods
            updateEntitiesByFederation: (url, isActive) => set((state) => ({
                remoteEntities: state.remoteEntities.map((entity) =>
                    entity.federationUrl === url ? {...entity, is_active: isActive} : entity
                ),
            })),
            updateEntitiesByRole: (roleId, isActive) => set((state) => ({
                remoteEntities: state.remoteEntities.map((entity) =>
                    entity.roleId === roleId ? {...entity, is_active: isActive} : entity
                ),
            })),


        }),
        {
            name: 'wizard-store',
        }
    ))

import {create} from 'zustand'
import {persist, createJSONStorage} from 'zustand/middleware'
import apiClient from "../api/client.js";
import {toast} from "sonner";
import {typeRelations} from "../lib/roles_utils.js";


export const useStore = create(
    persist(
        (set, get) => ({
            roles: [],
            federations: [],

            remoteEntities: [],


            // Role management
            addRole: (role) => set((state) => ({roles: [...state.roles, role]})),
            updateRole: (id, data) =>
                set((state) => ({
                    roles: state.roles.map((r) => (r.id === id ? {...r, ...data} : r)),
                })),
            changeRoleActiveStatus: (entity_id, status) => set((state) => ({
                roles: state.roles.map((r) => (r.entity_id === entity_id ? {...r, is_active: status} : r)),
            })),
            deleteRole: (entity_id) =>
                set((state) => ({roles: state.roles.filter((r) => r.entity_id !== entity_id)})),


            // Federation management
            changeFederationActiveStatus: (url, status) =>
                set((state) => ({
                    federations: state.federations.map((f) =>
                        f.url === url ? {...f, is_active: status} : f
                    )
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
                set(() => ({federations: transformedFederations}));
            },


            // Entity management
            addEntity: (entity) => set((state) => ({remoteEntities: [...state.remoteEntities, entity]})),
            updateEntity: (id, data) =>
                set((state) => ({
                    remoteEntities: state.remoteEntities.map((r) => (r.id === id ? {...r, ...data} : r)),
                })),
            changeEntityActiveStatus: (id, status) => {
                console.log(id, status);
                set((state) => ({
                    remoteEntities: state.remoteEntities.map((r) => (r.id === id ? {...r, is_active: status} : r)),
                }));
            },
            deleteEntity: (id) => set((state) => ({remoteEntities: state.remoteEntities.filter((r) => r.id !== id)})),


            // Sync with server
            syncWithServer:
                async () => {
                    const data = await fetch('/api/sync').then((res) => res.json());
                    set(data);
                },

            // Push state to backend
            pushStateToBackend: async () => {
                try {
                    // TODO:- make body structure
                    const federations = get().federations; // Get the current state
                    const roles = get().roles;
                    const entities = get().remoteEntities;
                    const body = {
                        federations,
                        roles,
                        entities,
                    };

                    console.log('Pushing state to backend:', body);


                    const response = await apiClient.post(
                        'configuration/',
                        {
                            body: JSON.stringify(body),
                        }
                    )

                    if (!response.ok) {
                        throw new Error(`Error: ${response.statusText}`);
                    }

                    console.log('State successfully pushed to the backend!');
                    toast.success('State successfully pushed to the backend!');
                } catch (error) {
                    console.error('Failed to push state to backend:', error);
                    toast.error('Failed to push state to backend');
                }
            },

            // Helper methods

            getPossibleToChangeEntities: (fromFederation=null, fromRole=null) => {
            //     it should take inactive entities related to federation or role
            //     then check their related roles or federations and if they are active
            //     finally return the list of entities that can be activated
                console.log(fromFederation);
                const entities = get().remoteEntities;

                if (fromFederation) {
                    const relatedEntities = entities.filter((entity) => entity.ra === fromFederation);
                    return relatedEntities.filter((entity) => {
                        const relatedRole = get().roles.find((role) => typeRelations[role.entity_type] === entity.entity_type);
                        return relatedRole.is_active;
                    })
                }

                if (fromRole) {
                    const relatedEntities = entities.filter((entity) => entity.entity_type === typeRelations[fromRole]);
                    return relatedEntities.filter((entity) => {
                        const relatedFederation = get().federations.find((federation) => federation.name === entity.ra);
                        return relatedFederation.is_active;
                    })
                }



            },

            updateEntitiesByFederation: (federationName, isActive, ids) => {
            //    change entities that  possible to change, use this.getPossibleToChangeEntities
               console.log(federationName);
                if (isActive) {
                    const possibleToChangeEntities = get().getPossibleToChangeEntities(federationName, null);
                    console.log(possibleToChangeEntities);
                    set((state) => ({
                        remoteEntities: state.remoteEntities.map((entity) =>
                            possibleToChangeEntities.includes(entity) && ids.includes(entity.id) ? {...entity, is_active: true} : entity
                        ),
                    }))

                } else {
                    // set all entities to inactive
                    set((state) => ({
                        remoteEntities: state.remoteEntities.map((entity) =>
                            entity.ra === federationName ? {...entity, is_active: false} : entity
                        ),
                    }))
                }


            },

            updateEntitiesByRole: (roleType, isActive, ids) => {
                console.log(roleType, isActive);
                const typeRelations = {
                    "SAML_IDP": "SAML_SP",
                    "SAML_SP": "SAML_IDP"
                }

                if (isActive) {
                    const possibleToChangeEntities = get().getPossibleToChangeEntities(null, roleType);
                    set((state) => ({
                        remoteEntities: state.remoteEntities.map((entity) =>
                            possibleToChangeEntities.includes(entity) && ids.includes(entity.id) ? {...entity, is_active: true} : entity
                        ),
                    }))
                }
                else {
                    set((state) => ({
                        remoteEntities: state.remoteEntities.map((entity) =>
                            entity.entity_type === typeRelations[roleType] ? {...entity, is_active: false} : entity
                        ),
                    }))
                }
            },

            deleteEntitiesByRole: (roleType) => {
                console.log(roleType)
                set((state) => ({
                    remoteEntities: state.remoteEntities.filter((entity) =>
                        entity.entity_type !== typeRelations[roleType]
                    ),
                }))
            }

        }),
        {
            name: 'wizard-store',
        }
    ))

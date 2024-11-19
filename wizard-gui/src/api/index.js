import config from "../../config.js";
import {toast} from "sonner";
import apiClient from "./client.js";
import federations from "../assets/federations.js"

let backendData = null;
export const federationsApi = {
    async list() {

        // let data = federations;


        const response = await fetch('https://md.tiw.incubator.geant.org/md/ra.json');
        const data = await response.json();
        // console.log(data);
        // filter out edugain ["https://www.edugain.org"]
        const edugain = "https://www.edugain.org";
        delete data[edugain];


        try {
            const backendResponse = await apiClient.get('federations/')
            backendData = await backendResponse.data;
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error fetching active federations');
        }

        return data ? Object.entries(data).map(([url, details]) => ({
            url,
            id: backendData?.find(federation => federation.url === url)?.id,
            is_active: backendData.some(federation => federation.url === url),
            ...details
        })) : [];
    },

    async update({id, status, url}) {


        if (status) {
            const response = await apiClient.post('federations/', {url});
            // console.log(response);

        } else {
            const response = await apiClient.delete(`federations/${id}/`);

        }
    }
};


export const rolesApi = {

    defaultRoles: [
        {entity_type: 'SAML_IDP', is_active: false, display_name: '', image_url: ''},
        {entity_type: 'SAML_SP', is_active: false, display_name: '', image_url: ''},
        {entity_type: 'OIDC_OP', is_active: false, display_name: '', image_url: ''},
        {entity_type: 'OIDC_RP', is_active: false, display_name: '', image_url: ''}
    ],


    async list() {
        const token = localStorage.getItem('access_token');
        const rolesResponse = await apiClient.get('roles/');

        if (rolesResponse.status === 200) {
            return rolesResponse.data;
        }
        // console.log(rolesResponse);
        toast.error('Error fetching roles');
    },

    async add({entity_type, entity_id, is_active, display_name, logo_image}) {
        const response = await apiClient.post('roles/', {entity_type, entity_id,is_active, display_name, logo_image});
        const data = response.data;
        // console.log(data);
        toast.success('Role added');
    },

    update({entity_type, is_active, display_name, image_url}) {
        const roles = JSON.parse(localStorage.getItem('roles') || '[]');
        const roleIndex = roles.findIndex(role => role.entity_type === entity_type);

        if (roleIndex > -1) {
            roles[roleIndex] = {entity_type, is_active, display_name, image_url};
        } else {
            roles.push({entity_type, is_active, display_name, image_url});
        }

        localStorage.setItem('roles', JSON.stringify(roles));
    },

    async activate({role_id, entity_name, is_active}) {
        const response = await apiClient.patch(`roles/${role_id}/activate/`, {is_active});
        const data = response.data;
        // console.log(data);
        toast.success(`${entity_name} ${is_active ? 'activated' : 'deactivated'}`);
    },

    async delete({role_id}) {
        const response = await apiClient.delete(`roles/${role_id}/`);
        const data = response.data;
        // console.log(data);
        toast.success('Role deleted');
    }


}

export const remoteEntitiesApi = {
    async list(federation, entity_type) {
        if (federation && entity_type) {
            const response = await fetch(`https://md.tiw.incubator.geant.org/md/fed/${federation.toLowerCase()}/${entity_type.toLowerCase()}.json`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            await new Promise(resolve => setTimeout(resolve, 500));
            const data = await response.json();
            const activeEntities = JSON.parse(localStorage.getItem('activeEntities') || '[]');
            return data ? Object.entries(data).map(([id, details]) => {
                const is_active = activeEntities.some(activeEntity => activeEntity.id === details.id);
                details.ra = federation
                return {
                    id,
                    is_active,
                    entity_type,
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

export const logsApi = {
    async list() {
        const response = await apiClient.get('core/logs/');
        // console.log(response.data);
        return response.data;
    }
}
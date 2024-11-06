
/* defines what type of remote entities user can add */
export const getAvailableOptions = (roles) => {
    let options = [];
    console.log(roles)
    roles.forEach(role => {
        switch (role.entity_type) {
            case 'SAML_IDP':
                options.push({entity_type: 'SAML_SP', value: role.is_active});
                break;
            case 'SAML_SP':
                options.push({entity_type: 'SAML_IDP', value: role.is_active});
                break;
            case 'OIDC_OP':
                options.push({entity_type: 'OIDC_RP', value: role.is_active});
                break;
            case 'OIDC_RP':
                options.push({entity_type: 'OIDC_OP', value: role.is_active});
                break;
            default:
                break;
        }
    });
    return options;
};


export const isDisabled = (entity_type, options) => {
    const option = options.find(opt => opt.entity_type === entity_type);
    return !(option && option.value);
};

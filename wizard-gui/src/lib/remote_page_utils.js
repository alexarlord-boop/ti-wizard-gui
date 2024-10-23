
/* defines what type of remote entities user can add */
export const getAvailableOptions = (roles) => {
    let options = [];
    roles.forEach(role => {
        switch (role.entityType) {
            case 'SAML_IDP':
                options.push({entityType: 'SAML_SP', value: role.isActive});
                break;
            case 'SAML_SP':
                options.push({entityType: 'SAML_IDP', value: role.isActive});
                break;
            case 'OIDC_OP':
                options.push({entityType: 'OIDC_RP', value: role.isActive});
                break;
            case 'OIDC_RP':
                options.push({entityType: 'OIDC_OP', value: role.isActive});
                break;
            default:
                break;
        }
    });
    return options;
};


export const isDisabled = (entityType, options) => {
    const option = options.find(opt => opt.entityType === entityType);
    return !(option && option.value);
};

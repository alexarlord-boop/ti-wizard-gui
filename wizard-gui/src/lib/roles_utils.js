export const types = [
    "SAML_IDP",
    "SAML_SP",
    "OIDC_OP",
    "OIDC_RP",
]

export const titlesToTypes = {
    "SAML IDP": "SAML_IDP",
    "SAML SP": "SAML_SP",
    "OIDC OP": "OIDC_OP",
    "OIDC RP": "OIDC_RP",
}

export const humanReadableTypes = {
    "SAML_IDP": "SAML Identity Provider",
    "SAML_SP": "SAML Service Provider",
    "OIDC_OP": "OIDC Provider",
    "OIDC_RP": "OIDC Relying Party",
}

export const typeRelations = {
    "SAML_IDP": "SAML_SP",
    "SAML_SP": "SAML_IDP",
    "OIDC_OP": "OIDC_RP",
    "OIDC_RP": "OIDC_OP",
}
export const getRemoteEntityName = (entity) => {
    // return entity.resourceName || entity.resourceProvider.name.en + " (no name)";
    let start = ""
    if (entity.resource_name) {
        start += entity.resource_name;
    } else if (entity.entity_id) {
        start += entity.entity_id;
    }
    const end = entity.resourceProvider?.name?.en;
    if (end) return `${start} - ${end}`;
    else {
        return `${start} (no name)`;
    }
}
export const getRemoteEntityName = (entity) => {
    // return entity.resourceName || entity.resourceProvider.name.en + " (no name)";
    let start = ""
    if (entity.resourceName) {
        start += entity.resourceName;
    } else if (entity.entityID) {
        start += entity.entityID;
    }
    const end = entity.resourceProvider?.name?.en;
    if (end) return `${start} - ${end}`;
    else {
        return `${start} (no name)`;
    }
}
export const getRemoteEntityName = (entity) => {
    return entity.resourceName || entity.resourceProvider.name.en + " entity";
}
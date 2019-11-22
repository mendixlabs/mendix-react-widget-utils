/**
 * Is Entity persistent or not
 *
 * @name entityIsPersistable
 * @param entity Entity name
 */
export const entityIsPersistable = (entity: string): boolean => {
    return window.mx.meta.getEntity(entity).isPersistable();
};

/**
 * Is Entity an instance of a System.Image or not
 *
 * @name entityIsImage
 * @param entity Entity name
 */
export const entityIsImage = (entity: string): boolean => {
    return window.mx.meta.getEntity(entity).isA("System.Image");
};

/**
 * Is Entity an instance of a System.FileDocument or not
 *
 * @name entityIsFileDocument
 * @param entity Entity name
 */
export const entityIsFileDocument = (entity: string): boolean => {
    return window.mx.meta.getEntity(entity).isA("System.FileDocument");
};

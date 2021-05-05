/**
 * Is Entity persistent or not. Note that this is deprecated in Mendix 9
 *
 * @name entityIsPersistable
 * @category Entity
 * @param entity Entity name
 */
export const entityIsPersistable = (entity: string): boolean | null => {
    let returnValue = null;
    try {
        returnValue = window.mx.meta.getEntity(entity).isPersistable();
    } catch (error) {
        returnValue = null;
    }
    return returnValue;
};

/**
 * Is Entity an instance of a System.Image or not
 *
 * @name entityIsImage
 * @category Entity
 * @param entity Entity name
 */
export const entityIsImage = (entity: string): boolean => {
    return window.mx.meta.getEntity(entity).isA("System.Image");
};

/**
 * Is Entity an instance of a System.FileDocument or not
 *
 * @name entityIsFileDocument
 * @category Entity
 * @param entity Entity name
 */
export const entityIsFileDocument = (entity: string): boolean => {
    return window.mx.meta.getEntity(entity).isA("System.FileDocument");
};

/**
 * Is Entity persistent or not
 *
 * @name entityIsPersistable
 * @param entity Entity name
 */
export const entityIsPersistable = (entity: string): boolean => {
    return window.mx.meta.getEntity(entity).isPersistable();
};

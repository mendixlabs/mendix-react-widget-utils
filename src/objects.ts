/**
 * Create a Mendix Object
 *
 * @param entity Entity type for the created object
 */
export const createObject = (entity: string): Promise<mendix.lib.MxObject> =>
    new Promise((resolve: (value: mendix.lib.MxObject) => void, reject) => {
        window.mx.data.create({ entity, callback: resolve, error: reject });
    });

/**
 * Commit a Mendix Object
 *
 * @param mxobj Mendix Object that will be committed to the server
 */
export const commitObject = (mxobj: mendix.lib.MxObject): Promise<void> =>
    new Promise((resolve, reject) => {
        window.mx.data.commit({ mxobj, callback: resolve, error: reject });
    });

/**
 * Delete a Mendix Object based on Guid
 *
 * @param guid Object guid of the deleted object
 */
export const deleteObjectGuid = (guid: string): Promise<void> =>
    new Promise((resolve, reject) => {
        window.mx.data.remove({ guid, callback: resolve, error: reject });
    });

/**
 * Delete a Mendix Object
 *
 * @param obj Mendix Object
 */
export const deleteObject = (obj: mendix.lib.MxObject): Promise<void> => {
    return deleteObjectGuid(obj.getGuid());
};

/**
 * Get a Mendix Object
 *
 * @param guid Object guid of the Mendix Object that you try to return
 */
export const getObject = (guid: string): Promise<mendix.lib.MxObject | null> =>
    new Promise((resolve, reject) => {
        window.mx.data.get({ guid, callback: resolve, error: reject });
    });

/**
 * Fetch an attribute from a Mendix Object
 *
 * @param obj Mendix Object
 * @param attr Attribute
 */
export const fetchAttr = (obj: mendix.lib.MxObject, attr: string): Promise<any> =>
    new Promise((resolve, reject) => {
        if (attr === "") {
            reject(new Error("Attribute to fetch cannot be empty!"));
        } else if (!obj.has(attr)) {
            reject(new Error(`Attribute '${attr}' does not exist on object of type ${obj.getEntity()}`));
        } else {
            try {
                obj.fetch(attr, resolve);
            } catch (error) {
                reject(error);
            }
        }
    });

/**
 * Get context for a Mendix Object, used in actions
 *
 * @param obj Mendix Object
 */
export const getObjectContext = (obj: mendix.lib.MxObject): mendix.lib.MxContext => {
    const context = new mendix.lib.MxContext();
    context.setContext(obj.getEntity(), obj.getGuid());
    return context;
};

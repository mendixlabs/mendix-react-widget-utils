import { entityIsPersistable } from "./entities";

/**
 * Create a Mendix Object
 *
 * @name createObject
 * @category Objects
 * @param entity Entity type for the created object
 */
export const createObject = (entity: string): Promise<mendix.lib.MxObject> =>
    new Promise((resolve: (value: mendix.lib.MxObject) => void, reject) => {
        window.mx.data.create({ entity, callback: resolve, error: reject });
    });

/**
 * Commit a Mendix Object
 *
 * @name commitObject
 * @category Objects
 * @param mxobj Mendix Object that will be committed to the server
 */
export const commitObject = (mxobj: mendix.lib.MxObject): Promise<void> =>
    new Promise((resolve, reject) => {
        window.mx.data.commit({ mxobj, callback: resolve, error: reject });
    });

/**
 * Delete a Mendix Object based on Guid
 *
 * @name deleteObjectGuid
 * @category Objects
 * @param guid Object guid of the deleted object
 */
export const deleteObjectGuid = (guid: string): Promise<void> =>
    new Promise((resolve, reject) => {
        window.mx.data.remove({ guid, callback: resolve, error: reject });
    });

/**
 * Delete a Mendix Object
 *
 * @name deleteObject
 * @category Objects
 * @param obj Mendix Object
 */
export const deleteObject = (obj: mendix.lib.MxObject): Promise<void> => {
    return deleteObjectGuid(obj.getGuid());
};

/**
 * Get a Mendix Object
 *
 * @name getObject
 * @category Objects
 * @param guid Object guid of the Mendix Object that you try to return
 */
export const getObject = (guid: string): Promise<mendix.lib.MxObject | null> =>
    new Promise((resolve, reject) => {
        window.mx.data.get({ guid, callback: resolve, error: reject });
    });

/**
 * Get a list of Mendix Objects
 *
 * @name getObjects
 * @category Objects
 * @param guid Object guid of the Mendix Object that you try to return
 */
export const getObjects = (guids: string[]): Promise<mendix.lib.MxObject[] | null> =>
    new Promise((resolve, reject) => {
        window.mx.data.get({ guids, callback: resolve, error: reject });
    });

/**
 * Fetch an attribute from a Mendix Object
 *
 * @name fetchAttr
 * @category Objects
 * @param obj Mendix Object
 * @param attr Attribute
 */
export const fetchAttr = <T>(obj: mendix.lib.MxObject, attr: string): Promise<T> =>
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
 * @name getObjectContext
 * @category Objects
 * @param obj Mendix Object
 */
export const getObjectContext = (obj: mendix.lib.MxObject): mendix.lib.MxContext => {
    const context = new mendix.lib.MxContext();
    context.setContext(obj.getEntity(), obj.getGuid());
    return context;
};

/**
 * Get context from the first Mendix Object encountered
 *
 * @name getObjectContextFromObjects
 * @param objs Mendix Objects array
 */
export const getObjectContextFromObjects = (...objs: Array<mendix.lib.MxObject | undefined>): mendix.lib.MxContext => {
    const context = new mendix.lib.MxContext();
    let contextCreated = false;
    objs.forEach((obj: mendix.lib.MxObject | undefined) => {
        if (!contextCreated && obj && obj.getGuid) {
            context.setContext(obj.getEntity(), obj.getGuid());
            contextCreated = true;
        }
    });
    return context;
};

/**
 * Get context from a guid and entityname
 *
 * @name getObjectContextFromId
 * @param guid Mendix Object guid
 * @param entityName Mendix Entity name
 */
export const getObjectContextFromId = (guid: string, entityName: string): mendix.lib.MxContext => {
    const context = new mendix.lib.MxContext();
    if (guid && entityName) {
        context.setContext(entityName, guid);
    }
    return context;
};

/**
 * Return whether or not a Mendix object is persistable or not
 *
 * @name objectIsPersistable
 * @param obj Mendix object
 */
export const objectIsPersistable = (obj: mendix.lib.MxObject): boolean => {
    const entity = obj.getEntity();
    return entityIsPersistable(entity);
};

/**
 * Fetch Mendix objects over an XPath
 *
 * @name fetchByXPath
 * @category Objects
 * @param contextObject Mendix Object
 * @param entityName Entity name for the xpath (//EntityName[Constraint])
 * @param constraint Constraint
 */
export const fetchByXpath = (
    contextObject: mendix.lib.MxObject,
    entityName: string,
    constraint: string
): Promise<mendix.lib.MxObject[] | null> => {
    return new Promise((resolve, reject) => {
        const requiresContext = constraint && constraint.indexOf("[%CurrentObject%]") > -1;
        const contextGuid = contextObject.getGuid();

        if (!contextGuid && requiresContext) {
            return resolve(null);
        }

        const entityConstraint = constraint ? constraint.replace(/\[%CurrentObject%]/g, contextGuid) : "";

        window.mx.data.get({
            callback: res => resolve(res),
            error: error => reject(error),
            xpath: `//${entityName}${entityConstraint}`,
        });
    });
};

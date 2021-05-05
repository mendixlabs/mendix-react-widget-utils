import { entityIsPersistable } from "./entities";

/** Filter options for mx.data.get. See https://apidocs.mendix.com/8/client/mx.data.html#.get */
export interface IFilterOptions {
    id?: string;
    attributes?: string[];
    offset?: number;
    sort?: mx.Sort[];
    amount?: number;
    distinct?: boolean;
    references?: mx.ReferencesSpec;
}

/** Common options for mx.data.get. See https://apidocs.mendix.com/8/client/mx.data.html#.get */
interface IGetOptions {
    noCache?: boolean;
    count?: boolean;
    path?: string;
    /** This property is used in the widget utils to do Promise.resolve */
    callback: (objects: mendix.lib.MxObject[]) => void;
    /** This property is used in the widget utils to do Promise.reject */
    error?: (error: Error) => void;
    filter?: IFilterOptions;
}

/** Specific options form a mx.data.get with XPath */
interface IGetXPathOptions extends IGetOptions {
    xpath: string;
}
/** Specific options form a mx.data.get with Guids */
interface IGetGuidsOptions extends IGetOptions {
    guids: string[];
}

export type ReferencePart = "referenceAttr" | "entity";

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
export const getObjects = (guids: string[], filter?: IFilterOptions): Promise<mendix.lib.MxObject[] | null> =>
    new Promise((resolve, reject) => {
        const getOptions: IGetGuidsOptions = { guids, callback: resolve, error: reject };

        if (filter) {
            getOptions.filter = filter;
        }

        window.mx.data.get(getOptions);
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
 * Get a formatted value from an attribute of a Mendix Object
 *
 * @name getFormattedValue
 * @category Objects
 * @param obj Mendix Object
 * @param attr Attribute
 */
export const getFormattedValue = (obj: mendix.lib.MxObject, attr: string): string | number | boolean => {
    const type = obj.getAttributeType(attr);
    const ret = obj.get(attr);
    if (type === "Enum") {
        return obj.getEnumCaption(attr, ret as string);
    } else if (type === "Boolean") {
        return ret ? "True" : "False";
    } else if (type === "Date" || type === "DateTime") {
        return window.mx.parser.formatValue(ret, type.toLowerCase());
    }
    return ret.valueOf ? ret.valueOf() : ret;
};

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
 * @category Objects
 * @param objs Mendix Objects array
 */
// tslint:disable-next-line:array-type
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
 * @category Objects
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
 * @category Objects
 * @param obj Mendix object
 */
export const objectIsPersistable = (obj: mendix.lib.MxObject): boolean | null => {
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
    constraint: string,
    filter?: IFilterOptions
): Promise<mendix.lib.MxObject[] | null> => {
    return new Promise((resolve, reject) => {
        const requiresContext = constraint && constraint.indexOf("[%CurrentObject%]") > -1;
        const contextGuid = contextObject.getGuid();

        if (!contextGuid && requiresContext) {
            return resolve(null);
        }

        const entityConstraint = constraint ? constraint.replace(/\[%CurrentObject%]/g, contextGuid) : "";

        const getOptions: IGetXPathOptions = {
            callback: (res: mendix.lib.MxObject[] | null) => resolve(res),
            error: (error: Error) => reject(error),
            xpath: `//${entityName}${entityConstraint}`,
        };

        if (filter) {
            getOptions.filter = filter;
        }

        window.mx.data.get(getOptions);
    });
};

/**
 * Get the part of a reference. This can either be the attribute or the entity
 *
 * @name getReferencePart
 * @category Objects
 * @param reference Reference path
 * @param part attribute or entity
 */
export const getReferencePart = (reference = "", part: ReferencePart = "referenceAttr"): string => {
    const partNum = part === "referenceAttr" ? 0 : 1;
    const parts = reference.split("/");
    if (reference === "" || parts.length < partNum + 1) {
        return "";
    }
    return parts[partNum];
};

/**
 * Fetch attributes over a reference. This is typical in a custom widget with the following property values:
 *
 * ```<... type="attribute" isPath="optional" pathType="reference">```
 *
 * It requires the Mendix object and reference path. The path is optional. If it doesn't detect a path, it will just return the attribute value
 *
 * @name fetchAttributeOverPath
 * @category Objects
 * @param obj Mendix Object
 * @param attr reference path
 * @returns
 */
export const fetchAttributeOverPath = async <T>(obj: mendix.lib.MxObject, attr = ""): Promise<T | null> => {
    if (attr.indexOf("/") === -1) {
        return fetchAttr(obj, attr);
    }
    const parts = attr.split("/");
    if (obj.isObjectReference(parts[0]) && parts.length >= 3) {
        const ref = obj.getReference(parts[0]);
        if (ref) {
            const refObj = await getObject(ref);
            const remaining = parts.slice(2).join("/");
            return refObj ? fetchAttributeOverPath(refObj, remaining) : null;
        }
    }

    return null;
};

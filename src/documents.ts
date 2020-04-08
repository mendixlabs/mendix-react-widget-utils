/**
 * Save a Mendix file document
 *
 * @name saveDocument
 * @category FileDocument
 * @param name File name
 * @param file Blob
 * @param obj Mendix Object (FileDocument)
 */
export const saveDocument = (name: string, file: Blob, obj: mendix.lib.MxObject): Promise<void> =>
    new Promise((resolve, reject) => {
        mx.data.saveDocument(obj.getGuid(), name, {}, file, resolve, reject);
    });

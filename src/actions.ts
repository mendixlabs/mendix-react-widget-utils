import { ActionType, INanoflow, IOpenPageAction } from "./interfaces";

const showMendixActionError = (show = false, type: ActionType, actionName: any, msg: string) => {
    if (!show) {
        return;
    }
    window.mx.ui.error(`An error occurred while executing ${type} '${actionName}' : ${msg}`);
};

/**
 * Execute a microflow as Promise
 *
 * @name executeMicroflow
 * @category Actions
 * @param microflow Microflow name
 * @param context Context in which the microflow is ececuted. This is populated by the Mendix Object that is passed down to the microflow
 * @param origin The mxform that is part of the widget that executes the microflow
 * @param showError Show a Mendix error or not
 */
export const executeMicroflow = (
    microflow: string,
    context: mendix.lib.MxContext,
    origin: mxui.lib.form._FormBase,
    showError = false
): Promise<string | number | boolean | mendix.lib.MxObject | mendix.lib.MxObject[]> =>
    new Promise((resolve, reject) => {
        if (!microflow || microflow === "") {
            return reject(new Error("Microflow parameter cannot be empty!"));
        }
        try {
            window.mx.data.action({
                callback: resolve,
                context,
                error: error => {
                    showMendixActionError(showError, "microflow", microflow, error.message);
                    reject(error);
                },
                origin,
                params: {
                    actionname: microflow,
                },
            });
        } catch (e) {
            showMendixActionError(showError, "microflow", microflow, e.message);
            reject(e);
        }
    });

/**
 * Execute a Nanoflow as Promise
 *
 * @name executeNanoFlow
 * @category Actions
 * @param nanoflow Nanoflow
 * @param context Context in which the microflow is ececuted. This is populated by the Mendix Object that is passed down to the microflow
 * @param origin The mxform that is part of the widget that executes the microflow
 * @param showError Show a Mendix error or not
 */
export const executeNanoFlow = (
    nanoflow: INanoflow,
    context: mendix.lib.MxContext,
    origin: mxui.lib.form._FormBase,
    showError = false
): Promise<string | number | boolean | mendix.lib.MxObject | mendix.lib.MxObject[]> =>
    new Promise((resolve, reject) => {
        try {
            window.mx.data.callNanoflow({
                callback: resolve,
                context,
                error: error => {
                    showMendixActionError(showError, "nanoflow", nanoflow, error.message);
                    reject(error);
                },
                nanoflow,
                origin,
            });
        } catch (error) {
            showMendixActionError(showError, "nanoflow", nanoflow, error.message);
            reject(error);
        }
    });

/**
 * Open a page
 *
 * @name openPage
 * @category Actions
 * @param pageAction Page action containing the `pageName` and optional `openAs`
 * @param context Context that is provided to the page. This is tied to an object
 * @param showError Show a Mendix error or not
 */
export const openPage = (
    pageAction: IOpenPageAction,
    context: mendix.lib.MxContext,
    showError = false
): Promise<void> => {
    if (!pageAction.pageName) {
        return Promise.reject(new Error("Page name not provided!"));
    }
    return new Promise((resolve, reject) => {
        window.mx.ui.openForm(pageAction.pageName, {
            callback: () => {
                resolve();
            },
            context,
            error: error => {
                showMendixActionError(showError, "open page", pageAction.pageName, error.message);
                reject(error);
            },
            location: pageAction.openAs || "popup",
        });
    });
};

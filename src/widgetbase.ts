import { Component } from "react";
import { executeMicroflow, executeNanoFlow, openPage } from "./actions";
import { getObjectContext } from "./objects";
import { IAction, ICommonWidgetProps } from "./interfaces";

/**
 * Widget base with convenient methods for building widgets fast
 */
export class WidgetBase extends Component<ICommonWidgetProps, {}> {
    public widgetId?: string;

    /**
     * Get a new context, used for actions
     *
     * @name getContext
     * @param obj Mendix Object (optional)
     */
    public getContext(obj?: mendix.lib.MxObject): mendix.lib.MxContext {
        if (obj && obj.getGuid) {
            return getObjectContext(obj);
        } else if (this.props.mxObject) {
            return getObjectContext(this.props.mxObject);
        }

        return new window.mendix.lib.MxContext();
    }

    /**
     * Execute an Action as a Promise
     *
     * @name executeAction
     * @param action Action contains a microflow/nanoflow/page
     * @param showError When an error occurs in the executed action, show it using `mx.ui.error`
     * @param obj Optional: Mendix object. If this is omitted, it will assume to use the context object of the widget
     */
    public executeAction(
        action: IAction,
        showError = false,
        obj?: mendix.lib.MxObject
    ): Promise<string | number | boolean | mendix.lib.MxObject | mendix.lib.MxObject[] | void> {
        this.debug("executeAction", action, obj && obj.getGuid());
        const { mxform } = this.props;
        const context = this.getContext(obj);

        if (action.microflow) {
            return executeMicroflow(action.microflow, context, mxform, showError);
        } else if (action.nanoflow) {
            return executeNanoFlow(action.nanoflow, context, mxform, showError);
        } else if (action.page) {
            return openPage(action.page, context, showError);
        }

        return Promise.reject(
            new Error(`No microflow/nanoflow/page defined for this action: ${JSON.stringify(action)}`)
        );
    }

    /**
     * Log messages in your widget for debugging. Uses the Mendix logger (set to loglevel.DEBUG)
     *
     * @name debug
     * @param args Arguments to pass down the Mendix Logger
     */
    public debug(...args: any): void {
        const id = this.props.friendlyId || this.widgetId;
        if (window.logger) {
            window.logger.debug(`${id}:`, ...args);
        }
    }
}

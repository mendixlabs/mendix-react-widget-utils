import { Component } from "react";
import { getObjectContext } from "./objects";
import { ICommonWidgetProps } from "./interfaces";

/**
 * Widget base with convenient methods for building widgets fast. This cannot be used in React widgets, but you could copy these if you want
 *
 * @class WidgetBase
 */
export class WidgetBase extends Component<ICommonWidgetProps, {}> {
    public widgetId?: string;

    /**
     * Get a new context, used for actions
     *
     * @name getContext
     * @memberof WidgetBase
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
     * Log messages in your widget for debugging. Uses the Mendix logger (set to loglevel.DEBUG)
     *
     * @name debug
     * @memberof WidgetBase
     * @param args Arguments to pass down the Mendix Logger
     */
    public debug(...args: any): void {
        const id = this.props.friendlyId || this.widgetId;
        if (window.logger) {
            window.logger.debug(`${id}:`, ...args);
        }
    }
}

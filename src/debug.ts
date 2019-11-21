/**
 * Mendix debugger console
 *
 * @name debug
 * @param id ID for the debugger, coming from the widget (const id = this.props.friendlyId || this.widgetId;)
 */
export const debug = (id?: string, ...args: any) => {
    if (window.logger) {
        window.logger.debug(`${id}:`, ...args);
    }
};

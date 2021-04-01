/**
 * Mendix debugger console
 *
 * @name debug
 * @category Debug
 * @param id ID for the debugger, coming from the widget (const id = this.props.friendlyId || this.widgetId;)
 */
export const debug = (id?: string, ...args: any) => {
    // @ts-ignore
    if (mx && mx.logger && mx.logger.debug) {
        // @ts-ignore
        mx.logger.debug(`${id}:`, ...args);
    } else if (window.logger) {
        window.logger.debug(`${id}:`, ...args);
    }
};

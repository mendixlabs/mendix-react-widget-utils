import { CSSProperties } from 'react';

export type ActionType = 'microflow' | 'nanoflow' | 'open page';
export type OpenPageAs = 'content' | 'popup' | 'modal' | 'node';

/**
 * Common properties that are set by the Mendix Runtime in React widgets
 */
export interface ICommonWidgetProps {
    id: string;
    class: string;
    style?: CSSProperties;
    friendlyId?: string;
    tabIndex: number;
    mxform: mxui.lib.form._FormBase;
    mxObject?: mendix.lib.MxObject;
}

/**
 * Nanoflow interface
 */
export interface INanoflow {
    nanoflow: object[];
    paramsSpec: { Progress: string };
}

/**
 * Open Page Action interface
 */
export interface IOpenPageAction {
    pageName: string;
    openAs?: OpenPageAs;
}

/**
 * Action interface used by the executeAction method in Widgetbase
 */
export interface IAction {
    microflow?: string;
    nanoflow?: INanoflow;
    page?: IOpenPageAction;
}

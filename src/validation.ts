import uuid from "uuid/v4";

export type TypeValidationSeverity = "fatal" | "warning";

/**
 * Validation rule
 */
export interface IValidationRule {
    /** Used to determine whether or not it should result in a ValidationMessage */
    condition: boolean;
    /** To display ValidationMessage objects correctly, a category string is prepended before the message */
    category: string;
    /** Actual message for a ValidationMessage */
    message: string;
}

/**
 * Validation Message
 */
export class ValidationMessage {
    /** Identifier, so it can be detemined later which can be removed */
    public id: string;
    /** Message */
    public message: string;
    /** Used for UI. If a message is fatal, it can not be dismissed. */
    public dismissable: boolean;
    /** Used for UI. Fatal displays in a different color than warnings usually */
    public fatal: boolean;

    constructor(message: string, type: TypeValidationSeverity = "fatal") {
        this.id = uuid();
        this.message = message;
        this.dismissable = type !== "fatal";
        this.fatal = type === "fatal";
    }
}

export const ValidationStrings = {
    ACTION_MF: "Action is set to Microflow, but microflow is not defined",
    ACTION_NF: "Action is set to Nanoflow, but nanoflow is not defined",
    ACTION_PAGE: "Action is set to Open page, but page is not defined",
};

/**
 * Return a validation message when a validation rule meets it's condition
 *
 * @name validationRule
 * @category Validation
 * @param rule ValidationRule
 */
export const validationRule = (rule: IValidationRule): ValidationMessage | null => {
    if (rule.condition) {
        return new ValidationMessage(`${rule.category} :: ${rule.message}`);
    }
    return null;
};

/**
 * Return a validation message when a validation rule meets it's condition
 *
 * @name getValidationMessagesFromRules
 * @category Validation
 * @param rules List of ValidationRule
 */
export const getValidationMessagesFromRules = (rules: IValidationRule[]): ValidationMessage[] =>
    rules.map(rule => validationRule(rule)).filter(msg => msg !== null) as ValidationMessage[];

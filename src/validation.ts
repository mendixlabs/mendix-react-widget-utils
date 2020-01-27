import uuid from "uuid/v4";

export type TypeValidationSeverity = "fatal" | "warning";

export interface IValidationRule {
    con: boolean;
    cat: string;
    msg: string;
}

export class ValidationMessage {
    public id: string;
    public message: string;
    public dismissable: boolean;
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

export const validationRule = (rule: IValidationRule): ValidationMessage | null => {
    if (rule.con) {
        return new ValidationMessage(`${rule.cat} :: ${rule.msg}`);
    }
    return null;
};

export const getValidationMessagesFromRules = (rules: IValidationRule[]): ValidationMessage[] =>
    rules.map(rule => validationRule(rule)).filter(msg => msg !== null) as ValidationMessage[];

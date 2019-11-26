import uuid from "uuid/v4";

export type TypeValidationSeverity = "fatal" | "warning";

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

export interface IValidationObject {
    condition: boolean;
    message: string;
}

/**
 *
 * @class PropsValidation
 */
export class PropsValidation {
    private validationMessages: ValidationMessage[] = [];

    /**
     * PropsValidation constructor
     * @param validationScheme List of Validation objects
     */
    constructor(validationScheme: IValidationObject[]) {
        this.validationMessages = [];

        if (validationScheme && validationScheme.length) {
            validationScheme.map(schemeObj => {
                if (schemeObj.condition) {
                    this.addValidation(schemeObj.message);
                }
            });
        }
    }

    /**
     * Add a validation message
     * @name addValidation
     * @memberof PropsValidation
     * @param msg Validation message string
     * @param type Validation type, default is "fatal"
     */
    public addValidation(msg: string, type: TypeValidationSeverity = "fatal"): void {
        this.validationMessages.push(new ValidationMessage(msg, type));
    }

    /**
     * Delete a validation message
     *
     * @memberof PropsValidation
     * @name deleteValidation
     * @param id Validation ID
     */
    public deleteValidation(id: string): void {
        this.validationMessages = this.validationMessages.filter(m => m.id !== id);
    }

    /**
     * Get all messages
     * @memberof PropsValidation
     * @name messages
     * @returns all validation messages
     */
    get messages() {
        return this.validationMessages;
    }

    /**
     * Get all fatal messages
     * @memberof PropsValidation
     * @returns all fatal validation messages
     */
    get fatalMessages() {
        return this.validationMessages.filter(m => m.fatal);
    }
}

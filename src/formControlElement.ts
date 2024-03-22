export const REGISTERED_FORM_CONTROL_ELEMENTS: FormControlElement[] = [];

export class FormControlElement {
    private input: HTMLInputElement;
    private errorMessagesUL: HTMLUListElement;

    constructor(htmlInputElem: HTMLInputElement) {
        if (!htmlInputElem.id) {
            let name = "";
            const labelElem =
                htmlInputElem.parentElement!.querySelector("label");
            if (!labelElem) {
                throw new Error(
                    "Input element doesn't have an ID or label",
                );
            }
            name = labelElem.innerText;
            throw new Error(
                `Input element labeled: ${name} doesn't have an ID`,
            );
        }
        REGISTERED_FORM_CONTROL_ELEMENTS.push(this);
        this.input = htmlInputElem;
        this.errorMessagesUL =
            this.input.parentElement!.querySelector(
                ".error-messages",
            )!;
    }

    get fieldName(): string {
        return (
            this.input.id[0].toUpperCase() +
            this.input.id.substring(1)
        );
    }

    get value(): string {
        return this.input.value;
    }

    appendError(msg: string): void {
        this.errorMessagesUL.innerHTML += `<li>${msg}</li>`;
    }

    clearErrors(): void {
        this.errorMessagesUL.innerHTML = "";
    }
}

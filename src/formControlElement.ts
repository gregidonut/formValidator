export const RegisteredFormControlElements: FormControlElement[] = [];

export class FormControlElement {
    private input: HTMLInputElement;

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
        RegisteredFormControlElements.push(this);
        this.input = htmlInputElem;
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
        this.input.parentElement!.querySelector(
            ".error-messages",
        )!.innerHTML += `<li>${msg}</li>`;
    }
}

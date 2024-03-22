import { FormControlElement } from "./formControlElement.ts";

new (class {
    private form: HTMLFormElement = document.querySelector("#form")!;
    private usernameElem: FormControlElement = new FormControlElement(
        document.querySelector("#username")!,
    );
    private emailElem: FormControlElement = new FormControlElement(
        document.querySelector("#email")!,
    );
    private passwordElem: FormControlElement = new FormControlElement(
        document.querySelector("#password")!,
    );
    private password2Elem: FormControlElement =
        new FormControlElement(document.querySelector("#password2")!);
    private listOfErrorMessagesULs =
        document.querySelectorAll(".error-messages")!;

    constructor() {
        this.form.addEventListener("submit", (e: Event): void => {
            e.preventDefault();
            this.validateForm();
        });
    }

    private validateForm(): void {
        // const username = this.usernameElem.value;
        const email = this.emailElem.value;
        const password = this.passwordElem.value;
        const password2 = this.password2Elem.value;

        // Resetting error messages to be blank
        for (const errorMessagesUL of this.listOfErrorMessagesULs) {
            errorMessagesUL.innerHTML = "";
        }
        this.checkRequired(); // adding `Required` message to blank fields
        this.checkLength(this.usernameElem, 3, 18);
        this.checkLength(this.passwordElem, 8, 24);

        const emailPatternRegex =
            /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        if (!emailPatternRegex.test(email.toLowerCase())) {
            this.emailElem.appendError(
                "Please enter a valid email address.",
            );
        }

        if (!password2 || password !== password2) {
            this.password2Elem.appendError("Passwords do not match.");
        }
    }

    private checkRequired(): void {
        const inputArr: FormControlElement[] = [
            this.usernameElem,
            this.emailElem,
            this.passwordElem,
            this.password2Elem,
        ];
        for (const htmlInputElement of inputArr) {
            if (htmlInputElement.value.trim() !== "") {
                continue;
            }
            const capitalizedId = htmlInputElement.fieldName;

            if (capitalizedId[capitalizedId.length - 1] === "2") {
                htmlInputElement.appendError("Re-enter password.");
                return;
            }

            htmlInputElement.appendError(
                `${capitalizedId} is required.`,
            );
        }
    }

    private checkLength(
        input: FormControlElement,
        min: number,
        max: number,
    ): void {
        if (input.value.length >= min || input.value.length <= max) {
            return;
        }
        input.appendError(
            `${input.fieldName} must be between ${min} and ${max}`,
        );
    }
})();

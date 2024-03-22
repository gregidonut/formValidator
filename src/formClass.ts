import {
    FormControlElement,
    REGISTERED_FORM_CONTROL_ELEMENTS,
} from "./formControlElement.ts";

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

    constructor() {
        this.form.addEventListener("submit", (e: Event): void => {
            e.preventDefault();
            this.validateForm();
        });
    }

    private validateForm(): void {
        for (const formCtrlElem of REGISTERED_FORM_CONTROL_ELEMENTS) {
            formCtrlElem.clearErrors();
        }

        this.checkRequired(); // adding `Required` message to blank fields
        this.checkLength(this.usernameElem, 3, 18);
        this.checkLength(this.passwordElem, 8, 24);

        const emailPatternRegex =
            /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        if (
            !emailPatternRegex.test(
                this.emailElem.value.toLowerCase(),
            )
        ) {
            this.emailElem.appendError(
                "Please enter a valid email address.",
            );
        }

        if (this.passwordElem.value !== this.password2Elem.value) {
            this.password2Elem.appendError("Passwords do not match.");
        }
    }

    private checkRequired(): void {
        for (const htmlInputElement of REGISTERED_FORM_CONTROL_ELEMENTS) {
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
        if (input.value.length >= min && input.value.length <= max) {
            return;
        }
        input.appendError(
            `${input.fieldName} must be between ${min} and ${max}`,
        );
    }
})();

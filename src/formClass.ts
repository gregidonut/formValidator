new (class {
    private form: HTMLFormElement = document.querySelector("#form")!;
    private usernameElem: HTMLInputElement =
        document.querySelector("#username")!;
    private emailElem: HTMLInputElement =
        document.querySelector("#email")!;
    private passwordElem: HTMLInputElement =
        document.querySelector("#password")!;
    private password2Elem: HTMLInputElement =
        document.querySelector("#password2")!;
    private listOfErrorMessagesULs =
        document.querySelectorAll(".error-messages")!;
    constructor() {
        this.form.addEventListener(
            "submit",
            this.handleSubmit.bind(this),
        );
    }

    private handleSubmit(e: Event): void {
        e.preventDefault();
        this.validateForm();
    }
    private validateForm(): void {
        const username = this.usernameElem.value;
        const email = this.emailElem.value;
        const password = this.passwordElem.value;
        const password2 = this.password2Elem.value;

        for (const errorMessagesUL of this.listOfErrorMessagesULs) {
            errorMessagesUL.innerHTML = "";
        }

        if (!username || username.length < 3) {
            this.appendError(
                this.usernameElem,
                "Username must be at least 3 characters long.",
            );
        }

        const emailPatternRegex =
            /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        if (!emailPatternRegex.test(email.toLowerCase())) {
            this.appendError(
                this.emailElem,
                "Please enter a valid email address.",
            );
        }

        if (!password || password.length < 8) {
            this.appendError(
                this.passwordElem,
                "Password must be at least 8 characters long.",
            );
        }

        if (!password2 || password !== password2) {
            this.appendError(
                this.password2Elem,
                "Passwords do not match.",
            );
        }
    }

    private appendError(
        inputElement: HTMLInputElement,
        msg: string,
    ): void {
        inputElement.parentElement!.querySelector(
            ".error-messages",
        )!.innerHTML += `<li>${msg}</li>`;
    }
})();

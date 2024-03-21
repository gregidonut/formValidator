const form: HTMLFormElement = document.querySelector("#form")!;
const usernameElem: HTMLInputElement =
    document.querySelector("#username")!;
const emailElem: HTMLInputElement = document.querySelector("#email")!;
const passwordElem: HTMLInputElement =
    document.querySelector("#password")!;
const errorMessages: HTMLUListElement =
    document.querySelector(".error-messages")!;

form.addEventListener("submit", function (e) {
    e.preventDefault();
    validateForm();
});

function validateForm(): void {
    const username = usernameElem.value;
    const email = emailElem.value;
    const password = passwordElem.value;

    errorMessages.innerHTML = "";

    if (!username || username.length < 3) {
        errorMessages.innerHTML += `<li>Username must be at least 3 characters long.</li>`;
    }

    const emailPatternRegex =
        /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (!emailPatternRegex.test(email.toLowerCase())) {
        errorMessages.innerHTML += `<li>Please enter a valid email address.</li>`;
    }

    if (!password || password.length < 8) {
        errorMessages.innerHTML += `<li>Password must be at least 8 characters long.</li>`;
    }
}

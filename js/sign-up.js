import Valid from "./valid.js";

const email = document.querySelector(".email");
const password = document.querySelector(".password");
const confirm = document.querySelector(".confirm");
const logInButton = document.querySelector(".log-in-button");
const error = document.querySelectorAll(".error");
const signUpStatus = document.querySelector(".sign-up-status");

function isEmpty(obj) {
    for (const prop in obj) {
        if (Object.hasOwn(obj, prop)) {
            return false;
        }
    }
    return true;
}

logInButton.addEventListener("click", (e) => {
    e.preventDefault();
    const emailValue = email.value;
    const psValue = password.value;
    const confirmValue = confirm.value;

    const valid = new Valid(emailValue, psValue, confirmValue);
    valid.isConfirmPassword();
    const [nodeEmailErr, nodePwErr, nodeConfirmErr] = error;
    valid.toggleErr(nodeEmailErr, valid.error.email);
    valid.toggleErr(nodePwErr, valid.error.password);
    valid.toggleErr(nodeConfirmErr, valid.error.confirm);

    if (isEmpty(valid.error)) {

        firebase
            .auth()
            .createUserWithEmailAndPassword(emailValue, psValue)
            .then((userCredential) => {
                var user = userCredential.user;
                console.log(user);
                signUpStatus.textContent = "Đăng ký thành công";
                signUpStatus.style.backgroundColor = "green"
                signUpStatus.style.display = "block";

                setTimeout(() => {
                    signUpStatus.style.display = "none";
                }, 2000);
                setTimeout(() => {
                    window.location.href = "../html/log-in.html";
                }, 1000);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errMsg = error.message;

                console.log(errMsg);
                signUpStatus.style.display = "block";
                signUpStatus.textContent = "email đã được sử dụng";
                signUpStatus.style.backgroundColor = "red"

                setTimeout(() => {
                    signUpStatus.style.display = "none";
                }, 3000);
            })
    }
});

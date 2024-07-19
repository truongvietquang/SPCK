import Valid from "./valid.js";

const email = document.querySelector(".email");
const password = document.querySelector(".password");
const logInButton = document.querySelector(".log-in-button");
const error = document.querySelectorAll(".error");
const logInStatus = document.querySelector(".log-in-status");

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
    const valid = new Valid(emailValue, psValue);
    const [nodeEmailErr, nodePwErr] = error;
    valid.toggleErr(nodeEmailErr, valid.error.email);
    valid.toggleErr(nodePwErr, valid.error.password);

    if (isEmpty(valid.error)) {
        let isSuccess = false;

        firebase
            .auth()
            .setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(() => {
                return firebase
                    .auth()
                    .signInWithEmailAndPassword(emailValue, psValue)
                    .then((userCredential) => {
                        var user = userCredential.user;
                        console.log(user);
                        logInStatus.textContent = "Đăng nhập thành công";
                        logInStatus.style.backgroundColor = "green"
                        logInStatus.style.display = "block";

                        setTimeout(() => {
                            logInStatus.style.display = "none";
                        }, 2000);
                        setTimeout(() => {
                            window.location.href = "../html/home.html"
                        },1000)
                    })
                    .catch((error) => {
                        var errorCode = error.code;
                        var errMsg = error.message;
                        logInStatus.style.backgroundColor = "red"
                        if (errorCode === "auth/internal-error") {
                            logInStatus.textContent = "Email hoặc mật khẩu sai";
                        } else if (errorCode === "auth/too-many-requests") {
                            logInStatus.textContent = "Xử lý quá nhiều yêu cầu";
                        } else if (errMsg) {
                            logInStatus.textContent = errMsg;
                        }

                        logInStatus.style.display = "block";

                        setTimeout(() => {
                            logInStatus.style.display = "none";
                        }, 3000);
                    })
            });
    }
});

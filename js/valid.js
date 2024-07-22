class Valid {
    constructor(email, password, confirmPw) {
        this.email = email;
        this.password = password;
        this.confirmPw = confirmPw;
        this.error = {};
        this.isEmail();
        this.isPassword();
    }
  
    isEmail() {
        const regexEmail =
            /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        if (!regexEmail.test(this.email)) {
            this.error.email = "Bạn vui lòng nhập đúng email";
        }
    }
  
    isPassword() {
        if (this.password.length < 4) {
            this.error.password = "Bạn vui lòng nhập đúng định dạng mật khẩu";
        }
    }
    isConfirmPassword() {
        if (this.confirmPw === "") {
            this.error.confirm = "Mật khẩu chưa trùng";
        }
        if (this.password !== this.confirmPw) {
            this.error.confirm = "Mật khẩu chưa trùng";
        }
    }
    toggleErr(node, err) {
        node.textContent = err;
        node.style.display = err ? "block" : "none";
        node.parentNode.className = err ? "form-input have-err" : "form-input";
        console.log(node);
    }
}
  
export default Valid;
  
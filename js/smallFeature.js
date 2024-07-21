//send message;
const messageInput = document.querySelector(".message-input");
const chatMiddleSend = document.querySelector(".chat-middle-send");

messageInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        let input = messageInput.value;
        if (input !== ""){
            let chatItem = document.createElement("div");
            chatItem.className = "chat-item";
            chatMiddleSend.appendChild(chatItem);

            let p = document.createElement("p");
            p.textContent = messageInput.value;
            chatItem.appendChild(p)
            
            let img = document.createElement("img");
            img.setAttribute("src","../img/main-profile-picture.png");
            chatItem.appendChild(img);

            messageInput.value = ""
        }
    }
});
// log out
const user = JSON.parse(sessionStorage.getItem("firebase:authUser:AIzaSyAnVlFLVfXKMZh2HKiuT0x35Fn-4K0XXAQ:[DEFAULT]"));
const logOut = document.querySelector(".log-out");

if (!user){
    window.location.href = "../html/log-in.html";
}
logOut.addEventListener("click",() => {
    firebase
        .auth()
        .signOut()
        .then(() => {
            window.location.href = "../html/log-in.html";
        })
        .catch((error) => {
        
        });
})
// hover
const menuItem = document.querySelectorAll(".menu-item");
const menuDes = document.querySelectorAll(".menu-des");
menuItem.forEach((item,index) => {
    item.addEventListener("mouseover",() => {
        menuDes[index].style.visibility = "visible";
    })
    item.addEventListener("mouseout",() => {
        menuDes[index].style.visibility = "hidden";
    })
})

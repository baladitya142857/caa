// 🔥 Firebase Config (REPLACE WITH YOUR OWN)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT.firebaseio.com",
    projectId: "YOUR_PROJECT",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "XXXX",
    appId: "XXXX"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

let username = "";

// Join Chat
function joinChat() {
    username = document.getElementById("username").value;
    if (!username) return alert("Enter a name!");

    document.getElementById("loginBox").style.display = "none";
    document.getElementById("chatBox").style.display = "block";
}

// Send Message
function sendMessage() {
    const msg = document.getElementById("message").value;
    if (!msg) return;

    database.ref("messages").push({
        user: username,
        text: msg,
        time: Date.now()
    });

    document.getElementById("message").value = "";
}

// Receive Messages
database.ref("messages").on("child_added", snapshot => {
    const data = snapshot.val();
    const msgBox = document.getElementById("messages");

    const msg = document.createElement("div");
    msg.className = "msg";
    msg.innerHTML = `<b>${data.user}:</b> ${data.text}`;

    msgBox.appendChild(msg);
    msgBox.scrollTop = msgBox.scrollHeight;
});

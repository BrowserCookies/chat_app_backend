const socket = new WebSocket("ws://4.tcp.eu.ngrok.io:14575");

const send = document.getElementById("sendBtn");
const text = document.getElementById("textBox");
//const resArea = document.getElementById("resArea");
const enterBtn = document.getElementById("enterBtn");
const userBox = document.getElementById("userBox");
const header = document.querySelector("h1");
const main = document.getElementById("mainContainer");
const msgCont = document.getElementById("msgCont");

let message;
let me;
let sender;
let reciever;

let incomingMsgCard;

let outgoingMsgCard;

socket.addEventListener("open", () => {
  console.log("Connected to the server!");
});

socket.addEventListener("message", (event) => {
  //resArea.value += `${event.data}\n`;

  let resStr = new String(event.data);
  let msg = resStr.split(",");
  console.log(msg[0]);
  message = msg[0];
  sender = msg[1];

  incomingMsgCard = `
  <article class="incomingMsg">
            <label class="user">${sender}</label><br />
            <label class="msg">${message}</label>
          </article>
  `;

  msgCont.innerHTML += incomingMsgCard;
});

send.onclick = () => {
  message = text.value;
  // resArea.value += `You said: ${text.value}\n`;

  outgoingMsgCard = `
  <article class="outgoingMsg">
            <label class="user">${me}</label><br />
            <label class="msg">${message}</label>
          </article>
  `;

  msgCont.innerHTML += outgoingMsgCard;
  text.value = "";
  socket.send([message, me]);
};

enterBtn.onclick = () => {
  if (userBox.value != "" && userBox.value != " ") {
    me = userBox.value;

    enterBtn.style.display = "none";
    userBox.style.display = "none";
    header.style.display = "none";

    // text.style.display = "block";
    // send.style.display = "block";
    // resArea.style.display = "block";
    // resArea.style.width = "500px";
    // resArea.style.height = "500px";
    main.style.display = "flex";
  }
};

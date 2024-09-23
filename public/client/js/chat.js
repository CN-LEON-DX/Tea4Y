const formSendData = document.querySelector(".inner-form");

if (formSendData) {
  formSendData.addEventListener("submit", (e) => {
    e.preventDefault();
    const content = e.target.elements.content.value;
    if (content) {
      socket.emit("CLIENT_SEND_MESSAGE", content);
      e.target.elements.content.value = "";
    }
  });
}

// SERVER_RETURN_MESSAGE
socket.on("SERVER_RETURN_MESSAGE", (data) => {
  console.log(data);
  // display to frontend
  const body = document.querySelector(".chat-box");
  const div = document.createElement("div");

  const currentUserID = body.getAttribute("chatID");
  let html = "";
  if (data.userID == currentUserID) {
    html += `
        <div class="message user mb-4 flex justify-end">
            <div class="flex flex-col items-end">
                <div class="bg-blue-500 text-white p-2 rounded-lg max-w-xs ">
                    ${data.content}
                </div>
            </div>
        </div>
    `;
  } else {
    html += `
        <div class="message user mb-4 flex justify-start">
            <div class="flex flex-col items-start">
                <div class="text-right text-sm text-gray-600">
                    ${data.fullName}
                </div>
                <div class="bg-gray-300 text-gray-800 p-2 rounded-lg max-w-xs ">
                    ${data.content}
                </div>
            </div>
        </div>
    `;
  }

  div.innerHTML = html;

  body.appendChild(div);
  body.scrollTop = body.scrollHeight;
});

// end SERVER_RETURN_MESSAGE

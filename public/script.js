function sendMessage(text = null) {
    let input = document.getElementById("userInput");
    let message = text || input.value.trim();
    
    if (message === "") return;
    
    let chatBox = document.getElementById("chat-box");
    
    // User message
    let userDiv = document.createElement("div");
    userDiv.className = "user-message";
    userDiv.innerText = message;
    chatBox.appendChild(userDiv);
    
    // Clear input
    if (!text) input.value = "";
    
    // Send to backend
    fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message })
    })
    .then(response => response.json())
    .then(data => {
        let botDiv = document.createElement("div");
        botDiv.className = "bot-message";
        botDiv.innerText = data.reply;
        chatBox.appendChild(botDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    })
    .catch(error => {
        console.error("Chat error:", error);
        let errorDiv = document.createElement("div");
        errorDiv.className = "bot-message";
        errorDiv.innerText = "Sorry, I'm having trouble connecting.";
        chatBox.appendChild(errorDiv);
    });
}

function quickSend(text) {
    sendMessage(text);
}

// 🎤 VOICE INPUT
function startVoice() {
    if (!('webkitSpeechRecognition' in window)) {
        alert("Voice input not supported in this browser");
        return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = function(event) {
        document.getElementById("userInput").value = event.results[0][0].transcript;
        sendMessage();
    };
}

// 🌙 DARK MODE
function toggleDark() {
    document.body.classList.toggle("dark");
}

// ENTER KEY SUPPORT
function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

// Auto-focus input on load
window.onload = function() {
    document.getElementById("userInput").focus();
};
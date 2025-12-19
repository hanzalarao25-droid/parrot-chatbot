// Send message to chatbot
function sendMessage(text = null) {
    let input = document.getElementById("userInput");
    let message = text || input.value.trim();

    if (message === "") return;

    let chatBox = document.getElementById("chat-box");

    // Add user message
    let userDiv = document.createElement("div");
    userDiv.className = "user-message";
    userDiv.innerText = message;
    chatBox.appendChild(userDiv);

    // Clear input
    if (!text) input.value = "";
    
    // Show typing indicator
    let typingDiv = document.createElement("div");
    typingDiv.className = "bot-message typing";
    typingDiv.innerText = "🦜 Parrot is thinking...";
    chatBox.appendChild(typingDiv);
    chatBox.scrollTop = chatBox.scrollHeight;

    // Send to backend
    fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Remove typing indicator
        chatBox.removeChild(typingDiv);
        
        // Add bot response
        let botDiv = document.createElement("div");
        botDiv.className = "bot-message";
        botDiv.innerText = data.reply;
        chatBox.appendChild(botDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    })
    .catch(error => {
        // Remove typing indicator
        chatBox.removeChild(typingDiv);
        
        // Show error message
        let errorDiv = document.createElement("div");
        errorDiv.className = "bot-message error";
        errorDiv.innerText = "Sorry, I'm having trouble connecting. Please try again.";
        chatBox.appendChild(errorDiv);
        console.error("Chat error:", error);
    });
}

// Handle Enter key press
function handleKeyPress(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent form submission
        sendMessage();
    }
}

// Quick send buttons
function quickSend(text) {
    sendMessage(text);
}

// Voice input
function startVoice() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
        alert("Voice input not supported in your browser. Try Chrome or Edge.");
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        document.getElementById("userInput").value = transcript;
        sendMessage(transcript);
    };

    recognition.onerror = function(event) {
        console.error("Speech recognition error:", event.error);
        alert("Voice input failed. Please type your question.");
    };
}

// Dark/Light mode toggle
function toggleDark() {
    document.body.classList.toggle("dark");
    
    // Save preference
    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
}

// Load saved theme on page load
window.onload = function() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark");
    }
    
    // Auto-focus input
    document.getElementById("userInput").focus();
};
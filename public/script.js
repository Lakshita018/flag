async function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    const chatBox = document.getElementById("chat-box");

    if (!userInput.trim()) return;

    // Display user message
    const userMessage = document.createElement("p");
    userMessage.className = "user-message";
    userMessage.textContent = userInput;
    chatBox.appendChild(userMessage);

    document.getElementById("user-input").value = "";

    try {
        const response = await fetch("https://flag-production.up.railway.app/api/chat", { // Use relative path for deployment
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: userInput })
     
        });

        const data = await response.json();

        // Display bot response
        const botMessage = document.createElement("p");
        botMessage.className = "bot-message";
        botMessage.textContent = "Chatbot: " + data.response;
        chatBox.appendChild(botMessage);
    } catch (error) {
        const botMessage = document.createElement("p");
        botMessage.className = "bot-message";
        botMessage.textContent = "Error: Could not connect to the chatbot.";
        chatBox.appendChild(botMessage);
    }

    // Scroll chat to the bottom
    chatBox.scrollTop = chatBox.scrollHeight;
}

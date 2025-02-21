const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

// Serve frontend files
app.use(express.static(__dirname));

// Flag encoding logic
const realFlag = "isteCTF{ai_can_be_hacked}";
const key = 42; // XOR Key
const encodedFlag = [...realFlag].map(c => String.fromCharCode(c.charCodeAt(0) ^ key)).join('');

function chatbot(userInput) {
    userInput = userInput.toLowerCase();

    if (userInput.includes("flag")) {
        return "The flag is not here and not anywhere else either.";
    }

    const misleadingResponses = {
        "flag": "nothing",
        "where": "nowhere",
        "what": "something else",
        "yes": "maybe",
        "no": "perhaps",
    };

    let response = "I don't know, but maybe the answer is " + userInput;
    for (const word in misleadingResponses) {
        response = response.replace(new RegExp(word, 'gi'), misleadingResponses[word]);
    }

    if (userInput.includes("secret")) {
        return `Here is a clue: ${Buffer.from(encodedFlag, 'utf-8').toString('hex')}`;
    }

    return response;
}

app.post('/api/chat', (req, res) => {
    const userQuery = req.body.query || "";
    res.json({ response: chatbot(userQuery) });
});

// Serve index.html for frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;

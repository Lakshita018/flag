// backend/index.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

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

app.listen(3000, () => console.log('Server running on port 3000'));

module.exports = app;
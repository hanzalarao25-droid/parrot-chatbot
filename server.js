const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

app.post("/chat", (req, res) => {
    const msg = req.body.message.toLowerCase();
    let reply = "Sorry, I don't have information on that.";

    if (msg.includes("hello") || msg.includes("hi")) {
        reply = "Welcome to Parrots Knowledge Chatbot 🦜";
    }
    else if (msg.includes("types")) {
        reply = "Popular parrots: African Grey, Macaw, Cockatoo, Budgerigar.";
    }
    else if (msg.includes("food")) {
        reply = "Parrots eat fruits, vegetables, seeds, and nuts.";
    }
    else if (msg.includes("lifespan")) {
        reply = "Parrot lifespan ranges from 10 to 80 years depending on species.";
    }
    else if (msg.includes("care")) {
        reply = "Provide clean cage, fresh water, healthy food, and social interaction.";
    }
    else if (msg.includes("talk")) {
        reply = "African Grey parrots are the best talkers.";
    }
    else if (msg.includes("health")) {
        reply = "Regular vet visits and balanced diet keep parrots healthy.";
    }
    else if (msg.includes("bye")) {
        reply = "Thank you for using Parrots Knowledge Chatbot 🦜";
    }

    res.json({ reply: reply });
});

app.listen(3000, () => {
    console.log("Parrots Knowledge Chatbot running on port 3000");
});

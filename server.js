require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const WOLFRAM_API_KEY = process.env.WOLFRAM_API_KEY;

app.post("/chat", async (req, res) => {
    let userMessage = req.body.message.trim();
    
    if (!userMessage) {
        return res.json({ reply: "Please enter a message." });
    }

    // Properly formatted query for Wolfram Alpha
    const query = `what is ${userMessage}`;

    try {
        const wolframUrl = `http://api.wolframalpha.com/v1/result?appid=${WOLFRAM_API_KEY}&i=${encodeURIComponent(query)}`;
        const response = await axios.get(wolframUrl);

        res.json({ reply: response.data });
    } catch (error) {
        console.error("Wolfram API Error:", error.message);
        res.json({ reply: "Sorry, I couldn't fetch a response." });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

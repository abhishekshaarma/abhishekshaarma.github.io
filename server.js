const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 3000;

const PRIVATE_MESSAGES_FILE = "privateMessages.json";
const PUBLIC_MESSAGES_FILE = "publicMessages.json";

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Get public messages
app.get("/public-messages", (req, res) => {
  fs.readFile(PUBLIC_MESSAGES_FILE, "utf8", (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        return res.json([]); // Return an empty array if the file doesn't exist
      }
      return res.status(500).json({ error: "Could not read public messages" });
    }
    res.json(JSON.parse(data));
  });
});

// Post a private message
app.post("/private-messages", (req, res) => {
  const newMessage = req.body.message;

  fs.readFile(PRIVATE_MESSAGES_FILE, "utf8", (err, data) => {
    const messages = err || !data ? [] : JSON.parse(data);
    messages.push(newMessage);

    fs.writeFile(PRIVATE_MESSAGES_FILE, JSON.stringify(messages), "utf8", (err) => {
      if (err) {
        return res.status(500).json({ error: "Could not save private message" });
      }
      res.status(201).json({ success: true });
    });
  });
});

// Post a public message
app.post("/public-messages", (req, res) => {
  const newMessage = req.body.message;

  fs.readFile(PUBLIC_MESSAGES_FILE, "utf8", (err, data) => {
    const messages = err || !data ? [] : JSON.parse(data);
    messages.push(newMessage);

    fs.writeFile(PUBLIC_MESSAGES_FILE, JSON.stringify(messages), "utf8", (err) => {
      if (err) {
        return res.status(500).json({ error: "Could not save public message" });
      }
      res.status(201).json({ success: true });
    });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

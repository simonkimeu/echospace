const http = require("http");
const express = require("express");
const { createWsServer } = require("./server");

const app = express();
const PORT = 3002;

app.get("/", (req, res) => {
  res.json({ message: "Echospace is running", status: "ok" });
  });

  const server = http.createServer(app);
  createWsServer(server);

  server.listen(PORT, () => {
    console.log(`Echospace running on http://localhost:${PORT}`);
    });
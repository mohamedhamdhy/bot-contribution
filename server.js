const express = require("express");
const bodyParser = require("body-parser");
const makeCommits = require("./commitRunner");
const http = require("http");
const { Server } = require("socket.io");
const chokidar = require("chokidar");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname));

let stopFlag = false;

app.post("/run-commits", async (req, res) => {
  const { startDate, endDate, commitsPerDay, commitMessage } = req.body;
  if (!startDate || !endDate || !commitsPerDay)
    return res.status(400).send("Missing parameters");

  stopFlag = false;
  res.writeHead(200, { "Content-Type": "text/plain" });

  const logCallback = (msg) => {
    res.write(msg + "\n");
  };

  try {
    await makeCommits(
      startDate,
      endDate,
      commitsPerDay,
      logCallback,
      commitMessage,
      () => stopFlag,
    );
    res.end("All done!");
  } catch (err) {
    res.end(`Error: ${err}`);
  }
});

app.post("/stop-commits", (req, res) => {
  stopFlag = true;
  res.send("Stopping commits...");
});

const watcher = chokidar.watch(path.join(__dirname, "index.html"));
watcher.on("change", () => {
  console.log("index.html changed, notifying clients to reload...");
  io.emit("reload");
});

io.on("connection", (socket) => {
  console.log("Browser connected for live reload");
});

server.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);

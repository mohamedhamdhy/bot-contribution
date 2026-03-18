const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let lines = [];
const spacing = 60;
for (let y = 0; y < canvas.height; y += spacing) {
  lines.push({ y: y, offset: Math.random() * 100 });
}

function animateBackground() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "rgba(0,255,255,0.2)";
  ctx.lineWidth = 1;

  for (let line of lines) {
    line.offset += 0.5;
    if (line.offset > spacing) line.offset = 0;

    ctx.beginPath();
    for (let x = 0; x < canvas.width; x += spacing) {
      ctx.moveTo(x, line.y + line.offset);
      ctx.lineTo(x + spacing, line.y + line.offset + spacing / 2);
    }
    ctx.stroke();
  }

  requestAnimationFrame(animateBackground);
}
animateBackground();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const decreaseBtn = document.getElementById("decrease");
const increaseBtn = document.getElementById("increase");
const commitsInput = document.getElementById("commitsPerDay");

decreaseBtn.addEventListener("click", () => {
  let val = parseInt(commitsInput.value) || 1;
  if (val > parseInt(commitsInput.min)) commitsInput.value = val - 1;
});

increaseBtn.addEventListener("click", () => {
  let val = parseInt(commitsInput.value) || 1;
  if (val < parseInt(commitsInput.max)) commitsInput.value = val + 1;
});

const logEl = document.getElementById("log");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const overallFill = document.getElementById("overallProgress");
const dayFill = document.getElementById("dayProgress");
let abortController;

function appendLog(text) {
  logEl.textContent += text + "\n";
  logEl.scrollTop = logEl.scrollHeight;
}

startBtn.addEventListener("click", async () => {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  logEl.textContent = "";
  overallFill.style.width = "0%";
  overallFill.textContent = "0%";
  dayFill.style.width = "0%";
  dayFill.textContent = "0%";

  abortController = new AbortController();

  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const commitsPerDay = parseInt(commitsInput.value, 10);
  const commitMessage = document.getElementById("commitMessage").value;

  appendLog("Initializing Git Commit sequence...");

  try {
    const response = await fetch("/run-commits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        startDate,
        endDate,
        commitsPerDay,
        commitMessage,
      }),
      signal: abortController.signal,
    });

    if (!response.ok) throw new Error(await response.text());

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let overall = 0,
      day = 0;
    const totalDays =
      (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24) + 1;
    const totalCommits = totalDays * commitsPerDay;

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      if (value) {
        const text = decoder.decode(value);
        text.split("\n").forEach((line) => {
          if (line.trim() !== "") appendLog(line);
          if (line.includes("Processing")) day = 0;
          else if (line.includes("done")) day += 1;
        });

        overall += (text.match(/done/g) || []).length;

        overallFill.style.width =
          ((overall / totalCommits) * 100).toFixed(1) + "%";
        overallFill.textContent =
          ((overall / totalCommits) * 100).toFixed(1) + "%";

        dayFill.style.width = ((day / commitsPerDay) * 100).toFixed(1) + "%";
        dayFill.textContent = `${((day / commitsPerDay) * 100).toFixed(1)}% (${day}/${commitsPerDay})`;
      }
    }

    appendLog("\nAll commits completed.");
  } catch (err) {
    if (err.name === "AbortError") appendLog("\nProcess stopped by user.");
    else appendLog(`\nError: ${err.message}`);
  } finally {
    startBtn.disabled = false;
    stopBtn.disabled = true;
  }
});

stopBtn.addEventListener("click", () => {
  if (abortController) abortController.abort();
});

const socket = io();
socket.on("reload", () => {
  console.log("Reload signal received from server");
  location.reload();
});

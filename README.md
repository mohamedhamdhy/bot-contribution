# 🤖 GitHub Contribution Bot

A JARVIS-style GitHub contribution bot with a live dashboard that automates commits on any repository. Features real-time progress, smooth animations, commit customization, and GitHub authentication.

---

## 🚀 Features

- **Automated Git Commits:** Commit multiple times per day to fill your GitHub contribution graph.
- **Custom Date Ranges:** Specify start and end dates for your commits.
- **Custom Commit Messages:** Define a base commit message for all automated commits.
- **Smooth Progress Bars:** Real-time, fluid progress tracking for overall and per-day commits.
- **Stop & Resume:** Pause or stop commit execution at any time.
- **Animated JARVIS UI:** Cyber HUD-inspired dashboard with animated background.
- **GitHub Login Integration:** Authenticate with GitHub to ensure commits are pushed properly.
- **No Login? No Commits:** Ensures the user is authenticated before running the bot.
- **Real-Time Logging:** Logs each commit to the dashboard as it executes.

---

## 📥 Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- Git installed and configured
- Internet connection for pushing commits
- GitHub account for authentication (OAuth required for pushing)

### Installation & Usage

```bash
# Clone the repo
git clone https://github.com/mohamedhamdhy/micro-js-graph
cd micro-js-graph

# Install dependencies
npm install

# Start the server
node server.js
```

Open your browser at `http://localhost:3000`.

**Configure:**

- Start & end dates (YYYY-MM-DD format)
- Commits per day
- Base commit message

Press **START** to begin automated commits. Monitor progress in real-time. Press **STOP** if you need to pause or cancel.

---

## 📝 Notes

- Ensure your repository exists or has been cloned locally before starting.
- All commits are pushed automatically after completion.
- Only authenticated users can run the commit automation.
- Designed to work safely without overwriting existing work.

---

## 🖥️ Dashboard Features

- JARVIS-style HUD with animated background and neon grid.
- Smooth animated progress bars for overall and per-day commits.
- Real-time commit log with auto-scrolling and colored output.
- Responsive controls for easy commit configuration.
- Cyber HUD aesthetic: black background with `#0ff` neon highlights.

---

## 🔒 Security & Safety

- No commits will occur without GitHub login.
- Stop functionality prevents runaway commits.
- Runs on your local machine — no external servers process your repo.

---

## 🔮 Future Enhancements

- Multi-repo support with selection dropdown
- Auto-detection of local repositories
- Dark/Light themes with customizable HUD colors
- Commit history visualization

---

## 🤝 Looking for Collaborators!

I'm actively looking for collaborators to help improve and expand this project! Whether you're into Node.js, UI/UX, GitHub automation, or just want to contribute — you're welcome here.

Feel free to open an issue, submit a PR, or reach out directly. Let's build something cool together. 🚀

---

## 👨‍💻 Developer

Developed by **Mohamed Al Hamdy**

🔗 Github: https://github.com/mohamedhamdhy/micro-js-graph
# 🤖 GitHub Contribution Bot

This bot automates git commits on random days between January and May 2025 to help build your GitHub contribution graph.

---

## 🚀 Features

- Automates commits with custom dates using `simple-git`
- Uses `moment` to handle date ranges and formatting
- Writes commit info to a JSON file (`data.json`)
- Pushes commits automatically after completion

---

## 📥 Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- Git installed and configured
- Internet connection for pushing commits

### Installation & Usage

```bash
# Clone the repo
git clone https://github.com/mohamedhamdhy/Guthub-bot.git
cd Guthub-bot

# Install dependencies
npm install

# Run the bot (will create 100 commits on random days)
node index.js

const jsonfile = require("jsonfile");
const moment = require("moment");
const simpleGit = require("simple-git");

const FILE_PATH = "./data.json";
const git = simpleGit();

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function makeCommits(
  startDate,
  endDate,
  commitsPerDay,
  logCallback = console.log,
  commitMessageBase = "Commit X on YYYY-MM-DD",
  stopCheck = () => false,
) {
  const moment = require("moment");
  const simpleGit = require("simple-git");
  const jsonfile = require("jsonfile");
  const FILE_PATH = "./data.json";
  const git = simpleGit();
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  let date = moment(startDate);

  while (date.isSameOrBefore(endDate)) {
    if (stopCheck()) {
      logCallback("Stopping...");
      return;
    }
    logCallback(`\nProcessing ${date.format("YYYY-MM-DD")}`);

    for (let i = 0; i < commitsPerDay; i++) {
      if (stopCheck()) {
        logCallback("Stopping...");
        return;
      }

      const commitDate = date
        .clone()
        .hour(12)
        .minute(i)
        .second(Math.floor(Math.random() * 60));
      const formattedDate = commitDate.format("YYYY-MM-DDTHH:mm:ss");
      const data = { date: formattedDate, commit: i + 1 };

      await jsonfile.writeFile(FILE_PATH, data, { spaces: 2 });
      await git.add([FILE_PATH]);

      const message = commitMessageBase
        .replace("X", i + 1)
        .replace("YYYY-MM-DD", date.format("YYYY-MM-DD"));
      await git.commit(message, undefined, { "--date": formattedDate });
      logCallback(`Commit ${i + 1} done`);

      await sleep(50);
    }

    date.add(1, "days");
  }

  try {
    await git.push();
    logCallback("\n✅ All commits completed and pushed.");
  } catch (err) {
    logCallback(`Push failed: ${err}`);
  }
}

module.exports = makeCommits;

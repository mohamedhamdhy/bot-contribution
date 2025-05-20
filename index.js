const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git');
const FILE_PATH = "./data.json";

// Initialize simple-git
const git = simpleGit();

// Function to generate N random days between Jan 1 and May 31, 2025
const getRandomDaysIn2025JanToMay = (numCommits) => {
    const days = [];
    let date = moment('2025-01-01');
    while (date.isSameOrBefore('2025-05-31')) {
        days.push(date.format('YYYY-MM-DDTHH:mm:ssZ'));
        date.add(1, 'days');
    }

    const randomDays = [];
    while (randomDays.length < numCommits) {
        const randomIndex = Math.floor(Math.random() * days.length);
        const selectedDay = days[randomIndex];
        if (!randomDays.includes(selectedDay)) {
            randomDays.push(selectedDay);
        }
    }

    return randomDays;
};

// Recursive function to make commits on random days
const makeCommit = (n, days, commitsMade) => {
    if (commitsMade >= n) {
        git.push((err) => {
            if (err) {
                console.error("Error pushing changes:", err);
            } else {
                console.log("All commits done and pushed.");
            }
        });
        return;
    }

    const randomDay = days[Math.floor(Math.random() * days.length)];

    const data = {
        date: randomDay,
        commit: commitsMade + 1
    };

    console.log(`Committing #${commitsMade + 1} on ${randomDay}`);

    jsonfile.writeFile(FILE_PATH, data, { spaces: 2 }, (err) => {
        if (err) {
            console.error("Error writing to file:", err);
            return;
        }

        git.add([FILE_PATH])
            .commit(`Commit ${commitsMade + 1} on ${randomDay}`, { '--date': randomDay }, () => {
                const updatedDays = days.filter(day => day !== randomDay);
                makeCommit(n, updatedDays, commitsMade + 1);
            });
    });
};

// Start the process
const randomDays = getRandomDaysIn2025JanToMay(100);
makeCommit(100, randomDays, 0);

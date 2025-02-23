let currentChallenge = null;
let attempts = 0;
let score = 0;
let skips = 3;
let timerInterval;
let timeElapsed = 0;
let level = 1;
let achievements = [];
let leaderboard = [
    { name: "N/A", score: 0 },
    { name: "N/A", score: 0 },
    { name: "N/A", score: 0 }
];
let isDarkTheme = true;

document.addEventListener('DOMContentLoaded', (event) => {
    setTimeout(() => { if (!currentChallenge) startGame(); }, 2000);
});

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById("userInput").value.trim();
        document.getElementById("userInput").value = "";
        processCommand(input);
    }
}

function processCommand(input) {
    let terminal = document.getElementById("terminal");

    if (input.toLowerCase() === "hint" && currentChallenge) {
        terminal.innerHTML += `<br><span class='info'>💡 Hint: ${currentChallenge.hint}</span>`;
        score -= 2; // Deduct fewer points for using a hint
        updateScore();
        playSound("hintSound");
        return;
    }

    if (input.toLowerCase() === "start" && !currentChallenge) {
        startGame();
        return;
    }

    if (input.toLowerCase() === "restart") {
        restartGame();
        return;
    }

    if (input.toLowerCase() === "tutorial") {
        showTutorial();
        return;
    }

    if (currentChallenge && input.toLowerCase() === "save") {
        saveProgress();
        return;
    }

    if (currentChallenge && input.toLowerCase() === "load") {
        loadProgress();
        return;
    }

    if (currentChallenge) {
        if (input === currentChallenge.answer) {
            terminal.innerHTML += `<br><span class='success'>✔️ Correct! Moving to next challenge...</span>`;
            terminal.innerHTML += `<br><span class='info'>Explanation: ${currentChallenge.explanation}</span>`;
            score += 5; // Increase score for correct answer
            updateScore();
            playSound("correctSound");
            attempts = 0;
            setTimeout(() => generateNewChallenge(), 1000);
        } else {
            attempts++;
            terminal.innerHTML += `<br><span class='error'>❌ Incorrect! Try again or type 'hint'.</span>`;
            terminal.innerHTML += `<br><span class='info'>Explanation: ${currentChallenge.explanation}</span>`;
            playSound("wrongSound");
            if (attempts >= 3) {
                terminal.innerHTML += `<br><span class='error'>⚠️ Too many failed attempts! Restarting challenge...</span>`;
                setTimeout(() => resetChallenge(), 1000);
            }
        }
    }
}

function startGame() {
    let terminal = document.getElementById("terminal");
    terminal.innerHTML = "Initializing Learning System...<br>Loading Coding Challenges...<br>Accessing Lessons...<br><br>📝 Generating first challenge...";
    timeElapsed = 0;
    timerInterval = setInterval(updateTimer, 1000);
    generateNewChallenge();
}

function resetChallenge() {
    let terminal = document.getElementById("terminal");
    attempts = 0;
    terminal.innerHTML += `<br><br>📝 ${currentChallenge.question}`;
}

function restartGame() {
    let terminal = document.getElementById("terminal");
    currentChallenge = null;
    attempts = 0;
    score = 0; // Reset score
    skips = 3; // Reset skips
    level = 1; // Reset level
    achievements = []; // Reset achievements
    updateScore();
    updateSkipButton();
    updateLevel();
    updateAchievements();
    terminal.innerHTML = "System Restarting...<br>Reinitializing Learning System...<br>Loading Coding Challenges...<br>Accessing Lessons...<br><br>📝 Generating first challenge...";
    timeElapsed = 0;
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
    generateNewChallenge();
}

function updateScore() {
    document.getElementById("score").innerText = `Score: ${score}`;
}

function updateTimer() {
    timeElapsed++;
    document.getElementById("timer").innerText = `Time: ${timeElapsed}s`;
}

function skipChallenge() {
    if (skips > 0) {
        skips--;
        score -= 3; // Deduct fewer points for skipping
        updateScore();
        generateNewChallenge();
        updateSkipButton();
    }
}

function updateSkipButton() {
    const skipButton = document.getElementById("skipButton");
    if (skips <= 0) {
        skipButton.disabled = true;
        skipButton.innerText = "Skip Challenge (0)";
    } else {
        skipButton.disabled = false;
        skipButton.innerText = `Skip Challenge (${skips})`;
    }
}

function generateNewChallenge() {
  const challengeCategories = [htmlChallenges, cssChallenges, jsChallenges];

// Select a random category
const randomCategory = challengeCategories[Math.floor(Math.random() * challengeCategories.length)];

// Get a random challenge from the selected category
const randomChallenge = getRandomChallenge(randomCategory);

console.log(randomChallenge);

  
    currentChallenge = randomChallenge;
    let terminal = document.getElementById("terminal");
    terminal.innerHTML += `<br><br>📝 ${randomChallenge.question}`;
}

function updateLeaderboard(finalScore) {
    let playerName = prompt("Enter your name for the leaderboard:");
    leaderboard.push({ name: playerName, score: finalScore });
    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard = leaderboard.slice(0, 3); // Keep top 3 scores
    displayLeaderboard();
}

function displayLeaderboard() {
    let leaderboardDiv = document.getElementById("leaderboard");
    leaderboardDiv.innerHTML = "Leaderboard:<br>";
    leaderboard.forEach((entry, index) => {
        leaderboardDiv.innerHTML += `${index + 1}. ${entry.name} - ${entry.score} points<br>`;
    });
}

function levelUp() {
    level++;
    updateLevel();
}

function updateLevel() {
    document.getElementById("level").innerText = `Level: ${level}`;
}

function awardAchievement(achievement) {
    achievements.push(achievement);
    updateAchievements();
}

function updateAchievements() {
    let achievementsDiv = document.getElementById("achievements");
    achievementsDiv.innerHTML = "Achievements:<br>";
    if (achievements.length === 0) {
        achievementsDiv.innerHTML += "None";
    } else {
        achievements.forEach((achievement) => {
            achievementsDiv.innerHTML += `${achievement}<br>`;
        });
    }
}

function showTutorial() {
    document.getElementById("tutorial").style.display = "block";
}

function closeTutorial() {
    document.getElementById("tutorial").style.display = "none";
}

function switchTheme() {
    isDarkTheme = !isDarkTheme;
    document.body.style.backgroundColor = isDarkTheme ? "black" : "white";
    document.body.style.color = isDarkTheme ? "limegreen" : "black";
    document.getElementById("themeSwitcher").innerHTML = `Theme: <button onclick="switchTheme()">Switch to ${isDarkTheme ? "Light" : "Dark"} Theme</button>`;
}

function playSound(soundId) {
    document.getElementById(soundId).play();
}

function saveProgress() {
    const progress = {
        currentChallenge,
        attempts,
        score,
        skips,
        timeElapsed,
        level,
        achievements,
        leaderboard,
    };
    localStorage.setItem("codeLearnProgress", JSON.stringify(progress));
    alert("Progress saved!");
}

function loadProgress() {
    const progress = JSON.parse(localStorage.getItem("codeLearnProgress"));
    if (progress) {
        currentChallenge = progress.currentChallenge;
        attempts = progress.attempts;
        score = progress.score;
        skips = progress.skips;
        timeElapsed = progress.timeElapsed;
        level = progress.level;
        achievements = progress.achievements;
        leaderboard = progress.leaderboard;
        updateScore();
        updateSkipButton();
        updateLevel();
        updateAchievements();
        displayLeaderboard();
        alert("Progress loaded!");
    } else {
        alert("No saved progress found.");
    }
}
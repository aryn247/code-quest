
// Game state and initialization
let currentChallenge = null;
let score = 0;
let skips = 3;
let timerInterval;
let timeElapsed = 0;
let level = 1;

// DOM Elements
const terminal = document.getElementById('terminal');
const userInput = document.getElementById('userInput');
const categorySelect = document.getElementById('category');
const generateBtn = document.getElementById('generate-btn');

// Event Listeners
document.addEventListener('DOMContentLoaded', init);
document.addEventListener('keypress', handleKeyPress);
generateBtn.addEventListener('click', generateNewChallenge);
document.querySelectorAll('[data-action]').forEach(button => {
    button.addEventListener('click', handleButtonAction);
});

function init() {
    updateUI();
}

function handleKeyPress(e) {
    if (e.key === 'Enter') processInput();
}

function handleButtonAction(e) {
    const action = e.target.dataset.action;
    switch(action) {
        case 'start': startGame(); break;
        case 'submit': processInput(); break;
        case 'skip': skipChallenge(); break;
        case 'reset': resetGame(); break;
        // Add other actions as needed
    }
}

function processInput() {
    const input = userInput.value.trim();
    userInput.value = '';
    
    if (!currentChallenge) return;
    
    if (input === currentChallenge.answer) {
        handleCorrectAnswer();
    } else {
        handleWrongAnswer();
    }

    if (input.toLowerCase() === "tutorial") {
        showTutorial();
        return;
    }

}

function showTutorial() {
    document.getElementById("tutorial").style.display = "block";
}

function closeTutorial() {
    document.getElementById("tutorial").style.display = "none";
}


function generateNewChallenge() {
    const category = categorySelect.value;
    const categoryChallenges = challenges[category];
    currentChallenge = categoryChallenges[Math.floor(Math.random() * categoryChallenges.length)];
    
    terminal.innerHTML = currentChallenge.question;
    document.getElementById('challengeSection').classList.remove('hidden');
}

function updateUI() {
    document.getElementById('score').textContent = `Score: ${score}`;
    document.getElementById('skips').textContent = `Skips: ${skips}`;
    document.getElementById('level').textContent = `Level: ${level}`;
    document.getElementById('timer').textContent = `Time: ${timeElapsed}s`;
    document.getElementById('skipButton').textContent = `Skip (${skips})`;
}

function handleCorrectAnswer() {
    score += 10;
    level++;
    terminal.innerHTML += '<br><span class="success">Correct!</span>';
    generateNewChallenge();
    updateUI();
}

function handleWrongAnswer() {
    score = Math.max(0, score - 5);
    terminal.innerHTML += '<br><span class="error">Try again!</span>';
    updateUI();
}

function skipChallenge() {
    if (skips > 0) {
        skips--;
        generateNewChallenge();
        updateUI();
    }
}

function startGame() {
    timeElapsed = 0;
    timerInterval = setInterval(() => {
        timeElapsed++;
        updateUI();
    }, 1000);
    generateNewChallenge();
}

function resetGame() {
    clearInterval(timerInterval);
    score = 0;
    skips = 3;
    level = 1;
    currentChallenge = null;
    terminal.innerHTML = 'Game reset. Type "start" to begin.';
    document.getElementById('challengeSection').classList.add('hidden');
    updateUI();
}

// Integrated challenges
const challenges = {
    html: [
        { question: "Write an HTML heading element", answer: "<h1>Hello World</h1>", hint: "Use h1 tags" },
        { question: "Create a button element", answer: "<button>Click Me</button>", hint: "Use button tags" },
        { question: "Write an HTML element to create a button with the text 'Click Me'.", answer: "<button>Click Me</button>", hint: "Use the <button> tag to create a button.", explanation: "The <button> tag in HTML is used to create a clickable button." },
        { question: "Write an HTML element to create an image with the source 'image.jpg'.", answer: "<img src='image.jpg' />", hint: "Use the <img> tag to create an image element.", explanation: "The <img> tag in HTML is used to embed an image in a web page." },
        { question: "Write an HTML element to create a link to 'https://www.example.com' with the text 'Visit Example'.", answer: "<a href='https://www.example.com'>Visit Example</a>", hint: "Use the <a> tag to create a link element.", explanation: "The <a> tag in HTML is used to create hyperlinks." },
        { question: "Write an HTML element to create a paragraph with the text 'This is a paragraph.'.", answer: "<p>This is a paragraph.</p>", hint: "Use the <p> tag for the paragraph.", explanation: "The <p> tag is used to create a paragraph in HTML." },
        { question: "Write an HTML table with two rows and two columns.", answer: "<table><tr><td>Row1 Col1</td><td>Row1 Col2</td></tr><tr><td>Row2 Col1</td><td>Row2 Col2</td></tr></table>", hint: "Use the <table>, <tr>, and <td> tags.", explanation: "The <table> tag is used to create tables in HTML." },
        { question: "Write an HTML form with an input field and a submit button.", answer: "<form><input type='text' /><button type='submit'>Submit</button></form>", hint: "Use the <form> and <input> tags.", explanation: "Forms in HTML are used to collect user input." },
        { question: "Write an HTML element to embed a YouTube video.", answer: "<iframe src='https://www.youtube.com/embed/video_id'></iframe>", hint: "Use the <iframe> tag.", explanation: "The <iframe> tag is used to embed other webpages or videos." },
        { question: "Write an HTML element to create an ordered list with three items.", answer: "<ol><li>Item 1</li><li>Item 2</li><li>Item 3</li></ol>", hint: "Use the <ol> and <li> tags.", explanation: "Ordered lists are created using the <ol> tag." },
        { question: "Write an HTML element to create a div container.", answer: "<div></div>", hint: "Use the <div> tag.", explanation: "The <div> tag is a block-level container for HTML elements." },
        { question: "Write an HTML element to create an input field for email.", answer: "<input type='email' />", hint: "Use the <input> tag with type='email'.", explanation: "The email input type ensures users enter a valid email address." },
        { question: "Write an HTML element to create a dropdown with three options.", answer: "<select><option>Option 1</option><option>Option 2</option><option>Option 3</option></select>", hint: "Use the <select> and <option> tags.", explanation: "Dropdowns are created using the <select> tag in HTML." },
        { question: "Write an HTML element to create a progress bar.", answer: "<progress value='50' max='100'></progress>", hint: "Use the <progress> tag.", explanation: "The <progress> tag is used to display progress in a task." },
        { question: "Write an HTML element to display a checkbox.", answer: "<input type='checkbox' />", hint: "Use the <input> tag with type='checkbox'.", explanation: "Checkboxes allow users to select multiple options." },
        { question: "Write an HTML element to display a radio button.", answer: "<input type='radio' />", hint: "Use the <input> tag with type='radio'.", explanation: "Radio buttons allow users to select one option from multiple choices." }
    ],
    css: [
        { question: "Make text red", answer: "color: red;", hint: "Use color property" },
        { question: "Set element width to 100px", answer: "width: 100px;", hint: "Use width property" },
        { question: "Write a CSS rule to make text bold.", answer: "p { font-weight: bold; }", hint: "Use the font-weight property.", explanation: "The font-weight property sets the boldness of text." }
    ],
    js: [
        { question: "Create a sum function", answer: "function sum(a, b) { return a + b; }", hint: "Use function keyword" },
        { question: "Check even number", answer: "num % 2 === 0", hint: "Use modulus operator" },
        { question: "Write a JavaScript function to reverse a string.", answer: "function reverseString(s) { return s.split('').reverse().join(''); }", hint: "Use the split, reverse, and join methods.", explanation: "These methods help reverse a string in JavaScript." }
    ]
};

const htmlChallenges = [
  { question: "Write an HTML element to display a heading with the text 'Hello World'.", answer: "<h1>Hello World</h1>", hint: "Use the <h1> tag for the heading.", explanation: "The <h1> tag is used to create the largest heading in HTML." },
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
];

const cssChallenges = [
  { question: "Write a CSS rule to change the text color of all paragraphs to red.", answer: "p { color: red; }", hint: "Use the color property.", explanation: "The color property changes the text color of elements." },
  { question: "Write a CSS rule to make a div have a width of 100 pixels and a height of 100 pixels.", answer: "div { width: 100px; height: 100px; }", hint: "Use the width and height properties.", explanation: "The width and height properties define element dimensions." },
  { question: "Write a CSS rule to make text bold.", answer: "p { font-weight: bold; }", hint: "Use the font-weight property.", explanation: "The font-weight property sets the boldness of text." }
];

const jsChallenges = [
  { question: "Write a JavaScript function to return the sum of two numbers.", answer: "function sum(a, b) { return a + b; }", hint: "Use the function keyword.", explanation: "Functions in JavaScript allow reusable code blocks." },
  { question: "Write a JavaScript function to check if a number is even.", answer: "function isEven(num) { return num % 2 === 0; }", hint: "Use the modulus operator.", explanation: "The modulus operator (%) checks divisibility by 2." },
  { question: "Write a JavaScript function to reverse a string.", answer: "function reverseString(s) { return s.split('').reverse().join(''); }", hint: "Use the split, reverse, and join methods.", explanation: "These methods help reverse a string in JavaScript." }
];

// Function to get a random challenge from a given category
function getRandomChallenge(challenges) {
    return challenges[Math.floor(Math.random() * challenges.length)];
}

// Function to generate a new challenge
function generateNewChallenge(category) {
    let challengeSet;

    switch (category) {
        case "html":
            challengeSet = htmlChallenges;
            break;
        case "css":
            challengeSet = cssChallenges;
            break;
        case "js":
            challengeSet = jsChallenges;
            break;
        default:
            console.error("Invalid category selected!");
            return;
    }

    let challenge = getRandomChallenge(challengeSet);
    
    // Display the challenge in the console (Modify to update UI)
    console.log("Question: ", challenge.question);
    console.log("Hint: ", challenge.hint);
    console.log("Explanation: ", challenge.explanation);
}

// Example usage: Generate a new challenge from the HTML category
generateNewChallenge("html");

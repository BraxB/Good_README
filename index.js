// TODO: Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');

// TODO: Create an array of questions for user input
const questions = [
    'What is the name of this project?',
    'What was your motivation?',
    'What problem does it solve?',
    'What did you learn?',
    'What are the steps to install your project?',
    'How do you use your project?',
    'Who would you like to credit?',
    'Please provide test instructions',
    'What is your email address?',
    'What is your github username?',
    'What license does this fall under?'
];

function renderLicenseBadge(license) {
    if (license === "MIT") {
      licenseBadge = '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)';
    }
    else if (license === 'Mozilla Publice License 2.0') {
      licenseBadge = '[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)';
    }
    else if (license === 'Attribution-ShareAlike 4.0 International') {
      licenseBadge = '[![License: CC BY-SA 4.0](https://img.shields.io/badge/License-CC%20BY--SA%204.0-lightgrey.svg)](http://creativecommons.org/licenses/by-sa/4.0/)';
    }
    else {licenseBadge = ''};
    return licenseBadge;
  }

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFileSync(`${fileName}.md`, data);
}

// TODO: Create a function to initialize app
function init() {
    inquirer.prompt([
        {
            type:'input',
            message: questions[0],
            name: 'projectName',
        },
        {
            type:'input',
            message: questions[1],
            name: 'motivation',
        },
        {
            type:'input',
            message:questions[2],
            name:'solves'
        },
        {
            type:'input',
            message:questions[3],
            name: 'learned'
        },
        {
            type:'input',
            message: questions[4],
            name: 'steps'
        },
        {
            type:'input',
            message: questions[5],
            name: 'usage'
        },
        {
            type:'input',
            message: questions[6],
            name: 'credits'
        },
        {
            type:'input',
            message: questions[7],
            name: 'tests'
        },
        {
            type:'input',
            message: questions[8],
            name: 'email'
        },
        {
            type:'input',
            message: questions[9],
            name: 'github'
        },
        {
            type:'list',
            message: questions[10],
            name: 'license',
            choices: ['MIT', 'Mozilla Publice License 2.0', 'Attribution-ShareAlike 4.0 International', 'None'],
            default: 'Attribution-ShareAlike 4.0 International'
        }
    ])
    .then(answers => {
        let licenseBadge = renderLicenseBadge(answers.license);
        let fileName = `New_README`;
        let data = `
# ${answers.projectName} ${licenseBadge}

## Description

${answers.motivation}
${answers.solves}
${answers.learned}

## Table of Contents

[Installation](#Installation)

[Usage](#Usage)

[Contributing](#Contributing)

[Tests](#Tests)

[Questions](#Questions)

## Installation

<a id='Installation'></a>

${answers.steps}

## Usage

<a id='Usage'></a>

${answers.usage}

## Contributing

<a id='Contributing'></a>

${answers.credits}

## Tests

<a id='Tests'></a>

${answers.tests}

## Questions

<a id='Questions'></a>

Email: ${answers.email}

Github: [github.com/${answers.github}/](https://github.com/${answers.github}/)

## License

`;
    if (answers.license != 'None') {
        data += `${answers.projectName} is licensed under ${answers.license}`
    }
    writeToFile(fileName, data);
    })
}

// Function call to initialize app
init();

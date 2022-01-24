const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const fse = require('fs-extra');

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

let workers = []

const create = () => {
    //prompting user to enter info for new profile
    inquirer.prompt([
        {
            type: 'confirm',
            name: 'create',
            message: 'Do you want to create another employee profile?',
        }
    ])
        //if confirmed, adds new profile and writes a new file 
        .then(data => {
            if (data.create == true) {
                addEmployee()
            } else {
                const team = render(workers)
                render(workers)
                fse.outputFile('output/team.html', team, err => {
                    if (err) { console.log(err) }
                });
            }
        })
}

//questions for info necessary on profile
const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter your name',
        },
        {
            type: 'input',
            name: 'id',
            message: 'Enter your id',
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter your email',
        },
        {
            type: 'list',
            name: 'role',
            message: 'What is your role?',
            choices: ['Manager', 'Engineer', 'Intern'],
        }
    ])
        //if a manager role, adds manager exclusive properties
        .then(answers => {
            if (answers.role === 'Manager') {
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'officeNumber',
                        message: 'Please type your office number',
                    }
                ])
                    .then(manager1 => {
                        const manager = new Manager(answers.name, answers.id, answers.email, manager1.officeNumber)
                        workers.push(manager)
                        console.log(workers)
                        create()
                    })
                //adding intern exclusive properties
            } else if (answers.role === 'Intern') {
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'school',
                        message: `Enter intern's school name`,
                    }
                ])
                    .then(intern1 => {
                        const intern = new Intern(answers.name, answers.id, answers.email, intern1.school)
                        workers.push(intern)
                        console.log(workers)
                        create()

                    })
                //adding engineer exclusive properties
            } else if (answers.role === 'Engineer') {
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'github',
                        message: 'Enter github page for engineer',
                    }
                ])
                    .then(engineer1 => {
                        const engineer = new Engineer(answers.name, answers.id, answers.email, engineer1.github)
                        workers.push(engineer)
                        console.log(workers)
                        create()
                    })
            }
        })
        .catch(err => console.log(err))
}

//calls function to make the profile 
addEmployee()
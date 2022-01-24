const Employee = require('./Employee.js')

class Engineer extends Employee {
    constructor(name, id, email, github, role) {
        super(name, id, email)
        this.github = github
        this.role = 'Engineer'
    }
    getRole() {
        return 'Engineer'
    }
    getGithub() {
        return this.github
    }
}

module.exports = Engineer
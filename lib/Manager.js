const Employee = require('./Employee.js')

class Manager extends Employee {
    constructor(name, id, email, officeNumber, role) {
        super(name, id, email)
        this.officeNumber = officeNumber
        this.role = 'Manager'
    }
    getRole() {
        return 'Manager'
    }
    getOfficeNumber() {
        return this.officeNumber
    }
}

module.exports = Manager
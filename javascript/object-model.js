// Based on https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Details_of_the_Object_Model

/* 
The employee Example

        Employee
            |
    -----------------
    |               |
Manager         WorkerBee
                    |
            -----------------
            |               |
        SalesPerson     Engineer
*/


function Employee(name, dept){
    this.name = name || '';
    this.dept = dept || 'general';
}

function Manager(name, dept, reps){
    this.base = Employee;
    this.base(name, dept);
    this.reports = reps || [];
}

Manager.prototype = Object.create(Employee.prototype); // similar to new Employee; 1. is copying 2. is creating an instance
Manager.prototype.constructor = Manager;

function WorkerBee(){
    Employee.call(this);
    this.projects = [];
}

WorkerBee.prototype = Object.create(Employee.prototype);
WorkerBee.prototype.constructor = WorkerBee;

function SalesPerson() {
    WorkerBee.call(this);
    this.dept = 'sales';
    this.quota = 100;
 }
 SalesPerson.prototype = Object.create(WorkerBee.prototype);
 SalesPerson.prototype.constructor = SalesPerson;
 
 function Engineer() {
    WorkerBee.call(this);
    this.dept = 'engineering';
    this.machine = '';
 }
 Engineer.prototype = Object.create(WorkerBee.prototype)
 Engineer.prototype.constructor = Engineer;

 const jim = new Employee('Jim', 'marketing');
 console.log('Jim', jim);

 const sally = new Manager('Sally', 'accounting');
 console.log('Sally', sally);
 console.log('Sally instance of Employee?', (sally instanceof Employee));

 const mark = new WorkerBee;
 console.log('Mark', mark);

 const fred = new SalesPerson;
 console.log('Fred', fred);

 const jane = new Engineer;
 console.log('Jane', jane);
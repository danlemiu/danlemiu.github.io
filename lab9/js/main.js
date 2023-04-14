"use strict";

import {Person} from "./model/person.js" 
import {Employee} from  "./model/employee.js"

let persons = [
    new Person('Ana Smith', new Date('1998-12-15')),
    new Person('Bob Jone', new Date('1945-11-16')),
    new Person('Carlos Slim Helu', new Date('1976-09-24'))
];

for(let p in persons){
    console.log(persons[p].toString());
}

let emp = new Employee('Jim Hanson', new Date('2000-01-01'), '245.990.00', new Date('2023-01-01'));
emp.doJob('Software Engineer');
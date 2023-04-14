"use strict";

class Person {
    name;
    dateOfBirth;
    constructor(name, dateOfBirth){
        this.name = name;
        this.dateOfBirth = dateOfBirth;
    }
    getName(){ return this.name; }
    setName(name){ this.name = name; }
    getDateOfBirth(){ return this.dateOfBirth; }
    setDateOfBirth(date){ this.dateOfBirth = date; }
    toString(){
        return '{Name: ' + this.name + ', Date of Birth: ' + this.dateOfBirth + '}'; 
    }
}


export { Person } ;

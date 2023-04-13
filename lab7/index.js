"use strict";

//Question 1: Use Object literal

// let Student = {
//     firstName: "",
//     lastName: "",
//     grades: [],
//     inputNewGrade: function(newGrade){
//         this.grades.push(newGrade);
//     },
//     computeAverageGrade: function(){
//         let totalGrade = 0;
//         let numOfGrade = 0;
//         for(let grade in this.grades){
//             totalGrade += this.grades[grade];
//             numOfGrade++;
//         }
//         return totalGrade/numOfGrade;
//     }
// };

// let students = [
//     Object.create(Student, {
//         firstName: {value: "San"},
//         lastName: {value: "Jay"},
//         grades: {value: [3,3,4]}
//     }),
//     Object.create(Student, {
//         firstName: {value: "Ku"},
//         lastName: {value: "Mar"},
//         grades: {value: [3,3.5,4]}
//     }),
// ];
// console.log(students[0].firstName + ' ' + students[0].lastName);
// console.log('Average grade of [3,3,4]: ' + students[0].computeAverageGrade()); 
// students[0].inputNewGrade(4);
// console.log('Average grade of [3,3,4,4]: ' + students[0].computeAverageGrade()); 



//Question 2: Use constructor function

function Student(firstName, lastName, grades, ){
    this.firstName = firstName;
    this.lastName = lastName;
    this.grades = grades;
}
Student.prototype.inputNewGrade = function(newGrade){
    this.grades.push(newGrade);
}
Student.prototype.computeAverageGrade = function(){
    let totalGrade = 0;
        let numOfGrade = 0;
        for(let grade in this.grades){
            totalGrade += this.grades[grade];
            numOfGrade++;
        }
        return totalGrade/numOfGrade;
}

let students = [
    new Student ("San", "Jay",[3,3,4]),
    new Student ("Ku", "Mar",[3,3.6,4]),    
];

console.log(students[0].firstName + ' ' + students[0].lastName);
console.log('Average grade of [3,3,4]: ' + students[0].computeAverageGrade()); 
students[0].inputNewGrade(4);
console.log('Average grade of [3,3,4,4]: ' + students[0].computeAverageGrade());; 


//Question 3
Array.prototype.customSort = function(){
    return this.sort(function(a,b){
        return a - b;
    });
};
let array1 = [4,6,2,8,3];
console.log('Sort in ascending order of [4,6,2,8,3]: ' + array1.customSort());

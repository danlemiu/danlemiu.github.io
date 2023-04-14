"use strict";

//Question 1: Use Object literal

let Student1 = {
    firstName: "",
    lastName: "",
    grades: [],
    inputNewGrade: function(newGrade){
        this.grades.push(newGrade);
    },
    computeAverageGrade: function(){
        let totalGrade = 0;
        let numOfGrade = 0;
        for(let grade in this.grades){
            totalGrade += this.grades[grade];
            numOfGrade++;
        }
        return totalGrade/numOfGrade;
    }
};

let students1 = [
    Object.create(Student1, {
        firstName: {value: "San"},
        lastName: {value: "Jay"},
        grades: {value: [3,3,4]}
    }),
    Object.create(Student1, {
        firstName: {value: "Ku"},
        lastName: {value: "Mar"},
        grades: {value: [3,3.5,4]}
    }),
];

function computeAverageGradeOfAllStudents(students1){
    let sum = 0;
    let totalSum = 0;
    let totalLength = 0;
    for(let i = 0; i < students1.length; i++){
        let sum = 0;
        for(let j = 0; j < students1[i].grades.length; j++){
            sum += students1[i].grades[j];
        }
        totalSum += sum;
        totalLength += students1[i].grades.length;
    }
    return totalSum/totalLength;
}
console.log("---Use object literal---");
console.log(students1[0].firstName + ' ' + students1[0].lastName);
console.log('Average grade of [3,3,4]: ' + students1[0].computeAverageGrade()); 
students1[0].inputNewGrade(4);
console.log('Put new grade 4 to the grades list and the average grade of [3,3,4,4] is ' + students1[0].computeAverageGrade()); 
console.log('Grades of the second student: ' + students1[1].grades);
console.log('Average grade of 2 students: ' + computeAverageGradeOfAllStudents(students1));



//Question 2: Use constructor function

function Student2 (firstName, lastName, grades){
    this.firstName = firstName;
    this.lastName = lastName;
    this.grades = grades;
    this.inputNewGrade = function(newGrade){
        this.grades.push(newGrade);
    };
    this.computeAverageGrade = function(){
        let totalGrade = 0;
            let numOfGrade = 0;
            for(let grade in this.grades){
                totalGrade += this.grades[grade];
                numOfGrade++;
            }
            return totalGrade/numOfGrade;
    };
}

let students2 = [
    new Student2 ("San", "Jay",[3,3,4]),
    new Student2 ("Ku", "Mar",[3,4,4]),    
];

function computeAverageGradeOfAllStudents(students2){
    let sum = 0;
    let totalSum = 0;
    let totalLength = 0;
    for(let i = 0; i < students2.length; i++){
        let sum = 0;
        for(let j = 0; j < students2[i].grades.length; j++){
            sum += students2[i].grades[j];
        }
        totalSum += sum;
        totalLength += students2[i].grades.length;
    }
    return totalSum/totalLength;
}

console.log("---Use constructor function---");
console.log(students2[0].firstName + ' ' + students2[0].lastName);
console.log('Average grade of the first student [3,3,4]: ' + students2[0].computeAverageGrade()); 
students2[0].inputNewGrade(4);
console.log('Put new grade 4 to the grades list and the average grade of [3,3,4,4] is ' + students2[0].computeAverageGrade());; 
console.log('Grades of the second student: ' + students2[1].grades);
console.log('Average grade of 2 students: ' + computeAverageGradeOfAllStudents(students2));



//Question 3
Array.prototype.customSort = function(){
    return this.sort(function(a,b){
        return a - b;
    });
};
let array1 = [4,6,2,8,3];
console.log('Sort in ascending order of [4,6,2,8,3]: ' + array1.customSort());

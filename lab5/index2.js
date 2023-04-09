"use strict";

// 1. Define a function max() that takes two numbers as arguments and returns the largest of them. 
//Use the if-then- else construct available in Javascript.
function max(num1, num2) {
    if(num1 > num2){
        return num1;
    } else {
        return num2;
    }
}
console.log(max(10,3));

//2. Define a function maxOfThree() that takes three numbers as arguments and returns the largest of them.
function maxofThree(num1, num2, num3){
    // num1 = -Infinity;
    if(num1 >= num2 && num1 >= num3){
        return num1;
    } else {
        if(num2 >= num1 && num2 >= num3){
            return num2;
        } else {
            return num3;
        }
    }
}
console.log(maxofThree(1,3,2));

//3. Write a function isVowel() that takes a character (i.e. a string of length 1) and returns true if it is a vowel, false otherwise.
function isVowel(char){
    var vowels = ['a', 'e', 'i', 'o', 'u'];
    if(vowels.includes(char.toLowerCase())){
        return true;
    } else {
        return false;
    }
}
console.log(isVowel('b'));
console.log(isVowel('u'));

//4. Define a function sum() and a function multiply() that sums and multiplies (respectively) all the numbers in an input array of numbers. 
//For example, sum([1,2,3,4]) should return 10, and multiply([1,2,3,4]) should return 24. Note/Hint: Do these using Imperative programming approach (i.e. for...loop or while...loop)
function sum(numbers){
    let sum = 0;
    for(let i = 0; numbers.length; i++){
        sum += numbers[i];
    }
    return sum;
}

function multiply(numbers){
    let result = 1;
    for (let i = 0; numbers.length; i++){
        result *= numbers[i];
    }
    return result;
}
let myNumbers = [1,2,3,4];
console.log(sum(myNumbers));
console.log(multiply(myNumbers));
"use strict";

// 1. Define a function max() that takes two numbers as arguments and returns the largest of them. 
//Use the if-then- else construct available in Javascript.

function max (num1, num2) {
    if(num1 > num2){
        return num1;
    } else {
        return num2;
    }
}
console.log('Max of (10, 3): ' + max(10,3));

//2. Define a function maxOfThree() that takes three numbers as arguments and returns the largest of them.

function maxofThree (num1, num2, num3){
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
console.log('Max of (1,3,2): ' + maxofThree(1,3,2));

//3. Write a function isVowel() that takes a character (i.e. a string of length 1) and returns true if it is a vowel, false otherwise.

function isVowel(char) {
    var vowels = ['a', 'e', 'i', 'o', 'u'];
    if(vowels.includes(char.toLowerCase())){
        return true;
    } else {
        return false;
    }
}
console.log('b is a vowel: ' + isVowel('b'));
console.log('u is a vowel: ' + isVowel('u'));

//4. Define a function sum() and a function multiply() that sums and multiplies (respectively) all the numbers in an input array of numbers. 
//For example, sum([1,2,3,4]) should return 10, and multiply([1,2,3,4]) should return 24. Note/Hint: Do these using Imperative programming approach (i.e. for...loop or while...loop)

function sum(arr) {
    let sum = 0;
    for(let i of arr){
        sum += i;
    }
    return sum;
}
console.log('Sum of [1,2,3,4]: ' + sum([1,2,3,4]));

function multiply(arr) {
    let result = 1;
    for (let i of arr){
        result *= i;
    }
    return result;
}
console.log('Multiply of [1,2,3,4]: ' + multiply([1,2,3,4]));


//5. Define a function reverse() that computes the reversal of a string. For example, reverse("jag testar") should return the string "ratset gaj".

function reverse(str) {
    let reversedStr = '';
    for ( let i = str.length - 1; i >= 0; i--){
        reversedStr += str.charAt(i);
    }
    return reversedStr;
}
console.log('Reverse of "jag testar": ' + reverse("jag testar"));

//6. Write a function findLongestWord() that takes an array of words and returns the length of the longest one.

function findLongestWord(arr) {
    let longest = arr[0].length;
    for (let i = 1; i < arr.length; i++){
        if (arr[i].length > longest){
            longest = arr[i].length;
        }
    }
    return longest;
}
console.log('Length of the longest word of ["It", "is", "a", "wonderful", "day"]: ' + findLongestWord(["It", "is", "a", "wonderful", "day"]));

//7. Write a function filterLongWords() that takes an array of words and an integer i and returns a new array containing only those words that were longer than i characters.

function filterLongWords(arr, i) {
    return arr.filter(a => a.length > i);
}
console.log('Words longer than 2 of ["It", "is", "a", "wonderful", "day"]: ' + filterLongWords(["It", "is", "a", "wonderful", "day"], 2));

//8. Write a function named, computeSumOfSquares, that takes as input, an array of numbers and calculates 
//and returns the sum of the squares of each number in the input array. E.g. computeSumOfSquares([1,2,3]) should be computed as 12 + 22 +32 = 14. 
//Note: Write your Javascript code without using Imperative programming. i.e. 
//Do NOT use any explicit looping construct; instead use functional programming style/approach.

function computeSumOfSquares(arr) {
    return arr.reduce((x, y) => x + y*y, 0);
}
console.log('Sum of square of [1,2,3]: ' + computeSumOfSquares([1,2,3]));

//9. Write a function named, printOddNumbersOnly, that takes as input, an array of integral numbers and it finds and prints only the numbers which are odd.

function printOddNumbersOnly(arr) {
    return arr.filter(n => n % 2 != 0);
}
console.log('Odd number of [1,2,3,4,5]:' + printOddNumbersOnly([1,2,3,4,5]));

//10. Write a function named, computeSumOfSquaresOfEvensOnly, that takes as input, an array of integral numbers 
//and calculates and returns the sum of the squares of only the even numbers in the input array. 
//E.g. computeSumOfSquaresOfEvensOnly ([1,2,3,4,5]) should be computed as 22 +42 = 20.

function computeSumOfSquaresOfEvensOnly(arr) {
    return arr.filter(n => n % 2 == 0)
            .reduce((x,y) => x + y*y, 0);
}
console.log('Sum of square of even numbers of [1,2,3,4,5]: ' + computeSumOfSquaresOfEvensOnly([1,2,3,4,5]));

//11. Using the Array.reduce(...) function, re-implement your functions, sum(...) and multiply(...) 
//(defined in Problem 4 above) without using Imperative programming. 
//i.e. Do NOT use any explicit looping construct; instead use functional programming style/approach.

function sum(arr) {
    return arr.reduce((x,y) => x + y, 0);
}
console.log('Sum of [1,2,3,4]: ' + sum([1,2,3,4]));

function multiply(arr) {
    return arr.reduce((x,y) => x*y, 1);
}
console.log('Multiply of [1,2,3,4]: ' + multiply([1,2,3,4]));

//12. Implement Javascript code for a function named, findSecondBiggest, which takes as input, an array of numbers 
//and finds and returns the second biggest of the numbers. 
//For example, findSecondBiggest([1,2,3,4,5]) should return 4. And findSecondBiggest([19,9,11,0,12]) should return 12. (Note: Do not use sorting!)

function findSecondBiggest(arr) {
    let max = arr[0];
    let secondMax = arr[1];
    let temp;
    for( let i = 2; i < arr.length; i++){
        if(arr[i] > max){
            secondMax = max;
            max = arr[i];
        } else {
            if(arr[i] < max && arr[i] >= secondMax){
                secondMax= arr[i]; 
            }
        }
    }
    return secondMax;
}
console.log('Second biggest of [1,2,3,4,5]: ' + findSecondBiggest([1,2,3,4,5]));

//13. Write a function named printFibo, that takes as input, a given length, n, and any two starting numbers a and b, 
//and it prints-out the Fibonacci sequence, e.g. (0, 1, 1, 2, 3, 5, 8, 13, 21, 34,...) of the given length, beginning with a and b. 
//(e.g. printFibo(n=1, a=0, b=1), prints-out: "0", as output; printFibo(n=2, a=0, b=1), prints-out: "0, 1", as output; 
//printFibo(n=3, a=0, b=1), prints-out: "0, 1, 1", as output; printFibo(n=6, a=0, b=1), prints-out: "0, 1, 1, 2, 3, 5", as output; 
//and printFibo(n=10, a=0, b=1), prints-out: "0, 1, 1, 2, 3, 5, 8, 13, 21, 34", as output).

function fibonacci(i) {
    if(i <= 1){
        return i;
    } else {
        return fibonacci(i-1) + fibonacci(i-2);
    }

}

function printFibo(n, a, b) {
    if(n == 1){
        return a;
    }
    let fibo = [];
    fibo.push(a);
    fibo.push(b);
    for (let i = 2; i < n; i++){
        fibo.push(fibo[fibo.length - 1] + fibo[fibo.length - 2]);
    }
    return fibo;
}
console.log('Fibonacci of (n=5, a=0, b=1): ' + printFibo(10,0,1));


//14. Use Array Methods: filter, map, reduce, etc to implement functions below:
//      1. Create a function using function declaration named sum with one parameter of Array type, 
//      the returned result is the sum of all elements which are greater than 20.

function sum(arr) {
    return arr.filter(a => a > 20).reduce((x,y) => x + y, 0);
}
console.log('Sum of number > 20 of [1,39,27,15]: ' + sum([1,39,27,15]));

//      2. Create a function using function expression named getNewArray with one parameter of String Array, 
//      return a new array which contains all string, length is greater than and equal to 5, and contains letter ‘a’.

function getNewArray(arr) {
    return arr.filter(a => a.length > 5).filter(a => a.indexOf('a') >= 0);
}
console.log('Length >= 5 and contains letter a of [declaration, array, greater, function]: ' + getNewArray(["declaration", "array", "greater", "function"]));





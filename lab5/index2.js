"use strict";

// 1
function max(num1, num2) {
    if(num1 > num2){
        return num1;
    } else {
        return num2;
    }
}
console.log(max(10,3));

//2
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

//3
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

//4

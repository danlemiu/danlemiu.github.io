"use strict";

//Question 1

function askPassword(ok, fail){
    let password = prompt("Password?", '');
    if (password == "rockstar") ok();
    else fail();
}

let user = {
    name: 'John',

    loginOk() {
        alert(`${this.name} logged in`);
    },

    loginFail(){
        alert(`${this.name} fail to log in`);
    },
};

//askPassword(user.loginOk, user.loginFail);

//Use wrapper
askPassword(() => user.loginOk(), () => user.loginFail());

//Use bind
let bindAskPassword = askPassword.bind(user, () => user.loginOk(), () => user.loginFail());
bindAskPassword();

//Use call
askPassword.call(user, () => user.loginOk(), () => user.loginFail());

//Use apply
askPassword.apply(user, [() => user.loginOk(), () => user.loginFail()]);


//Question 2

let group = {
    title: "Our Group",
    students: ["John", "Pete", "Alice"],
    showList: function() {
        this.students.forEach(function(student) {
            console.log(this.title + ": " + student);
        }.bind(this));
    }
};
group.showList();
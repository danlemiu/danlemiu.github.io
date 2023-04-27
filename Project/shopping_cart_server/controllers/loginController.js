const User = require('../models/user');

exports.login = (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;

    const user = User.login(username, password);
    if (user != undefined) {
        res.status(200).json(user);
    } else {
        next(new Error('Invalid username or password!'));
    }
};
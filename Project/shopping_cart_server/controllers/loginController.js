const User = require('../models/user');

exports.login = (req, res, next) => {  
    const user = User.login(req.body.username, req.body.password);
    if (user != undefined && user != null)
    {
        res.status(200).json(user);
    }
    else
    {
        next(new Error('Invalid username or password!'));
    }
};
const db  = require('../db');
const md5 = require('md5');

module.exports.login = function(req, res){
    res.render('auth/login');
}
module.exports.logout = function(req, res){
    res.clearCookie('userId');
    res.render('auth/login');
}
module.exports.postLogin = function(req, res){
    let email    = req.body.email;
    let password = req.body.password;
    let user = db.get('users').find({email:email}).value();
    if(!user){
        res.render('auth/login',{
            errors: [
                'User dose not exists.'
            ],
            values: req.body
        });
        return;
    }
    var hashedPassword  = md5(password)
    if(user.password !== hashedPassword){
        res.render('auth/login',{
            errors: [
                'Wrong password.'
            ],
            values: req.body
        });
        return;
    }
    res.cookie('userId',user.id ,{
        signed:true 
    });
	res.redirect('/users');
}
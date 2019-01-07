const db = require('../db');
const shortid = require('shortid');
module.exports.index = function(req, res){
	var page = parseInt(req.query.page) || 1; //n
	var perPage = 8;
	var start = (page - 1) * perPage;
	var end = page * perPage;
    res.render('users/index', {
        users: db.get('users').value().slice(start,end)
    });
}
module.exports.search = function (req, res) {
	var q = req.query.q;
	var matchedUsers = db.get('users').value().filter(function(user) {
		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	});
	res.render('users/index',{
		users:matchedUsers
	});
}
module.exports.create = function(req, res){
    res.render('users/create');
}
module.exports.delete = function(req, res){
	db.get('users').remove({ id: req.params.id }).write();
    res.render('users/index', {
        users: db.get('users').value()
    });
}
module.exports.get = function (req, res) {
	var id = req.params.id;
	var user = db.get('users').find({id: id}).value();
	res.render('users/view',{
		user: user
	});
}
module.exports.postCreate = function(req, res){
	req.body.id = shortid.generate();
	req.body.avatar = 'uploads/'+req.file.filename;
	db.get('users').push(req.body).write();
	res.redirect('/users');
}
module.exports.update = function(req, res){
	let id = req.body.id;
	let errors = [];
	if(!req.body.name){
		errors.push('Name is required.');
	}
	if(!req.body.phone){
		errors.push('Phone is required.');
	}
	if(errors.length){
		res.render('users/view',{
			errors: errors,
			values: req.body
		});
		return;
	}
	req.body.avatar = req.file.path.split('/').slice(1).join('/');
	db.get('users').find({ id: id }).assign(req.body).write();
	res.redirect('/users');
}
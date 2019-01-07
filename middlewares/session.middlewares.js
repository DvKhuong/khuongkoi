const shortid = require('shortid');
const db = require('../db');
module.exports = function(req, res, next){
    sessionId = shortid.generate();
    if(!req.signedCookies.sessionId){
        res.cookie('sessionId', sessionId,{
            signed:true
        });
        db.get('session').push({
            id: sessionId
        }).write();
    }
    next();
}
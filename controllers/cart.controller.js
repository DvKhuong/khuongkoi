const db = require('../db');
module.exports.addToCart = function(req, res){
    var productId = req.params.productId;
    var sessionId = req.signedCookies.sessionId;
    if(!sessionId){
        res.redirect('/products');
        return;
    }
    var count = db.get('session').find({ id:sessionId }).get('cart.' + productId, 0).value();
    var total = db.get('session').find({ id:sessionId }).get('cart').size().value();
    db.get('session').find({ id: sessionId}).set('cart.'+productId, count+1).write();
    
    res.redirect('/products',{
        total:total
    });
}
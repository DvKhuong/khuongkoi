const express = require('express');
var multer  = require('multer')

const controller = require('../controllers/user.controller');
const validate = require('../validate/user.validate');
const AuthMiddlewares = require('../middlewares/auth.middlewares');

var upload = multer({ dest: './public/uploads/' })
const router  = express.Router();

router.get('/cookie',function(req, res, next){
    res.cookie('user-id',123);
    res.send('helllo');
});

router.get('/', AuthMiddlewares.requireAuth, controller.index);

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/view/:id', controller.get);
router.get('/delete/:id', controller.delete);
router.post('/create', upload.single('avatar'), validate.postCreate , controller.postCreate);
router.post('/update', controller.update);
module.exports = router;
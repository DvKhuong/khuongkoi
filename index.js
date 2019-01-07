require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);

var userRoutes    = require('./routes/user.route');
var authRoutes    = require('./routes/auth.route');
var productRoutes = require('./routes/product.route');
var cartRoutes    = require('./routes/cart.route');


var authMiddleware    = require('./middlewares/auth.middlewares');
var sessionMiddleware = require('./middlewares/session.middlewares');

const port = 3000;
const app = express();
app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware);

var apiProductRoute    = require('./api/routes/product.route');

app.use(express.static('public'));

app.get('/', (req, res) => res.render('index',{'name':'Khươngdv'}));

app.use('/users', authMiddleware.requireAuth ,userRoutes);
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/api/products', apiProductRoute);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
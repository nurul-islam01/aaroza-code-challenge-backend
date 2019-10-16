const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const actorsRoute = require('./api/routes/actors');
const moviesRoute = require('./api/routes/movies');
const usersRoute = require('./api/routes/users');
const errorHandler = require('./api/handlers/Error');

const app = express();

mongoose.connect("mongodb+srv://"+ process.env.MONGO_ATLAS_USERNAME +":"+ process.env.MONGO_ATLAS_PW +"@rest-one-zlrdl.mongodb.net/aaroza?retryWrites=true&w=majority",
    {useUnifiedTopology: true,
        useNewUrlParser: true,});
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use((req, res, next)=> {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Requested-With, Accept, Authorization');
    if (req.method === 'OPTIONS'){
        res.setHeader('Access-Control-Allow-Methods', 'PUT, GET POST, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
});
app.use(morgan('dev'));

app.use('/api/actors', actorsRoute);
app.use('/api/movies', moviesRoute);
app.use('/api/user', usersRoute);

app.use(errorHandler.errorSet);
app.use(errorHandler.errorHandle);
module.exports = app;

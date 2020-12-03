const express = require('express');
const url = express();
const morgan = require('morgan');

const login = require('./routes/Login');
const principal = require('./routes/Principal');

const bodyParser = require('body-parser');
const notFoundHandler = require('./middleware/notFoundHandler');
const corsHandler = require('./middleware/corsHandler');
const autentificar = require('./middleware/autentificar');

url.use(corsHandler);
url.use(morgan('dev'));
url.use(bodyParser.json());
url.use(bodyParser.urlencoded({ extended: true }));


url.use("/Login",login);
url.use(autentificar);
url.use("/Principal", principal);
url.use(notFoundHandler);
url.listen(3000,()=>{
    console.log("Server is running");
})
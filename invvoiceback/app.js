const express = require('express')

const app = express()
const bodyParser = require('body-parser')


const cors = require('cors')
const mongoose = require('mongoose')



//CONTORLLERS
const loginRouter = require('./controllers/login');
const usersRouter = require('./controllers/users');
const companiesRouter = require('./controllers/companies');
const businessPartnerRouter = require('./controllers/businessPartners');
const salesInvoiceRouter = require('./controllers/salesInvoices');
const accessRightsRouter = require('./controllers/accessRights');

//UTILS
const config = require('./utils/config');
const middleware = require('./utils/middleware');



console.log('connecting to', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then((result) => {
    console.log('connected to mongo db');
  })
  .catch((err) => {
    console.log('error connecting to mongobd', err.message);
  });

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method);
  console.log('Path:  ', request.path);
  console.log('Body:  ', request.body);
  console.log('---');
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(cors());
app.use(bodyParser.json());
// app.use(middleware.requestLogger);

app.use(middleware.tokenExtractor);




app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/company', companiesRouter)
app.use('/api/businessPartner', businessPartnerRouter)
app.use('/api/salesInvoice', salesInvoiceRouter)

app.use('/api/access', accessRightsRouter)


// app.use(middleware.errorHandler);
// app.use(middleware.unknownEndpoint);


module.exports = app

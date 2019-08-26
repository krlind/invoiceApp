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

const middlewareAuth = require('./utils/middleware.endpoint.auth')
const companyCodeAuth = require('./utils/middleware.companyCodeAuth')



console.log('connecting to', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then((result) => {
    console.log('connected to mongo db');
  })
  .catch((err) => {
    console.log('error connecting to mongobd', err.message);
  });




app.use(cors());
app.use(bodyParser.json());
app.use(middleware.requestLogger);


app.use('/api/login', loginRouter)
app.use(middleware.tokenExtractor);


app.use('/api/salesInvoice', companyCodeAuth.validateAccessForComapnyCode, salesInvoiceRouter)
app.use('/api/businessPartner/', companyCodeAuth.validateAccessForComapnyCode, businessPartnerRouter)


app.use('/api/company', middlewareAuth.endpointAuth, companiesRouter)
app.use('/api/users', usersRouter)

//MIKSI ACCEESS ROUTE EI OLE SUOJATTTU!!!! teee company creatin oma end point
app.use('/api/access', accessRightsRouter)


app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);



module.exports = app

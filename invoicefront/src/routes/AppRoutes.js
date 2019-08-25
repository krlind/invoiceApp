import React from 'react';
import { Route, Switch } from 'react-router-dom'
import ProtectedRoute from './protected.route'

import Home from '../containers/home/Home'
import CustomerMasterData from '../containers/createCustomer/CustomerMasterData'
import CreateSalesInvoice from '../containers/createSalesInvoice/CreateSalesInvoice'
import CreatePurchaseInvoice from '../containers/createPurchaseInvoice/CreatePurchaseInvoice'
import Login from '../containers/login/login'
import NotFound from '../containers/notFound/NotFound'
import CompanyHomePage  from '../containers/companyHomePage/companyHomePage'

import MiniDrawer from '../components/navDrawer/navDraver'

  

const AppRoutes = ( 
  <Switch>
    <Route exact path='/login' component={Login} />

    <MiniDrawer>
      <ProtectedRoute path='/home' component={Home} /> 
      <ProtectedRoute path='/CustomerMasterData/:id' component={CustomerMasterData} />
      <ProtectedRoute path='/createSalesInvoice/:id' component={CreateSalesInvoice} />
      <ProtectedRoute path='/createPurchaseInvoice/:id' component={CreatePurchaseInvoice} />
      <ProtectedRoute path='/comphome/:id' component={CompanyHomePage} /> 
    </MiniDrawer>

    <Route path='/' component={NotFound} />
  </Switch>
)



export default AppRoutes
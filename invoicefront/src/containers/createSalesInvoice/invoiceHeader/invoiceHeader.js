import React from 'react'

import { Card, CardBody, CardHeader, Col,  FormGroup } from 'reactstrap'
import "react-datepicker/dist/react-datepicker.css";

import '../form.css'
import './invoiceHeader.styles.scss'

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

import { DateTime } from 'luxon'
import InvoiceItem from '../../../components/invoice-item/invoiceItem.component'

const InvoiceHeader = ({ salesInvoice, setSalesInvoice, businessPartner }) => {

  const formatDate = (dateObject, luxonFormat) =>
  DateTime.fromJSDate(dateObject)
    .toFormat(luxonFormat)

  if ( businessPartner.length === 0 ){
    return null
  }

  const handleDateChange = (name) => (e)  => {
    const dateValue = formatDate(e, "yyyy-MM-dd")
    setSalesInvoice({ ...salesInvoice, [name]: dateValue})
  }
    
  //DROP DOWN TO PAYMENT TERMS
	return(
    <div className="mt-3">
      <Col >
        <Card className="">
          <CardHeader className="header text-white font-weight-bold">Invoice Header</CardHeader>
          <CardBody>

            <FormGroup row className="my-0">
            <Col xs="3">
            <InvoiceItem className="left" text="Invoice Number" value="1000" />
            <InvoiceItem className="left" text="Reference Number" value="1003" />          
            <InvoiceItem className="left" text="Payment Term" value="14 Days" />
            </Col>
            <Col xs="3">
            
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="yyyy-MM-dd"
                  margin="dense"
      
                  label="Invoice Date"
                  value={formatDate(salesInvoice.invoiceDate, "yyyy-MM-dd")}
                  selected={salesInvoice.invoiceDate}
                  
                  onChange={handleDateChange('invoiceDate')}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }} 
                />

                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="yyyy-MM-dd"
                  margin="dense"
      
                  label="Accounting Date"
                  value={formatDate(salesInvoice.accountingDate, "yyyy-MM-dd")}
                  selected={formatDate(salesInvoice.accountingDate, "yyyy-MM-dd")}
                
                  onChange={handleDateChange('accountingDate')}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>

              <InvoiceItem className="left" text="Due Date" value="pmt term + invoice date"/>

            </Col>
            <Col xs="3">
              <InvoiceItem text="Customer's Name" value={businessPartner.businessPartnerName} />
              <InvoiceItem text="VAT Number" value={businessPartner.vatNumber} />
              <InvoiceItem text="Street Name" value={businessPartner.addressDetails[0].streetName} />
            </Col>
            <Col xs="3">
              <InvoiceItem text="Postal Code" value={businessPartner.addressDetails[0].postalCode} />
              <InvoiceItem text="Email Address" value={businessPartner.contactDetails[0].emailAddress} />
              <InvoiceItem text="Phone Number" value={businessPartner.contactDetails[0].phoneNumber} />
            </Col>
            </FormGroup>
          </CardBody>
        </Card>
      </Col>

      
    </div>

	)
}

export default InvoiceHeader



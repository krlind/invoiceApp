import React  from 'react'

import {Card, CardBody, CardHeader, Col } from 'reactstrap'
import Table from 'react-bootstrap/Table'

import '../form.css'

import LineDisplay from './lineDisplay'


const InvoiceLine = ({ salesInvoice, setSalesInvoice }) => {

  const onChange = (index) => (e) => {
    let lines = salesInvoice.lines.map((item, i) => {
      if (index !== i ) return item
      return {...item, 
        [e.target.name]: e.target.value, 
        priceWithVat: item.priceWithoutVat * item.quantity * (1 + item.vatPct),
        vatAmount: item.priceWithoutVat * item.quantity * item.vatPct
      }
    })
    setSalesInvoice({...salesInvoice, lines})
  }

  const addRow = (e) => {
    console.log(e.target)
    let lines = {
      lines: salesInvoice.lines.concat([
        {
          lineDescription: '',
          priceWithoutVat: 0,
          quantity: 0,
          vatPct: 0,
          priceWithVat: 0,
          vatAmount: 0
        }
      ])
    }
    setSalesInvoice( Object.assign({...salesInvoice}, lines ) )
  }



  const calcLineItemsTotal = () => {
    return salesInvoice.lines.reduce((prev, cur) => (prev + (cur.quantity * cur.priceWithoutVat)), 0)
  }

  const calcVatTotal = () => {
    return salesInvoice.lines.reduce((prev, cur) => (prev + (cur.quantity * cur.priceWithoutVat * cur.vatPct)), 0)
  }

  const calcGrandTotal = () => {
    return calcLineItemsTotal() + calcVatTotal()
  }

	return(
    <div className="mt-3">
      <Col >
      <Card className="mt-3">
          <CardHeader className="header text-white font-weight-bold">Invoice Lines</CardHeader>
          <CardBody>
            <div className="invoice-line-controls mb-3">
              <button 
                type="submit"
                onClick={addRow} 
              >+ Add Line
              </button>
            </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Description</th>
                <th>Price Without VAT</th>
                <th>Quantity</th>
                <th>VAT %</th>
                <th>Price with VAT</th>
                <th>VAT Amount</th>
              </tr>
            </thead>
            <tbody>
              {
                salesInvoice.lines.map((line, i) => 
                  <LineDisplay 
                    key={i}
                    i={i}
                    data={line}
                    onChange={onChange}

                  />
                )
              }
            </tbody>
          </Table>

          <div className="totals mt-5">
            <div>Sum without VAT: {calcLineItemsTotal()}</div>
            <div>VAT Amount: {calcVatTotal()}</div>
            <div>Total: {calcGrandTotal()}</div>
          </div>
          </CardBody>
        </Card>
      </Col>
    </div>

	)
}

export default InvoiceLine

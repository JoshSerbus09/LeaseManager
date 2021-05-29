import { Jumbotron, Nav } from 'react-bootstrap';
import './App.css';

import LeaseDashboard from './Components/LeaseDashboard';
import Button from 'react-bootstrap/Button';

function LeaseManager() {
  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
        integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
        crossorigin="anonymous"
      />
        <Jumbotron className="MainJumbotron">
          <h1>Lease Management Dashboard</h1>
        </Jumbotron>

        <Nav>
          <Nav.Link title="Leases"><Button title="Import">Leases</Button></Nav.Link>
          <Nav.Link title="Import"><Button title="Import">Import</Button></Nav.Link>
          <Nav.Link title="Export"><Button title="Import">Export</Button></Nav.Link>
        </Nav>

        <LeaseDashboard />
    </div>
  );
}

var testData = [
  {id:"0", name:"lease1", startDate:"01/01/2020", endDate:"12/31/2020", paymentAmount:"$500.00", numPayments:"12", interestRate:"4.2%"}, 
  {id:"1", name:"lease2", startDate:"01/01/2019", endDate:"12/31/2020", paymentAmount:"$200.00", numPayments:"24", interestRate:"3.5%"}, 
  {id:"2", name:"lease3", startDate:"01/01/2020", endDate:"07/01/2020", paymentAmount:"$500.00", numPayments:"6", interestRate:"7.2%"}, 
  {id:"3", name:"lease4", startDate:"01/01/2020", endDate:"12/31/2020", paymentAmount:"$500.00", numPayments:"12", interestRate:"4.2%"}, 
  {id:"4", name:"lease5", startDate:"01/01/2020", endDate:"12/31/2020", paymentAmount:"$500.00", numPayments:"12", interestRate:"4.2%"}, 
  {id:"5", name:"lease6", startDate:"01/01/2020", endDate:"12/31/2020", paymentAmount:"$500.00", numPayments:"12", interestRate:"4.2%"}, 
]

export default LeaseManager;

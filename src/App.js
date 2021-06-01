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


export default LeaseManager;

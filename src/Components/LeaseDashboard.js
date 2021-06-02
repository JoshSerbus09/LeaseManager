import React, { Component } from 'react';

import Table from 'react-bootstrap/Table';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

import { GetLeaseHeaderRows } from '../Utils/GlobalConstants.js';
import LeaseManagerAPIService  from '../Services/LeaseManagerAPIService.js';
import LeaseImportModal  from './LeaseImportModal.js';


class LeaseDashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            leases: [],
            shouldShowModal: false
        };
    }
    
    componentDidMount() {
        LeaseManagerAPIService.GetAllLeases().then(result => {
            this.setState({
                leases: result.data
            });
        });
    }

    getLeases = () => {
        return this.state.leases;
    }
    
    render() {  
        return (
           
            <div className="LeaseDashboard">
                <Nav>
                    <Nav.Link title="Leases"><Button title="Import" onClick={() => this.setState({shouldShowModal: true})}>Import</Button></Nav.Link>
                    <Nav.Link title="Export"><Button title="Import">Export</Button></Nav.Link>
                </Nav>
                
                <Table 
                    responsive
                    striped
                    bordered
                    hover
                    empty="No Data Yet">
                    <thead>
                        <tr>
                            {Array.from(GetLeaseHeaderRows()).map((item, ix) => {
                                return <th key={ix}>{item}</th>
                            })}
                        </tr>
                    </thead>

                    <tbody>
                        {Array.from(this.getLeases()).map((row, ix) => {
                            return <tr key={ix}>
                                <td>{row.Name}</td>
                                <td>{new Date(row.StartDate).toLocaleDateString()}</td>
                                <td>{new Date(row.EndDate).toLocaleDateString()}</td>
                                <td>{row.PaymentAmount.toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD'
                                })}</td>
                                <td>{row.NumPayments}</td>
                                <td>{row.InterestRate.toFixed(2) + ' %'}</td>
                            </tr>
                        })}
                    </tbody>
                </Table>
                
                <LeaseImportModal shouldShowModal={this.state.shouldShowModal}/>
            </div>
        );
    }
}

export default LeaseDashboard;


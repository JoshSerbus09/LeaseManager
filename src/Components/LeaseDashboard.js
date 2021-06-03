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

        this.getLeases = this.getLeases.bind(this);
        this.hideImportModal = this.hideImportModal.bind(this);
        this.updateLeases = this.updateLeases.bind(this);
        this.exportLeases = this.exportLeases.bind(this);

        this.state = {
            selectedLeaseRows: null,
            leases: [],
            shouldShowModal: false
        };
    }
    
    componentDidMount() {
        this.updateLeases();
    }

    getLeases = () => {
        if (this.state.leases.length === 0)
        {
            this.updateLeases();
        }

        return this.state.leases;
    }

    hideImportModal = () => {
        this.setState({
            shouldShowModal: false
        });
    }
    
    updateLeases = () => {
        LeaseManagerAPIService.GetAllLeases().then(result => {
            this.setState({
                leases: result.data
            });
        });
    }

    exportLeases = () => {
        var leasesJson = JSON.stringify(this.getLeases());
        var fileBlob = new Blob([leasesJson], {type: 'application/json'});
        var url = URL.createObjectURL(fileBlob);

        var element = document.createElement('a');

        element.href = url
        element.download = 'leases_export.json';
        
        element.click();
    }
    
    render() {  
        return (
           
            <div className="LeaseDashboard">
                <Nav>
                    <Nav.Link title="Leases">
                        <Button title="Import" onClick={() => this.setState({shouldShowModal: true})}>
                            Import
                        </Button>
                    </Nav.Link>
                    
                    <Nav.Link title="Export">
                        <Button title="Export" onClick={this.exportLeases}>
                            Export
                        </Button>
                    </Nav.Link>
                </Nav>
                
                <Table 
                    columns
                    data={this.getLeases()}
                    responsive
                    striped
                    bordered
                    hover >
                    <thead>
                        <tr>
                            {Array.from(GetLeaseHeaderRows()).map((item, ix) => {
                                return <th key={ix}>{item}</th>
                            })}
                        </tr>
                    </thead>

                    <tbody>
                        {this.getLeases().map((row, ix) => {
                            return (
                                <tr key={ix}>
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
                            );}
                        )}
                    </tbody>
                </Table>
                
                <LeaseImportModal shouldShowModal={this.state.shouldShowModal} 
                    updateLeases={this.updateLeases}
                    hideImportModal={this.hideImportModal}/>
            </div>
        );
    }
}

export default LeaseDashboard;


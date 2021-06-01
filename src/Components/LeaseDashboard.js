import React, { Component } from 'react';

import Table from 'react-bootstrap/Table';

import { GetLeaseHeaderRows } from '../Utils/GlobalConstants.js';
import LeaseManagerAPIService  from '../Services/LeaseManagerAPIService.js';

class LeaseDashboard extends Component {
    componentDidMount() {
        LeaseManagerAPIService.GetAllLeases().then(result => {
            this.setState({
                leases: result.data
            });
        });
    }

    getLeases = () => {
        if (this.state == null)
        {
            return [];
        }

        return this.state.leases;
    }
    
    render() {
        return (
            <div className="LeaseDashboard">
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
            </div>
        );
    }
}

export default LeaseDashboard;

import {Component} from 'react';

import {Card} from 'react-bootstrap';
import '../Styling/LeaseItem.css';

class LeaseItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Id: props.lease.Id,
            Name: props.lease.Name,
            StartDate: props.lease.StartDate,
            EndDate:props.lease.EndDate,
            PaymentAmount: props.lease.PaymentAmount,
            NumPayments: props.lease.NumPayments,
            InterestRate: props.lease.InterestRate,
            IsValid: props.lease.IsValid,
            Messages: []
        };
    }



    render(){
        const getInterestRateString = () => {
            let rawInterestRate = (this.state.InterestRate);

            return (rawInterestRate * 100.0).toFixed(2) + ' %';
        };

        const getPaymentAmountString = () => {
            return '$' + (this.state.PaymentAmount * 1.00).toFixed(2);
        }

        return (
            <Card>
                <Card.Title>
                    <div className='li-title'>
                        {this.state.Name}
                    </div>
                </Card.Title>

                <Card.Body>
                <div className='li-body'>
                    <div class='li-info-container'>
                        <label for="lease-start-date">Start Date</label><br />
                        <p name="lease-start-date">{this.state.StartDate}</p>
                    </div>
                    

                    <div class='li-info-container'>
                        <label for="lease-end-date">End Date</label><br />
                        <p name="lease-end-date">{this.state.EndDate}</p>
                    </div>
                    

                    <div class='li-info-container'>
                        <label for="lease-payment-amount">Payment Amount</label><br />
                        <p name="lease-lease-payment-amount">{getPaymentAmountString()}</p>
                    </div>
                    
                    <div class='li-info-container'>
                        <label for="lease-num-payments">Scheduled Payments</label><br />
                        <p name="lease-num-payments">{this.state.NumPayments}</p>
                    </div>
                    

                    <div class='li-info-container'>
                        <label for="lease-interest-rate">Interest Rate</label><br />
                        <p name="lease-interest-rate">{getInterestRateString()}</p>
                    </div>

                    <div class='li-info-container'>
                        <div id="li-is-valid">
                            {this.state.IsValid ? 'Valid!' : 'Invalid'}
                        </div>
                    </div>

                    <div>
                        
                    </div>
                </div>
                </Card.Body>
            </Card>
        );
    }
}

export default LeaseItem;
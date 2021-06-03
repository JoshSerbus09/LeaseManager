import {Component} from 'react';

import {Card} from 'react-bootstrap';
import '../Styling/LeaseItem.css';

import checkImg from '../assets/img/check.png';
import invalidImg from '../assets/img/invalid.png';

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
            <Card className='li-card' bg={this.state.IsValid ? 'light' : 'warn'}> 
                <Card.Title>
                    <div className='li-title'>
                        {this.state.Name}
                    </div>
                </Card.Title>

                <Card.Body>
                <div className='li-body'>
                    <div class='li-info-container'>
                        <label>Start Date</label><br />
                        <p name="lease-start-date">{this.state.StartDate}</p>
                    </div>
                    

                    <div class='li-info-container'>
                        <label>End Date</label><br />
                        <p name="lease-end-date">{this.state.EndDate}</p>
                    </div>
                    

                    <div class='li-info-container'>
                        <label>Payment Amount</label><br />
                        <p name="lease-lease-payment-amount">{getPaymentAmountString()}</p>
                    </div>
                    
                    <div class='li-info-container'>
                        <label>Payments</label><br />
                        <p name="lease-num-payments">{this.state.NumPayments}</p>
                    </div>
                    

                    <div class='li-info-container'>
                        <label>Interest Rate</label><br />
                        <p name="lease-interest-rate">{getInterestRateString()}</p>
                    </div>

                    <div class='li-info-container'>
                        <div id="li-is-valid">
                            {this.state.IsValid ? <img src={checkImg} alt='valid'/> : <img src={invalidImg} alt='invalid'/>}
                        </div>
                    </div>
                </div>
                </Card.Body>

                <Card.Footer>
                    {Array.from(this.state.Messages).map(msg => <p>{msg}</p>)}
                </Card.Footer>
            </Card>
        );
    }
}

export default LeaseItem;
import {Component} from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import {GetLeaseHeaderRows} from '../Utils/GlobalConstants.js';

import LeaseManagerAPIService from '../Services/LeaseManagerAPIService.js';

import LeaseItem from './LeaseItem.js';

class LeaseImportModal extends Component {
    constructor(props){
        super(props);

        let csvHeaders = GetLeaseHeaderRows().map(headerItem => {
            return {
                headerItemKey: headerItem
            };
        });

        this.setImportedText = this.setImportedText.bind(this);
        this.validateLease = this.validateLease.bind(this);
        this.saveLeases = this.saveLeases.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            rawCSVText: 'ld_base',
            headerRowBlacklist: csvHeaders,
            importedLeaseObjects: [],
            shouldShowModal: props.shouldShowModal,
            allLeasesValid: false
        };
    }

    shouldComponentUpdate(data) {
        if (data.shouldShowModal !== undefined)
        {
            this.setState({
                shouldShowModal: data.shouldShowModal
            });
        }
        
        if (data.rawCSVText !== undefined)
        {
            this.setState({
                rawCSVText: data.rawCSVText
            });
        }

        if (data.allLeasesValid !== undefined)
        {
            this.setState({
                allLeasesValid: data.allLeasesValid
            });
        }

        this.forceUpdate();

        return false;
    }

    importLeases = (e) => {
        e.preventDefault();

        console.log('attempting to import lease csv');

        const leaseReader = new FileReader();

        leaseReader.onload = async () => {
            let fileText = leaseReader.result;

            if (fileText !== 'ld_base' 
                && fileText !== '') {
                this.setImportedText(fileText);
            };
        };

        leaseReader.readAsText(e.target.files[0]);

        console.log('completed lease imports')
    }

    setImportedText = (text) => {
        let parsedModels = this.parseCSVText(text);

        this.setState({
            rawCSVText: text,
            importedLeaseObjects: parsedModels,
            shouldShowModal: true
        });

        console.log('raw import:\n' + text);
    }

    parseCSVText = (rawCSVText) => {
        
        if (rawCSVText === undefined || rawCSVText === '')
        {
            return [];
        }

        let lineSplits = Array.from(rawCSVText.split('\r\n'));

        if (lineSplits.length <= 1) {
            return Array.from(rawCSVText);
        }

        let parsedLeases = [];

        for(let ix = 1; ix <= lineSplits.length - 1; ix++) {
            let rowCommaSplit = lineSplits[ix].split(',');
            
            var tmpLeaseModel = {
                Name: rowCommaSplit[0] ?? '',
                StartDate: rowCommaSplit[1] ?? '',
                EndDate: rowCommaSplit[2] ?? '',
                PaymentAmount: rowCommaSplit[3] ?? '',
                NumPayments: rowCommaSplit[4] ?? '',
                InterestRate: rowCommaSplit[5] ?? '',
                Notes: '',
                IsValid: false,
                Messages: []
            };

            if (tmpLeaseModel.Name === undefined || tmpLeaseModel.name === ''
                || tmpLeaseModel.StartDate === undefined || tmpLeaseModel.StartDate === ''
                || tmpLeaseModel.EndDate === undefined || tmpLeaseModel.EndDate === ''
                || tmpLeaseModel.PaymentAmount === undefined || tmpLeaseModel.PaymentAmount === ''
                || tmpLeaseModel.NumPayments === undefined || tmpLeaseModel.NumPayments === ''
                || tmpLeaseModel.InterestRate === undefined || tmpLeaseModel.InterestRate === ''
            ) {
                // break, report
                //Alert('Could not import lease with name "' + (tmpLeaseModel.Name ?? '') + '" - all fields must be filled in');

                continue; // for now, maybe show which ones broke?
            }
            else {
                tmpLeaseModel.IsValid = this.validateLease(tmpLeaseModel)

                parsedLeases.push(tmpLeaseModel);
            }
        }

        return parsedLeases;
    }

    validateLease = (lease) => {

        let leaseStart = new Date(lease.StartDate);
        let leaseEnd = new Date(lease.EndDate);

        let leaseRangeValid = true;
        if (leaseStart > leaseEnd)
        {
            leaseRangeValid = false;
            lease.Messages.push('Lease end date must after the lease start date.');
        }

        let numPaymentsValid = true;

        var tmpDate = new Date(lease.StartDate);
            tmpDate.setMonth(tmpDate.getMonth() + lease.NumPayments);

        if (tmpDate >= lease.EndDate)
        {
            numPaymentsValid = false;
            lease.Messages.push('Number of lease payments must not exceed the number of months in the lease.')
        }

        let paymentAmountValid = true;
        if (lease.PaymentAmount <= (-1000000) || lease.PaymentAmount >= (1000000)){
            paymentAmountValid = false;
            lease.Messages.push('Lease payment amount must be between -$999,999 and $999,999.');
        }

        let interestRateValid = true;
        if (lease.InterestRate <= 0 || lease.InterestRate >= 1)
        {
            interestRateValid = false;
            lease.Messages.push('Lease interest rate must be a decimal between 0 and 1');
        }

        console.log(lease.Messages);

        var leaseValid = leaseRangeValid 
            && numPaymentsValid
            && paymentAmountValid
            && interestRateValid;

        return leaseValid;
    }

    saveLeases = () => {
        if (this.state.importedLeaseObjects.length === 0)
        {
           return;
        }
        
        const request = Array.from(this.state.importedLeaseObjects);
    
        LeaseManagerAPIService.CreateLeases(request).then(result => {
            this.props.updateLeases();

            this.props.hideImportModal();
        });

    }

    handleClose = () => {
        this.setState({
            rawCSVText: '',
            importedLeaseObjects: [],
            shouldShowModal: false
        });

        this.forceUpdate();
    }

    render() {  
        return (
                <Modal show={this.state.shouldShowModal}
                    onHide={this.handleClose}
                    size='xl'>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <Button label="Import" >
                                <input type="file" onChange={(e) => this.importLeases(e)} accept=".csv"/>
                            </Button>
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div>
                            {Array.from(this.state.importedLeaseObjects).map(lease => {
                                return (
                                    <div>
                                        <LeaseItem lease={lease} />
                                        <br />
                                    </div>
                                );
                            })}
                        </div>
                        <br />

                        <p>csv raw:</p><br />
                        {this.state.rawCSVText}
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>Cancel</Button>
                        <Button variant="primary" onClick={this.saveLeases}>Save Changes</Button>
                    </Modal.Footer>
                </Modal>
        );
    }

}

export default LeaseImportModal;


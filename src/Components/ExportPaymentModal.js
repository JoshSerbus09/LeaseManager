import {Component} from 'react';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import LeaseManagerAPIService from '../Services/LeaseManagerAPIService.js';

import {GetFormattedDate} from '../Utils/GlobalConstants.js';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';

class ExportPaymentModal extends Component {
    constructor(props){
        super(props);

        this.exportLeases = this.exportLeases.bind(this);

        let tmpEnd = new Date();
        tmpEnd.setFullYear(tmpEnd.getFullYear() + 1); 

        this.state = {
            startDate: new Date(),
            endDate: tmpEnd,
            shouldShowExportModal: props.show
        }
    }

    shouldComponentUpdate(data) {
        
        if (data.show !== undefined)
        {
            this.setState({
                shouldShowExportModal: data.show
            });
        }

        this.forceUpdate();

        return false;
    }

    exportLeases = () => {
        
        
        LeaseManagerAPIService.ExportLeasePayments(GetFormattedDate(this.state.startDate), GetFormattedDate(this.state.endDate)).then(result => {
            var fileBlob = new Blob([result.data], {type: 'application/json'});
            var url = URL.createObjectURL(fileBlob);
    
            var element = document.createElement('a');
    
            element.href = url
            element.download = 'export-' + GetFormattedDate(this.state.startDate) + '_' + GetFormattedDate(this.state.endDate) + '.json';
            
            element.click();
        });
    }

    render(){
        const handleClose = () => {
            this.setState({shouldShowExportModal: false});

            this.props.hideExportModal();
        };
        return (
            <Modal show={this.state.shouldShowExportModal}
                onHide={handleClose}
                size='lg'>
                <ModalHeader closeButton>
                    <Modal.Title>
                        Select Payment Date Range..
                    </Modal.Title>
                </ModalHeader>

                <Modal.Body>
                    <div>
                        <label>Start Date:</label>
                        <DatePicker selected={this.state.startDate} onChange={date => {this.setState({startDate: date})}} />
                    </div>

                    <div>
                        <label>End Date:</label>
                        <DatePicker selected={this.state.endDate} onChange={date => {this.setState({endDate: date})}} />
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant='primary' onClick={this.exportLeases}>Submit</Button>
                </Modal.Footer>
            </Modal>
            
        );
    }
}

export default ExportPaymentModal;
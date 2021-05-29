import React, {Component} from 'react';
import axios from 'axios';

var leaseManagerApiUrl = 'http://localhost:20007/api/Lease/';

export default class LeaseManagerAPIService extends Component {
    getAllLeases = () => {
        return axios.get(leaseManagerApiUrl + "GetAllLeases");
    };

    getLeaseById = (id) => {
        return axios.get(leaseManagerApiUrl + "GetLeaseById?id=" + id);
    };

    getLeasesByIds = (ids) => {
        let idList = Array.from(ids).map(id => "&id=" + id);

        return axios.get(leaseManagerApiUrl + "GetLeasesByIds?" + idList.toString());
    };

    createLease = (lease) => {
        return axios.post(leaseManagerApiUrl + "CreateLease", lease);
    };

    updateLease = (lease) => {
        return axios.post(leaseManagerApiUrl + "UpdateLease", lease);
    };

    deleteLease = (id) => {
        return axios.delete(leaseManagerApiUrl + "DeleteLease?id=" + id);
    };
}
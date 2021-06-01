import axios from 'axios';

var leaseManagerApiUrl = 'http://localhost:5000/';

class LeaseManagerAPIService{
    GetAllLeases = () => {
        return axios.get(leaseManagerApiUrl + "GetAllLeases");
    };

    GetLeaseById = (id) => {
        return axios.get(leaseManagerApiUrl + "GetLeaseById?id=" + id);
    };

    GetLeasesByIds = (ids) => {
        let idList = Array.from(ids).map(id => "&id=" + id);

        return axios.get(leaseManagerApiUrl + "GetLeasesByIds?" + idList.toString());
    };

    CreateLease = (lease) => {
        return axios.post(leaseManagerApiUrl + "CreateLease", lease);
    };

    UpdateLease = (lease) => {
        return axios.post(leaseManagerApiUrl + "UpdateLease", lease);
    };

    DeleteLease = (id) => {
        return axios.delete(leaseManagerApiUrl + "DeleteLease?id=" + id);
    };
}

export default new LeaseManagerAPIService();
import axios from 'axios';

var leaseManagerApiUrl = 'http://localhost:25007/';

class LeaseManagerAPIService{
    GetAllLeases = () => {
        return axios.get(leaseManagerApiUrl + "GetAllLeases");
    };

    GetLeaseById = (id) => {
        return axios.get(leaseManagerApiUrl + "GetLeaseById?id=" + id);
    };

    GetLeasesByIds = (ids) => {
        
        const idList = Array.from(ids).map(id => "&id=" + id);

        return axios.get(leaseManagerApiUrl + "GetLeasesByIds?" + idList.toString());
    };

    CreateLease = (data) => {
        return axios.post(leaseManagerApiUrl + "CreateLease", data).then(result => {
            
            debugger;
            return result.data;
        })
        .catch(error => {
            console.log('### Error attempting to create lease:\n' + error.data);
        });
    };

    CreateLeases = (data) => {
        return axios.post(leaseManagerApiUrl + "CreateLeases", data).then(result => {
            debugger;
            return result.data;
        }).catch(error => {
            console.log('### Error attempting to crete leases:\n' + error);
        });
    };

    UpdateLease = (data) => {
        return axios.post(leaseManagerApiUrl + "UpdateLease", data).then(result => {
            const lease = result;
            console.log(result);
            return lease;
        });
    };

    DeleteLease = (id) => {
        return axios.delete(leaseManagerApiUrl + "DeleteLease?id=" + id);
    };
}



export default new LeaseManagerAPIService();

var LeaseTableHeaderRows = ['Name', 'Start Date','End Date', 'Payment Amount', '# of Payments', 'Interest Rate'];

export function GetLeaseHeaderRows() {
    return LeaseTableHeaderRows;
} 

export function GetFormattedDate(date) {
    let tmpDate = new Date(date);

    return (tmpDate.getMonth() + 1) + '-' + tmpDate.getDate() + '-' +  tmpDate.getFullYear();;
}


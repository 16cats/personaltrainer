import { CSVLink } from "react-csv";

function CSVExport({ customers }) {
  const csvData = customers.map(customer => ({
    firstname: customer.firstname,
    lastname: customer.lastname,
    streetaddress: customer.streetaddress,
    postcode: customer.postcode,
    city: customer.city,
    email: customer.email,
    phone: customer.phone
  }));

  return (
    <CSVLink data={csvData} filename={"customer_data.csv"}>
      Export Customer Data
    </CSVLink>
  );
}

export default CSVExport;

import { CSVLink } from "react-csv";

function CSV({ customers }) {
    const CSV = customers.map(customer => ({
        firstname: customer.firstname,
        lastname: customer.lastname,
        streetaddress: customer.streetaddress,
        postcode: customer.postcode,
        city: customer.city,
        email: customer.email,
        phone: customer.phone

  }));

  return (
    <CSVLink data={CSV} filename={"customer_data.csv"}>
      Export Customer Data
    </CSVLink>
  );
}

export default CSV;
import { useEffect, useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import Button from "@mui/material/Button";
import { Snackbar } from "@mui/material";

import AddCustomer from './AddCustomer';
import AddTraining from "./AddTraining";
import EditCustomer from "./EditCustomer";
import TrainingList from "./TrainingList"

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [msg, setMsg] = useState('');
    const [open, setOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const columns = [
        { headerName: 'First Name', field: 'firstname', sortable: true, filter: true },
        { headerName: 'Last Name', field: 'lastname', sortable: true, filter: true },
        { headerName: 'Street Address', field: 'streetaddress', sortable: true, filter: true },
        { headerName: 'Postcode', field: 'postcode', sortable: true, filter: true },
        { headerName: 'City', field: 'city', sortable: true, filter: true },
        { headerName: 'Email', field: 'email', sortable: true, filter: true },
        { headerName: 'Phone', field: 'phone', sortable: true, filter: true },
        //add training
        { 
            cellRenderer: params => 
                <AddTraining data={params.data} /> },
        //edit customer
        {
            cellRenderer: params =>
                <EditCustomer params={params} customer={params.data} updateCustomer={updateCustomer} />,
            width: 100
        },
        //remove
        {
            cellRenderer: params =>
                <Button size="small" onClick={() => removeCustomer(params.data.links[0].href)}>Remove
                </Button>,
                width: 100
        },
    ];


    useEffect(() => 
    getCustomers(), []);

    const REST_URL = 'http://traineeapp.azurewebsites.net/api/customers';

    const getCustomers = () => {
        fetch(REST_URL)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(responseData => {
                if (responseData.content) {
                    console.log("Fetched Customers:", responseData.content);
                    setCustomers(responseData.content);
                } else {
                    console.error("Invalid API response format", responseData);
                }
            })
            .catch(error => console.error("Error fetching customers:", error));
    };
    

    //add customer
    const addCustomer = (customer) => {
        fetch(REST_URL, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(customer)
        })
            .then(response => {
                if (response.ok) {
                    getCustomers();
                } else {
                    alert('Something went wrong while adding a new customer');
                }
            })
            .catch(err => console.error(err))
    }

    //delete customer
    const removeCustomer = (id) => {
        if (window.confirm("Are you sure?")) {
          fetch(id, { method: 'DELETE' })
            .then(response => {
              if (response.ok)
                getCustomers();
              else
                throw new Error("Error in DELETE: " + response.statusText);
            })
            .catch(err => console.error(err))
        }
      }
    
    //edit customer
    const updateCustomer = (customer, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
            .then(response => {
                if (response.ok) {
                    getCustomers();
                    setMsg('Saved successfully')
                    setOpen(true)
                } else {
                    console.log(JSON.stringify(customer));
                    alert('Something went wrong')
                }
            })
            .catch(error => console.log(error))
    }

    return (
        <>
        
            <AddCustomer addCustomer={addCustomer} />
            <div className="ag-theme-material" style={{ height: '700px', width: '100%', margin: 'auto' }}>
                <AgGridReact
                    rowData={customers}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={10}
                />
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={() => setOpen(false)}
                    message={msg}
                />
            </div>
            {selectedCustomer && (
                <EditCustomer customerData={selectedCustomer} updateCustomer={updateCustomer} />
            )}
        </>
    )
}

export default CustomerList;

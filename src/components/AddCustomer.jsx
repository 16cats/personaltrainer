import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";

export default function AddCustomer(props) {

    //state
    //customer instead of customers, as we are just going to add one customer and not control all the customers
    const [customer, setCustomer] = useState({
        firstname: '', 
        lastname: '', 
        streetaddress: '', 
        postcode: '',
        city: '',
        email: '',
        phone: ''
    });



    const [open, setOpen] = useState(false); //is dialog open?

    //functions
    const handleClose = (event, reason) =>{
        if (reason != 'backdropClick')
            setOpen(false);
    }

    const handleSave = () => {
        props.addCustomer(customer); //päivitä tilamuuttuja car
        setOpen(false); //close dialog
    }

    const handleInputChanged = (event) =>{
        setCustomer({...customer, [event.target.name]: event.target.value});
    }

    //return
    //add button
    //dialog (add form)
    return (
        <>
            <Button
                onClick={() => setOpen(true)}>New Customer</Button>
            <Dialog
                open={open}
                onClose={handleClose}>
                <DialogTitle>New Customer</DialogTitle>
                <DialogContent>
                    <TextField
                        label='First name'
                        name='firstname'
                        variant="standard"
                        value={customer.firstname}
                        onChange={handleInputChanged}>
                    </TextField>
                    <TextField
                        label='Last name'
                        name='lastname'
                        variant="standard"
                        value={customer.lastname}
                        onChange={handleInputChanged}>
                    </TextField>
                    <TextField
                        label='Street address'
                        name='streetaddress'
                        variant="standard"
                        value={customer.streetaddress}
                        onChange={handleInputChanged}>
                    </TextField>
                    <TextField
                        label='Postcode'
                        name='postcode'
                        variant="standard"
                        value={customer.postcode}
                        onChange={handleInputChanged}>
                    </TextField>
                    <TextField
                        label='City'
                        name='city'
                        variant="standard"
                        value={customer.city}
                        onChange={handleInputChanged}>
                    </TextField>
                    <TextField
                        label='Email'
                        name='email'
                        variant="standard"
                        value={customer.email}
                        onChange={handleInputChanged}>
                    </TextField>
                    <TextField
                        label='Phone'
                        name='phone'
                        variant="standard"
                        value={customer.phone}
                        onChange={handleInputChanged}>
                    </TextField>


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
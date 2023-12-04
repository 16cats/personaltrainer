import { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditCustomer(props) {

    //state
    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''
    });

    const [open, setOpen] = useState(false);

    const handleClose = (_, reason) => {
        if (reason != 'backdropClick') {
            setOpen(false);
        }
    }

    const handleInputChange = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value })
    }

    const handleSave = () => {
        // check if customer and customer.links are defined
        if (props.customer && props.customer.links) {
            // access _links based on the actual structure
            const customerLinks = props.customer.links;

            // modify the logic accordingly based on the actual structure
            const customerHref = customerLinks && customerLinks.length > 0 ? customerLinks[0].href : null;

            if (customerHref) {
                props.updateCustomer(customer, customerHref);
                handleClose();
            } else {
                console.error("Invalid customer data - missing href in links:", props.customer);
            }
        } else {
            console.error("Invalid customer data - missing links property:", props.customer);
        }
    };

    const handleClick = () => {
        setCustomer({
            firstname: props.customer.firstname,
            lastname: props.customer.lastname,
            streetaddress: props.customer.streetaddress,
            postcode: props.customer.postcode,
            city: props.customer.city,
            email: props.customer.email,
            phone: props.customer.phone
        })
        setOpen(true);
    }

    // return
    // addbutton
    //dialogform
    return (
        <>
            <Button onClick={handleClick} variant="container">Edit</Button>
            <Dialog
                open={open}
                onClose={handleClose}>
                <DialogTitle>Edit customer</DialogTitle>
                <DialogContent>
                    <TextField
                        label='First name'
                        name='firstname'
                        variant="standard"
                        value={customer.firstname}
                        onChange={handleInputChange}>
                    </TextField>
                    <TextField
                        label='Last name'
                        name='lastname'
                        variant="standard"
                        value={customer.lastname}
                        onChange={handleInputChange}>
                    </TextField>
                    <TextField
                        label='Street address'
                        name='streetaddress'
                        variant="standard"
                        value={customer.streetaddress}
                        onChange={handleInputChange}>
                    </TextField>
                    <TextField
                        label='Postcode'
                        name='postcode'
                        variant="standard"
                        value={customer.postcode}
                        onChange={handleInputChange}>
                    </TextField>
                    <TextField
                        label='City'
                        name='city'
                        variant="standard"
                        value={customer.city}
                        onChange={handleInputChange}>
                    </TextField>
                    <TextField
                        label='Email'
                        name='email'
                        variant="standard"
                        value={customer.email}
                        onChange={handleInputChange}>
                    </TextField>
                    <TextField
                        label='Phone'
                        name='phone'
                        variant="standard"
                        value={customer.phone}
                        onChange={handleInputChange}>
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSave}>Save</Button>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
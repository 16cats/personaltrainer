import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

import Button from "@mui/material/Button";
import { Snackbar } from "@mui/material";

import TrainingGrid from './TrainingGrid';

const TrainingList = () => {
    const [trainings, setTrainings] = useState([]);
    //    const [msg, setMsg] = useState('');
    //    const [selectedCustomer, setSelectedCustomer] = useState(null);
    //    const [open, setOpen] = useState(false);

    useEffect(() => getTrainings(), []);

    const REST_URL = 'http://traineeapp.azurewebsites.net/api/trainings';

    const getTrainings = () => {
        fetch(REST_URL)
            .then(response => response.json())
            .then(responseData => {
                if (responseData.content) {
                    setTrainings(responseData.content);
                } else {
                    console.error("Invalid API response format", responseData);
                }
            })
            .catch(error => console.error(error));
    }

    return (
        <>
            <TrainingGrid
                trainings={trainings}
            />
        </>

    )
}
export default TrainingList;
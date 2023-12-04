import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { Button } from "@mui/material";
import moment from 'moment';

const TrainingList = () => {
    const [trainings, setTrainings] = useState([]);

    const columns = [
        { headerName: 'Date', field: 'date', sortable: true, filter: true, valueFormatter: dateFormatter },
        { headerName: 'Duration in Minutes', field: 'duration', sortable: true, filter: true },
        { headerName: 'Activity', field: 'activity', sortable: true, filter: true },
        {
            headerName: "Customer",
            field: "customer.firstname",
            valueGetter: (params) => {
                const customer = params.data.customer;

                if (customer && customer.firstname) {
                    return `${params.data.customer.firstname} ${params.data.customer.lastname}`;
                } else {
                    return '';
                }
            },
            sortable: true,
            filter: true
        },
        {
            cellRenderer: params => <Button size="small" onClick={() => {
                removeTraining("https://traineeapp.azurewebsites.net/api/trainings/" + params.data.id)
            }} >Delete</Button>,
            width: 120
        }

    ];

    function dateFormatter(params) {
        return moment(params.value).format('DD.MM.YYYY HH:mm');
    }

    useEffect(() => {
        getTrainings();
    }, []);

    const getTrainings = () => {
        fetch('https://traineeapp.azurewebsites.net/gettrainings')
            .then(response => {
                if (response.ok)
                    return response.json();
                else
                    throw new Error("Error in fetch: " + response.statusText);
            })
            .then(data => {
                setTrainings(data);
            })
            .catch(err => console.error(err));
    };

    if (trainings.length === 0) {
        return <p>Loading...</p>;
    }

    const removeTraining = (id) => {
        if (window.confirm("Are you sure?")) {
            fetch(id, { method: 'DELETE' })
                .then(response => {
                    if (response.ok)
                        getTrainings();
                    else
                        throw new Error("Error in DELETE: " + response.statusText);
                })
                .catch(err => console.error(err))
        }
    }

    return (
        <>
            <div className="ag-theme-material" style={{ height: '600px', width: '100%', margin: 'auto' }}>
                <AgGridReact
                    rowData={trainings}
                    columnDefs={columns}
                    rowSelection="single"
                    pagination={true}
                    paginationPageSize={10}
                />
            </div>
        </>
    )
}

export default TrainingList;

import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { useRef } from "react";
import moment from 'moment';
import Button from '@mui/material/Button';

export default function TrainingGrid(props) {

    //stateless
    //gridRef

    const gridRef = useRef();

    const columns = [
        { headerName: 'Date', field: 'date', sortable: true, filter: true, valueFormatter: dateFormatter },
        { headerName: 'Duration in Minutes', field: 'duration', sortable: true, filter: true },
        { headerName: 'Activity', field: 'activity', sortable: true, filter: true },
        { headerName: 'Customer', field: 'id}', sortable: true, filter: true }
    ];


    function dateFormatter(params) {
        return moment(params.value).format('DD.MM.YYYY HH:mm');
    }

    if (!props.trainings || props.trainings.length === 0) {
        return <p>Loading...</p>;
    }

    return (
        <>
                <div className="ag-theme-material" style={{ height: '600px', width: '63%', margin: 'auto'}}>
            <AgGridReact
                rowData={props.trainings}
                columnDefs={columns}
                rowSelection="single"
                onGridReady={params => gridRef.current = params.api}
                pagination={true}
                paginationPageSize={10}
            />
            </div>
        </>
    )

}
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import moment from 'moment';

export default function AddTraining({ getTrainings, data }) {
  const [training, setTraining] = useState({
    activity: '',
    date: null,
    duration: '',
    customer: data.links[0].href
  });
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    setTraining({ ...training, date: moment(selectedDate).format() });
  };

  const saveCustomer = () => {
    fetch('https://traineeapp.azurewebsites.net/api/trainings', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(training)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error (${response.status}): ${response.statusText}`);
        }
        getTrainings();
      })
      .catch(err => console.error(err));

    handleClose();
  }

  return (
    <div>
      <Button onClick={handleClickOpen}>
        Add Training
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Training</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Activity"
            fullWidth
            variant="standard"
            value={training.activity}
            onChange={event => setTraining({ ...training, activity: event.target.value })}
          />
          <TextField
            margin="dense"
            label="Duration"
            fullWidth
            variant="standard"
            value={training.duration}
            onChange={event => setTraining({ ...training, duration: event.target.value })}
          />
          <TextField
            margin="dense"
            label="Date"
            type="date"
            fullWidth
            variant="standard"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleDateChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={saveCustomer}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

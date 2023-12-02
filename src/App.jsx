import { useState } from 'react';
import './App.css';
import CustomerList from './components/CustomerList';
import TrainingList from './components/TrainingList';
import Calendar from './components/Calendar'
import TrainingChart from './components/TrainingChart'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function App() {

  const [value, setValue] = useState('customers'); // Change 'CustomerList' to 'customers'

  const handleChange = (event, newValue) => {
    console.log("Hello World!");
    setValue(newValue);
  }

  return (
    <div>
      <h2>Personal Trainer</h2>
      <Tabs value={value} onChange={handleChange}>
        <Tab value="customers" label="Customers" />
        <Tab value="trainings" label="Trainings" />
        <Tab value="calendar" label="Calendar" />
        <Tab value="trainingchart" label="Training chart" />
      </Tabs>
      {value === 'customers' && <CustomerList />}
      {value === 'trainings' && <TrainingList />}
      {value === "calendar" && <Calendar />}
      {value === "trainingchart" && <TrainingChart />}
    </div>
  );
}

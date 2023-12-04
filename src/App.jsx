import { useState } from 'react';
import './App.css';
import CustomerList from './components/CustomerList';
import TrainingList from './components/TrainingList';
import Calendar from './components/Calendar'
import TrainingStatistics from './components/TrainingStatistics'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function App() {

  const [value, setValue] = useState('customers');

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
        <Tab value="trainingstatistics" label="Training Statistics" />
      </Tabs>
      {value === 'customers' && <CustomerList />}
      {value === 'trainings' && <TrainingList />}
      {value === "calendar" && <Calendar />}
      {value === "trainingstatistics" && <TrainingStatistics />}
    </div>
  );
}

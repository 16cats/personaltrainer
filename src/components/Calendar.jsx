import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// set monday as the first day of the week
moment.updateLocale('en', {
  week: {
    dow: 1, // monday is the first day of the week
  },
});

const localizer = momentLocalizer(moment);

const TrainingCalendar = () => {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    getTrainings();
  }, []);

  const getTrainings = () => {
    fetch('https://traineeapp.azurewebsites.net/gettrainings')
      .then(response => {
        if (!response.ok) {
          throw new Error("Error in fetch: " + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        setTrainings(data);
      })
      .catch(err => console.error(err));
  };

  const mapTrainingToEvent = (training) => ({
    title: `${training.activity} / ${training.customer.firstname} ${training.customer.lastname}`,
    start: new Date(training.date),
    end: moment(training.date).add(training.duration, 'minutes').toDate(),
  });

  const events = trainings.map(mapTrainingToEvent);

  return (
    <div style={{ height: 600 }}>
      <Calendar
        localizer={localizer}
        events={events}
        selectable
        style={{ padding: 10 }}
      />
    </div>
  );
};

export default TrainingCalendar;

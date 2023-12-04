import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { groupBy } from 'lodash';

const apiUrl = 'https://traineeapp.azurewebsites.net/gettrainings';

const TrainingStatistics = () => {
  const [activityData, setActivityData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTrainings = async () => {
    try {
      const response = await fetch(apiUrl);
      const trainingsData = await response.json();

      const groupedObject = groupBy(trainingsData, 'activity');

      // count the amount of activities and group them
      const newData = Object.keys(groupedObject).map(item => ({
        activity: item,
        count: groupedObject[item].length,
      }));

      setActivityData(newData);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTrainings();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <BarChart data={activityData}>
          <XAxis dataKey="activity" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrainingStatistics;

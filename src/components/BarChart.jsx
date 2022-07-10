import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        display: false
      },
      title: {
        display: true,
        text: 'IPL Score Card',
      },
    },
  };

  
  function BarChart({teams}) {
    const labels = Object.keys(teams).map(t => t.split(" ").map(tt => tt[0]).join(""));
    
    const data = {
        labels,
        datasets: [
        {
            label: 'Winnings',
            data: Object.values(teams).map((team) => (team.win)),
            backgroundColor: 'rgba(0, 255, 0, 0.7)',
            borderRadius: 6
        },
        {
            label: 'Lossings',
            data: Object.values(teams).map((team) => -(team.loss)),
            backgroundColor: 'rgba(255, 0, 0, 0.7)',
            borderRadius: 6
        },
        ],
    };

    console.log(Object.values(teams).map((team) => (team.win)))
  return (
    <div className='bg-gray-800 mx-4 px-4 py-2 rounded-xl bg-opacity-60 my-5 shadow'>
        <Bar options={options} data={data} />
    </div>
  )
}

export default BarChart
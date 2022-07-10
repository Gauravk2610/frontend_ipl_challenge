import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
  
  function MatchesChart({macthes, team}) {
    
     const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            display: false
          },
          title: {
            display: true,
            text: `${team} Score Card`,
          },
        },
      };
    const labels = macthes.map((t) => t.team1 == team ? t.team2.split(" ").map(t => t[0]).join('') : t.team1.split(" ").map(t => t[0]).join('') );
    // console.log( macthes.map((t) => t.winner == team ? (1) : -1))
    const data = {
        labels,
        datasets: [
        {
            label: 'Winnings',
            data: macthes.map((t) => t.winner == team ? 1 : 0),
            backgroundColor: 'rgba(0, 255, 0, 0.7)',
            borderColor: 'rgba(0, 255, 0, 0.7)',
            borderRadius: 6
        },
        {
            label: 'Lossings',
            data: macthes.map((t) => t.winner != team ? -1 : null),
            backgroundColor: 'rgba(255, 0, 0, 0.7)',
            borderColor: 'rgba(255, 0, 0, 0.7)',
            borderRadius: 6
        },
        ],
    };
  return (
    <div className='bg-gray-800 mx-4 px-4 py-2 rounded-xl bg-opacity-60 my-5 shadow'>
        <Line options={options} data={data} />
    </div>
  )
}

export default MatchesChart
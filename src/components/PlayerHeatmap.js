import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Scatter } from 'react-chartjs-2';
import 'chart.js/auto';

const PlayerHeatmap = () => {
    const [playerData, setPlayerData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/yolo-detections')
            .then((response) => {
                console.log('Fetched Player Data:', response.data); // Log the fetched data
                setPlayerData(response.data); // Save the fetched data to state
            })
            .catch((error) => console.error('Error fetching YOLO detections:', error));
    }, []);

    const scatterData = {
        datasets: [
            {
                label: 'Player Positions',
                data: playerData.map(player => ({
                    x: parseFloat(player['Pitch X']),
                    y: parseFloat(player['Pitch Y']),
                })),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            }
        ]
    };

    return (
        <div>
            <h2>Player Heatmap</h2>
            <Scatter data={scatterData} options={{
                scales: {
                    x: { title: { display: true, text: 'Pitch X' } },
                    y: { title: { display: true, text: 'Pitch Y' } }
                }
            }} />
        </div>
    );
};

export default PlayerHeatmap;

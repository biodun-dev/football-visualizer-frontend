import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Heatmap from 'heatmap.js';
import pitchImage from './pitch.jpg'; // Import the pitch background image

const PlayerHeatmap = () => {
    const [playerData, setPlayerData] = useState([]);
    const heatmapContainer = useRef(null);

    useEffect(() => {
        axios.get('http://localhost:3001/api/yolo-detections')
            .then((response) => setPlayerData(response.data))
            .catch((error) => console.error('Error fetching player data:', error));
    }, []);

    useEffect(() => {
        if (playerData.length > 0 && heatmapContainer.current) {
            const heatmapInstance = Heatmap.create({
                container: heatmapContainer.current,
                radius: 20, // Adjust radius for better visualization
                maxOpacity: 0.7,
                minOpacity: 0.2,
                gradient: {
                    0.2: 'lightblue',
                    0.4: 'blue',
                    0.6: 'green',
                    0.8: 'yellow',
                    1.0: 'red',
                },
            });

            const containerWidth = heatmapContainer.current.offsetWidth;
            const containerHeight = containerWidth * (68 / 105); // Maintain pitch 105:68 aspect ratio

            heatmapContainer.current.style.height = `${containerHeight}px`;

            const pitchWidth = 105; // Real pitch width
            const pitchHeight = 68; // Real pitch height

            const normalizedData = playerData
                .slice(0, 10000) // Limit to 10,000 points
                .map(player => {
                    const x = Math.min(
                        containerWidth,
                        (parseFloat(player['Pitch X']) / pitchWidth) * containerWidth
                    );
                    const y = Math.min(
                        containerHeight,
                        (parseFloat(player['Pitch Y']) / pitchHeight) * containerHeight
                    );
                    return { x, y, value: 1 };
                })
                .filter(point => !isNaN(point.x) && !isNaN(point.y)); // Remove invalid points

            heatmapInstance.setData({
                max: 10,
                data: normalizedData,
            });
        }
    }, [playerData]);

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h2>Player Heatmap</h2>
            <div
                ref={heatmapContainer}
                style={{
                    position: 'relative',
                    width: '100%',
                    backgroundImage: `url(${pitchImage})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    border: '1px solid #ccc',
                }}
            ></div>
        </div>
    );
};

export default PlayerHeatmap;

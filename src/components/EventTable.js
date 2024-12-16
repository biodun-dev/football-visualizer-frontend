import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EventTable = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/events')
            .then((response) => setEvents(response.data))
            .catch((error) => console.error('Error fetching events:', error));
    }, []);

    return (
        <div>
            <h2>Event List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Frame</th>
                        <th>Event</th>
                        <th>Ball X</th>
                        <th>Ball Y</th>
                        <th>Last Touch</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((event, index) => (
                        <tr key={index}>
                            <td>{event['Frame']}</td>
                            <td>{event['Event']}</td>
                            <td>{event['Ball X']}</td>
                            <td>{event['Ball Y']}</td>
                            <td>{event['Last Touch']}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EventTable;

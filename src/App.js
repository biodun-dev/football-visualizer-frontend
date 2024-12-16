import React from 'react';
import PlayerHeatmap from './components/PlayerHeatmap';
import EventTable from './components/EventTable';
import './App.css'

function App() {
    return (
        <div>
            <h1>Football Visualizer</h1>
            <PlayerHeatmap />
            <EventTable />
        </div>
    );
}

export default App;

import React, { useState } from 'react';
import Block from './Components/Block';
import './App.css';

const App = () => {
  const [blocks, setBlocks] = useState([]);

  const handleAddBlock = (parentId, childId) => {
    console.log(`Block ${childId} added to Block ${parentId}`);
  };

  return (
    <div className="App">
      <Block x={50} y={50} onAddBlock={handleAddBlock} parentId={null} setBlocks={setBlocks} />
      <canvas id="lines-canvas" className="lines-canvas"></canvas>
    </div>
  );
};

export default App;

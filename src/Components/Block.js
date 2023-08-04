import React, { useState } from 'react';
import './Block.css';
import LineTo from './LineTo';

const Block = ({ x, y, onAddBlock, parentId }) => {
  const [blocks, setBlocks] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleAddBlock = () => {
    const newBlock = {
      id: blocks.length + 1,
      x: Math.random() * (window.innerWidth - 100),
      y: Math.random() * (window.innerHeight - 100),
    };

    setBlocks([...blocks, newBlock]);

    if (parentId !== null) {
      onAddBlock(parentId, newBlock.id);
    }
  };

  const handleDragStart = (e) => {
    setIsDragging(true);
    setDragOffset({ x: e.clientX - x, y: e.clientY - y });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDrag = (e) => {
    if (isDragging) {
      setBlocks((prevBlocks) => {
        const updatedBlocks = prevBlocks.map((block) => {
          if (block.id === parentId) {
            return { ...block, x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y };
          }
          return block;
        });
        return updatedBlocks;
      });
    }
  };

  const handleMouseDown = () => {
    handleAddBlock();
  };

  return (
    <>
      <div
        className="block"
        style={{ top: y, left: x }}
        draggable="true"
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDrag={handleDrag}
        onMouseDown={handleMouseDown}
      >
        +
      </div>
      {blocks.map((block) => (
        <React.Fragment key={block.id}>
          <LineTo from={{ x: x + 50, y: y + 50 }} to={{ x: block.x + 50, y: block.y + 50 }} />
          <Block
            x={block.x}
            y={block.y}
            onAddBlock={onAddBlock}
            parentId={block.id}
          />
        </React.Fragment>
      ))}
    </>
  );
};

export default Block;

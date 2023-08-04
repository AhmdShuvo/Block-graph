import React, { useRef, useEffect } from 'react';

const LineTo = ({ from, to }) => {
  const lineRef = useRef();

  useEffect(() => {
    const drawLine = () => {
      const canvas = lineRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.strokeStyle = '#000';
      ctx.stroke();
    };

    drawLine();

    window.addEventListener('resize', drawLine);

    return () => {
      window.removeEventListener('resize', drawLine);
    };
  }, [from, to]);

  return (
    <canvas
      ref={lineRef}
      className="line"
      width={window.innerWidth}
      height={window.innerHeight}
    ></canvas>
  );
};

export default LineTo;

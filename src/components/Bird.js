import React from "react";

const Bird = () => {
  const canvas = React.useRef(null);

  React.useEffect(() => {
    const ctx = canvas.current.getContext('2d');

    // Set the canvas size
    canvas.current.width = 500;
    canvas.current.height = 500;

    // Draw a bird
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.moveTo(100, 100);
    ctx.lineTo(200, 200);
    ctx.lineTo(300, 100);
    ctx.closePath();
    ctx.fill();
  }, []);

  return (
    <canvas ref={canvas} />
  );
};

export default Bird;

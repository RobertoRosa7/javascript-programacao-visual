const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [1080, 1080]
  // dimensions: 'A4',
  // pixelsPerInch: 300,
  // orientation: 'landscape'
};

const sketch = () => ({ context, width, height }) => {
  context.fillStyle = 'black';
  context.fillRect(0, 0, width, height);
  context.lineWidth = width * 0.01;

  const w = width * 0.10; // 10%;
  const h = height * 0.10; // 10%;
  const gap = width * 0.03; // 3%;
  const ix = width * 0.17;
  const iy = height * 0.17;
  const off = width * 0.02;
  const gravity = 9.81;
  const velocity = 0.0;
  let x, y;

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      x = ix + (w + gap) * i;
      y = iy + (h + gap) * j;

      context.beginPath();
      context.rect(x, y, w, h);
      context.strokeStyle = 'white';
      context.stroke();

      if (Math.random() > 0.5) {
        context.beginPath();
        context.rect(x + off / 2, y + off / 2, w - off, h - off);
        context.strokeStyle = 'white';
        context.stroke();
      }
    }
  }
};

canvasSketch(sketch, settings);

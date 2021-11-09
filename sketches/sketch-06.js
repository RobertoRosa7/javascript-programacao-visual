const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [1024, 1024]
};

const config = {
  colorLight: '#F1F1F1',
  colorDark: 'hsl(210, 8%, 15%)',
  colorPink: '#d73b60',
  managerCanvas: {},
  text: 'Milla',
  fontSize: 850,
  fontFamily: 'serif'
}

const typeCanvas = document.createElement('canvas');
const typeContext = typeCanvas.getContext('2d');

const sketch = ({ context, width, height }) => {
  const cell = 20;
  const cols = Math.floor(width / cell);
  const rows = Math.floor(height / cell);
  const numCells = cols * rows;

  typeCanvas.width = cols
  typeCanvas.height = rows;

  return ({ context, width, height }) => {
    typeContext.fillStyle = config.colorDark;
    typeContext.fillRect(0, 0, cols, rows);

    config.fontSize = cols * 0.4;

    typeContext.fillStyle = config.colorLight;
    typeContext.font = `${config.fontSize}px ${config.fontFamily}`;
    typeContext.textBaseline = 'top';
    // typeContext.textAlign = 'center';

    const metrics = typeContext.measureText(config.text);

    const mx = metrics.actualBoundingBoxLeft * -1;
    const my = metrics.actualBoundingBoxAscent * -1;
    const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
    const mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    const tx = (cols - mw) * 0.5 - mx;
    const ty = (rows - mh) * 0.5 - my;

    typeContext.save();
    typeContext.translate(tx, ty);
    typeContext.beginPath();
    typeContext.rect(mx, my, mw, mh);
    // typeContext.stroke();

    typeContext.fillText(config.text, 0, 0);
    typeContext.restore();

    const typeData = typeContext.getImageData(0, 0, cols, rows).data;

    context.fillStyle = config.colorDark;
    context.fillRect(0, 0, width, height);
    context.textBaseline = 'middle';
    context.textAlign = 'center';

    // context.drawImage(typeCanvas, 0, 0);

    for (let i = 0; i < numCells; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = col * cell;
      const y = row * cell;

      const r = typeData[i * 4 + 0];
      const g = typeData[i * 4 + 1];
      const b = typeData[i * 4 + 2];
      const a = typeData[i * 4 + 3];

      const glyph = getGlyph(r);

      context.font = `${cell * 2}px ${config.fontFamily}`
      if (Math.random() < 0.1) context.font = `${cell * 4}px ${config.fontFamily}`;
      // context.fillStyle = `rgb(${r}, ${g}, ${b})`;
      context.fillStyle = config.colorLight;

      context.save();
      context.translate(x, y);
      context.translate(cell * 0.5, cell * 0.5);

      // context.fillRect(0, 0, cell, cell);

      // context.beginPath();
      // context.arc(0, 0, cell * 0.5, 0, Math.PI * 2);
      // context.fill();

      context.fillText(glyph, 0, 0);
      context.restore();
    }
  };
}

const getGlyph = (v) => {
  if (v < 50) return '';
  if (v < 100) return '';
  if (v < 150) return '.';
  if (v < 200) return '-';

  const glyphs = '_=/'.split('');
  return random.pick(glyphs);
}
const initializeCanvas = async () => {
  config.managerCanvas = await canvasSketch(sketch, settings);
}

initializeCanvas();
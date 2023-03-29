import React from 'react';
import './App.css';

import renderer from './core/render';

function App() {
  const canvasRef = React.createRef<HTMLCanvasElement>();

  React.useEffect(() => {
    if (canvasRef.current) {
      renderer.setCanvas(canvasRef.current);
      renderer.render();
    }
  }, [canvasRef]);
  
  return (
    <div>
      <button onClick={() => {
        if (renderer.isRendering()) {
          renderer.stopRendering();
        }
        else {
          renderer.render();
        }
      }}>
        Toggle
      </button>
      <canvas ref={canvasRef} width={500} height={500} />
    </div>
  );
}

export default App;

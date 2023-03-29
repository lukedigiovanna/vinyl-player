import React from 'react';
import { AlbumAccordion } from './components/AlbumAccordion';
import { Album } from './models/album.model';

import renderer from './core/render';

const myAlbums: Album[] = [
  {
    title: "Angles",
    artist: "The Strokes",
    coverSrc: "https://upload.wikimedia.org/wikipedia/en/d/d9/Strokes_1.jpg"
  },
  {
    title: "The Dark Side of the Moon",
    artist: "Pink Floyd",
    coverSrc: "https://upload.wikimedia.org/wikipedia/en/3/3b/Dark_Side_of_the_Moon.png"
  },
  {
    title: "Oddments",
    artist: "King Gizzard & The Lizard Wizard",
    coverSrc: "https://upload.wikimedia.org/wikipedia/en/3/32/Oddments_King_Gizzard.jpg"
  }
];

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
      <AlbumAccordion albums={myAlbums} />
    </div>
  );
}

export default App;

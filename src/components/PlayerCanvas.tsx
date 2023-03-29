import React from 'react';
import styled from 'styled-components';

import renderer from '../core/render';

const Canvas = styled.canvas`
    position: absolute;
    top: 0;
    left: 0;
`

export const PlayerCanvas = (props: {}) => {
    const canvasRef = React.createRef<HTMLCanvasElement>();

    const resizeCanvas = () => {
        if (canvasRef.current) {
            const size = window.innerHeight;
            canvasRef.current.width = size;
            canvasRef.current.height = size;
        }
    }

    React.useEffect(() => {
        if (canvasRef.current) {
            resizeCanvas();
            renderer.setCanvas(canvasRef.current);
            renderer.render();
        }
    }, [canvasRef])

    React.useEffect(() => {
        window.onload = () => {
            window.addEventListener("resize", resizeCanvas);
        };
    }, []);

    return  (
        <Canvas ref={canvasRef} />
    )
}
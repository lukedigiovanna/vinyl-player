
// Define static data which is useful in rendering.

const square_vertices: number[] = [
    -0.5, -0.5, 0.0,
    0.5, -0.5, 0.0,
    0.5, 0.5, 0.0,
    -0.5, 0.5, 0.0
];

const circle_vertices: number[] = [];
// construct the circle
const num_vertices = 36;
for (let i = 0; i < num_vertices; i++) {
    const rad = i / num_vertices * 2 * Math.PI;
    circle_vertices.push(Math.cos(rad) * 0.5);
    circle_vertices.push(Math.sin(rad) * 0.5);
    circle_vertices.push(0);
}

const vertex_shader = `
    attribute vec3 a_position;

    void main() {
        gl_Position = vec4(a_position, 1.0);
    }
`;

const fragment_shader = `
    precision mediump float;

    void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
`;

class Renderer {
    private canvas: HTMLCanvasElement | null = null;
    private gl: WebGLRenderingContext | null = null;
    private initialized: boolean = false;
    private running: boolean = false;

    private squareVB: WebGLBuffer | null = null;
    private circleVB: WebGLBuffer | null = null;
    private program: WebGLProgram | null = null;

    constructor() {
        this.renderLoop = this.renderLoop.bind(this);
    }

    /**
     * Sets the canvas and generates a render context for it.
     * Will compile necessary shaders and define buffers.
     * @param canvas 
     */
    setCanvas(canvas: HTMLCanvasElement) {
        this.stopRendering();
        this.canvas = canvas;
        this.gl = this.canvas.getContext("webgl") as WebGLRenderingContext;

        // Set up a buffer for a square.
        this.squareVB = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.squareVB);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(square_vertices), this.gl.STATIC_DRAW);
        
        this.circleVB = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.circleVB);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(circle_vertices), this.gl.STATIC_DRAW);

        // Compile shaders.
        const vs = this.gl.createShader(this.gl.VERTEX_SHADER);
        if (vs) {
            this.gl.shaderSource(vs, vertex_shader);
            this.gl.compileShader(vs);
        }
        const fs = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        if (fs) {
            this.gl.shaderSource(fs, fragment_shader);
            this.gl.compileShader(fs);
        }
        this.program = this.gl.createProgram();
        if (this.program && vs && fs) {
            this.gl.attachShader(this.program, vs);
            this.gl.attachShader(this.program, fs);
            this.gl.linkProgram(this.program);
        }

        this.initialized = true;
    }

    /**
     * Begins the render loop if it has not already begun.
     * If it has already begun, this function does nothing.
     */
    render() {
        if (!this.initialized) {
            throw Error("Trying to render an uninitialized renderer.");
        }

        if (!this.running) {
            this.running = true;
            this.renderLoop();
        }
    }

    /**
     * Will suspend the render loop temporarily.
     */
    stopRendering() {
        this.running = false;
    }

    /**
     * Determins if this renderer is currently rendering.
     * @returns True if this renderer is currently executing its render loop
     */
    isRendering() {
        return this.running;
    }

    private renderLoop() {
        if (!this.canvas || !this.gl || !this.program) {
            throw Error("Attempting to render with error in initialization.");
        }

        if (!this.running) {
            return;
        }

        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);

        this.gl.clearColor(1.0, (Math.sin(Date.now() / 1000) + 1) / 2, 0.5, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        
        this.gl.useProgram(this.program);
        // Draw the square.
        const posAttribLocation = this.gl.getAttribLocation(this.program, "a_position");
        this.gl.enableVertexAttribArray(posAttribLocation);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.circleVB);
        this.gl.vertexAttribPointer(posAttribLocation, 3, this.gl.FLOAT, false, 3 * Float32Array.BYTES_PER_ELEMENT, 0);

        this.gl.drawArrays(this.gl.TRIANGLE_FAN, 0, circle_vertices.length / 3);

        window.requestAnimationFrame(this.renderLoop);
    }
}

const renderer: Renderer = new Renderer();

export default renderer;

// let translation = 0;

// export function render(canvas: HTMLCanvasElement | null, data: number[]) {
//     if (canvas != null) {
//         const ctx = canvas.getContext("2d");
//         if (ctx) {
//             ctx.fillStyle = 'black';
//             ctx.fillRect(0, 0, canvas.width, canvas.height);
//             ctx.strokeStyle = 'cyan';
//             ctx.lineWidth = 5;
//             ctx.beginPath();
//             if (data.length > 0) {
//                 const step = 5
//                 const start = Math.max(0, Math.floor(translation / step));
//                 const length = canvas.width / step + 1;
//                 for (let i = 0; i < length; i++) {
//                     const y = 250 + data[start + i] * 250;
//                     const x = (i - start) * step - translation
//                     if (i === 0) {
//                         ctx.moveTo(x, y);
//                     }
//                     else {
//                         ctx.lineTo(x, y);
//                     }
//                     if (x > canvas.width) {
//                         break;
//                     }
//                 }
//             }
//             ctx.stroke();
//             translation += 1;
//         }
//     }
// }

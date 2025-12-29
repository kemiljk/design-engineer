// WebGL utilities for shader demos

export function createShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compile error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

export function createProgram(
  gl: WebGLRenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader
): WebGLProgram | null {
  const program = gl.createProgram();
  if (!program) return null;

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Program link error:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }

  return program;
}

export const DEFAULT_VERTEX_SHADER = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  
  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

export function initWebGL(
  canvas: HTMLCanvasElement,
  fragmentShader: string
): {
  gl: WebGLRenderingContext;
  program: WebGLProgram;
  cleanup: () => void;
} | null {
  const gl = canvas.getContext("webgl", {
    antialias: true,
    alpha: true,
    preserveDrawingBuffer: true,
  });

  if (!gl) {
    console.error("WebGL not supported");
    return null;
  }

  const vs = createShader(gl, gl.VERTEX_SHADER, DEFAULT_VERTEX_SHADER);
  const fs = createShader(gl, gl.FRAGMENT_SHADER, fragmentShader);

  if (!vs || !fs) return null;

  const program = createProgram(gl, vs, fs);
  if (!program) return null;

  // Set up geometry (full-screen quad)
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
    gl.STATIC_DRAW
  );

  const positionLocation = gl.getAttribLocation(program, "a_position");
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  gl.useProgram(program);

  const cleanup = () => {
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    gl.deleteProgram(program);
    gl.deleteBuffer(positionBuffer);
  };

  return { gl, program, cleanup };
}

export function setUniform(
  gl: WebGLRenderingContext,
  program: WebGLProgram,
  name: string,
  value: number | number[]
): void {
  const location = gl.getUniformLocation(program, name);
  if (!location) return;

  if (typeof value === "number") {
    gl.uniform1f(location, value);
  } else if (value.length === 2) {
    gl.uniform2fv(location, value);
  } else if (value.length === 3) {
    gl.uniform3fv(location, value);
  } else if (value.length === 4) {
    gl.uniform4fv(location, value);
  }
}

export function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [1, 1, 1];
  return [
    parseInt(result[1], 16) / 255,
    parseInt(result[2], 16) / 255,
    parseInt(result[3], 16) / 255,
  ];
}

export function isWebGLSupported(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

"use client";

import React, { useRef, useEffect, useState } from "react";
import { Play } from "iconoir-react";
import {
  ExampleWrapper,
  ControlGroup,
  ControlButton,
} from "../base/example-wrapper";
import { createShader, createProgram, isWebGLSupported, DEFAULT_VERTEX_SHADER } from "./webgl-utils";

const SIMPLEX_NOISE_SHADER = `
  precision mediump float;
  uniform vec2 u_resolution;
  uniform float u_time;
  varying vec2 v_uv;
  
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
  
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }
  
  void main() {
    vec2 st = v_uv * 4.0;
    float n = snoise(st + u_time * 0.3) * 0.5 + 0.5;
    vec3 color = mix(vec3(0.07, 0.07, 0.14), vec3(0.4, 0.2, 0.6), n);
    gl_FragColor = vec4(color, 1.0);
  }
`;

const VALUE_NOISE_SHADER = `
  precision mediump float;
  uniform vec2 u_resolution;
  uniform float u_time;
  varying vec2 v_uv;
  
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }
  
  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }
  
  void main() {
    vec2 st = v_uv * 6.0;
    float n = noise(st + u_time * 0.5);
    n += noise(st * 2.0 - u_time * 0.3) * 0.5;
    n = n / 1.5;
    vec3 color = mix(vec3(0.05, 0.1, 0.1), vec3(0.1, 0.5, 0.4), n);
    gl_FragColor = vec4(color, 1.0);
  }
`;

const WORLEY_NOISE_SHADER = `
  precision mediump float;
  uniform vec2 u_resolution;
  uniform float u_time;
  varying vec2 v_uv;
  
  vec2 random2(vec2 p) {
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
  }
  
  float worley(vec2 st) {
    vec2 i_st = floor(st);
    vec2 f_st = fract(st);
    float m_dist = 1.0;
    for (int y = -1; y <= 1; y++) {
      for (int x = -1; x <= 1; x++) {
        vec2 neighbor = vec2(float(x), float(y));
        vec2 point = random2(i_st + neighbor);
        point = 0.5 + 0.5 * sin(u_time * 0.5 + 6.2831 * point);
        vec2 diff = neighbor + point - f_st;
        float dist = length(diff);
        m_dist = min(m_dist, dist);
      }
    }
    return m_dist;
  }
  
  void main() {
    vec2 st = v_uv * 5.0;
    float n = worley(st);
    n = 1.0 - n;
    vec3 color = mix(vec3(0.02, 0.02, 0.05), vec3(0.9, 0.4, 0.2), n * n);
    gl_FragColor = vec4(color, 1.0);
  }
`;

type NoiseType = "simplex" | "value" | "worley";

const noiseTypes: { type: NoiseType; name: string; shader: string; description: string }[] = [
  { type: "simplex", name: "Simplex", shader: SIMPLEX_NOISE_SHADER, description: "Smooth, organic gradients" },
  { type: "value", name: "Value", shader: VALUE_NOISE_SHADER, description: "Classic interpolated noise" },
  { type: "worley", name: "Worley", shader: WORLEY_NOISE_SHADER, description: "Cellular/Voronoi patterns" },
];

export function ShaderNoiseTypesDemo() {
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([null, null, null]);
  const glRefs = useRef<(WebGLRenderingContext | null)[]>([null, null, null]);
  const programRefs = useRef<(WebGLProgram | null)[]>([null, null, null]);
  const animationRef = useRef<number>(0);
  const cleanupRefs = useRef<((() => void) | null)[]>([null, null, null]);

  const [isPlaying, setIsPlaying] = useState(true);
  const [supported] = useState(() => isWebGLSupported());

  const stateRef = useRef({ isPlaying });
  
  useEffect(() => {
    stateRef.current = { isPlaying };
  }, [isPlaying]);

  useEffect(() => {
    if (!supported) return;

    noiseTypes.forEach((noiseType, index) => {
      const canvas = canvasRefs.current[index];
      if (!canvas) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      const gl = canvas.getContext("webgl");
      if (!gl) return;

      const vertexShader = createShader(gl, gl.VERTEX_SHADER, DEFAULT_VERTEX_SHADER);
      const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, noiseType.shader);
      if (!vertexShader || !fragmentShader) return;

      const program = createProgram(gl, vertexShader, fragmentShader);
      if (!program) return;

      const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
      const uvs = new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]);

      const posBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
      const posLoc = gl.getAttribLocation(program, "a_position");
      gl.enableVertexAttribArray(posLoc);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

      const uvBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, uvs, gl.STATIC_DRAW);
      const uvLoc = gl.getAttribLocation(program, "a_uv");
      gl.enableVertexAttribArray(uvLoc);
      gl.vertexAttribPointer(uvLoc, 2, gl.FLOAT, false, 0, 0);

      glRefs.current[index] = gl;
      programRefs.current[index] = program;

      cleanupRefs.current[index] = () => {
        gl.deleteBuffer(posBuffer);
        gl.deleteBuffer(uvBuffer);
        gl.deleteProgram(program);
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
      };
    });

    const render = (time: number) => {
      const { isPlaying: playing } = stateRef.current;

      noiseTypes.forEach((_, index) => {
        const gl = glRefs.current[index];
        const program = programRefs.current[index];
        const canvas = canvasRefs.current[index];

        if (!gl || !program || !canvas) return;

        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.useProgram(program);

        const resLoc = gl.getUniformLocation(program, "u_resolution");
        const timeLoc = gl.getUniformLocation(program, "u_time");

        gl.uniform2f(resLoc, canvas.width, canvas.height);
        gl.uniform1f(timeLoc, time / 1000);

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      });

      if (playing) {
        animationRef.current = requestAnimationFrame(render);
      }
    };

    animationRef.current = requestAnimationFrame(render);

    // Capture cleanupRefs.current for cleanup function
    const cleanups = [...cleanupRefs.current];

    return () => {
      cancelAnimationFrame(animationRef.current);
      cleanups.forEach(cleanup => cleanup?.());
    };
  }, [supported]);

  useEffect(() => {
    if (isPlaying) {
      const render = (time: number) => {
        const { isPlaying: playing } = stateRef.current;

        noiseTypes.forEach((_, index) => {
          const gl = glRefs.current[index];
          const program = programRefs.current[index];
          const canvas = canvasRefs.current[index];

          if (!gl || !program || !canvas) return;

          gl.viewport(0, 0, canvas.width, canvas.height);
          gl.useProgram(program);

          const resLoc = gl.getUniformLocation(program, "u_resolution");
          const timeLoc = gl.getUniformLocation(program, "u_time");

          gl.uniform2f(resLoc, canvas.width, canvas.height);
          gl.uniform1f(timeLoc, time / 1000);

          gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        });

        if (playing) {
          animationRef.current = requestAnimationFrame(render);
        }
      };
      animationRef.current = requestAnimationFrame(render);
    }
    return () => cancelAnimationFrame(animationRef.current);
  }, [isPlaying]);

  if (!supported) {
    return (
      <ExampleWrapper
        title="Noise Type Comparison"
        description="Compare different noise algorithms (WebGL not supported)"
      >
        <div className="flex h-48 items-center justify-center rounded-xl bg-neutral-900">
          <p className="text-sm text-white/60">WebGL unavailable</p>
        </div>
      </ExampleWrapper>
    );
  }

  return (
    <ExampleWrapper
      title="Noise Type Comparison"
      description="Different noise algorithms create distinct visual patterns. Each has unique characteristics suited to different effects."
      controls={
        <div className="flex justify-end">
          <ControlButton active={isPlaying} onClick={() => setIsPlaying(!isPlaying)}>
            <Play className={`size-4 ${isPlaying ? "fill-current" : ""}`} />
          </ControlButton>
        </div>
      }
    >
      <div className="grid gap-4 sm:grid-cols-3">
        {noiseTypes.map((noise, index) => (
          <div key={noise.type} className="space-y-2">
            <div className="relative overflow-hidden rounded-xl">
              <canvas
                ref={el => { canvasRefs.current[index] = el; }}
                className="h-40 w-full"
                style={{ display: "block" }}
              />
              <div className="absolute bottom-2 left-2 rounded bg-black/40 px-2 py-1 backdrop-blur-sm">
                <span className="text-xs font-medium text-white">{noise.name}</span>
              </div>
            </div>
            <p className="text-center text-xs text-neutral-500 dark:text-neutral-400">
              {noise.description}
            </p>
          </div>
        ))}
      </div>
    </ExampleWrapper>
  );
}


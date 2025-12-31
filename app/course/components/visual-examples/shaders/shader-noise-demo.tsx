"use client";

import React, { useRef, useEffect, useState } from "react";
import { Play } from "iconoir-react";
import {
  ExampleWrapper,
  ControlGroup,
  ControlButton,
  SliderControl,
} from "../base/example-wrapper";
import { initWebGL, setUniform, hexToRgb, isWebGLSupported } from "./webgl-utils";

const NOISE_FRAGMENT_SHADER = `
  precision mediump float;
  
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform float u_scale;
  uniform float u_speed;
  uniform vec3 u_color1;
  uniform vec3 u_color2;
  
  varying vec2 v_uv;
  
  // Simplex noise functions
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
  
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                        -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
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
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }
  
  void main() {
    // Scale UV for noise
    vec2 st = v_uv * u_scale;
    
    // Animate through noise space
    float t = u_time * u_speed;
    
    // Layer multiple noise octaves
    float n = snoise(st + t);
    n += snoise(st * 2.0 - t * 0.5) * 0.5;
    n += snoise(st * 4.0 + t * 0.3) * 0.25;
    
    // Normalise to 0-1
    n = n * 0.5 + 0.5;
    n = clamp(n, 0.0, 1.0);
    
    // Mix colors
    vec3 color = mix(u_color1, u_color2, n);
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

const noisePresets = [
  { name: "Subtle", scale: 2, speed: 0.2 },
  { name: "Organic", scale: 3, speed: 0.3 },
  { name: "Dramatic", scale: 5, speed: 0.5 },
  { name: "Turbulent", scale: 8, speed: 0.8 },
];

export function ShaderNoiseDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const animationRef = useRef<number>(0);
  const cleanupRef = useRef<(() => void) | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [scale, setScale] = useState(3);
  const [speed, setSpeed] = useState(0.3);
  const [supported] = useState(() => isWebGLSupported());

  // Store current state in refs for animation loop
  const stateRef = useRef({ isPlaying, scale, speed });
  
  useEffect(() => {
    stateRef.current = { isPlaying, scale, speed };
  }, [isPlaying, scale, speed]);

  useEffect(() => {
    if (!supported) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const result = initWebGL(canvas, NOISE_FRAGMENT_SHADER);
    if (!result) return;

    glRef.current = result.gl;
    programRef.current = result.program;
    cleanupRef.current = result.cleanup;

    const render = (time: number) => {
      const gl = glRef.current;
      const program = programRef.current;

      if (!gl || !program || !canvas) return;

      const { isPlaying: playing, scale: s, speed: sp } = stateRef.current;

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);

      setUniform(gl, program, "u_resolution", [canvas.width, canvas.height]);
      setUniform(gl, program, "u_time", time / 1000);
      setUniform(gl, program, "u_scale", s);
      setUniform(gl, program, "u_speed", sp);
      setUniform(gl, program, "u_color1", hexToRgb("#1e1b4b")); // Deep indigo
      setUniform(gl, program, "u_color2", hexToRgb("#7c3aed")); // Violet

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      if (playing) {
        animationRef.current = requestAnimationFrame(render);
      }
    };

    animationRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationRef.current);
      cleanupRef.current?.();
    };
  }, [supported]);

  // Restart animation when playing state changes
  useEffect(() => {
    if (isPlaying && glRef.current) {
      const render = (time: number) => {
        const gl = glRef.current;
        const program = programRef.current;
        const canvas = canvasRef.current;

        if (!gl || !program || !canvas) return;

        const { isPlaying: playing, scale: s, speed: sp } = stateRef.current;

        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);

        setUniform(gl, program, "u_resolution", [canvas.width, canvas.height]);
        setUniform(gl, program, "u_time", time / 1000);
        setUniform(gl, program, "u_scale", s);
        setUniform(gl, program, "u_speed", sp);
        setUniform(gl, program, "u_color1", hexToRgb("#1e1b4b"));
        setUniform(gl, program, "u_color2", hexToRgb("#7c3aed"));

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        if (playing) {
          animationRef.current = requestAnimationFrame(render);
        }
      };
      animationRef.current = requestAnimationFrame(render);
    }
    return () => cancelAnimationFrame(animationRef.current);
  }, [isPlaying]);

  const applyPreset = (preset: typeof noisePresets[0]) => {
    setScale(preset.scale);
    setSpeed(preset.speed);
  };

  if (!supported) {
    return (
      <ExampleWrapper
        title="Noise Gradient"
        description="Organic noise patterns (WebGL not supported)"
      >
        <div className="flex h-64 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-900 to-violet-600">
          <p className="text-white/80 text-sm">CSS fallback (WebGL unavailable)</p>
        </div>
      </ExampleWrapper>
    );
  }

  return (
    <ExampleWrapper
      title="Noise Gradient"
      description="Simplex noise creates organic, flowing patterns. This effect layers multiple noise octaves for depth—impossible to achieve with CSS."
      controls={
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <ControlGroup label="Presets">
              {noisePresets.map((preset) => (
                <ControlButton
                  key={preset.name}
                  active={scale === preset.scale && speed === preset.speed}
                  onClick={() => applyPreset(preset)}
                >
                  {preset.name}
                </ControlButton>
              ))}
            </ControlGroup>
            <ControlButton active={isPlaying} onClick={() => setIsPlaying(!isPlaying)}>
              <Play className={`size-4 ${isPlaying ? "fill-current" : ""}`} />
            </ControlButton>
          </div>
          <div className="flex flex-wrap gap-6">
            <SliderControl
              label="Scale"
              value={scale}
              min={1}
              max={10}
              step={0.5}
              onChange={setScale}
            />
            <SliderControl
              label="Speed"
              value={speed}
              min={0.1}
              max={1}
              step={0.1}
              onChange={setSpeed}
            />
          </div>
        </div>
      }
    >
      <div className="relative overflow-hidden rounded-2xl">
        <canvas
          ref={canvasRef}
          className="h-64 w-full"
          style={{ display: "block" }}
        />
        <div className="absolute bottom-4 right-4 rounded-lg bg-black/30 px-3 py-1.5 backdrop-blur-sm">
          <span className="text-xs font-medium text-white/90">Simplex Noise</span>
        </div>
      </div>
    </ExampleWrapper>
  );
}

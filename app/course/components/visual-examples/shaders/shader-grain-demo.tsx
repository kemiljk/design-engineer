"use client";

import React, { useRef, useEffect, useState } from "react";
import { Play } from "iconoir-react";
import {
  ExampleWrapper,
  ControlGroup,
  ControlButton,
  SliderControl,
} from "../base/example-wrapper";
import { initWebGL, setUniform, isWebGLSupported } from "./webgl-utils";

const GRAIN_FRAGMENT_SHADER = `
  precision mediump float;
  
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform float u_intensity;
  uniform float u_animated;
  
  varying vec2 v_uv;
  
  // High-quality noise
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }
  
  void main() {
    // Base gradient
    vec3 baseColor = mix(
      vec3(0.06, 0.06, 0.08),
      vec3(0.12, 0.10, 0.14),
      v_uv.y
    );
    
    // Animated or static grain
    float timeOffset = u_animated > 0.5 ? fract(u_time * 10.0) : 0.0;
    
    // Generate grain
    vec2 grainUV = v_uv * u_resolution / 2.0; // Scale to pixel density
    float grain = random(grainUV + timeOffset);
    
    // Center around 0 and apply intensity
    grain = (grain - 0.5) * u_intensity;
    
    // Apply grain
    vec3 color = baseColor + grain;
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

const intensityPresets = [
  { name: "Subtle", value: 0.05 },
  { name: "Medium", value: 0.1 },
  { name: "Strong", value: 0.15 },
  { name: "Heavy", value: 0.25 },
];

export function ShaderGrainDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const animationRef = useRef<number>(0);
  const cleanupRef = useRef<(() => void) | null>(null);

  const [intensity, setIntensity] = useState(0.1);
  const [animated, setAnimated] = useState(true);
  const [supported] = useState(() => isWebGLSupported());

  // Store current state in refs for animation loop
  const stateRef = useRef({ intensity, animated });
  
  useEffect(() => {
    stateRef.current = { intensity, animated };
  }, [intensity, animated]);

  useEffect(() => {
    if (!supported) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const result = initWebGL(canvas, GRAIN_FRAGMENT_SHADER);
    if (!result) return;

    glRef.current = result.gl;
    programRef.current = result.program;
    cleanupRef.current = result.cleanup;

    const render = (time: number) => {
      const gl = glRef.current;
      const program = programRef.current;

      if (!gl || !program || !canvas) return;

      const { intensity: int, animated: anim } = stateRef.current;

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);

      setUniform(gl, program, "u_resolution", [canvas.width, canvas.height]);
      setUniform(gl, program, "u_time", time / 1000);
      setUniform(gl, program, "u_intensity", int);
      setUniform(gl, program, "u_animated", anim ? 1.0 : 0.0);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      animationRef.current = requestAnimationFrame(render);
    };

    animationRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationRef.current);
      cleanupRef.current?.();
    };
  }, [supported]);

  if (!supported) {
    return (
      <ExampleWrapper
        title="Film Grain Effect"
        description="Texture overlay (WebGL not supported)"
      >
        <div className="flex h-64 items-center justify-center rounded-xl bg-neutral-900">
          <p className="text-white/60 text-sm">CSS fallback (WebGL unavailable)</p>
        </div>
      </ExampleWrapper>
    );
  }

  return (
    <ExampleWrapper
      title="Film Grain Effect"
      description="Subtle grain adds warmth and a premium feel to dark interfaces. This effect runs per-pixel at 60fps with minimal GPU cost."
      controls={
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <ControlGroup label="Intensity">
              {intensityPresets.map((preset) => (
                <ControlButton
                  key={preset.name}
                  active={Math.abs(intensity - preset.value) < 0.01}
                  onClick={() => setIntensity(preset.value)}
                >
                  {preset.name}
                </ControlButton>
              ))}
            </ControlGroup>
            <ControlButton active={animated} onClick={() => setAnimated(!animated)}>
              <Play className={`size-4 ${animated ? "fill-current" : ""}`} />
              <span className="ml-2">Animate</span>
            </ControlButton>
          </div>
          <SliderControl
            label="Intensity"
            value={intensity}
            min={0.02}
            max={0.3}
            step={0.01}
            onChange={setIntensity}
          />
        </div>
      }
    >
      <div className="relative overflow-hidden rounded-2xl">
        <canvas
          ref={canvasRef}
          className="h-64 w-full"
          style={{ display: "block" }}
        />
        {/* Sample content overlay to show grain effect on UI */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3">
          <h3 className="text-2xl font-bold text-white">Premium Dark UI</h3>
          <p className="text-sm text-white/60">Grain adds depth and texture</p>
        </div>
      </div>
    </ExampleWrapper>
  );
}

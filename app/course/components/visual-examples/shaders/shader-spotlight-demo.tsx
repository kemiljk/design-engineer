"use client";

import React, { useRef, useEffect, useState } from "react";
import { CursorPointer } from "iconoir-react";
import {
  ExampleWrapper,
  ControlGroup,
  ControlButton,
  SliderControl,
} from "../base/example-wrapper";
import { initWebGL, setUniform, hexToRgb, isWebGLSupported } from "./webgl-utils";

const SPOTLIGHT_FRAGMENT_SHADER = `
  precision mediump float;
  
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_time;
  uniform float u_radius;
  uniform float u_softness;
  uniform vec3 u_lightColor;
  
  varying vec2 v_uv;
  
  // Simple noise for grain
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }
  
  void main() {
    vec2 mouse = u_mouse / u_resolution;
    
    // Flip Y coordinate (canvas origin is bottom-left in WebGL)
    mouse.y = 1.0 - mouse.y;
    
    // Base dark colour
    vec3 baseColor = vec3(0.04, 0.04, 0.06);
    
    // Distance from mouse
    float dist = distance(v_uv, mouse);
    
    // Soft spotlight falloff
    float spotlight = 1.0 - smoothstep(0.0, u_radius * u_softness, dist);
    spotlight = pow(spotlight, 1.8);
    
    // Add subtle animation pulse
    spotlight *= 0.9 + sin(u_time * 2.0) * 0.1;
    
    // Add grain
    float grain = random(v_uv + fract(u_time * 0.1)) * 0.04;
    
    // Combine
    vec3 color = baseColor + u_lightColor * spotlight + grain;
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

const lightPresets = [
  { name: "Purple", color: "#8b5cf6" },
  { name: "Blue", color: "#3b82f6" },
  { name: "Cyan", color: "#06b6d4" },
  { name: "Pink", color: "#ec4899" },
];

export function ShaderSpotlightDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const animationRef = useRef<number>(0);
  const cleanupRef = useRef<(() => void) | null>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  const [activePreset, setActivePreset] = useState(0);
  const [radius, setRadius] = useState(0.35);
  const [softness, setSoftness] = useState(1.2);
  const [supported] = useState(() => isWebGLSupported());

  const lightColor = lightPresets[activePreset].color;
  
  // Store current state in refs for animation loop
  const stateRef = useRef({ lightColor, radius, softness });
  
  useEffect(() => {
    stateRef.current = { lightColor, radius, softness };
  }, [lightColor, radius, softness]);

  useEffect(() => {
    if (!supported) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const result = initWebGL(canvas, SPOTLIGHT_FRAGMENT_SHADER);
    if (!result) return;

    glRef.current = result.gl;
    programRef.current = result.program;
    cleanupRef.current = result.cleanup;

    // Set initial mouse position to center
    mouseRef.current = { x: 0.5, y: 0.5 };

    const render = (time: number) => {
      const gl = glRef.current;
      const program = programRef.current;

      if (!gl || !program || !canvas) return;

      const { lightColor, radius: r, softness: s } = stateRef.current;

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);

      setUniform(gl, program, "u_resolution", [canvas.width, canvas.height]);
      setUniform(gl, program, "u_mouse", [
        mouseRef.current.x * canvas.width,
        mouseRef.current.y * canvas.height,
      ]);
      setUniform(gl, program, "u_time", time / 1000);
      setUniform(gl, program, "u_radius", r);
      setUniform(gl, program, "u_softness", s);
      setUniform(gl, program, "u_lightColor", hexToRgb(lightColor));

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      animationRef.current = requestAnimationFrame(render);
    };

    animationRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationRef.current);
      cleanupRef.current?.();
    };
  }, [supported]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };

    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  if (!supported) {
    return (
      <ExampleWrapper
        title="Mouse Spotlight"
        description="Interactive spotlight effect (WebGL not supported)"
      >
        <div className="flex h-64 items-center justify-center rounded-xl bg-neutral-900">
          <p className="text-white/60 text-sm">CSS fallback (WebGL unavailable)</p>
        </div>
      </ExampleWrapper>
    );
  }

  return (
    <ExampleWrapper
      title="Mouse Spotlight"
      description="Move your mouse over the canvas. The spotlight follows with GPU-accelerated per-pixel lighting calculations."
      controls={
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <ControlGroup label="Light Colour">
              {lightPresets.map((preset, i) => (
                <ControlButton
                  key={preset.name}
                  active={activePreset === i}
                  onClick={() => setActivePreset(i)}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: preset.color }}
                    />
                    <span className="hidden sm:inline">{preset.name}</span>
                  </div>
                </ControlButton>
              ))}
            </ControlGroup>
          </div>
          <div className="flex flex-wrap gap-6">
            <SliderControl
              label="Radius"
              value={radius}
              min={0.1}
              max={0.6}
              step={0.05}
              onChange={setRadius}
            />
            <SliderControl
              label="Softness"
              value={softness}
              min={0.5}
              max={2}
              step={0.1}
              onChange={setSoftness}
            />
          </div>
        </div>
      }
    >
      <div ref={containerRef} className="relative overflow-hidden rounded-2xl cursor-none">
        <canvas
          ref={canvasRef}
          className="h-64 w-full"
          style={{ display: "block" }}
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 backdrop-blur-sm">
            <CursorPointer className="size-4 text-white/60" />
            <span className="text-sm text-white/60">Move mouse here</span>
          </div>
        </div>
      </div>
    </ExampleWrapper>
  );
}

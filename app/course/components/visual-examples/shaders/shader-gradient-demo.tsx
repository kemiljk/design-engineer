"use client";

import React, { useRef, useEffect, useState } from "react";
import { PlaySolid, Refresh } from "iconoir-react";
import {
  ExampleWrapper,
  ControlGroup,
  ControlButton,
} from "../base/example-wrapper";
import { initWebGL, setUniform, hexToRgb, isWebGLSupported } from "./webgl-utils";

const GRADIENT_FRAGMENT_SHADER = `
  precision mediump float;
  
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec3 u_color1;
  uniform vec3 u_color2;
  
  varying vec2 v_uv;
  
  void main() {
    // Create a flowing gradient based on position and time
    float gradient = (v_uv.x + v_uv.y) / 2.0;
    
    // Add wave motion
    gradient += sin(v_uv.x * 3.0 + u_time) * 0.15;
    gradient += sin(v_uv.y * 2.0 - u_time * 0.7) * 0.1;
    
    // Clamp to valid range
    gradient = clamp(gradient, 0.0, 1.0);
    
    // Mix colors
    vec3 color = mix(u_color1, u_color2, gradient);
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

const colorPresets = [
  { name: "Indigo → Pink", color1: "#6366f1", color2: "#ec4899" },
  { name: "Blue → Cyan", color1: "#3b82f6", color2: "#06b6d4" },
  { name: "Purple → Orange", color1: "#8b5cf6", color2: "#f97316" },
  { name: "Green → Yellow", color1: "#10b981", color2: "#eab308" },
];

export function ShaderGradientDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const animationRef = useRef<number>(0);
  const cleanupRef = useRef<(() => void) | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [activePreset, setActivePreset] = useState(0);
  const [supported] = useState(() => isWebGLSupported());

  const colors = colorPresets[activePreset];

  // Store current state in refs for animation loop
  const stateRef = useRef({ isPlaying, colors });
  
  useEffect(() => {
    stateRef.current = { isPlaying, colors };
  }, [isPlaying, colors]);

  useEffect(() => {
    if (!supported) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Handle high DPI displays
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const result = initWebGL(canvas, GRADIENT_FRAGMENT_SHADER);
    if (!result) return;

    glRef.current = result.gl;
    programRef.current = result.program;
    cleanupRef.current = result.cleanup;

    const render = (time: number) => {
      const gl = glRef.current;
      const program = programRef.current;

      if (!gl || !program || !canvas) return;

      const { isPlaying: playing, colors: currentColors } = stateRef.current;

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);

      setUniform(gl, program, "u_resolution", [canvas.width, canvas.height]);
      setUniform(gl, program, "u_time", time / 1000);
      setUniform(gl, program, "u_color1", hexToRgb(currentColors.color1));
      setUniform(gl, program, "u_color2", hexToRgb(currentColors.color2));

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

        const { isPlaying: playing, colors: currentColors } = stateRef.current;

        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);

        setUniform(gl, program, "u_resolution", [canvas.width, canvas.height]);
        setUniform(gl, program, "u_time", time / 1000);
        setUniform(gl, program, "u_color1", hexToRgb(currentColors.color1));
        setUniform(gl, program, "u_color2", hexToRgb(currentColors.color2));

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        if (playing) {
          animationRef.current = requestAnimationFrame(render);
        }
      };
      animationRef.current = requestAnimationFrame(render);
    }
    return () => cancelAnimationFrame(animationRef.current);
  }, [isPlaying]);

  const reset = () => {
    setIsPlaying(true);
  };

  if (!supported) {
    return (
      <ExampleWrapper
        title="Shader Gradient"
        description="GPU-powered gradient animation (WebGL not supported)"
      >
        <div className="flex h-64 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-pink-500">
          <p className="text-white/80 text-sm">
            CSS fallback gradient (WebGL unavailable)
          </p>
        </div>
      </ExampleWrapper>
    );
  }

  return (
    <ExampleWrapper
      title="Shader Gradient"
      description="This gradient is calculated per-pixel on the GPU. The smooth, flowing motion would be difficult to achieve with CSS alone."
      controls={
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <ControlGroup label="Colours">
            {colorPresets.map((preset, i) => (
              <ControlButton
                key={preset.name}
                active={activePreset === i}
                onClick={() => setActivePreset(i)}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{
                      background: `linear-gradient(135deg, ${preset.color1}, ${preset.color2})`,
                    }}
                  />
                  <span className="hidden sm:inline">{preset.name}</span>
                </div>
              </ControlButton>
            ))}
          </ControlGroup>
          <div className="flex gap-2">
            <ControlButton active={false} onClick={reset}>
              <Refresh className="size-4" />
            </ControlButton>
            <ControlButton active={isPlaying} onClick={() => setIsPlaying(!isPlaying)}>
              <PlaySolid className={`size-4 ${isPlaying ? "fill-current" : ""}`} />
            </ControlButton>
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
          <span className="text-xs font-medium text-white/90">
            WebGL Shader
          </span>
        </div>
      </div>
    </ExampleWrapper>
  );
}

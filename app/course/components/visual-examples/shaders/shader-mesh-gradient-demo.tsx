"use client";

import React, { useRef, useEffect, useState } from "react";
import { Play, Shuffle } from "lucide-react";
import {
  ExampleWrapper,
  ControlGroup,
  ControlButton,
} from "../base/example-wrapper";
import { initWebGL, setUniform, hexToRgb, isWebGLSupported } from "./webgl-utils";

const MESH_GRADIENT_FRAGMENT_SHADER = `
  precision mediump float;
  
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec3 u_color1;
  uniform vec3 u_color2;
  uniform vec3 u_color3;
  uniform vec3 u_color4;
  
  varying vec2 v_uv;
  
  void main() {
    // Animated control points
    vec2 p1 = vec2(0.25 + sin(u_time * 0.5) * 0.1, 0.25 + cos(u_time * 0.3) * 0.1);
    vec2 p2 = vec2(0.75 + sin(u_time * 0.4) * 0.1, 0.3 + sin(u_time * 0.6) * 0.1);
    vec2 p3 = vec2(0.3 + cos(u_time * 0.35) * 0.1, 0.75 + sin(u_time * 0.45) * 0.1);
    vec2 p4 = vec2(0.7 + sin(u_time * 0.55) * 0.1, 0.8 + cos(u_time * 0.4) * 0.1);
    
    // Calculate distance-based influence for each point
    float d1 = 1.0 - smoothstep(0.0, 0.7, distance(v_uv, p1));
    float d2 = 1.0 - smoothstep(0.0, 0.7, distance(v_uv, p2));
    float d3 = 1.0 - smoothstep(0.0, 0.7, distance(v_uv, p3));
    float d4 = 1.0 - smoothstep(0.0, 0.7, distance(v_uv, p4));
    
    // Smooth blending
    d1 = pow(d1, 1.5);
    d2 = pow(d2, 1.5);
    d3 = pow(d3, 1.5);
    d4 = pow(d4, 1.5);
    
    // Weighted color blend
    float total = d1 + d2 + d3 + d4 + 0.001;
    vec3 color = (u_color1 * d1 + u_color2 * d2 + u_color3 * d3 + u_color4 * d4) / total;
    
    // Add subtle brightness variation
    color *= 0.9 + 0.1 * sin(v_uv.x * 10.0 + u_time);
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

const colorPalettes = [
  {
    name: "Sunset",
    colors: ["#f97316", "#ec4899", "#8b5cf6", "#f59e0b"],
  },
  {
    name: "Ocean",
    colors: ["#06b6d4", "#3b82f6", "#8b5cf6", "#14b8a6"],
  },
  {
    name: "Forest",
    colors: ["#10b981", "#84cc16", "#eab308", "#22c55e"],
  },
  {
    name: "Midnight",
    colors: ["#6366f1", "#8b5cf6", "#a855f7", "#3b82f6"],
  },
];

export function ShaderMeshGradientDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const animationRef = useRef<number>(0);
  const cleanupRef = useRef<(() => void) | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [paletteIndex, setPaletteIndex] = useState(0);
  const [supported] = useState(() => isWebGLSupported());

  const palette = colorPalettes[paletteIndex];

  // Store current state in refs for animation loop
  const stateRef = useRef({ isPlaying, palette });
  
  useEffect(() => {
    stateRef.current = { isPlaying, palette };
  }, [isPlaying, palette]);

  useEffect(() => {
    if (!supported) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const result = initWebGL(canvas, MESH_GRADIENT_FRAGMENT_SHADER);
    if (!result) return;

    glRef.current = result.gl;
    programRef.current = result.program;
    cleanupRef.current = result.cleanup;

    const render = (time: number) => {
      const gl = glRef.current;
      const program = programRef.current;

      if (!gl || !program || !canvas) return;

      const { isPlaying: playing, palette: p } = stateRef.current;

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);

      setUniform(gl, program, "u_resolution", [canvas.width, canvas.height]);
      setUniform(gl, program, "u_time", time / 1000);
      setUniform(gl, program, "u_color1", hexToRgb(p.colors[0]));
      setUniform(gl, program, "u_color2", hexToRgb(p.colors[1]));
      setUniform(gl, program, "u_color3", hexToRgb(p.colors[2]));
      setUniform(gl, program, "u_color4", hexToRgb(p.colors[3]));

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

        const { isPlaying: playing, palette: p } = stateRef.current;

        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);

        setUniform(gl, program, "u_resolution", [canvas.width, canvas.height]);
        setUniform(gl, program, "u_time", time / 1000);
        setUniform(gl, program, "u_color1", hexToRgb(p.colors[0]));
        setUniform(gl, program, "u_color2", hexToRgb(p.colors[1]));
        setUniform(gl, program, "u_color3", hexToRgb(p.colors[2]));
        setUniform(gl, program, "u_color4", hexToRgb(p.colors[3]));

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        if (playing) {
          animationRef.current = requestAnimationFrame(render);
        }
      };
      animationRef.current = requestAnimationFrame(render);
    }
    return () => cancelAnimationFrame(animationRef.current);
  }, [isPlaying]);

  const randomizePalette = () => {
    const newIndex = (paletteIndex + 1) % colorPalettes.length;
    setPaletteIndex(newIndex);
  };

  if (!supported) {
    return (
      <ExampleWrapper
        title="Mesh Gradient"
        description="Multi-point gradient (WebGL not supported)"
      >
        <div
          className="flex h-64 items-center justify-center rounded-xl"
          style={{
            background: `conic-gradient(from 180deg, ${palette.colors.join(", ")})`,
          }}
        >
          <p className="text-white/80 text-sm bg-black/20 px-3 py-1 rounded">
            CSS fallback (WebGL unavailable)
          </p>
        </div>
      </ExampleWrapper>
    );
  }

  return (
    <ExampleWrapper
      title="Mesh Gradient"
      description="Multiple colour points blend organically with animated positions. This trendy effect is achieved by calculating distance-weighted colour mixing per-pixel."
      controls={
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <ControlGroup label="Palette">
            {colorPalettes.map((p, i) => (
              <ControlButton
                key={p.name}
                active={paletteIndex === i}
                onClick={() => setPaletteIndex(i)}
              >
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1">
                    {p.colors.slice(0, 3).map((color, j) => (
                      <div
                        key={j}
                        className="h-3 w-3 rounded-full ring-1 ring-white/20"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <span className="hidden sm:inline">{p.name}</span>
                </div>
              </ControlButton>
            ))}
          </ControlGroup>
          <div className="flex gap-2">
            <ControlButton active={false} onClick={randomizePalette}>
              <Shuffle className="size-4" />
            </ControlButton>
            <ControlButton active={isPlaying} onClick={() => setIsPlaying(!isPlaying)}>
              <Play className={`size-4 ${isPlaying ? "fill-current" : ""}`} />
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
            4-Point Mesh Blend
          </span>
        </div>
      </div>
    </ExampleWrapper>
  );
}

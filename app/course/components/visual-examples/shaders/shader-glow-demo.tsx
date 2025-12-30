"use client";

import React, { useRef, useEffect, useState } from "react";
import { Play } from "lucide-react";
import {
  ExampleWrapper,
  ControlGroup,
  ControlButton,
  SliderControl,
} from "../base/example-wrapper";
import { initWebGL, setUniform, hexToRgb, isWebGLSupported } from "./webgl-utils";

const GLOW_ORBS_SHADER = `
  precision mediump float;
  
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform float u_intensity;
  uniform float u_orbCount;
  uniform vec3 u_color1;
  uniform vec3 u_color2;
  
  varying vec2 v_uv;
  
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }
  
  void main() {
    // Aspect ratio correction
    vec2 uv = v_uv;
    float aspect = u_resolution.x / u_resolution.y;
    uv.x *= aspect;
    
    // Base dark background
    vec3 color = vec3(0.02, 0.02, 0.04);
    
    // Create multiple glowing orbs
    float orbCount = u_orbCount;
    for (float i = 0.0; i < 6.0; i++) {
      if (i >= orbCount) break;
      
      // Unique position and animation for each orb
      float seed = i * 1.618;
      vec2 orbCenter;
      orbCenter.x = 0.3 + random(vec2(seed, 0.0)) * 0.4 * aspect;
      orbCenter.y = 0.3 + random(vec2(0.0, seed)) * 0.4;
      
      // Slow orbital movement
      float orbSpeed = 0.3 + random(vec2(seed, seed)) * 0.3;
      float orbRadius = 0.1 + random(vec2(seed * 2.0, 0.0)) * 0.15;
      orbCenter.x += sin(u_time * orbSpeed + seed) * orbRadius;
      orbCenter.y += cos(u_time * orbSpeed * 0.7 + seed) * orbRadius;
      
      // Distance to orb centre
      float dist = distance(uv, orbCenter);
      
      // Glow falloff with pulsing
      float pulse = 0.8 + sin(u_time * (1.0 + random(vec2(seed, 1.0))) + seed * 2.0) * 0.2;
      float glowSize = (0.15 + random(vec2(seed, 2.0)) * 0.1) * pulse;
      float glow = smoothstep(glowSize, 0.0, dist);
      glow = pow(glow, 1.5) * u_intensity;
      
      // Alternate colours between orbs
      vec3 orbColor = (mod(i, 2.0) < 1.0) ? u_color1 : u_color2;
      
      // Add to final colour
      color += orbColor * glow * 0.6;
    }
    
    // Add subtle grain
    float grain = random(uv + fract(u_time * 0.1)) * 0.03;
    color += grain;
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

const colorPairs = [
  { name: "Cosmic", color1: "#8b5cf6", color2: "#06b6d4" },
  { name: "Sunset", color1: "#f97316", color2: "#ec4899" },
  { name: "Forest", color1: "#22c55e", color2: "#14b8a6" },
  { name: "Fire", color1: "#ef4444", color2: "#eab308" },
];

export function ShaderGlowDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const animationRef = useRef<number>(0);
  const cleanupRef = useRef<(() => void) | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [activePair, setActivePair] = useState(0);
  const [intensity, setIntensity] = useState(1.0);
  const [orbCount, setOrbCount] = useState(4);
  const [supported] = useState(() => isWebGLSupported());

  const colors = colorPairs[activePair];

  const stateRef = useRef({ isPlaying, colors, intensity, orbCount });
  
  useEffect(() => {
    stateRef.current = { isPlaying, colors, intensity, orbCount };
  }, [isPlaying, colors, intensity, orbCount]);

  useEffect(() => {
    if (!supported) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const result = initWebGL(canvas, GLOW_ORBS_SHADER);
    if (!result) return;

    glRef.current = result.gl;
    programRef.current = result.program;
    cleanupRef.current = result.cleanup;

    const render = (time: number) => {
      const gl = glRef.current;
      const program = programRef.current;

      if (!gl || !program || !canvas) return;

      const { isPlaying: playing, colors: c, intensity: i, orbCount: o } = stateRef.current;

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);

      setUniform(gl, program, "u_resolution", [canvas.width, canvas.height]);
      setUniform(gl, program, "u_time", time / 1000);
      setUniform(gl, program, "u_intensity", i);
      setUniform(gl, program, "u_orbCount", o);
      setUniform(gl, program, "u_color1", hexToRgb(c.color1));
      setUniform(gl, program, "u_color2", hexToRgb(c.color2));

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

  useEffect(() => {
    if (isPlaying && glRef.current) {
      const render = (time: number) => {
        const gl = glRef.current;
        const program = programRef.current;
        const canvas = canvasRef.current;

        if (!gl || !program || !canvas) return;

        const { isPlaying: playing, colors: c, intensity: i, orbCount: o } = stateRef.current;

        gl.viewport(0, 0, canvas.width, canvas.height);
        setUniform(gl, program, "u_resolution", [canvas.width, canvas.height]);
        setUniform(gl, program, "u_time", time / 1000);
        setUniform(gl, program, "u_intensity", i);
        setUniform(gl, program, "u_orbCount", o);
        setUniform(gl, program, "u_color1", hexToRgb(c.color1));
        setUniform(gl, program, "u_color2", hexToRgb(c.color2));

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

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
        title="Ambient Glow"
        description="Pulsing glow orbs effect (WebGL not supported)"
      >
        <div className="flex h-64 items-center justify-center rounded-xl bg-neutral-900">
          <p className="text-sm text-white/60">WebGL unavailable</p>
        </div>
      </ExampleWrapper>
    );
  }

  return (
    <ExampleWrapper
      title="Ambient Glow"
      description="Multiple orbs drift and pulse independently, creating an ethereal ambient effect. Great for backgrounds and hero sections."
      controls={
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <ControlGroup label="Palette">
              {colorPairs.map((pair, i) => (
                <ControlButton
                  key={pair.name}
                  active={activePair === i}
                  onClick={() => setActivePair(i)}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: pair.color1 }}
                      />
                      <div
                        className="-ml-1 h-3 w-3 rounded-full"
                        style={{ backgroundColor: pair.color2 }}
                      />
                    </div>
                    <span className="hidden sm:inline">{pair.name}</span>
                  </div>
                </ControlButton>
              ))}
            </ControlGroup>
            <ControlButton active={isPlaying} onClick={() => setIsPlaying(!isPlaying)}>
              <Play className={`size-4 ${isPlaying ? "fill-current" : ""}`} />
            </ControlButton>
          </div>
          <div className="flex flex-wrap gap-6">
            <SliderControl
              label="Intensity"
              value={intensity}
              min={0.3}
              max={1.5}
              step={0.1}
              onChange={setIntensity}
            />
            <SliderControl
              label="Orbs"
              value={orbCount}
              min={2}
              max={6}
              step={1}
              onChange={setOrbCount}
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
          <span className="text-xs font-medium text-white/90">Ambient Orbs</span>
        </div>
      </div>
    </ExampleWrapper>
  );
}


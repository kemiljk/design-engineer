"use client";

import React, { useRef, useEffect, useState } from "react";
import { PlaySolid } from "iconoir-react";
import {
  ExampleWrapper,
  ControlGroup,
  ControlButton,
  SliderControl,
} from "../base/example-wrapper";
import { initWebGL, setUniform, hexToRgb, isWebGLSupported } from "./webgl-utils";

const FLOWING_GRADIENT_SHADER = `
  precision mediump float;
  
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform float u_distortion;
  uniform float u_speed;
  uniform vec3 u_color1;
  uniform vec3 u_color2;
  uniform vec3 u_color3;
  
  varying vec2 v_uv;
  
  // Simplex noise for distortion
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
    float t = u_time * u_speed;
    
    // Distort UV coordinates with noise
    vec2 distortedUV = v_uv;
    distortedUV.x += snoise(v_uv * 2.0 + t * 0.3) * u_distortion;
    distortedUV.y += snoise(v_uv * 2.0 - t * 0.2 + 100.0) * u_distortion;
    
    // Create flowing diagonal bands
    float band1 = sin(distortedUV.x * 3.0 + distortedUV.y * 2.0 + t) * 0.5 + 0.5;
    float band2 = sin(distortedUV.x * 2.0 - distortedUV.y * 3.0 - t * 0.7) * 0.5 + 0.5;
    float band3 = sin(distortedUV.x * 4.0 + t * 1.2) * 0.5 + 0.5;
    
    // Blend the three colours based on bands
    vec3 color = u_color1 * band1;
    color = mix(color, u_color2, band2 * 0.6);
    color = mix(color, u_color3, band3 * 0.4);
    
    // Add subtle brightness variation
    float brightness = 0.85 + snoise(v_uv * 3.0 + t * 0.5) * 0.15;
    color *= brightness;
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

const colorSchemes = [
  { name: "Sunset", color1: "#f97316", color2: "#ec4899", color3: "#8b5cf6" },
  { name: "Ocean", color1: "#0ea5e9", color2: "#06b6d4", color3: "#14b8a6" },
  { name: "Aurora", color1: "#22c55e", color2: "#06b6d4", color3: "#8b5cf6" },
  { name: "Ember", color1: "#ef4444", color2: "#f97316", color3: "#eab308" },
];

export function ShaderFlowingGradientDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const animationRef = useRef<number>(0);
  const cleanupRef = useRef<(() => void) | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [activeScheme, setActiveScheme] = useState(0);
  const [distortion, setDistortion] = useState(0.15);
  const [speed, setSpeed] = useState(0.5);
  const [supported] = useState(() => isWebGLSupported());

  const colors = colorSchemes[activeScheme];

  const stateRef = useRef({ isPlaying, colors, distortion, speed });
  
  useEffect(() => {
    stateRef.current = { isPlaying, colors, distortion, speed };
  }, [isPlaying, colors, distortion, speed]);

  useEffect(() => {
    if (!supported) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const result = initWebGL(canvas, FLOWING_GRADIENT_SHADER);
    if (!result) return;

    glRef.current = result.gl;
    programRef.current = result.program;
    cleanupRef.current = result.cleanup;

    const render = (time: number) => {
      const gl = glRef.current;
      const program = programRef.current;

      if (!gl || !program || !canvas) return;

      const { isPlaying: playing, colors: c, distortion: d, speed: s } = stateRef.current;

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);

      setUniform(gl, program, "u_resolution", [canvas.width, canvas.height]);
      setUniform(gl, program, "u_time", time / 1000);
      setUniform(gl, program, "u_distortion", d);
      setUniform(gl, program, "u_speed", s);
      setUniform(gl, program, "u_color1", hexToRgb(c.color1));
      setUniform(gl, program, "u_color2", hexToRgb(c.color2));
      setUniform(gl, program, "u_color3", hexToRgb(c.color3));

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

        const { isPlaying: playing, colors: c, distortion: d, speed: s } = stateRef.current;

        gl.viewport(0, 0, canvas.width, canvas.height);
        setUniform(gl, program, "u_resolution", [canvas.width, canvas.height]);
        setUniform(gl, program, "u_time", time / 1000);
        setUniform(gl, program, "u_distortion", d);
        setUniform(gl, program, "u_speed", s);
        setUniform(gl, program, "u_color1", hexToRgb(c.color1));
        setUniform(gl, program, "u_color2", hexToRgb(c.color2));
        setUniform(gl, program, "u_color3", hexToRgb(c.color3));

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
        title="Flowing Gradient"
        description="Multi-colour flowing gradient (WebGL not supported)"
      >
        <div className="flex h-64 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 via-pink-500 to-violet-500">
          <p className="text-sm text-white/80">CSS fallback (WebGL unavailable)</p>
        </div>
      </ExampleWrapper>
    );
  }

  return (
    <ExampleWrapper
      title="Flowing Gradient"
      description="Three colours flow and blend with noise-based distortion. This creates organic, liquid-like movement impossible with CSS gradients."
      controls={
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <ControlGroup label="Scheme">
              {colorSchemes.map((scheme, i) => (
                <ControlButton
                  key={scheme.name}
                  active={activeScheme === i}
                  onClick={() => setActiveScheme(i)}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-6 rounded-sm"
                      style={{
                        background: `linear-gradient(90deg, ${scheme.color1}, ${scheme.color2}, ${scheme.color3})`,
                      }}
                    />
                    <span className="hidden sm:inline">{scheme.name}</span>
                  </div>
                </ControlButton>
              ))}
            </ControlGroup>
            <ControlButton active={isPlaying} onClick={() => setIsPlaying(!isPlaying)}>
              <PlaySolid className={`size-4 ${isPlaying ? "fill-current" : ""}`} />
            </ControlButton>
          </div>
          <div className="flex flex-wrap gap-6">
            <SliderControl
              label="Distortion"
              value={distortion}
              min={0}
              max={0.4}
              step={0.05}
              onChange={setDistortion}
            />
            <SliderControl
              label="Speed"
              value={speed}
              min={0.1}
              max={1.5}
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
          <span className="text-xs font-medium text-white/90">Noise Distortion</span>
        </div>
      </div>
    </ExampleWrapper>
  );
}


"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  ExampleWrapper,
  ControlGroup,
  ControlButton,
} from "../base/example-wrapper";
import { isWebGLSupported, createShader, createProgram } from "./webgl-utils";

const VERTEX_SHADER = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  
  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const PROGRESSIVE_BLUR_FRAGMENT_SHADER = `
  precision highp float;
  
  uniform sampler2D u_image;
  uniform vec2 u_resolution;
  uniform float u_blurStrength;
  uniform int u_direction; // 0 = top-to-bottom, 1 = bottom-to-top, 2 = radial
  uniform float u_falloff;
  
  varying vec2 v_uv;
  
  // Variable blur with multiple samples
  vec4 variableBlur(sampler2D image, vec2 uv, vec2 resolution, float blurAmount) {
    if (blurAmount < 0.01) {
      return texture2D(image, uv);
    }
    
    vec4 color = vec4(0.0);
    float total = 0.0;
    
    // Scale samples based on blur amount
    float radius = blurAmount * 16.0;
    
    for (float x = -4.0; x <= 4.0; x += 1.0) {
      for (float y = -4.0; y <= 4.0; y += 1.0) {
        vec2 offset = vec2(x, y) * radius / 4.0;
        float weight = 1.0 - length(vec2(x, y)) / 5.66;
        weight = max(weight, 0.0);
        weight = weight * weight;
        color += texture2D(image, uv + offset / resolution) * weight;
        total += weight;
      }
    }
    
    return color / total;
  }
  
  void main() {
    vec2 uv = v_uv;
    // Flip Y for correct image orientation
    uv.y = 1.0 - uv.y;
    
    // Calculate blur factor based on direction
    float blurFactor = 0.0;
    
    if (u_direction == 0) {
      // Top to bottom - sharp at top, blurry at bottom
      blurFactor = pow(1.0 - uv.y, u_falloff);
    } else if (u_direction == 1) {
      // Bottom to top - sharp at bottom, blurry at top
      blurFactor = pow(uv.y, u_falloff);
    } else {
      // Radial - sharp at centre, blurry at edges
      vec2 centre = vec2(0.5);
      float dist = distance(uv, centre) * 2.0;
      blurFactor = pow(dist, u_falloff);
    }
    
    blurFactor = clamp(blurFactor, 0.0, 1.0) * u_blurStrength;
    
    vec4 color = variableBlur(u_image, uv, u_resolution, blurFactor);
    
    gl_FragColor = color;
  }
`;

const directionPresets = [
  { name: "Top → Bottom", value: 0 },
  { name: "Bottom → Top", value: 1 },
  { name: "Radial", value: 2 },
];

const strengthPresets = [
  { name: "Subtle", value: 0.3 },
  { name: "Medium", value: 0.6 },
  { name: "Strong", value: 1.0 },
];

const IMAGE_URL = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&auto=format&q=80";

export function ShaderProgressiveBlurDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const textureRef = useRef<WebGLTexture | null>(null);

  const [direction, setDirection] = useState(0);
  const [strength, setStrength] = useState(0.6);
  const [falloff, setFalloff] = useState(1.5);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [supported] = useState(() => isWebGLSupported());

  const stateRef = useRef({ direction, strength, falloff });
  
  useEffect(() => {
    stateRef.current = { direction, strength, falloff };
  }, [direction, strength, falloff]);

  const render = useCallback(() => {
    const gl = glRef.current;
    const program = programRef.current;
    const canvas = canvasRef.current;
    const texture = textureRef.current;

    if (!gl || !program || !canvas || !texture) return;

    const { direction: dir, strength: str, falloff: fall } = stateRef.current;

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(program);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);

    const imageLoc = gl.getUniformLocation(program, "u_image");
    const resLoc = gl.getUniformLocation(program, "u_resolution");
    const strLoc = gl.getUniformLocation(program, "u_blurStrength");
    const dirLoc = gl.getUniformLocation(program, "u_direction");
    const fallLoc = gl.getUniformLocation(program, "u_falloff");

    gl.uniform1i(imageLoc, 0);
    gl.uniform2f(resLoc, canvas.width, canvas.height);
    gl.uniform1f(strLoc, str);
    gl.uniform1i(dirLoc, dir);
    gl.uniform1f(fallLoc, fall);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }, []);

  useEffect(() => {
    if (!supported) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const gl = canvas.getContext("webgl", {
      antialias: true,
      alpha: false,
      preserveDrawingBuffer: true,
    });

    if (!gl) return;

    // Create shader program
    const vs = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, PROGRESSIVE_BLUR_FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = createProgram(gl, vs, fs);
    if (!program) return;

    // Set up geometry
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    gl.useProgram(program);
    const posLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    // Create texture
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    
    // Set texture parameters for non-power-of-2 images
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    // Fill with placeholder colour while loading
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
      new Uint8Array([100, 100, 120, 255]));

    glRef.current = gl;
    programRef.current = program;
    textureRef.current = texture;

    // Load the image
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      setImageLoaded(true);
    };
    image.src = IMAGE_URL;

    return () => {
      cancelAnimationFrame(animationRef.current);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteProgram(program);
      gl.deleteBuffer(positionBuffer);
      gl.deleteTexture(texture);
    };
  }, [supported]);

  // Re-render when state changes or image loads
  useEffect(() => {
    if (imageLoaded) {
      render();
    }
  }, [imageLoaded, direction, strength, falloff, render]);

  if (!supported) {
    return (
      <ExampleWrapper
        title="Progressive Blur"
        description="GPU-powered progressive blur (WebGL not supported)"
      >
        <div className="flex h-80 items-center justify-center rounded-xl bg-gradient-to-b from-slate-700 to-slate-900">
          <p className="rounded-lg bg-black/30 px-4 py-2 text-sm text-white/80 backdrop-blur-sm">
            CSS fallback (WebGL unavailable)
          </p>
        </div>
      </ExampleWrapper>
    );
  }

  return (
    <ExampleWrapper
      title="Progressive Blur"
      description="Blur intensity varies smoothly across the image—sharp in one area, progressively blurred elsewhere. Popular in iOS/macOS interfaces for depth and focus."
      controls={
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-4">
            <ControlGroup label="Direction">
              {directionPresets.map((preset) => (
                <ControlButton
                  key={preset.name}
                  active={direction === preset.value}
                  onClick={() => setDirection(preset.value)}
                >
                  {preset.name}
                </ControlButton>
              ))}
            </ControlGroup>
            <ControlGroup label="Strength">
              {strengthPresets.map((preset) => (
                <ControlButton
                  key={preset.name}
                  active={Math.abs(strength - preset.value) < 0.1}
                  onClick={() => setStrength(preset.value)}
                >
                  {preset.name}
                </ControlButton>
              ))}
            </ControlGroup>
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
              <span className="w-16">Falloff</span>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.1"
                value={falloff}
                onChange={(e) => setFalloff(parseFloat(e.target.value))}
                className="h-2 w-32 cursor-pointer appearance-none rounded-full bg-neutral-200 dark:bg-neutral-700 [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-500"
              />
              <span className="w-8 font-mono text-xs">{falloff.toFixed(1)}</span>
            </label>
          </div>
        </div>
      }
    >
      <div className="relative overflow-hidden rounded-2xl">
        <canvas
          ref={canvasRef}
          className="h-80 w-full"
          style={{ display: "block" }}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-800">
            <div className="size-8 animate-spin rounded-full border-2 border-white/20 border-t-white/80" />
          </div>
        )}
        <div className="absolute bottom-4 left-4 rounded-lg bg-black/40 px-3 py-2 backdrop-blur-sm">
          <p className="text-xs font-medium text-white">
            {direction === 0 && "Sharp at top, blurred at bottom"}
            {direction === 1 && "Sharp at bottom, blurred at top"}
            {direction === 2 && "Sharp at centre, blurred at edges"}
          </p>
        </div>
        <div className="absolute bottom-4 right-4 rounded-lg bg-black/30 px-3 py-1.5 backdrop-blur-sm">
          <span className="text-xs font-medium text-white/90">
            WebGL Shader
          </span>
        </div>
      </div>
    </ExampleWrapper>
  );
}

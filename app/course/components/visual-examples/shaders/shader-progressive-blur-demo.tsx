"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { Play, Pause } from "lucide-react";
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
  uniform float u_time;
  uniform float u_blurStrength;
  uniform int u_direction; // 0 = top-to-bottom, 1 = bottom-to-top, 2 = radial
  uniform float u_falloff;
  
  varying vec2 v_uv;
  
  // Optimised 9-tap Gaussian blur
  vec4 blur9(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {
    vec4 color = vec4(0.0);
    vec2 off1 = vec2(1.3846153846) * direction;
    vec2 off2 = vec2(3.2307692308) * direction;
    color += texture2D(image, uv) * 0.2270270270;
    color += texture2D(image, uv + (off1 / resolution)) * 0.3162162162;
    color += texture2D(image, uv - (off1 / resolution)) * 0.3162162162;
    color += texture2D(image, uv + (off2 / resolution)) * 0.0702702703;
    color += texture2D(image, uv - (off2 / resolution)) * 0.0702702703;
    return color;
  }
  
  // Variable blur with multiple passes simulated
  vec4 variableBlur(sampler2D image, vec2 uv, vec2 resolution, float blurAmount) {
    if (blurAmount < 0.01) {
      return texture2D(image, uv);
    }
    
    vec4 color = vec4(0.0);
    float total = 0.0;
    
    // Scale samples based on blur amount
    float radius = blurAmount * 12.0;
    
    for (float x = -4.0; x <= 4.0; x += 1.0) {
      for (float y = -4.0; y <= 4.0; y += 1.0) {
        vec2 offset = vec2(x, y) * radius / 4.0;
        float weight = 1.0 - length(vec2(x, y)) / 5.66; // sqrt(32)
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
    
    // Calculate blur factor based on direction
    float blurFactor = 0.0;
    
    if (u_direction == 0) {
      // Top to bottom - sharp at top, blurry at bottom
      blurFactor = pow(uv.y, u_falloff);
    } else if (u_direction == 1) {
      // Bottom to top - sharp at bottom, blurry at top
      blurFactor = pow(1.0 - uv.y, u_falloff);
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

// Fragment shader to generate the sample image (cityscape-like pattern)
const IMAGE_GENERATOR_SHADER = `
  precision highp float;
  
  uniform vec2 u_resolution;
  uniform float u_time;
  
  varying vec2 v_uv;
  
  // Hash function for pseudo-randomness
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }
  
  // Smooth noise
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }
  
  void main() {
    vec2 uv = v_uv;
    
    // Sky gradient - warm sunset colours
    vec3 skyTop = vec3(0.15, 0.05, 0.25);
    vec3 skyMid = vec3(0.95, 0.4, 0.3);
    vec3 skyBottom = vec3(1.0, 0.7, 0.4);
    
    float skyGrad = pow(1.0 - uv.y, 0.7);
    vec3 sky = mix(skyTop, skyMid, smoothstep(0.0, 0.5, skyGrad));
    sky = mix(sky, skyBottom, smoothstep(0.5, 1.0, skyGrad));
    
    // Add subtle clouds
    float cloudNoise = noise(uv * vec2(4.0, 2.0) + vec2(u_time * 0.02, 0.0));
    cloudNoise = smoothstep(0.4, 0.7, cloudNoise) * 0.15;
    sky += cloudNoise * (1.0 - uv.y);
    
    // Cityscape silhouette
    float buildingHeight = 0.0;
    float x = uv.x;
    
    // Generate varied building heights
    for (float i = 0.0; i < 20.0; i++) {
      float buildingX = i / 20.0;
      float buildingWidth = 0.03 + hash(vec2(i, 0.0)) * 0.04;
      float height = 0.15 + hash(vec2(i, 1.0)) * 0.35;
      
      if (x > buildingX && x < buildingX + buildingWidth) {
        buildingHeight = max(buildingHeight, height);
      }
    }
    
    // Add some taller landmark buildings
    for (float i = 0.0; i < 5.0; i++) {
      float buildingX = 0.1 + i * 0.2 + hash(vec2(i, 10.0)) * 0.05;
      float buildingWidth = 0.02 + hash(vec2(i, 11.0)) * 0.015;
      float height = 0.4 + hash(vec2(i, 12.0)) * 0.25;
      
      if (x > buildingX && x < buildingX + buildingWidth) {
        buildingHeight = max(buildingHeight, height);
      }
    }
    
    // Building silhouette
    vec3 buildingColor = vec3(0.02, 0.02, 0.05);
    
    // Window lights
    if (uv.y < buildingHeight) {
      float windowX = fract(uv.x * 60.0);
      float windowY = fract(uv.y * 40.0);
      float windowOn = step(0.5, hash(floor(uv * vec2(60.0, 40.0))));
      
      if (windowX > 0.2 && windowX < 0.8 && windowY > 0.2 && windowY < 0.8) {
        float warmLight = hash(floor(uv * vec2(60.0, 40.0)) + 100.0);
        vec3 lightColor = mix(vec3(1.0, 0.9, 0.6), vec3(1.0, 0.7, 0.3), warmLight);
        buildingColor = mix(buildingColor, lightColor * 0.8, windowOn * 0.7);
      }
    }
    
    // Reflection in water at bottom
    float waterLine = 0.15;
    if (uv.y < waterLine) {
      float reflectY = waterLine + (waterLine - uv.y);
      vec3 reflectedSky = mix(skyMid, skyBottom, smoothstep(0.0, 0.3, reflectY));
      
      // Water distortion
      float ripple = sin(uv.x * 30.0 + u_time * 0.5) * 0.01;
      ripple += sin(uv.x * 50.0 - u_time * 0.3) * 0.005;
      
      // Darken and add blue tint for water
      vec3 waterColor = reflectedSky * 0.4;
      waterColor = mix(waterColor, vec3(0.1, 0.15, 0.3), 0.3);
      
      // Add shimmer
      float shimmer = noise(vec2(uv.x * 100.0, uv.y * 20.0 + u_time * 0.5));
      waterColor += shimmer * 0.05;
      
      buildingColor = waterColor;
      sky = waterColor;
    }
    
    // Composite
    vec3 color = uv.y < buildingHeight ? buildingColor : sky;
    
    // Add subtle vignette
    float vignette = 1.0 - length(uv - 0.5) * 0.5;
    color *= vignette;
    
    gl_FragColor = vec4(color, 1.0);
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

export function ShaderProgressiveBlurDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const blurProgramRef = useRef<WebGLProgram | null>(null);
  const imageProgramRef = useRef<WebGLProgram | null>(null);
  const imageTextureRef = useRef<WebGLTexture | null>(null);
  const framebufferRef = useRef<WebGLFramebuffer | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [direction, setDirection] = useState(0);
  const [strength, setStrength] = useState(0.6);
  const [falloff, setFalloff] = useState(1.5);
  const [supported] = useState(() => isWebGLSupported());

  const stateRef = useRef({ isPlaying, direction, strength, falloff });
  
  useEffect(() => {
    stateRef.current = { isPlaying, direction, strength, falloff };
  }, [isPlaying, direction, strength, falloff]);

  const setupWebGL = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const gl = canvas.getContext("webgl", {
      antialias: true,
      alpha: false,
      preserveDrawingBuffer: true,
    });

    if (!gl) return null;

    // Create image generator program
    const imageVs = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const imageFs = createShader(gl, gl.FRAGMENT_SHADER, IMAGE_GENERATOR_SHADER);
    if (!imageVs || !imageFs) return null;
    const imageProgram = createProgram(gl, imageVs, imageFs);
    if (!imageProgram) return null;

    // Create blur program
    const blurVs = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const blurFs = createShader(gl, gl.FRAGMENT_SHADER, PROGRESSIVE_BLUR_FRAGMENT_SHADER);
    if (!blurVs || !blurFs) return null;
    const blurProgram = createProgram(gl, blurVs, blurFs);
    if (!blurProgram) return null;

    // Set up geometry
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    // Set up position attribute for both programs
    [imageProgram, blurProgram].forEach(program => {
      gl.useProgram(program);
      const posLoc = gl.getAttribLocation(program, "a_position");
      gl.enableVertexAttribArray(posLoc);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
    });

    // Create framebuffer and texture for render-to-texture
    const framebuffer = gl.createFramebuffer();
    const texture = gl.createTexture();
    
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, canvas.width, canvas.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    glRef.current = gl;
    imageProgramRef.current = imageProgram;
    blurProgramRef.current = blurProgram;
    imageTextureRef.current = texture;
    framebufferRef.current = framebuffer;

    return { gl, imageProgram, blurProgram, texture, framebuffer };
  }, []);

  useEffect(() => {
    if (!supported) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const setup = setupWebGL();
    if (!setup) return;

    const { gl, imageProgram, blurProgram, texture, framebuffer } = setup;

    const render = (time: number) => {
      const { isPlaying: playing, direction: dir, strength: str, falloff: fall } = stateRef.current;

      // Pass 1: Render the scene to texture
      gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.useProgram(imageProgram);

      const imgResLoc = gl.getUniformLocation(imageProgram, "u_resolution");
      const imgTimeLoc = gl.getUniformLocation(imageProgram, "u_time");
      gl.uniform2f(imgResLoc, canvas.width, canvas.height);
      gl.uniform1f(imgTimeLoc, time / 1000);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      // Pass 2: Apply progressive blur
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.useProgram(blurProgram);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);

      const blurImageLoc = gl.getUniformLocation(blurProgram, "u_image");
      const blurResLoc = gl.getUniformLocation(blurProgram, "u_resolution");
      const blurTimeLoc = gl.getUniformLocation(blurProgram, "u_time");
      const blurStrLoc = gl.getUniformLocation(blurProgram, "u_blurStrength");
      const blurDirLoc = gl.getUniformLocation(blurProgram, "u_direction");
      const blurFallLoc = gl.getUniformLocation(blurProgram, "u_falloff");

      gl.uniform1i(blurImageLoc, 0);
      gl.uniform2f(blurResLoc, canvas.width, canvas.height);
      gl.uniform1f(blurTimeLoc, time / 1000);
      gl.uniform1f(blurStrLoc, str);
      gl.uniform1i(blurDirLoc, dir);
      gl.uniform1f(blurFallLoc, fall);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      if (playing) {
        animationRef.current = requestAnimationFrame(render);
      }
    };

    animationRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [supported, setupWebGL]);

  useEffect(() => {
    if (isPlaying && glRef.current) {
      const render = (time: number) => {
        const gl = glRef.current;
        const canvas = canvasRef.current;
        const imageProgram = imageProgramRef.current;
        const blurProgram = blurProgramRef.current;
        const texture = imageTextureRef.current;
        const framebuffer = framebufferRef.current;

        if (!gl || !canvas || !imageProgram || !blurProgram || !texture || !framebuffer) return;

        const { isPlaying: playing, direction: dir, strength: str, falloff: fall } = stateRef.current;

        // Pass 1
        gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.useProgram(imageProgram);
        gl.uniform2f(gl.getUniformLocation(imageProgram, "u_resolution"), canvas.width, canvas.height);
        gl.uniform1f(gl.getUniformLocation(imageProgram, "u_time"), time / 1000);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        // Pass 2
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.useProgram(blurProgram);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.uniform1i(gl.getUniformLocation(blurProgram, "u_image"), 0);
        gl.uniform2f(gl.getUniformLocation(blurProgram, "u_resolution"), canvas.width, canvas.height);
        gl.uniform1f(gl.getUniformLocation(blurProgram, "u_time"), time / 1000);
        gl.uniform1f(gl.getUniformLocation(blurProgram, "u_blurStrength"), str);
        gl.uniform1i(gl.getUniformLocation(blurProgram, "u_direction"), dir);
        gl.uniform1f(gl.getUniformLocation(blurProgram, "u_falloff"), fall);
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
        title="Progressive Blur"
        description="GPU-powered progressive blur (WebGL not supported)"
      >
        <div className="flex h-80 items-center justify-center rounded-xl bg-gradient-to-b from-purple-900 via-orange-500 to-amber-300">
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
            <ControlButton active={isPlaying} onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? <Pause className="size-4" /> : <Play className="size-4" />}
            </ControlButton>
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


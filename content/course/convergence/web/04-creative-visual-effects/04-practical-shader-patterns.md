# Practical Shader Patterns

> **Quick Summary:** A collection of copy-paste-ready shader patterns for common UI effects—distortion, blur, mouse interaction, and more.

## What You'll Learn

In this lesson, you will build a library of production-ready shader patterns that solve common UI design challenges. We'll implement interactive mouse-following effects that add depth, create sophisticated image distortion and blur techniques for transitions, and explore how to layer multiple effects—like grain, noise, and spotlights—to produce rich, scroll-driven visual experiences.

## Mouse-Following Effects

One of the most impactful shader effects is responding to the mouse cursor. It creates depth and interactivity that feels magical.

### Spotlight Effect

<!-- visual-example: shader-spotlight-demo -->

```glsl
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  vec2 mouse = u_mouse / u_resolution;
  
  // Base dark colour
  vec3 baseColor = vec3(0.05, 0.05, 0.08);
  
  // Spotlight colour
  vec3 lightColor = vec3(0.2, 0.15, 0.4);
  
  // Distance from mouse
  float dist = distance(uv, mouse);
  
  // Soft spotlight falloff
  float spotlight = 1.0 - smoothstep(0.0, 0.4, dist);
  spotlight = pow(spotlight, 1.5);
  
  // Add subtle noise to the light
  float noise = fract(sin(dot(uv * 100.0, vec2(12.9898, 78.233))) * 43758.5453);
  spotlight += noise * 0.02;
  
  vec3 color = mix(baseColor, lightColor, spotlight);
  gl_FragColor = vec4(color, 1.0);
}
```

### Passing Mouse Position

```javascript
// React example with @react-three/fiber
function ShaderPlane() {
  const mesh = useRef();
  
  useFrame(({ mouse, size }) => {
    // Mouse is normalised -1 to 1, convert to pixels
    const x = (mouse.x + 1) * size.width * 0.5;
    const y = (mouse.y + 1) * size.height * 0.5;
    mesh.current.material.uniforms.u_mouse.value.set(x, y);
  });
  
  // ...
}

// Vanilla JS
canvas.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = rect.height - (e.clientY - rect.top); // Flip Y
  material.uniforms.u_mouse.value.set(x, y);
});
```

### Ripple Effect

Create ripples that emanate from mouse clicks:

<!-- visual-example: shader-ripple-demo -->

```glsl
uniform vec2 u_resolution;
uniform vec2 u_clickPos;
uniform float u_clickTime;
uniform float u_time;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  vec2 clickUV = u_clickPos / u_resolution;
  
  float timeSinceClick = u_time - u_clickTime;
  float dist = distance(uv, clickUV);
  
  // Expanding ring
  float ringRadius = timeSinceClick * 0.5;
  float ringWidth = 0.05;
  
  float ring = smoothstep(ringRadius - ringWidth, ringRadius, dist) 
             - smoothstep(ringRadius, ringRadius + ringWidth, dist);
  
  // Fade out over time
  ring *= 1.0 - smoothstep(0.0, 2.0, timeSinceClick);
  
  vec3 color = vec3(0.1) + vec3(0.3, 0.4, 1.0) * ring;
  gl_FragColor = vec4(color, 1.0);
}
```

## Image Distortion

Apply shader effects to images for hover states and transitions.

### Hover Distortion

<!-- visual-example: shader-image-distortion-demo -->

```glsl
uniform sampler2D u_texture;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_hoverStrength;  // 0 to 1, animated on hover

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  vec2 mouse = u_mouse / u_resolution;
  
  // Calculate distortion based on distance from mouse
  vec2 dir = uv - mouse;
  float dist = length(dir);
  
  // Bulge effect near mouse
  float strength = u_hoverStrength * 0.1;
  float bulge = smoothstep(0.3, 0.0, dist) * strength;
  
  // Displace UV coordinates
  vec2 distortedUV = uv + normalize(dir) * bulge;
  
  vec4 color = texture2D(u_texture, distortedUV);
  gl_FragColor = color;
}
```

### Wave Distortion

```glsl
uniform sampler2D u_texture;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_intensity;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  
  // Horizontal wave
  float wave = sin(uv.y * 20.0 + u_time * 3.0) * u_intensity * 0.01;
  
  vec2 distortedUV = vec2(uv.x + wave, uv.y);
  
  vec4 color = texture2D(u_texture, distortedUV);
  gl_FragColor = color;
}
```

## Blur Effects

### Gaussian Blur

True Gaussian blur requires multiple passes or many samples. Here's a simplified single-pass version:

```glsl
uniform sampler2D u_texture;
uniform vec2 u_resolution;
uniform float u_blurRadius;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  vec2 texelSize = 1.0 / u_resolution;
  
  vec4 color = vec4(0.0);
  float total = 0.0;
  
  // Sample in a grid pattern
  for (float x = -4.0; x <= 4.0; x += 1.0) {
    for (float y = -4.0; y <= 4.0; y += 1.0) {
      vec2 offset = vec2(x, y) * texelSize * u_blurRadius;
      
      // Gaussian weight
      float weight = exp(-(x*x + y*y) / 8.0);
      
      color += texture2D(u_texture, uv + offset) * weight;
      total += weight;
    }
  }
  
  gl_FragColor = color / total;
}
```

### Directional Blur (Motion Blur)

```glsl
uniform sampler2D u_texture;
uniform vec2 u_resolution;
uniform vec2 u_direction;  // Direction of blur
uniform float u_strength;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  
  vec4 color = vec4(0.0);
  int samples = 10;
  
  for (int i = 0; i < 10; i++) {
    float t = float(i) / float(samples - 1) - 0.5;
    vec2 offset = u_direction * t * u_strength;
    color += texture2D(u_texture, uv + offset);
  }
  
  gl_FragColor = color / float(samples);
}
```

### Progressive Blur

One of the most popular shader techniques in modern UI is *progressive blur*—where blur intensity varies smoothly across the image. You've seen this in iOS/macOS interfaces: navigation bars that blur content beneath them, with the blur intensifying towards the top.

<!-- visual-example: shader-progressive-blur-demo -->

The key is calculating a blur factor based on position, then varying the sample radius:

```glsl
uniform sampler2D u_texture;
uniform vec2 u_resolution;
uniform float u_blurStrength;
uniform int u_direction;  // 0 = top→bottom, 1 = bottom→top, 2 = radial
uniform float u_falloff;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  
  // Calculate blur factor based on direction
  float blurFactor = 0.0;
  
  if (u_direction == 0) {
    // Sharp at top, blurry at bottom
    blurFactor = pow(uv.y, u_falloff);
  } else if (u_direction == 1) {
    // Sharp at bottom, blurry at top
    blurFactor = pow(1.0 - uv.y, u_falloff);
  } else {
    // Sharp at centre, blurry at edges (radial)
    float dist = distance(uv, vec2(0.5)) * 2.0;
    blurFactor = pow(dist, u_falloff);
  }
  
  blurFactor = clamp(blurFactor, 0.0, 1.0) * u_blurStrength;
  
  // Variable blur based on calculated factor
  vec4 color = variableBlur(u_texture, uv, u_resolution, blurFactor);
  gl_FragColor = color;
}
```

The `u_falloff` uniform controls how sharply the blur transitions—lower values create a more gradual fade, higher values snap more quickly to maximum blur.

## Scroll-Driven Effects

Connect your shader to scroll position for parallax and reveal effects.

### Scroll-Based Distortion

<!-- visual-example: shader-scroll-distortion-demo -->

```javascript
// Pass scroll progress to shader
window.addEventListener('scroll', () => {
  const scrollProgress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  material.uniforms.u_scroll.value = scrollProgress;
});
```

```glsl
uniform float u_scroll;  // 0 at top, 1 at bottom
uniform vec2 u_resolution;
uniform float u_time;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  
  // Reveal effect based on scroll
  float reveal = smoothstep(u_scroll - 0.1, u_scroll + 0.1, uv.y);
  
  // Colour transition
  vec3 color1 = vec3(0.1, 0.1, 0.15);
  vec3 color2 = vec3(0.2, 0.3, 0.5);
  
  vec3 color = mix(color1, color2, reveal);
  gl_FragColor = vec4(color, 1.0);
}
```

## Combining Effects

Real power comes from layering multiple techniques:

### Premium Hero Background

<!-- visual-example: shader-premium-hero-demo -->

```glsl
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Include noise function here

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  vec2 mouse = u_mouse / u_resolution;
  
  // Layer 1: Base gradient
  vec3 baseColor = mix(
    vec3(0.05, 0.05, 0.1),
    vec3(0.1, 0.05, 0.15),
    uv.y
  );
  
  // Layer 2: Animated noise
  float n = snoise(uv * 3.0 + u_time * 0.1) * 0.5 + 0.5;
  baseColor += vec3(0.05, 0.02, 0.08) * n;
  
  // Layer 3: Mouse spotlight
  float spotlight = 1.0 - smoothstep(0.0, 0.5, distance(uv, mouse));
  spotlight = pow(spotlight, 2.0);
  baseColor += vec3(0.1, 0.05, 0.2) * spotlight;
  
  // Layer 4: Subtle grain
  float grain = fract(sin(dot(uv * 500.0 + u_time, vec2(12.9898, 78.233))) * 43758.5453);
  baseColor += grain * 0.03;
  
  gl_FragColor = vec4(baseColor, 1.0);
}
```

## Shader Utilities Library

Build a collection of reusable functions:

```glsl
// ============ UTILITY FUNCTIONS ============

// Random
float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

// 2D Rotation
vec2 rotate(vec2 uv, float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return vec2(uv.x * c - uv.y * s, uv.x * s + uv.y * c);
}

// Smooth minimum (for blending shapes)
float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

// Remap value from one range to another
float remap(float value, float inMin, float inMax, float outMin, float outMax) {
  return outMin + (value - inMin) * (outMax - outMin) / (inMax - inMin);
}

// Circular distance (for radial effects)
float circle(vec2 uv, vec2 center, float radius) {
  return smoothstep(radius, radius - 0.01, distance(uv, center));
}
```

## Try It Yourself

### Exercise 1: Interactive Card

Challenge yourself to build a complete interactive card component. The background should feature a subtle spotlight that tracks the mouse position, overlaid with a gentle, generated noise texture that adds filmic grain. On hover, increase the intensity of the spotlight to create a "lifting" effect.

### Exercise 2: Image Hover Effect

Create an immersive image gallery where hovering over a thumbnail triggers a custom distortion effect. Instead of a simple CSS scale, use a displacement map or coordinate distortion that bulges the image slightly towards the mouse cursor, with a smooth transition in and out of the hover state.

### Exercise 3: Scroll Hero

Design a hero section that responds to the user's scroll depth. As the user scrolls down, shift the background colour scheme from a morning sky to a sunset palette. Simultaneously, increase the intensity of a noise overlay to simulate signal degradation, and use a smoothstep function to reveal the main headline content.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "practical-patterns-quiz",
  "type": "multiple-choice",
  "title": "Practical Shader Patterns",
  "description": "Test your understanding of practical shader techniques.",
  "difficulty": "medium",
  "question": "When creating a mouse-following spotlight effect, why do we use smoothstep() for the falloff?",
  "options": [
    {
      "id": "a",
      "text": "smoothstep() is faster than linear interpolation",
      "isCorrect": false,
      "explanation": "Performance isn't the main reason—smoothstep does slightly more computation."
    },
    {
      "id": "b",
      "text": "smoothstep() creates a gradual, natural-looking falloff with soft edges instead of a hard circle",
      "isCorrect": true,
      "explanation": "Correct! smoothstep() provides an ease-in-ease-out curve, creating soft edges that look natural. A linear falloff would create a visible, harsh edge at the spotlight boundary."
    },
    {
      "id": "c",
      "text": "smoothstep() is required for mouse interaction",
      "isCorrect": false,
      "explanation": "You could use other functions—smoothstep is chosen for its visual quality."
    },
    {
      "id": "d",
      "text": "smoothstep() is the only GLSL function that works with vec2",
      "isCorrect": false,
      "explanation": "Many GLSL functions work with vectors."
    }
  ]
}
-->

## Key Takeaways

Mouse interactions and scroll-driven animations are powerful ways to make shader effects feel reactive and magical, transforming static pages into living environments. By combining multiple techniques—such as image distortion for hover states and layered noise for background texture—you can create deep, premium visuals. The most efficient workflow involves building a personal utility library of reusable shader functions that you can quickly drop into any project.

## Next Steps

Continue to [Performance and Fallbacks](./05-performance-and-fallbacks.md) →

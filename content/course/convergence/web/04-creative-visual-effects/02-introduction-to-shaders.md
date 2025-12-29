# Introduction to Shaders

> **Quick Summary:** Shaders are tiny programs that run on your GPU. Learn the mental model, terminology, and core concepts that make shader programming click.

## What You'll Learn

- What shaders actually are
- The two types: vertex and fragment shaders
- Key terminology: uniforms, varyings, and more
- How to think in parallel
- Setting up your first shader

## What Is a Shader?

A shader is a small program that runs on your graphics card (GPU). Unlike JavaScript, which runs on the CPU and processes things one at a time, shader code runs **simultaneously on thousands of GPU cores**.

Think of it this way:

**JavaScript approach:** "For each of the 2 million pixels, calculate the colour one at a time."

**Shader approach:** "Here's the formula. All 2 million pixels, calculate your colour *now*."

This parallelism is why shaders can create complex, per-pixel effects at 60 frames per second.

## The Two Types of Shaders

### Vertex Shaders

Vertex shaders process the *geometry*—the points that define shapes. For UI work, you'll rarely write custom vertex shaders. We usually just need a simple quad (rectangle) that covers our canvas.

```glsl
// A minimal vertex shader - you'll often use this exact code
attribute vec2 position;

void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
```

### Fragment Shaders (Pixel Shaders)

Fragment shaders are where the magic happens. They determine the **colour of each pixel**. This is what you'll spend most of your time writing.

```glsl
// A fragment shader that makes everything red
void main() {
  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
```

The output `gl_FragColor` is a vector of four values: Red, Green, Blue, Alpha—each ranging from 0.0 to 1.0.

## The GLSL Language

Shaders are written in GLSL (OpenGL Shading Language). It looks similar to C:

```glsl
// Variables have types
float brightness = 0.5;
vec2 position = vec2(0.5, 0.5);
vec3 color = vec3(1.0, 0.0, 0.0);  // RGB
vec4 colorWithAlpha = vec4(1.0, 0.0, 0.0, 1.0);  // RGBA

// Functions work as expected
float square(float x) {
  return x * x;
}

// Built-in math functions
float s = sin(time);
float mixed = mix(0.0, 1.0, 0.5);  // Linear interpolation
float clamped = clamp(value, 0.0, 1.0);
```

### Key Types

| Type | Description | Example |
|------|-------------|---------|
| `float` | Single number | `0.5` |
| `vec2` | 2D vector (x, y) | `vec2(0.5, 0.5)` |
| `vec3` | 3D vector (often RGB) | `vec3(1.0, 0.0, 0.0)` |
| `vec4` | 4D vector (often RGBA) | `vec4(1.0, 0.0, 0.0, 1.0)` |
| `sampler2D` | Texture reference | Used for images |

### Swizzling

GLSL lets you access vector components flexibly:

```glsl
vec4 color = vec4(1.0, 0.5, 0.25, 1.0);

color.r  // 1.0 (red)
color.g  // 0.5 (green)
color.b  // 0.25 (blue)
color.a  // 1.0 (alpha)

color.rgb  // vec3(1.0, 0.5, 0.25)
color.xy   // vec2(1.0, 0.5)
color.bgr  // vec3(0.25, 0.5, 1.0) - reordered!
```

## Communicating with Shaders

Shaders need data from your JavaScript code. There are three ways to pass data:

### Uniforms

Values that are the **same for every pixel**. Set once per frame from JavaScript.

```glsl
uniform float u_time;        // Current time
uniform vec2 u_resolution;   // Canvas size
uniform vec2 u_mouse;        // Mouse position
uniform vec3 u_color;        // A colour you want to use
```

### Attributes

Per-vertex data (mainly for vertex shaders). Less relevant for our UI work.

### Varyings

Data passed from vertex shader to fragment shader, interpolated across the surface. Useful for getting pixel coordinates.

```glsl
// Vertex shader
varying vec2 v_uv;

void main() {
  v_uv = position * 0.5 + 0.5;  // Convert -1,1 to 0,1
  gl_Position = vec4(position, 0.0, 1.0);
}

// Fragment shader
varying vec2 v_uv;

void main() {
  // v_uv.x is 0 at left edge, 1 at right edge
  // v_uv.y is 0 at bottom, 1 at top
  gl_FragColor = vec4(v_uv.x, v_uv.y, 0.0, 1.0);
}
```

## Thinking in Parallel

The hardest part of shader programming is the mental shift. In JavaScript, you might write:

```javascript
// JavaScript: Loop through pixels
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const brightness = (x + y) / (width + height);
    setPixel(x, y, brightness);
  }
}
```

In a shader, you write the formula for **one pixel**, and it runs everywhere:

```glsl
// GLSL: Formula for any pixel
void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  float brightness = (uv.x + uv.y) / 2.0;
  gl_FragColor = vec4(vec3(brightness), 1.0);
}
```

**Key insight:** You don't control *which* pixel you're calculating. You write a formula that works for any pixel, given its coordinates.

## Your First Shader

Let's see a complete, working shader:

<!-- visual-example: shader-gradient-demo -->

```glsl
// Fragment shader: Gradient based on position
uniform vec2 u_resolution;
uniform float u_time;

void main() {
  // Normalise coordinates to 0-1 range
  vec2 uv = gl_FragCoord.xy / u_resolution;
  
  // Create a gradient from bottom-left to top-right
  float gradient = (uv.x + uv.y) / 2.0;
  
  // Add some time-based animation
  gradient += sin(u_time) * 0.1;
  
  // Output the colour
  gl_FragColor = vec4(gradient, gradient * 0.5, 1.0 - gradient, 1.0);
}
```

This shader:
1. Gets the pixel's position as UV coordinates (0 to 1)
2. Calculates a gradient value based on position
3. Adds subtle animation using the time uniform
4. Outputs a colour based on that gradient

## Setting Up Shaders in the Browser

There are several ways to run shaders on the web:

### Option 1: Three.js (Recommended)

```javascript
import * as THREE from 'three';

const material = new THREE.ShaderMaterial({
  uniforms: {
    u_time: { value: 0 },
    u_resolution: { value: new THREE.Vector2() },
  },
  vertexShader: `...`,
  fragmentShader: `...`,
});

// In your animation loop
material.uniforms.u_time.value = performance.now() / 1000;
```

### Option 2: Raw WebGL

More control, more boilerplate. Good to understand, but Three.js handles it for you.

### Option 3: GLSL Canvas Libraries

Libraries like `glslCanvas` simplify setup for simple shader experiments.

## Common Patterns

### Time-Based Animation

```glsl
uniform float u_time;

void main() {
  float wave = sin(u_time * 2.0) * 0.5 + 0.5;  // Oscillates 0-1
  gl_FragColor = vec4(wave, wave, wave, 1.0);
}
```

### Position-Based Gradients

```glsl
void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  gl_FragColor = vec4(uv.x, uv.y, 0.5, 1.0);
}
```

### Distance from Centre

```glsl
void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  vec2 center = vec2(0.5, 0.5);
  float dist = distance(uv, center);
  gl_FragColor = vec4(vec3(1.0 - dist), 1.0);
}
```

## Try It Yourself

### Exercise 1: Colour Gradient

Modify the gradient shader to create a horizontal gradient from blue (left) to orange (right).

### Exercise 2: Circular Gradient

Create a radial gradient that's brightest in the centre and fades to black at the edges.

### Exercise 3: Animated Pulse

Make the circular gradient pulse by multiplying the distance by a time-based sine wave.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "intro-shaders-quiz",
  "type": "multiple-choice",
  "title": "Introduction to Shaders",
  "description": "Test your understanding of shader fundamentals.",
  "difficulty": "medium",
  "question": "What is the key difference between uniforms and varyings in GLSL?",
  "options": [
    {
      "id": "a",
      "text": "Uniforms are faster than varyings",
      "isCorrect": false,
      "explanation": "Speed isn't the distinguishing factor between these two."
    },
    {
      "id": "b",
      "text": "Uniforms are constant across all pixels; varyings are interpolated per-pixel from vertex data",
      "isCorrect": true,
      "explanation": "Correct! Uniforms (like time or mouse position) are set once and are the same everywhere. Varyings are calculated per-vertex and smoothly interpolated across the surface, giving each pixel a different value."
    },
    {
      "id": "c",
      "text": "Uniforms are for 3D, varyings are for 2D",
      "isCorrect": false,
      "explanation": "Both can be used in any dimension of shader work."
    },
    {
      "id": "d",
      "text": "Varyings can only hold colour values",
      "isCorrect": false,
      "explanation": "Varyings can hold any interpolated data—positions, colours, texture coordinates, etc."
    }
  ]
}
-->

## Key Takeaways

- Shaders are GPU programs that run in parallel on every pixel
- Fragment shaders determine pixel colours—that's where we'll focus
- GLSL is a C-like language with vector types and math functions
- Uniforms pass data from JavaScript to shaders (same for all pixels)
- Think in formulas, not loops—describe what any pixel should be

## Next Steps

Continue to [Fragment Shaders for UI](./03-fragment-shaders-for-ui.md) →

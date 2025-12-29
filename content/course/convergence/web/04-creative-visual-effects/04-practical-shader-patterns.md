# Practical Shader Patterns

> **Quick Summary:** A collection of copy-paste-ready shader patterns for common UI effects—distortion, blur, mouse interaction, and more.

## What You'll Learn

- Mouse-interactive effects
- Image distortion techniques
- Blur and depth effects
- Scroll-driven shader animations
- Combining multiple effects

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

Create a card component with a shader background that:
- Shows a subtle spotlight following the mouse
- Has gentle noise animation
- Intensifies on hover

### Exercise 2: Image Hover Effect

Build an image gallery where:
- Images have a slight distortion effect on hover
- The distortion follows the mouse position
- Transitions smoothly in and out

### Exercise 3: Scroll Hero

Create a hero section where:
- The background colour shifts as you scroll
- Noise intensity increases towards the bottom
- A reveal effect shows content

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

- Mouse interaction creates magical, engaging effects
- Image distortion adds depth to hover states
- Combine multiple layers for rich, premium visuals
- Build a utility library of reusable shader functions
- Connect shaders to scroll for dynamic, reactive pages

## Next Steps

Continue to [Performance and Fallbacks](./05-performance-and-fallbacks.md) →

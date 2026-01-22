# Fragment Shaders for UI

> **Quick Summary:** Learn to create practical shader effects for user interfaces—gradients, noise, and visual textures that elevate your designs.

## What You'll Learn

- Throughout this lesson, you will learn to construct practical,
- seamlessly integrate these GPU-powered visuals into your existing component architecture
- seamlessly integrate these GPU-powered visuals into your existing component architecture

## The UI Shader Mindset

Unlike game development shaders (explosions, water, realistic lighting), UI shaders focus on:

- **Subtlety** — Enhancing, not overwhelming
- **Performance** — Running smoothly on all devices
- **Integration** — Working with your design system
- **Accessibility** — Respecting user preferences

Let's build practical effects for real projects.

## Smooth Gradient Animations

CSS gradients animate between states. Shader gradients can *flow* continuously:

<!-- visual-example: shader-flowing-gradient-demo -->

```glsl
uniform vec2 u_resolution;
uniform float u_time;
uniform vec3 u_color1;
uniform vec3 u_color2;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  
  // Create flowing movement
  float flow = sin(uv.x * 3.0 + u_time) * 0.5 + 0.5;
  flow += sin(uv.y * 2.0 - u_time * 0.7) * 0.3;
  flow = clamp(flow, 0.0, 1.0);
  
  // Mix between two colours
  vec3 color = mix(u_color1, u_color2, flow);
  
  gl_FragColor = vec4(color, 1.0);
}
```

### Making It Designerly

Pass your design system colours as uniforms:

```javascript
material.uniforms.u_color1.value = new THREE.Color('#6366f1');  // Indigo
material.uniforms.u_color2.value = new THREE.Color('#ec4899');  // Pink
```

## Noise: The Secret Ingredient

Noise functions generate organic, natural-looking randomness. They're the foundation of countless shader effects.

### What Is Noise?

Unlike `Math.random()` (which gives unrelated values), noise functions give *smooth* randomness—nearby points have similar values.

<!-- visual-example: shader-noise-types-demo -->

### Simplex Noise

The most common noise for UI work. Here's a simplified 2D version:

```glsl
// Simplex noise function (simplified)
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                      -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                   + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
                          dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
```

Don't worry about understanding every line. This is a utility function you can copy and use.

### Using Noise for Organic Movement

```glsl
void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  
  // Animate through noise space
  float n = snoise(uv * 3.0 + u_time * 0.3);
  
  // Map noise (-1 to 1) to a colour blend (0 to 1)
  float blend = n * 0.5 + 0.5;
  
  vec3 color = mix(u_color1, u_color2, blend);
  gl_FragColor = vec4(color, 1.0);
}
```

## Grain and Texture

A subtle grain overlay adds warmth and depth:

<!-- visual-example: shader-grain-demo -->

```glsl
// Simple pseudo-random function
float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  
  // Your base colour or gradient
  vec3 baseColor = vec3(0.1, 0.1, 0.12);
  
  // Add animated grain
  float grain = random(uv + fract(u_time)) * 0.1;
  
  vec3 finalColor = baseColor + grain;
  gl_FragColor = vec4(finalColor, 1.0);
}
```

### Controlling Grain Intensity

```glsl
uniform float u_grainIntensity;  // 0.0 to 0.2 typically

float grain = random(uv + fract(u_time)) * u_grainIntensity;
```

## Glow and Soft Light

Create soft, radial glows that CSS `box-shadow` cannot match:

<!-- visual-example: shader-glow-demo -->

```glsl
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec3 u_glowColor;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  vec2 mouse = u_mouse / u_resolution;
  
  // Distance from mouse/glow center
  float dist = distance(uv, mouse);
  
  // Soft falloff
  float glow = 1.0 - smoothstep(0.0, 0.5, dist);
  glow = pow(glow, 2.0);  // Sharper falloff
  
  vec3 color = u_glowColor * glow;
  gl_FragColor = vec4(color, glow * 0.8);
}
```

## Mesh Gradients

The trendy "mesh gradient" effect—multiple colour points blending organically:

<!-- visual-example: shader-mesh-gradient-demo -->

```glsl
uniform vec2 u_resolution;
uniform float u_time;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  
  // Define gradient control points (animated)
  vec2 p1 = vec2(0.3 + sin(u_time * 0.5) * 0.1, 0.3);
  vec2 p2 = vec2(0.7, 0.5 + cos(u_time * 0.3) * 0.1);
  vec2 p3 = vec2(0.4, 0.8 + sin(u_time * 0.4) * 0.1);
  
  // Define colours
  vec3 c1 = vec3(0.4, 0.2, 0.8);   // Purple
  vec3 c2 = vec3(0.2, 0.6, 0.9);   // Blue
  vec3 c3 = vec3(0.9, 0.3, 0.5);   // Pink
  
  // Calculate influence of each point
  float d1 = 1.0 - smoothstep(0.0, 0.7, distance(uv, p1));
  float d2 = 1.0 - smoothstep(0.0, 0.7, distance(uv, p2));
  float d3 = 1.0 - smoothstep(0.0, 0.7, distance(uv, p3));
  
  // Blend colours based on distance
  float total = d1 + d2 + d3 + 0.001;
  vec3 color = (c1 * d1 + c2 * d2 + c3 * d3) / total;
  
  gl_FragColor = vec4(color, 1.0);
}
```

## Integrating with React

Here's a reusable shader component pattern:

```tsx
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

const fragmentShader = `
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec3 u_color1;
  uniform vec3 u_color2;
  
  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    float blend = sin(uv.x * 3.0 + u_time) * 0.5 + 0.5;
    vec3 color = mix(u_color1, u_color2, blend);
    gl_FragColor = vec4(color, 1.0);
  }
`;

const vertexShader = `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`;

function ShaderPlane({ color1, color2 }) {
  const mesh = useRef();
  const { size } = useThree();
  
  const uniforms = useMemo(() => ({
    u_time: { value: 0 },
    u_resolution: { value: new THREE.Vector2(size.width, size.height) },
    u_color1: { value: new THREE.Color(color1) },
    u_color2: { value: new THREE.Color(color2) },
  }), []);
  
  useFrame(({ clock }) => {
    mesh.current.material.uniforms.u_time.value = clock.getElapsedTime();
  });
  
  return (
    <mesh ref={mesh}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}

export function GradientBackground({ color1 = '#6366f1', color2 = '#ec4899' }) {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas>
        <ShaderPlane color1={color1} color2={color2} />
      </Canvas>
    </div>
  );
}
```

## Try It Yourself

### Exercise 1: Branded Gradient

Create a flowing gradient using your brand colours. Adjust the flow speed and pattern to match your brand's personality (calm vs energetic).

### Exercise 2: Subtle Background

Build a dark background with animated noise that's visible but not distracting—aim for the "premium dark mode" aesthetic.

### Exercise 3: Interactive Glow

Create a glow effect that follows the mouse cursor, suitable for a hero section background.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "fragment-ui-quiz",
  "type": "multiple-choice",
  "title": "Fragment Shaders for UI",
  "description": "Test your understanding of practical UI shader techniques.",
  "difficulty": "medium",
  "question": "Why is noise preferred over random() for organic-looking shader effects?",
  "options": [
    {
      "id": "a",
      "text": "Noise is faster to compute",
      "isCorrect": false,
      "explanation": "Noise is actually more computationally expensive than simple random."
    },
    {
      "id": "b",
      "text": "Noise produces smooth, continuous values where nearby points have similar values",
      "isCorrect": true,
      "explanation": "Correct! Random gives completely unrelated values for each point, creating static. Noise creates smooth gradients of randomness, which looks organic and natural—like clouds, terrain, or flowing water."
    },
    {
      "id": "c",
      "text": "Noise works in 3D, random only works in 2D",
      "isCorrect": false,
      "explanation": "Both can work in any number of dimensions."
    },
    {
      "id": "d",
      "text": "Noise is built into GLSL, random is not",
      "isCorrect": false,
      "explanation": "Neither is built-in—both must be implemented or imported."
    }
  ]
}
-->

## Key Takeaways

- Effective UI shaders should always prioritise subtlety
- integration, enhancing the design rather than distracting from it
- integration, enhancing the design rather than distracting from it
- By mastering noise functions to create organic randomness
- using mesh gradients for trendy, fluid visuals, you can add a premium feel to your work
- using mesh gradients for trendy, fluid visuals, you can add a premium feel to your work
- your WebGL effects your WebGL effects

## Next Steps

Continue to [Practical Shader Patterns](./04-practical-shader-patterns.md) →

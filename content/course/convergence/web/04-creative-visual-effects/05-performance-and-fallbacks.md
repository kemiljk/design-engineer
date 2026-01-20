# Performance and Fallbacks

> **Quick Summary:** Shaders are powerful, but they must be production-ready. Learn to optimise performance, handle edge cases, and respect user preferences.

## What You'll Learn

During this final lesson of the module, you will learn to identify and prevent the performance bottlenecks that can turn beautiful shaders into battery-draining liabilities. We'll examine specific optimisation techniques like reducing complexity and throttling updates, implement graceful degradation strategies for older browsers, and ensure your effects respect user accessibility preferences for reduced motion across all devices.

## The Performance Paradox

Shaders run on the GPU—shouldn't they always be fast? Not quite.

### When Shaders Are Fast
Shaders perform best when they are limited to simple per-pixel calculations with minimal texture samples. They excel at rendering static or slowly animating effects on reasonably sized canvases where the GPU workload is predictable and contained.

### When Shaders Slow Down
Performance issues typically arise when shaders attempt complex mathematical operations (such as calculating multiple octaves of noise) or perform many texture lookups per pixel. Very large canvases, such as full-screen effects on 4K displays or high-density mobile screens, can quickly overwhelm the GPU fill rate, especially when running alongside heavy JavaScript computations.

## Measuring Shader Performance

### Browser DevTools

Chrome's Performance panel shows GPU activity:

1. Open DevTools → Performance
2. Check "Screenshots" and "GPU" in settings
3. Record while interacting with your shader
4. Look for frame drops and GPU bottlenecks

### FPS Monitoring

```javascript
// Simple FPS counter
let frameCount = 0;
let lastTime = performance.now();

function updateFPS() {
  frameCount++;
  const now = performance.now();
  
  if (now - lastTime >= 1000) {
    console.log(`FPS: ${frameCount}`);
    frameCount = 0;
    lastTime = now;
  }
  
  requestAnimationFrame(updateFPS);
}

updateFPS();
```

### stats.js

```javascript
import Stats from 'stats.js';

const stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb
document.body.appendChild(stats.dom);

function animate() {
  stats.begin();
  // Your render code
  stats.end();
  requestAnimationFrame(animate);
}
```

## Optimisation Techniques

### 1. Reduce Complexity

**Before:** Multiple noise octaves
```glsl
float n = snoise(uv * 2.0);
n += snoise(uv * 4.0) * 0.5;
n += snoise(uv * 8.0) * 0.25;
n += snoise(uv * 16.0) * 0.125;
```

**After:** Fewer octaves, still effective
```glsl
float n = snoise(uv * 3.0);
n += snoise(uv * 6.0) * 0.4;
```

### 2. Use Lower Resolution

Render at half resolution and scale up:

```javascript
// React Three Fiber
<Canvas dpr={[1, 1.5]}> {/* Limit pixel ratio */}

// Vanilla Three.js
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
```

### 3. Throttle Updates

Don't update uniforms every frame if not needed:

```javascript
// Instead of updating mouse position every frame
let lastUpdate = 0;
const updateInterval = 16; // ~60fps

function onMouseMove(e) {
  const now = performance.now();
  if (now - lastUpdate < updateInterval) return;
  lastUpdate = now;
  
  // Update uniform
  material.uniforms.u_mouse.value.set(e.clientX, e.clientY);
}
```

### 4. Avoid Branching

GPUs prefer uniform execution. Branches can be expensive:

**Slower:**
```glsl
if (dist < 0.5) {
  color = vec3(1.0, 0.0, 0.0);
} else {
  color = vec3(0.0, 0.0, 1.0);
}
```

**Faster:**
```glsl
float blend = step(0.5, dist);
color = mix(vec3(1.0, 0.0, 0.0), vec3(0.0, 0.0, 1.0), blend);
```

### 5. Pre-calculate Where Possible

Move calculations out of the shader where you can:

```javascript
// Calculate once in JavaScript
const aspectRatio = canvas.width / canvas.height;
material.uniforms.u_aspect.value = aspectRatio;

// Use pre-calculated value in shader
// Instead of: float aspect = u_resolution.x / u_resolution.y;
```

## Graceful Degradation

Not all browsers and devices support WebGL equally. Plan for failure.

### Feature Detection

```javascript
function isWebGLSupported() {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch (e) {
    return false;
  }
}

function isWebGL2Supported() {
  try {
    const canvas = document.createElement('canvas');
    return !!canvas.getContext('webgl2');
  } catch (e) {
    return false;
  }
}
```

### Fallback Component

```tsx
function BackgroundEffect() {
  const [webGLSupported, setWebGLSupported] = useState(true);
  
  useEffect(() => {
    setWebGLSupported(isWebGLSupported());
  }, []);
  
  if (!webGLSupported) {
    return <CSSFallbackGradient />;
  }
  
  return <ShaderBackground />;
}

function CSSFallbackGradient() {
  return (
    <div 
      className="absolute inset-0 -z-10"
      style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      }}
    />
  );
}
```

### Progressive Enhancement

Start with CSS, enhance with shaders:

```tsx
function HeroBackground() {
  return (
    <div className="relative">
      {/* CSS base layer—always works */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-purple-900" />
      
      {/* Shader enhancement—loaded conditionally */}
      <ShaderOverlay />
    </div>
  );
}
```

## Respecting Reduced Motion

Users can enable "Reduce Motion" in their OS settings. **Always respect this preference.**

### Detecting the Preference

```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
```

### Adapting Shaders

```javascript
function ShaderBackground() {
  const prefersReducedMotion = usePrefersReducedMotion();
  
  useFrame(({ clock }) => {
    if (prefersReducedMotion) {
      // Static or very slow animation
      mesh.current.material.uniforms.u_time.value = 0;
    } else {
      mesh.current.material.uniforms.u_time.value = clock.getElapsedTime();
    }
  });
  
  // ...
}
```

### React Hook

```tsx
function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);
  
  return prefersReducedMotion;
}
```

### In the Shader

```glsl
uniform bool u_reducedMotion;
uniform float u_time;

void main() {
  float time = u_reducedMotion ? 0.0 : u_time;
  // Use 'time' for all animations
}
```

## Mobile Considerations

Mobile GPUs are less powerful. Consider:

### 1. Detect Mobile

```javascript
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
// Or use a more robust solution like 'react-device-detect'
```

### 2. Simplify for Mobile

```javascript
const shaderComplexity = isMobile ? 'simple' : 'full';

// Different shader versions
const fragmentShader = shaderComplexity === 'simple' 
  ? simpleFragmentShader 
  : fullFragmentShader;
```

### 3. Reduce Update Frequency

```javascript
useFrame(({ clock }) => {
  // Update every other frame on mobile
  if (isMobile && Math.floor(clock.getElapsedTime() * 60) % 2 === 0) {
    return;
  }
  // ... update shader
});
```

## Testing Checklist

Before shipping shader effects:

Before shipping any shader effect, rigorous testing is essential. Verify your work across all major browsers (Chrome, Firefox, Safari) and pay special attention to iOS Safari, which can be restrictive with WebGL resources. Test on low-end Android devices to ensure acceptable frame rates, and confirm that the experience degrades gracefully when `prefers-reduced-motion` is enabled or when WebGL is partially supported. Finally, monitor memory usage over time to catch leaks and check that the effect handles window resizing correctly.

## Try It Yourself

### Exercise 1: Performance Audit

Take a shader you've built and:
1. Measure its FPS on your device
2. Throttle CPU/GPU in DevTools and re-measure
3. Identify one optimisation and implement it
4. Compare before/after performance

### Exercise 2: Fallback Strategy

Build a hero section with:
1. A beautiful shader background
2. A CSS fallback that activates if WebGL fails
3. A static state for reduced motion users

### Exercise 3: Mobile Optimisation

Create two versions of a shader effect:
1. Full version with multiple noise layers
2. Simplified version for mobile
3. Automatically switch based on device

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "performance-fallbacks-quiz",
  "type": "multiple-choice",
  "title": "Performance and Fallbacks",
  "description": "Test your understanding of shader optimisation and accessibility.",
  "difficulty": "medium",
  "question": "Why should shaders respect the 'prefers-reduced-motion' user preference?",
  "options": [
    {
      "id": "a",
      "text": "It's legally required in all countries",
      "isCorrect": false,
      "explanation": "While accessibility laws exist, respecting this preference is primarily about user wellbeing."
    },
    {
      "id": "b",
      "text": "Animated shaders can cause discomfort, nausea, or seizures for users with vestibular disorders or photosensitive conditions",
      "isCorrect": true,
      "explanation": "Correct! Some users enable reduced motion because animation causes real physical discomfort or health risks. Respecting this preference is both ethical and part of building accessible experiences."
    },
    {
      "id": "c",
      "text": "It improves SEO rankings",
      "isCorrect": false,
      "explanation": "Reduced motion is about accessibility, not search engine optimisation."
    },
    {
      "id": "d",
      "text": "Static shaders perform better",
      "isCorrect": false,
      "explanation": "While true, performance isn't the reason to respect this preference."
    }
  ]
}
-->

## Key Takeaways

Never assume shaders are performant by default; you must actively measure and optimise them by reducing complexity, resolution, and update frequency. It is critical to provide solid CSS fallbacks for environments without WebGL and to strictly respect the `prefers-reduced-motion` preference, as animation can cause physical harm to some users. Finally, always test your effects on real mobile devices to ensure they deliver a smooth experience under constrained resources.

## Congratulations

You've completed the Creative Visual Effects module. You now have a powerful tool in your Design Engineering toolkit: the ability to create GPU-powered visual effects that set your work apart.

Continue to [Performance and Polish: Perceived Performance](../05-performance-and-polish/01-perceived-performance.md) →

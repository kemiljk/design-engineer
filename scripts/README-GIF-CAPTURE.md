# GIF Capture System

Automated GIF generation for animation examples using dedicated capture routes.

## How It Works

### 1. Dedicated Capture Routes

Each example has its own isolated route at `/capture/[example-id]`:

- `/capture/border-beam` - Just the BorderBeamDemo
- `/capture/easing-playground` - Just the EasingPlaygroundDemo
- `/capture/timing-comparison` - Just the TimingComparisonDemo
- `/capture/spring-physics` - Just the SpringPhysicsDemo

**Features:**
- Minimal chrome - no navigation, just the example
- Auto-play animations - automatically triggers on load
- Perfect framing - optimized for 1200×675 viewport
- Clean background - neutral-50 light, neutral-950 dark

### 2. Capture Script

The script (`scripts/capture-example-gifs.ts`) uses Playwright to:

1. Navigate to the dedicated capture route
2. Wait for `data-capture-ready` attribute (ensures animations initialized)
3. Record video for specified duration (animations auto-play)
4. Convert WebM → GIF using ffmpeg with optimized palette
5. Save to `public/demos/[example-id].gif`

## Usage

### Prerequisites

```bash
# Make sure ffmpeg is installed
brew install ffmpeg

# Make sure dev server is running
bun run dev
```

### Capture GIFs

```bash
# Capture all examples
bun run capture:gifs

# Capture specific example
bun run capture:gifs border-beam
bun run capture:gifs easing-playground
```

### Test Capture Routes

Visit these URLs while dev server is running:

- http://localhost:3000/capture/border-beam
- http://localhost:3000/capture/easing-playground
- http://localhost:3000/capture/timing-comparison
- http://localhost:3000/capture/spring-physics

Animations should auto-play after ~1.3 seconds.

## Output

```
public/demos/
├── border-beam.gif          # ~2-3MB, 1200×675, 10fps
├── easing-playground.gif    # ~2-3MB, 1200×675, 10fps
├── timing-comparison.gif    # ~2-3MB, 1200×675, 10fps
├── spring-physics.gif       # ~2-3MB, 1200×675, 10fps
└── metadata.json            # File sizes, dimensions, durations
```

## Configuration

Edit `scripts/capture-example-gifs.ts` to adjust:

```typescript
{
  exampleId: 'border-beam',
  route: '/capture/border-beam',
  duration: 5,              // Recording length in seconds
  fps: 10,                  // GIF frame rate
  viewport: { width: 1200, height: 675 },  // Twitter/X optimized
}
```

## Adding New Examples

1. **Add to capture page:**
   ```typescript
   // app/capture/[example-id]/page.tsx
   const EXAMPLE_MAP = {
     "border-beam": BorderBeamDemo,
     "your-new-example": YourNewExampleDemo, // Add here
   };
   ```

2. **Add to capture script:**
   ```typescript
   // scripts/capture-example-gifs.ts
   const examples: CaptureConfig[] = [
     {
       exampleId: 'your-new-example',
       route: '/capture/your-new-example',
       duration: 5,
       viewport: { width: 1200, height: 675 },
       fps: 10,
     },
   ];
   ```

3. **Run capture:**
   ```bash
   bun run capture:gifs your-new-example
   ```

## Troubleshooting

### Animations don't auto-play
- Check the button selector in `app/capture/[example-id]/page.tsx`
- Increase the auto-trigger delay (currently 800ms)

### GIFs are too large
- Reduce `fps` (try 8fps instead of 10fps)
- Reduce `duration`
- The palette generation already optimizes for size

### Capture fails
- Ensure dev server is running on port 3000
- Check browser console in headed mode: `HEADED=true bun run capture:gifs`
- Verify the route works: visit `/capture/[example-id]` in browser

### Video is cut off
- Check viewport dimensions match example layout
- Adjust padding in capture page (`p-8` → `p-4`)

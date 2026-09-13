# First playable world — architecture

No prior application ZIP was supplied. This is a fresh implementation on the agreed React / TypeScript / Three.js / GLSL / Vite / Zustand / Web Audio stack.

## Entry and frame flow

`index.html → src/main.tsx → App.tsx → Organism`

- `store.ts`: user controls only; frame data stays outside React.
- `audio.ts`: one audio context; source cancellation, cleanup, capture errors, media-file playback, and an optional synthesized demo. Microphone/tab sources are analyzed without speaker monitoring. Files/demo route to speakers once.
- `signals.ts`: bands at the actual sample rate, RMS, positive flux, adaptive onset envelope, and frame-rate-independent smoothing. No instrument separation or reliable BPM detection is claimed.
- `organism.ts`: deterministic recursive tube anatomy, merged by arm/material; analytic animated arm transforms; a separately shaded core with matching projected depth; OrbitControls; resource ownership and resize handling.
- `coreShader.ts`: bounded sphere proxy, conservative-step distance-estimate marching, finite-difference normals, and explicit fragment depth. Warped torus anatomy is an artistic distance estimate, not a mathematically proved SDF under every deformation. Lighting is an approximation, not path tracing.
- `App.tsx` / `styles.css`: source panels, image mapping, responsive controls, capture, full screen, focus mode, and visible render statistics.

Rendering: mesh and implicit core → scene color/depth → optional thresholded bloom → output tone mapping/color conversion. Bloom uses lower-resolution mip levels. The primary color/depth targets retain the selected scene resolution. There is no volume or artistic feedback engine yet.

## Resolution and performance

Performance caps scene dimensions at 1280 pixels on the long edge; Balanced caps at 1920. Both respect device pixel ratio within the cap. Native 4K switches Fit to 16:9 and renders 3840×2160. Explicit portrait and square frames retain a 2160-pixel short dimension. CSS size is separate from canvas resolution.

Frame interval is measured from requestAnimationFrame, not GPU elapsed time. The performance panel reports this distinction, scene dimensions, triangles, draw calls, resource counts, renderer identification, and p95. Values include browser scheduling and cannot establish isolated GPU cost. Exported reports contain no uploaded media.

## Resource ownership

Regeneration disposes the old merged geometry; shared materials survive. Images are decoded once to a bounded 2048px canvas texture and disposed when replaced. Generation tokens discard late image/audio requests. Stop removes every owned stream track, disconnects nodes, releases media URLs, and clears the demo timer. Context loss pauses rendering and surfaces an error until restoration.

## Scope still open

The first world is a working foundation, not completion of the entire handover. Additional worlds, volumetric integration, feedback, deeper meso/micro deformation, full browser permission coverage, long thermal testing, and release-grade 4K profiling remain. The current tree anatomy is a recursive procedural mesh with an implicit core; it is not a general fractal-volume renderer.

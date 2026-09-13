# Validation — revision 2

Tested 2026-09-13 in the Codex in-app browser on ANGLE Metal / Apple M1 Pro. Exact browser version, power mode, and isolated GPU pass timings were not captured. These are observed samples, not release certification.

## Automated checks

Strict TypeScript check, Vite production build, and all **15 tests pass**. Coverage includes audio capture cancellation/permission errors, sample-rate handling, silent input, frame-independent envelopes, quiet bass onset, high/bass isolation, exact native resolution, seed repeatability, manual five-second morphs, pause/silence behavior, and Journey dwell/onset/fallback timing.

## Browser checks

- All three worlds selected and visually inspected: vault, porous gyroid, and faceted crystal/ring lattice have different surface construction.
- Built-in 100 BPM audio starts. Render details showed bass/onset values changing (example bass 0.83, onset 0.82) independently of mids/highs. This bass-heavy demo is not a broad-spectrum music acceptance test.
- Automatic Journey changed the selected world while demo audio ran; manual selection disables Journey and holds the selected world.
- A local pulse.wav played and disconnected. A local surface.png uploaded and connected to the material input.
- Native 16:9 main canvas measured **3840×2160**. With Journey/demo running, a recent sample showed **23 FPS**, mean interval **43.0 ms**, and session P95 **108.4 ms** including transitions/startup. A later gyroid sample showed **26–28 FPS**. Balanced 1440×900 samples reached 60–120 FPS depending on the world and transition state.
- Renderer reported 2 geometries, 14 textures, 15 draws including postprocessing. Shader ray work is not represented by its low triangle count.
- No captured browser console errors in the tested revision.

## Limits

The new full-screen distance fields cost more than the old sculpture. Its previous 69 FPS 4K result does not apply. This revision does not meet a 4K60 target on the tested M1 Pro. Native 4K remains explicit without hidden upscaling. Morphs evaluate two fields; optimization and sustained thermal tests remain necessary.

Morphing is smooth field interpolation, not a mathematically guaranteed topology-preserving deformation. Camera passages keep near surfaces out of the eye but may expose cut edges. Thin/distant surfaces can alias. Lighting is approximate; volumetric transport and artistic feedback are not implemented.

Actual microphone/tab permission flows, saved-PNG verification, long resource soak, and user-track perceptual testing remain open. Journey detects onset edges and active-energy dwell, not BPM grids or musical phrases. The three worlds share material systems; further art direction and palette differentiation remain useful.

## 2026-09-14 focused update

Type check, production build and all 16 tests pass. Added isolated-band transient checks for low/mid/high pulses and rejection of repeated pulses from sustained tones. Browser inspection confirmed nested radial geometry/filigree, default orbit off, functioning demo input, and no captured console errors. The earlier timing samples above belong to the previous shader; this pass is not a fresh 4K performance certification.

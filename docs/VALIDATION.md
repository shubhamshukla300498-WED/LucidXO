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

## 2026-09-14 five-preset update

Strict type check and production build pass; 17 automated checks pass, including updated two-second transition timing, 6-second/four-onset eligibility, 10-second fallback, manual selection, pause and silence. Five new presets were selected and visually inspected at 1280×720: coils/webs, nested petals, woven sheets, rectangular portals, and a frontal mask. They are generated geometry; no supplied reference bitmap is embedded. Browser demo playback and automatic world changes were checked. No fresh native-4K timing or real user-track acceptance test was performed for this update.

The mask follows ahead of the traveling camera to keep its face visible. Thin coils/sheets can show aliasing. The mirror world is a repeating checkerboard corridor, not a ray-traced mirror. Continuous beat-driven phase changes supplement the world transitions; these are onset/energy rules, not beat-grid or phrase recognition. Existing performance samples above describe earlier builds only.

## 2026-09-15 rhythm and camera pass

18 automated tests pass. New regression: low-frequency attacks remain detectable over sustained bass at 30/60/120 updates per second, with no unrelated mid/high pulse. Strict type check and build pass. Browser demo playback showed bass/kick pairs changing separately (0.73/0.78 and 0.51/0.22); Solar Mandala rendered while automatic camera was enabled, with no captured console errors. These snapshots verify behavior, not calibrated audio-to-display latency or perceptual smoothness on arbitrary songs. A 1920×1080 sample including startup/morph showed 22 FPS; a later resized 1560×1726 sample showed 41 FPS. Performance remains GPU/view-dependent; no new 4K certification.

Raw band-power rise detection is still a musical proxy: a sharply struck bass note can trigger the kick accent, and a soft kick under a loud bass line may be missed. No source separation, BPM grid, or comparison benchmark against WLED/LedFx is claimed. Added visual smoothing trades a small response delay for less abrupt motion. Camera modulation uses slow energy rather than direct kick impulses, with bounded pitch/yaw/roll; manual look remains available.

## Curved flight and rendering-cost pass

Camera translation now follows a curved path with gradual forward/reverse travel; larger bounded yaw, pitch and roll explore the tunnel sides. Alien Seraph uses reduced angles to retain face framing. Beat-driven pattern phase advances are stronger but smoothed; harmonic deformation and angular kick colors vary within each world. Audio detection itself is unchanged.

Lighting normals use four distance-field evaluations instead of six. Bloom targets run at half their former width and height, with the native primary scene unchanged; the UI labels lower-resolution glow. Image sampling is skipped without an uploaded image. Fixed exact selected-aspect sizing so 16:9 native output is 3840×2160 rather than being affected by CSS rounding.

Type check/build and 18 regressions pass. Browser demo and Solar Mandala were inspected; no captured console errors. Native 3840×2160 Solar Mandala on ANGLE Metal / Apple M1 Pro sampled 21 FPS, 47.1 ms mean interval, P95 165.6 ms including startup/transition. This is not a controlled before/after benchmark, a sustained thermal test, or 4K60 certification. Remaining bottleneck is full-screen raymarching; use lower quality for smoother playback on this GPU.

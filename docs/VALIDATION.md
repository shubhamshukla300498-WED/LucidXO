# First playable milestone — validation

Tested 2026-09-13. This records actual checks and remaining limits, not a declaration that every handover release gate is complete.

## Build and specification

- TypeScript strict type check passed.
- `pnpm build` passed with pinned dependencies; production output is a single HTML file with JavaScript and CSS included.
- Production preview SHA-256: `d772ee8613d39735bd5041780dd408c0782a552909062eaed35b5cbb5be25d7e`.
- Original handover SHA-256, preserved byte prefix, and synchronized research appendix checks passed.
- Nine automated tests passed: refresh-rate-independent smoothing, sample-rate-aware frequency bands, silence normalization, bounded impulse/decay, exact native resolution, deterministic seeds, missing capture audio, late capture cancellation, and permission denial.

## Browser interactions

- Renderer initialized without shader errors in the Codex in-app browser using ANGLE Metal / Apple M1 Pro.
- Desktop 1440×900 layout and 390×844 mobile layout inspected. Mobile controls expand and the document width stays within the viewport. The bottom controls were adjusted to fit four actions without wrapping the last item.
- Built-in sound connected and generated live features.
- A generated local WAV played; pause and disconnect updated source state correctly.
- A generated PNG appeared in the image panel and visibly changed surface/core color. Removal restored the base material.
- Keyboard slider interaction changes the underlying value; Glow was checked at its maximum. Browser automation's direct range fill did not trigger React updates, so keyboard input was used for reliable control testing.
- Native 4K selected an actual 3840×2160 drawing buffer, with no device-pixel-ratio multiplication.

## Performance observation

Native 4K, 16:9, seed 7319, detail 70%, Iridescent palette, glow 35%, no audio or image input. Device: Apple M1 Pro through ANGLE Metal in the Codex in-app browser. Hardware identification is the renderer's reported value; exact browser version, power mode, and GPU-only timings were not independently captured.

The final implementation removes persistent drawing-buffer preservation and renders an explicit frame when saving PNGs. Earlier measurements with preservation enabled were approximately 29–30 FPS. After removal, an observed sample reported 69 FPS, 14.5 ms mean recent frame interval, and 17.5 ms p95 since quality selection at 3840×2160. The scene reported 383,150 triangles per frame, 32 draw calls, and 19 geometries / 15 textures.

These are requestAnimationFrame interval statistics, including browser scheduling. The statistics are not isolated GPU pass times. No claim of universal 4K60 is made.

## Remaining release validation

- Actual microphone recording and browser-tab permission/OS audio-sharing flows need user-driven testing on target browsers. Denial, no-audio, and cancellation lifecycle paths are covered with mocks, not falsely reported as live capture success.
- Full ten-minute thermal soak, the handover's 50-preset-switch/20-source-replacement matrix, and broad browser/GPU compatibility remain uncompleted.
- There is currently one world. Material palette choices are not presented as distinct visual engines.
- Visual quality remains a first playable candidate. Further flagship art direction, volumetrics, feedback, and the remaining worlds are future milestones.

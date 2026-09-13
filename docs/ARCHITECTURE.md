# Rendering architecture — revision 2

React/TypeScript/Vite/Zustand/Three.js/Web Audio remain the stack. `App.tsx` owns controls and dialogs. `audio.ts` owns the single audio context and media tracks. `signals.ts` extracts independent bands, energy, flux, centroid, and onset envelopes, with a bass-rise detector for narrow transients.

`organism.ts` owns a full-screen world pass, camera look/zoom, render targets, image texture, bloom, disposal, and frame statistics. `coreShader.ts` contains three implicit constructions: corrugated vault, periodic gyroid, and repeated octahedral shells with toroidal rings. The former tube meshes and tiny core are removed. The historical filenames are retained to keep changes localized.

`journey.ts` owns testable five-second morph timing and onset/dwell scheduling. During a morph, both fields are interpolated; settled frames evaluate one. Manual selection disables automatic cycling. Pause freezes time, feature snapshots, and transitions. Silence does not advance the automatic dwell counter.

Distance stepping is an empirical conservative approximation, not a proven exact SDF. Detail controls the maximum march count. Finite-difference normals, emissive patterns, and depth attenuation provide shading. This is surface rendering, not volumetric scattering. Native 4K keeps the main targets at 3840×2160 for 16:9; bloom uses reduced mip levels. No automatic hidden resolution reduction occurs.

Images remain local, map around surfaces, and are decoded to a maximum 2048px texture. Replacement disposes the old texture; stale asynchronous loads are ignored. Seeds and world choices update uniforms without allocating new geometry. Context restoration resizes render targets.

Read VALIDATION.md for current timing and open checks. Future work includes richer independent material languages, phrase recognition, additional geometry engines, feedback/volumes, and performance optimization.

# lucidXO

A premium real-time generative audiovisual instrument: alien anatomy, recursive architecture, liquid materials, and distinct musical worlds.

**Status:** researched specification prepared. Application implementation has not started. The primary repository is [shubhamshukla300498-WED/LucidXO](https://github.com/shubhamshukla300498-WED/LucidXO). No live visualizer URL exists yet.

## Start here

- [Complete expanded handover](HANDOVER.md): the uploaded document preserved verbatim, followed by clearly marked research additions.
- [Research additions only](docs/RESEARCH-ADDITIONS.md): rendering techniques, 4K targets, ten preset identities, performance architecture, and Astra roadmap.
- [Original upload](reference/HANDOVER.original.md) and [provenance manifest](reference/manifest.json).
- [Current status](STATUS.md) and [working instructions](AGENTS.md).

The original brief's React/TypeScript/Three.js/GLSL/Vite/Zustand/Web Audio foundation remains the planned stack. The application ZIP mentioned in that brief was not available during specification import. Milestone M1 must audit it if supplied or explicitly document a new scaffold.

## Development workspace

Use this repository directory as the working root. Keep future implementation, documentation, visual evidence, and meaningful checks here. Commit completed changes and sync them to the primary GitHub repository; report any unsynced work. Do not develop in the read-only ChatGPT `sources/` mirror.

[Open the project on GitHub](https://github.com/shubhamshukla300498-WED/LucidXO) to browse the source and specification. A running visualizer needs a separate tested HTTPS deployment in M8; add that link only after it works.

## Preserving the specification

Edit new specification content in `docs/RESEARCH-ADDITIONS.md`, then run:

```sh
python3 scripts/build_handover.py
python3 scripts/build_handover.py --check
```

The script checks the immutable original against the manifest and rebuilds only the combined handover. No rendering benchmark has run yet. Native 3840×2160 quality and frame-rate targets are requirements to validate, not current performance claims.

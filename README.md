# lucidXO

A premium real-time generative audiovisual instrument: alien anatomy, recursive architecture, liquid materials, and distinct musical worlds.

**Status:** first playable organism implemented. The primary repository is [shubhamshukla300498-WED/LucidXO](https://github.com/shubhamshukla300498-WED/LucidXO).

**[Open the live visualizer](https://shubhamshukla300498-wed.github.io/LucidXO/)** — choose Connect audio → Try the built-in sound.

## Run the instrument

Use Node.js 22.12 or newer and pnpm 11.19.0.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open the HTTP address printed by Vite. Opening the root `index.html` as a file will not run the TypeScript source.

```sh
pnpm test
pnpm build
```

The build produces a self-contained `docs/index.html` for GitHub Pages. Configure Pages to deploy the `main` branch's `/docs` directory. Rebuild and commit that file after source changes. The rendered application can also be opened locally with `pnpm preview`.

The first world includes recursive 3D anatomy, an implicit raymarched core, three material palettes, seeded regeneration, real geometry-detail controls, local image influence, microphone/tab/file audio, a synthesized demo, native 4K mode, frame capture, focus/fullscreen, and visible performance statistics. Microphone and tab capture depend on browser permissions and supported audio-sharing surfaces.

This is a first playable milestone. Ten-world diversity, volumes, feedback, and the full release-quality/thermal test matrix remain future work. Read [validation evidence and limits](docs/VALIDATION.md) and the [architecture](docs/ARCHITECTURE.md).

## Start here

- [Complete expanded handover](HANDOVER.md): the uploaded document preserved verbatim, followed by clearly marked research additions.
- [Research additions only](docs/RESEARCH-ADDITIONS.md): rendering techniques, 4K targets, ten preset identities, performance architecture, and Astra roadmap.
- [Original upload](reference/HANDOVER.original.md) and [provenance manifest](reference/manifest.json).
- [Current status](STATUS.md) and [working instructions](AGENTS.md).

The original brief's React/TypeScript/Three.js/GLSL/Vite/Zustand/Web Audio foundation is retained. The earlier application ZIP was not supplied; this implementation starts fresh.

## Development workspace

Use this repository directory as the working root. Keep future implementation, documentation, visual evidence, and meaningful checks here. Commit completed changes and sync them to the primary GitHub repository; report any unsynced work. Do not develop in the read-only ChatGPT `sources/` mirror.

[Open the project on GitHub](https://github.com/shubhamshukla300498-WED/LucidXO) to browse the source and specification. The browser deployment is served from the repository's `docs` build.

## Preserving the specification

Edit new specification content in `docs/RESEARCH-ADDITIONS.md`, then run:

```sh
python3 scripts/build_handover.py
python3 scripts/build_handover.py --check
```

The script checks the immutable original against the manifest and rebuilds only the combined handover. Native 3840×2160 is available; measured performance and remaining release gates are recorded separately in VALIDATION.md.

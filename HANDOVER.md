# HANDOVER.md
# Premium Psychedelic Audio-Reactive Visualizer — Codex Implementation Handover

> **Purpose:** This document is the complete transfer brief for a new Codex project/session.
> It consolidates the previous **Master Prompt / Prompt Generator planning** and the later
> **existing website ZIP/code correction discussion** into one implementation-oriented specification.
>
> **Core instruction:** Do not treat this as a request to cosmetically polish the existing visualizer.
> The visual architecture must be corrected so that presets become genuinely different audiovisual
> worlds rather than variations of the same particle shader.

---

## 0. PROJECT NORTH STAR

Build a **premium realtime 3D psychedelic audio-reactive visualizer website**.

The target is a cinematic audiovisual instrument inspired by:

- high-end realtime generative art
- professional VJ / live visual systems
- psychedelic installations
- DMT-inspired environments
- alien / biological / biomechanical worlds
- fractal recursion and impossible geometry
- premium 3D material rendering
- audio-driven procedural motion

The experience should feel:

- expensive
- mysterious
- immersive
- deep
- cinematic
- organic
- materially rich
- physically dimensional
- unpredictable but controlled
- strongly audio-reactive

It must **NOT** feel like:

- a generic Three.js demo
- a music visualizer template
- an equalizer
- a particle wallpaper
- a single shader with different colors
- a cyan/blue neon screensaver
- a collection of minor particle variations
- flat 2D noise
- cheap "AI psychedelic" visuals
- an amateur VJ effect pack

### Golden Rule

> **Build a living visual system, not a pretty effect.**

Every major preset should have its own visual grammar, geometry, material language, motion language,
camera behavior, lighting, audio mapping, depth structure and transformation logic.

---

# 1. WHAT WE ARE TRANSFERRING

There were two important prior discussions:

### A. Master Prompt / Planning

The original planning established the architecture and creative philosophy:

- browser-based realtime 3D
- React + TypeScript + Three.js + GLSL + Vite + Zustand
- GPU/procedural visual generation
- Web Audio / FFT analysis
- modular audio → control → visual pipeline
- multiband audio reactivity
- preset system
- automatic scene evolution
- cinematic camera
- material/lighting/depth/post processing
- compact premium UI
- multiple fundamentally different visual engines

### B. Existing ZIP / Correction Pass

The downloaded website was reviewed because the current result was visually weak.

The major diagnosis:

1. Effects feel cheap rather than premium.
2. Too many presets behave like particle effects.
3. The same particle language is reused across multiple "different" presets.
4. Blue/cyan brightness and excessive glow dominate the image.
5. The visuals lack convincing macro 3D forms.
6. The system is not producing enough genuine fractal / impossible / alien / biological worlds.
7. Preset switching does not create sufficiently different experiences.
8. The photo/image input pipeline is not functioning as intended.
9. Audio input needs a proper browser-tab/system capture flow.
10. Controls must be truthful: a control must visibly and materially affect the intended system.
11. Performance needs explicit quality modes and GPU-conscious architecture.

---

# 2. EXISTING TECH STACK — KEEP IT

Do NOT migrate the project away from its current foundation unless absolutely necessary.

Preferred stack:

- React
- TypeScript
- Three.js
- GLSL
- Vite
- Zustand
- WebGL / GPU rendering
- Web Audio API
- FFT analysis

Potential WebGPU support can be considered as an enhancement, but the existing WebGL-compatible
pipeline must remain robust.

### Important

The problem is primarily **visual architecture**, not the choice of framework.

Do not rewrite everything just for the sake of rewriting it.

First audit the existing ZIP, understand what is reusable, then refactor/rebuild the rendering
architecture where necessary.

---

# 3. CURRENT VISUAL FAILURE — FIX THIS FIRST

## 3.1 Particle Overuse

The existing implementation behaves too much like a particle visualizer.

The current architecture contains things such as:

- large particle counts
- particle shaders
- particle spread
- particle filaments
- particle size
- additive blending
- particle-driven versions of organism/cosmic/morph/void concepts

Particles are useful as **secondary detail**, but they must not be the primary visual identity
of every preset.

### New rule

Particles should usually represent:

- dust
- spores
- microscopic debris
- energy traces
- atmospheric particles
- sparks
- distant stars
- neural/cellular fragments

They should NOT automatically represent the main subject.

The main subject should frequently be:

- volumetric/procedural geometry
- raymarched SDF forms
- displaced meshes
- implicit surfaces
- metaballs
- fractal structures
- recursive architecture
- tubes/veins/tendrils
- crystalline geometry
- reflective liquid forms
- translucent organisms
- impossible structures

---

# 4. BLUE / CYAN BRIGHTNESS PROBLEM

The current visual system overuses bright blue/cyan and excessive bloom.

This makes the whole experience feel:

- flat
- cheap
- overexposed
- visually repetitive
- like a generic neon shader

### Required correction

Use a proper cinematic luminance hierarchy:

1. deep black / near-black foundation
2. rich midtones
3. controlled emissive areas
4. rare high-intensity highlights

Glow must be **localized**, not sprayed over the entire frame.

Avoid:

- full-frame cyan fog
- everything glowing
- white-blue clipping
- excessive additive blending
- constant maximum bloom
- identical blue treatment across presets

Blue can absolutely exist, especially for specific visual worlds, but it must be a
**material/palette choice**, not the universal renderer identity.

---

# 5. VISUAL REFERENCE LANGUAGE

The previously supplied screenshots/images establish the creative direction.

The reference family includes:

### Organic / Alien
- black/purple luminous organic forms
- alien biological organisms
- biomechanical structures
- cellular / vein-like networks
- neural/tree/branch structures
- black luminous ink tendrils
- dense coral-like filament structures

### Material Worlds
- iridescent zebra/ripple surfaces
- metallic liquid folds
- reflective molten surfaces
- translucent glossy bubble/gel organisms
- prismatic rainbow crystalline forms
- fiery molten red/orange surfaces

### Geometry / Architecture
- fractal kaleidoscopic arches
- recursive tunnels
- impossible geometry
- glowing wireframe cages
- fractal temples
- infinite mirrors
- deep spatial corridors

### Environment
- alien biomechanical landscapes
- blue/violet atmospheric worlds
- deep black voids
- infinite depth
- central focal subjects

### Important interpretation

These screenshots are **visual direction**, not assets to copy literally.

Use their:

- composition
- depth
- material richness
- silhouette
- complexity
- lighting
- contrast
- organic behavior
- surreal spatial logic

as design targets.

Do not make every preset look like the same screenshot with a different hue.

---

# 6. VISUAL ENGINE ARCHITECTURE

Build the renderer as independent systems rather than one universal shader with many uniforms.

Recommended conceptual pipeline:

```text
AUDIO INPUT
    ↓
AUDIO ANALYSIS
    ↓
SMOOTHING / FEATURE EXTRACTION
    ↓
GLOBAL REACTIVE STATE
    ↓
PRESET CONTROL MAPPING
    ↓
VISUAL ENGINE
    ↓
GEOMETRY / SDF / PARTICLES / VOLUMES
    ↓
MATERIALS
    ↓
LIGHTING / FOG / DEPTH
    ↓
FEEDBACK / TRANSFORM
    ↓
COLOR GRADING
    ↓
POST PROCESS
    ↓
OUTPUT
```

---

# 7. AUDIO INPUT SYSTEM

The website must support all three primary audio sources:

1. **Microphone**
2. **Browser tab/system audio capture**
3. **Local audio-file upload**

## 7.1 Browser Tab / System Capture

Use the browser's explicit capture API flow.

Preferred approach:

```text
navigator.mediaDevices.getDisplayMedia(...)
```

The user must explicitly choose the capture source through the browser permission dialog.

The UX should make it obvious that the user should:

- choose the desired browser tab/window/screen
- enable **Share audio** when the browser presents that option

### Important security constraint

Do NOT attempt silent cross-tab/system audio access.

The browser's permission model must be respected.

The UI should explain the capture step clearly.

---

# 8. LOCAL AUDIO FILE

Support local audio upload through a normal browser file picker.

Do NOT require the user to manually place music inside a project/local directory.

Expected flow:

```text
Upload Audio
    ↓
File picker
    ↓
Decode audio
    ↓
AudioBuffer / playback source
    ↓
Web Audio analyser
    ↓
Global reactive state
```

The user should be able to select an audio file directly from the browser.

---

# 9. PHOTO / IMAGE INPUT

The visualizer must support local photo/image upload.

The uploaded image should actually be usable by the visual engine.

Possible roles:

- texture
- color source
- displacement source
- mask
- projected texture
- environment contribution
- feedback source
- material modulation
- palette extraction
- image-driven distortion
- image-as-surface content

### Critical bug to fix

The previous implementation did not properly display/use uploaded photos.

Do not merely show "file uploaded" in UI.

The image must enter the rendering pipeline and visibly affect the output.

Recommended architecture:

```text
Image File
   ↓
ImageBitmap / HTMLImageElement
   ↓
Three.js Texture
   ↓
GPU texture
   ↓
Preset-specific material / shader mapping
```

Different presets can interpret the image differently.

---

# 10. GLOBAL AUDIO ANALYSIS

Create one centralized audio-analysis system.

Expose normalized, smoothed signals such as:

```text
bass
lowMid
mid
high
energy
rms
beat
kick
snare
transient
flux
bpm
```

Not every signal must be perfect, but the system must be stable and useful.

Each signal should support:

- smoothing
- sensitivity
- attack
- decay
- threshold
- response curve
- normalization

Avoid directly driving everything with raw FFT bins.

---

# 11. AUDIO-TO-PARAMETER MAPPING

Any major visual parameter should be able to respond to:

- manual control
- bass
- low-mid
- mid
- high
- energy
- beat
- transient
- flux
- LFO
- noise/random modulation

Conceptually:

```text
PARAMETER =
    baseValue
    + audioSignal * sensitivity
    + lfo * lfoAmount
    + noise * noiseAmount
```

with smoothing and clamping.

This should be centralized rather than reimplemented differently in every shader.

---

# 12. AUDIO REACTIVITY MUST BE MULTI-SCALE

Avoid the cheap effect:

> bass = increase scale

Instead map audio to different levels:

### Macro
- camera movement
- global deformation
- organism expansion
- tunnel radius
- world scale
- large structural transformation

### Meso
- tendril movement
- fold deformation
- recursive depth
- geometry branching
- wave propagation

### Micro
- surface displacement
- cellular shimmer
- particle movement
- texture distortion
- emission flicker

### Events
Beat/transient events can trigger:

- geometry transformation
- camera impulse
- lighting event
- material change
- symmetry change
- recursive burst
- controlled feedback pulse

---

# 13. PRESET SYSTEM

Presets must be **true visual engines**, not color presets.

Minimum conceptual engine family:

1. Organic Tunnel
2. Fractal Alien Organism
3. Fractal Temple
4. Liquid Dimension
5. Crystal Cave
6. Infinite Mirror
7. Cosmic Organism
8. Flow Field
9. Geometric Morph
10. Impossible Void

These names are conceptual identities. The implementation should give each one a distinct
renderer/geometry/material behavior.

---

# 14. PRESET IDENTITY RULE

Each preset must vary across at least these dimensions:

- geometry
- topology
- material
- lighting
- camera
- depth
- deformation
- audio mapping
- motion
- post-processing
- color palette
- symmetry
- composition

### Example

Do NOT implement:

```text
Preset A = particles + blue
Preset B = particles + purple
Preset C = particles + red
Preset D = particles + green
```

Instead:

```text
Preset A = raymarched biological organism

Preset B = recursive architectural fractal

Preset C = reflective liquid surface

Preset D = crystalline volumetric cave
```

---

# 15. FLAGSHIP PRESET — FRACTAL ALIEN ORGANISM

This should be the strongest demonstration of the whole system.

The subject should feel like a living alien structure.

Target qualities:

- central focal organism
- deep black environment
- layered organic structure
- recursive/fractal growth
- branching/tendril forms
- biological cavities
- cellular detail
- glossy/organic material
- subsurface/translucent feel where appropriate
- localized emissive veins
- deep shadows
- atmospheric depth
- infinite spatial falloff
- slow breathing when quiet
- dramatic transformation during musical peaks

It must not be:

- a cloud of particles
- a rotating sphere
- a blob with noise displacement
- a blue glowing point cloud

### Possible implementation ingredients

Use whichever is appropriate:

- SDF raymarching
- fractal distance functions
- recursive transforms
- domain warping
- metaball/implicit geometry
- layered noise
- FBM
- ridged noise
- cellular/Worley-style patterns
- triplanar procedural materials
- normal estimation
- reflection/refraction approximation
- volumetric/fog layers
- GPU-instanced secondary structures

---

# 16. ORGANIC MOTION

Organic motion should be:

- nonlinear
- slow when appropriate
- breathing
- pulsing
- branching
- recursive
- deforming
- asymmetrical
- semi-predictable

Avoid simple:

```text
rotation += speed
```

for every scene.

Combine:

- domain warping
- multiple time scales
- audio impulses
- low-frequency oscillation
- noise fields
- feedback
- recursive deformation

---

# 17. FRACTAL / RECURSIVE SYSTEMS

Fractal visuals must be structurally recursive.

Do not fake "fractal" using only:

- kaleidoscope
- radial blur
- mirrored particles
- repeated textures

Use actual recursive transformations where practical.

Potential techniques:

- iterative SDF transforms
- recursive object placement
- fold operations
- repeated domain transformations
- nested geometry
- feedback recursion
- polar repetition
- symmetry + recursive distortion

Kaleidoscope/polar effects can be used as **secondary transformations**, not the complete identity.

---

# 18. MATERIAL SYSTEM

Materials must be a major source of preset diversity.

Support concepts such as:

### Organic
- wet tissue
- translucent membrane
- gel
- biological shell
- vein/cellular structure

### Metallic
- chrome
- molten metal
- brushed reflective surface
- liquid mercury-like appearance

### Crystal
- glass
- prism
- internal glow
- refraction-like behavior

### Energy
- restrained emissive structures
- plasma
- electrical filaments

### Rock / architecture
- dark stone
- obsidian
- alien mineral
- glowing cracks

Material should determine how light behaves, not merely change the base color.

---

# 19. LIGHTING

Lighting must create depth.

Use:

- key light
- rim light
- emissive surfaces
- local point lights
- environment-like lighting
- shadowing/occlusion approximations
- volumetric atmosphere where affordable

Avoid making the entire object self-emissive.

### Cinematic hierarchy

```text
dark background
      ↓
subject silhouette
      ↓
mid-tone material
      ↓
localized emissive details
      ↓
rare bright highlights
```

---

# 20. DEPTH

Depth is essential.

Use:

- perspective
- atmospheric fog
- depth-aware effects
- DOF where feasible
- foreground/midground/background separation
- volumetric particles only as atmosphere
- camera parallax
- spatial lighting

The scene should feel like the camera is **inside a world**, not looking at a flat shader.

---

# 21. CAMERA SYSTEM

Support cinematic camera modes such as:

- orbit
- drift
- push-in
- pull-out
- tunnel travel
- focal lock
- slow breathing camera
- beat impulse
- controlled shake
- procedural path

Camera movement should be musical and restrained.

Do not make the camera constantly shake.

---

# 22. POST-PROCESSING

Available post systems can include:

- bloom
- chromatic aberration
- lens distortion
- vignette
- film grain
- motion blur
- glitch
- RGB split
- kaleidoscope
- feedback
- echo
- displacement
- screen warp
- radial blur
- color grading
- noise
- temporal distortion

### Important

Post effects must enhance the scene.

Do not stack every effect simultaneously.

Each preset should have a deliberate post-processing profile.

---

# 23. FEEDBACK

Feedback is especially important for premium psychedelic visuals.

Use controlled temporal recursion:

```text
previous frame
    ↓
transform / warp
    ↓
blend with current frame
    ↓
color / distortion
    ↓
output
```

Feedback parameters should include:

- amount
- decay
- warp
- rotation
- scale
- color influence

Audio can modulate feedback during musical peaks.

Avoid permanent maximum feedback because it destroys composition.

---

# 24. AUTO-EVOLUTION

Scenes should evolve over time.

Suggested interval:

```text
8–32 beats
```

Evolution should be controlled.

Possible evolving variables:

- symmetry
- material roughness
- deformation intensity
- camera mode
- geometry scale
- branch density
- fog
- lighting
- palette bias
- post intensity
- fractal depth

Use deterministic/seeded randomness where useful.

### Principle

```text
controlled chaos > random chaos
```

The scene should feel alive rather than broken.

---

# 25. QUIET → PEAK DYNAMICS

A good audiovisual system should have dynamic range.

### Quiet sections

Should become:

- slower
- darker
- more detailed
- breathing
- mysterious
- spacious

### Rising sections

Increase:

- motion
- deformation
- depth
- emission
- camera movement
- structural complexity

### Peaks

Can produce:

- transformations
- recursive bursts
- material shifts
- camera impulses
- geometry expansion
- feedback events
- symmetry changes

Then allow the system to breathe again.

---

# 26. MASTER CONTROLS

Create a coherent global control layer.

Suggested macro controls:

```text
MASTER ENERGY
MOTION
CHAOS
TRIP
DEPTH
DETAIL
FEEDBACK
AUDIO REACTIVITY
COLOR
GLOW
CAMERA
SYMMETRY
```

These should influence the visual system in meaningful ways.

### Critical requirement

A slider must not be decorative.

If the UI says:

```text
DETAIL
```

changing it must visibly affect:

- actual geometry detail
- procedural iterations
- microstructure
- particles/secondary detail
- or another truthful detail subsystem

---

# 27. UI / UX

The UI should stay secondary to the visuals.

Target:

- approximately 90% visual canvas
- minimal overlays
- compact control panels
- premium dark interface
- no dashboard-heavy layout

Primary controls should include:

- preset selection
- generate/randomize
- audio source
- image input
- fullscreen
- aspect ratio
- quality/performance
- essential live controls

Advanced controls can be hidden behind compact panels.

---

# 28. ASPECT RATIOS

Support:

- 16:9
- 9:16
- 1:1
- 4:5

The rendering system must adapt compositionally.

Do not simply crop the 16:9 scene.

Important focal geometry should remain visible in:

- portrait
- square
- landscape

---

# 29. PERFORMANCE

Target smooth realtime operation.

Performance modes should allow quality scaling.

Potential tiers:

```text
PERFORMANCE
BALANCED
QUALITY
```

Quality scaling can change:

- render resolution
- raymarch steps
- particle count
- shadow quality
- post-processing
- feedback resolution
- volumetric quality
- geometry complexity

### GPU-conscious rules

- reuse GPU resources
- dispose old geometries/materials/textures
- avoid recreating shader materials every frame
- use uniforms instead of recompilation where possible
- avoid unnecessary CPU particle simulation
- prefer GPU simulation/instancing
- avoid memory leaks when switching presets
- avoid allocating large objects inside render loops

---

# 30. ARCHITECTURE RECOMMENDATION

A clean conceptual module layout:

```text
src/
  audio/
    AudioManager
    AudioCapture
    AudioFileSource
    TabCapture
    MicrophoneSource
    AudioAnalyzer
    AudioSignals

  core/
    Renderer
    RenderLoop
    QualityManager
    ResolutionManager
    TimeManager

  state/
    audioStore
    visualStore
    presetStore
    uiStore

  presets/
    PresetRegistry
    PresetDefinition
    OrganicTunnel
    FractalAlienOrganism
    FractalTemple
    LiquidDimension
    CrystalCave
    InfiniteMirror
    CosmicOrganism
    FlowField
    GeometricMorph
    ImpossibleVoid

  engines/
    SDFEngine
    ProceduralMeshEngine
    VolumeEngine
    ParticleEngine
    InstancingEngine
    FeedbackEngine

  materials/
    OrganicMaterial
    LiquidMaterial
    CrystalMaterial
    MetalMaterial
    EnergyMaterial
    StoneMaterial

  post/
    Bloom
    Feedback
    Distortion
    ColorGrade
    LensEffects
    TemporalEffects

  image/
    ImageInput
    TextureManager
    ImageAnalysis

  camera/
    CameraController
    CameraModes

  ui/
    PresetPanel
    AudioPanel
    ImagePanel
    ControlPanel
    PerformancePanel
    Fullscreen
```

This is a conceptual structure; adapt to the actual ZIP rather than blindly creating duplicate systems.

---

# 31. PRESET DEFINITION MODEL

Each preset should define more than a color.

Conceptually:

```ts
interface PresetDefinition {
  id: string;
  name: string;

  engine: VisualEngineType;

  geometry: GeometryConfig;
  material: MaterialConfig;
  lighting: LightingConfig;
  camera: CameraConfig;
  audioMapping: AudioMappingConfig;
  deformation: DeformationConfig;
  depth: DepthConfig;
  post: PostConfig;
  feedback: FeedbackConfig;

  palette: PaletteConfig;

  evolution: EvolutionConfig;

  imageInput?: ImageInputConfig;
}
```

This makes presets genuinely modular.

---

# 32. AUDIO MAPPING EXAMPLE

For an organism:

```text
bass
 → macro breathing

lowMid
 → body deformation

mid
 → tendril motion

high
 → cellular shimmer

beat
 → structural pulse

transient
 → camera impulse

flux
 → material complexity

energy
 → overall activity
```

For a crystal cave:

```text
bass
 → cavern deformation

high
 → crystal shimmer

beat
 → light pulse

transient
 → refractive flash

energy
 → fog density
```

The mapping should vary by preset.

---

# 33. IMAGE INPUT MAPPING BY PRESET

The uploaded image should not have one universal behavior.

Examples:

### Organic Organism
Image → color + cellular mask

### Liquid Dimension
Image → reflection/distortion source

### Fractal Temple
Image → texture projection / architecture detail

### Crystal Cave
Image → palette + internal emission

### Infinite Mirror
Image → feedback texture

This makes image upload a real creative input.

---

# 34. RANDOMIZE / GENERATE

Randomization must remain within the preset's identity.

Do not randomly destroy composition.

Randomize things such as:

- seed
- branch pattern
- material parameters
- symmetry
- camera path
- deformation phase
- palette bias
- detail density
- audio sensitivity
- feedback behavior

Every generated result should still look like that preset.

---

# 35. PRESET TRANSITIONS

Transitions should be intentional.

Possible strategies:

- crossfade
- morph
- camera travel
- dissolve
- feedback transition
- geometry replacement during low-luminance moment

Avoid hard popping when possible.

---

# 36. ERROR / FALLBACK DESIGN

A visual preset must not become blank because one advanced feature fails.

Create fallback levels.

Example:

```text
Primary advanced engine
        ↓ if unsupported/fails
Simplified GPU engine
        ↓ if unavailable
Basic procedural engine
```

The UI should remain truthful about capability.

No fake "3D volumetric" label if the current renderer is actually only drawing flat particles.

---

# 37. DEBUGGING / AUDIT REQUIREMENTS

Before redesigning everything, audit the ZIP.

Identify:

- renderer entry point
- scene lifecycle
- shader compilation
- preset switching
- state management
- audio pipeline
- image pipeline
- resource disposal
- post-processing chain
- canvas resizing
- fullscreen
- mobile responsiveness
- WebGL capability
- performance bottlenecks

Search for:

- duplicated particle systems
- unused controls
- dead shader uniforms
- fake preset differences
- shader compile errors
- missing texture bindings
- incorrect aspect-ratio calculations
- stale Three.js objects
- unhandled capture permissions
- missing audio routing
- image texture loading errors

---

# 38. VISUAL QUALITY TEST

For every preset, ask:

### Composition
- Is there a clear focal subject?
- Does it feel spatial?

### Geometry
- Is the geometry genuinely different from other presets?

### Material
- Does the surface have convincing depth/material behavior?

### Lighting
- Are highlights controlled?

### Color
- Is the palette intentional?
- Is black/dark space preserved?

### Audio
- Does music affect multiple visual scales?

### Motion
- Does it breathe?
- Does it evolve?

### Depth
- Does the scene feel 3D?

### Originality
- Could this be mistaken for a generic shader demo?

If yes, redesign it.

---

# 39. SPECIFIC ANTI-PATTERNS TO ELIMINATE

Never use these as the primary solution:

```text
More particles = more premium
More bloom = more psychedelic
More blue = more futuristic
More noise = more complex
More post effects = more cinematic
More randomness = more alive
```

These are false shortcuts.

Instead:

```text
Better geometry
+ better materials
+ controlled lighting
+ real depth
+ layered detail
+ nonlinear motion
+ audio hierarchy
+ intentional composition
= premium visual
```

---

# 40. IMPLEMENTATION PRIORITY

## P0 — Fix foundation

1. Audit current ZIP.
2. Fix build/runtime errors.
3. Fix audio input architecture.
4. Fix image input pipeline.
5. Establish centralized audio analysis.
6. Establish preset engine abstraction.
7. Establish truthful global controls.
8. Establish quality/performance modes.

## P1 — Fix visual architecture

1. Stop relying on particles for every preset.
2. Implement distinct geometry/visual engines.
3. Establish proper materials.
4. Establish cinematic lighting.
5. Establish depth/fog.
6. Improve camera.
7. Improve post stack.
8. Implement controlled feedback.

## P2 — Flagship visual

Make **Fractal Alien Organism** exceptional.

It should serve as the quality benchmark for all other presets.

## P3 — Expand visual worlds

Implement the remaining preset identities with genuinely different rendering strategies.

## P4 — Polish

- transitions
- auto-evolution
- responsive layout
- aspect ratios
- mobile behavior
- performance tuning
- UI refinement

---

# 41. CODEX WORKING METHOD

When starting this project in Codex:

### Step 1 — Inspect before changing

Read the entire relevant source tree.

Do not assume the current architecture from filenames.

### Step 2 — Run the application

Confirm:

- build
- runtime
- console
- shader compilation
- WebGL
- audio capture
- image upload

### Step 3 — Create an architecture map

Document:

```text
entry
→ renderer
→ scene
→ preset system
→ shaders
→ audio
→ state
→ post
→ UI
```

### Step 4 — Identify reusable components

Keep good infrastructure.

Replace weak visual infrastructure.

### Step 5 — Fix input systems

Audio + image must work before visual polish is judged.

### Step 6 — Build one flagship engine

Use **Fractal Alien Organism** as the benchmark.

### Step 7 — Build distinct engines

Do not clone the flagship shader 9 times.

### Step 8 — Integrate audio mapping

Every engine should respond musically.

### Step 9 — Add evolution

Use controlled seeded changes.

### Step 10 — Optimize

Profile GPU and CPU before finalizing.

---

# 42. ACCEPTANCE CRITERIA

The implementation is NOT complete merely because:

- it builds
- the canvas renders
- particles move
- audio changes something
- presets have different names

It is complete when:

### Audio
- microphone works
- browser tab/system capture works through explicit user permission
- local audio file upload works
- analysis is stable and smoothed

### Image
- local image upload works
- uploaded image actually affects the renderer
- no silent failure

### Visual
- presets are fundamentally different
- particle dominance is removed
- blue/cyan overexposure is fixed
- scenes have real depth
- materials are varied
- geometry is varied
- lighting is cinematic
- post effects are controlled
- visuals feel premium

### Reactivity
- bass/mid/high/energy/beat/transient/flux can drive different parameters
- response is smooth
- peaks create meaningful events

### Evolution
- scenes evolve over time
- changes remain coherent

### UI
- visual canvas dominates
- controls are compact
- controls are truthful
- fullscreen works
- aspect ratios work

### Performance
- quality modes work
- preset switching does not leak resources
- stable realtime performance is maintained

---

# 43. DEFINITION OF "PREMIUM"

Premium does NOT mean:

- maximum brightness
- maximum complexity
- maximum particles
- maximum bloom
- maximum saturation

Premium means:

- restraint
- contrast
- depth
- sophisticated material response
- believable spatial composition
- layered detail
- controlled motion
- deliberate color
- dynamic range
- strong focal hierarchy
- high-quality transitions
- responsive audiovisual behavior

---

# 44. FINAL CREATIVE PRINCIPLE

The user should feel:

> "I am looking into another world."

Not:

> "I am looking at a shader reacting to music."

The visualizer should behave like a **living audiovisual organism**.

Music should not merely make the picture move.

Music should influence:

- breathing
- growth
- transformation
- architecture
- material
- light
- camera
- depth
- atmosphere
- recursive behavior
- temporal evolution

The final system should be capable of producing visuals that feel:

**alien + biological + fractal + cinematic + dimensional + musical + mysterious.**

---

# 45. CODEX HANDOVER COMMAND

When this document is provided to Codex, the initial instruction should effectively be:

> **Read HANDOVER.md completely before modifying the project.**
>
> Inspect the existing ZIP/codebase first. Preserve the current React/TypeScript/Three.js/Vite/Zustand
> foundation where it is sound. Diagnose the existing renderer and then implement the required
> architectural corrections.
>
> Do not solve the visual problem by adding more particles, more blue glow, or more post-processing.
> Build genuinely distinct visual engines and make Fractal Alien Organism the flagship quality benchmark.
>
> Treat audio input, browser-tab capture, local audio upload, and image upload as first-class systems.
> Every visible control must be connected to a real underlying parameter.
>
> After implementation, test the application as a user would:
> select audio → select preset → upload image → change controls → switch presets → fullscreen →
> change aspect ratio → change quality → verify sustained realtime rendering.
>
> Do not declare success based only on compilation. Validate the actual audiovisual behavior.

---

# 46. IMPORTANT NON-NEGOTIABLE SUMMARY

```text
KEEP:
React
TypeScript
Three.js
GLSL
Vite
Zustand
Web Audio API
GPU rendering

FIX:
particle-dominated visuals
repetitive preset identity
blue/cyan overexposure
weak materials
flat composition
weak depth
weak audio mapping
broken image input
poor tab-audio UX
untruthful controls
performance/resource issues

BUILD:
distinct visual engines
real procedural 3D forms
SDF/fractal/implicit systems where appropriate
organic/alien materials
cinematic lighting
deep spatial composition
controlled feedback
multiscale audio reactivity
auto-evolution
image-driven visuals
quality modes
responsive aspect ratios

FLAGSHIP:
FRACTAL ALIEN ORGANISM

GOLDEN RULE:
BUILD A LIVING VISUAL SYSTEM, NOT A PRETTY EFFECT.
```

---

## END OF HANDOVER


---

<!-- NEW ADDITIONS BEGIN: 2026-09-13; original bytes above preserved -->

# lucidXO — Research and implementation additions

Added 2026-09-13. This is new material, separate from the uploaded handover.

## A0. Status, provenance, and decisions

The original HANDOVER.md remains the starting specification. Its entire byte sequence is preserved as the prefix of the expanded root HANDOVER.md and separately in `reference/HANDOVER.original.md`. This appendix follows the original END OF HANDOVER marker. `reference/manifest.json` records its SHA-256 and length. Do not rewrite the historical brief to make it appear that later decisions were present originally.

The referenced conversation supplied one Markdown file and five visual references. No application ZIP or source code was available in this task. Statements in the original about broken inputs and existing architecture are inherited diagnoses, not findings verified against running software. Initial implementation must locate and audit that code if supplied; otherwise record its absence and scaffold the agreed stack. Do not invent an existing code audit.

The current deliverable is a researched specification and development repository, not a working visualizer. All timings, quality settings, engine designs, and release gates below are proposed project requirements, not measured performance. Primary sources establish the underlying techniques; their suitability and combination here are engineering recommendations. Research checked on 2026-09-13.

### Decision register

| ID | Decision | Reason / revisit condition |
|---|---|---|
| D01 | Retain React, TypeScript, Three.js, GLSL, Vite, Zustand, Web Audio | Preserve the handover's foundation; audit actual versions before implementation |
| D02 | WebGL2 is the proposed primary renderer; WebGPU is an optional later backend | Avoid paying for two rendering stacks before flagship validation; capability-gate advanced features |
| D03 | Native 3840×2160 is a release target | Upscaling alone does not satisfy the requested native-quality mode |
| D04 | Make Fractal Alien Organism exceptional, then add distinct engines | Validate the quality bar before multiplying presets |
| D05 | Separate simulation, lighting, and history resolutions | Spend GPU work where it visibly improves the image |
| D06 | Single bounded GPT-6 Astra task per milestone by default | Reduce duplicated context, speculative implementation, and repeated review |
| D07 | Repository is the source of truth | Every completed change should have a verified commit; local-only or unsynced states must be reported |

## A1. SDF, sphere tracing, and fractal surfaces

**Research basis.** Sphere tracing uses a distance bound to advance toward an implicit surface. A generic scalar field is not necessarily a safe distance bound; deformation needs mathematical care. Hart's paper explains the distance/Lipschitz foundation and constructive modeling operations. [S1](https://graphics.stanford.edu/courses/cs348b-20-spring-content/uploads/hart.pdf)

**Project design.** Use SDFs for fused organic bodies, recursive architectural cavities, and continuous morphs. Build a small audited library of sphere, capsule, torus, rounded box, union, subtraction, intersection, and smooth blending. Every operation documents whether it preserves a conservative distance bound. For nonuniform scaling or domain warps, derive a bound or explicitly label the field an estimate; a smaller empirical step multiplier alone is not proof against missed surfaces.

The renderer first intersects a bounding volume, then marches only inside the resulting interval. Stop on surface tolerance, far bound, or iteration limit. Scale hit tolerance to projected pixel footprint with lower and upper limits. Refine near hits; use an offset consistent with tolerance for secondary rays. Guard zero gradients, NaNs, near-camera intersections, and fractal singularities. Debug views expose iteration count, hit/miss, estimated distance, normals, and material ID.

Fractal detail must change silhouette or spatial structure. Use bounded folds and recursive transforms with meaningful scales rather than simply mirroring the screen. Separate macro body, branch-scale anatomy, and filtered microdetail. Distant microstructure should fade before it becomes unstable shimmer. Start with one light, a restricted shadow ray, and limited ambient occlusion; additional secondary rays require a measured visual benefit.

**Gate.** Sweep the camera through extreme parameter values, close surfaces, and grazing angles using fixed seeds. No holes, surface explosions, or stuck rays. Show true parallax and readable matte geometry before adding emissive details. Include a rasterized reference primitive to verify SDF depth agrees with mesh depth.

## A2. Procedural meshes and instanced structures

**Research basis.** GPU Gems demonstrates extracting surfaces from procedural density fields, including marching-cubes workflows. Its historical GPU pipeline is evidence for the technique, not code to copy directly into WebGL. [S2](https://developer.nvidia.com/gpugems/gpugems3/part-i-geometry/chapter-1-generating-complex-procedural-terrains-using-gpu)

**Project design.** Favor meshes when the world benefits from stable topology, conventional shadowing, predictable rasterization, or many repeated structures. Use spline tubes for tendrils, rings for anatomical tunnels, instanced crystal primitives, and repeated arch modules for temples. Generate topology at preset load or controlled evolution events; animate vertices on the GPU between those events. Use deterministic seeds, bounded branch counts, instance transforms, and spatially meaningful variation.

Do not regenerate hundreds of thousands of vertices on the main thread every beat. A worker can prepare infrequent topology changes. A WebGL2 path can upload generated buffers or use texture-driven displacement; compute-based extraction is a separate WebGPU experiment. Marching cubes is reserved for topology-changing metaballs whose benefit justifies its complexity.

For tubes, use stable transported frames rather than abrupt orientation changes at spline inflections. Include caps, seam handling, bounded radii, correct normals, and conservative bounds after deformation. LOD must retain the subject silhouette: first remove interior tessellation and tiny branches, then distant modules. Share geometry and material instances wherever this preserves appearance.

**Gate.** No cracks, flipped normals, branch popping, or sudden shading seams in a slow camera sweep. Compare wireframe and shaded frames. Confirm instance counts, draw calls, and geometry memory are stable across repeated regeneration.

## A3. Volumetric worlds

**Research basis.** Volume rendering accumulates emission and absorption through a sampled field; sampling rate and compositing affect both quality and opacity. GPU Gems discusses the relevant optical and compositing model. [S3](https://developer.nvidia.com/gpugems/gpugems/part-vi-beyond-triangles/chapter-39-volume-rendering-techniques)

**Project design.** Use bounded density volumes for Cosmic Organism and local atmosphere around solid anatomy. Keep ordinary depth fog distinct from genuinely sampled 3D density. In front-to-back integration use `alpha = 1 - exp(-sigmaT * density * stepLength)`, accumulate radiance weighted by current transmittance, and update transmittance. This makes opacity respond consistently when changing sample spacing.

Start with single scattering and one dominant light. Add phase anisotropy only when it improves depth; clamp extreme parameters. Stop marching at opaque scene depth and when remaining transmittance is negligible. Use stratified jitter to reduce coherent bands, then introduce temporal accumulation only with reprojection, history rejection, and moving-density validation.

Volume buffers may run at half width and height in Balanced mode, followed by depth-aware reconstruction. Ultra retains native primary geometry and a separately disclosed volume scale. Do not call a reduced-resolution volume pass native just because final output is 4K. A hero volume can request native sampling as an expensive override.

**Failure controls.** Low steps cause bands; aggressive history causes ghosting; poor upsampling leaks fog across silhouettes. Test against bright thin foreground edges, sudden beat-driven deformation, camera cuts, and complete silence. Fallback is simplified density or explicitly labeled depth fog, not an undisclosed replacement.

## A4. Feedback, simulation, and temporal history

**Research basis.** Three.js render targets provide offscreen color/depth attachments and explicit sizing and disposal, forming the storage foundation for temporal effects. [S4](https://threejs.org/docs/pages/RenderTarget.html)

**Project design.** Keep artistic feedback separate from antialiasing history and from simulation state. Artistic feedback intentionally retains trails; reconstruction history should reject stale information. Use two targets with alternating read/write ownership; never sample a texture while rendering into that same attachment.

Define decay by elapsed time: `retention = exp(-dt / lifetimeSeconds)`. Composite `history * retention + injection * (1-retention)` for a bounded starting system. More energetic injection is allowed only with exposure control and finite bounds. Color, warping, and feedback must operate in a documented linear working space rather than repeatedly applying display gamma.

Each preset defines history lifetime, injection mask, warp field, reset conditions, and a route back to fresh composition. Clear history on incompatible preset changes, resize, camera cuts, context restoration, and invalid inputs. Test 30/60/120 Hz equivalence. Never let a frame-count-based decay produce a different artwork merely because the display refresh rate changed.

An optional reaction-diffusion or flow-advection texture can drive membrane patterns or ribbon motion. Treat it as a bounded numerical simulation with fixed steps, limited catch-up, and explicit boundary conditions. Keep it below display resolution where acceptable. Use a simple deterministic state update before adopting a full fluid solver. Offline simulation textures are a fallback, not a claim of live physics.

## A5. Material and lighting systems

**Research basis.** Three.js MeshPhysicalMaterial exposes physical material controls including transmission, thickness/attenuation, clearcoat, anisotropy, and iridescence, with additional rendering cost. Those features offer useful building blocks; they do not automatically make custom SDF shaders physically based. [S5](https://threejs.org/docs/pages/MeshPhysicalMaterial.html)

**Project material contracts.** Each family specifies base response, roughness range, normal scale, emission mask, environment contribution, and bounded audio modulation. Share color-management and light conventions between custom SDF and mesh paths. Document approximations: an environment lookup is not ray-traced reflection; a thickness-tinted membrane is not a full subsurface transport solution.

| Family | Proposed behavior | Avoid |
|---|---|---|
| Membrane | Grazing-angle highlights, thickness-dependent tint, selective internal emission | Globally additive translucent shells |
| Biomechanical shell | Rough body with polished ridges and fine cavity variation | Uniform plastic roughness |
| Liquid metal | Coherent surface normals, broad reflected light shapes, limited ripples | Tiny noisy normals hiding form |
| Crystal | Facet-dependent reflection, transmission, controlled spectral accents | Full-frame rainbow aberration |
| Obsidian/stone | Dark diffuse structure, worn edges, localized fissure emission | Black geometry rescued only by bloom |
| Energy | Spatially bounded emission, readable density and occlusion | Unbounded white light accumulation |

Art direction starts with a neutral light rig and grayscale inspection. Use a key that explains curvature, a rim that separates silhouette, and local emission that reveals anatomy. Preserve midtones. Apply tone mapping and output conversion once at the end; track color textures separately from numeric masks/normals. Bloom uses a restrained multi-resolution chain. Chromatic aberration, film grain, and lens distortion are opt-in per preset, each with a clear purpose.

**Gate.** With bloom off, the subject remains premium and legible. Under a neutral rig, each family is recognizable. Highlights roll off without flattening entire surfaces. Image upload cannot accidentally gamma-transform normal or displacement data.

## A6. Advanced audio mapping

**Research basis.** Meyda documents RMS and spectral descriptors such as centroid, flatness, and flux. These summarize energy and timbre; they are not guaranteed instrument or beat detectors. AudioWorklet provides audio processing off the main thread. [S6](https://meyda.js.org/audio-features), [S7](https://developer.mozilla.org/en-US/docs/Web/API/AudioWorklet)

**Signal contract.** Publish a timestamped feature snapshot containing RMS, four normalized bands, positive spectral flux, onset strength, centroid, flatness, tempo estimate/confidence, and beat phase/confidence. Represent unavailable estimates explicitly. Kick and snare labels remain heuristic unless evaluated; do not present them as stem separation.

Use actual sample rate for FFT-bin boundaries. Initial band proposals: 20–150 Hz, 150–600 Hz, 600–2500 Hz, and 2500 Hz to Nyquist; clamp to available bins. Evaluate a 2048-point analysis window with 512-sample hops as a starting tradeoff, not a mandated universal setting. At 48 kHz these correspond to approximately 42.7 ms and 10.7 ms; total visual latency includes more than the hop size.

Normalize with rolling robust statistics, a silence floor, and bounded gain so quiet noise does not expand to full-scale motion. Use independent attack and release: `smoothed += (target-smoothed)*(1-exp(-dt/tau))`. Start around 20–50 ms attack and 150–500 ms release, then tune by signal and preset. Detect onsets with adaptive thresholds, local maxima, and a refractory interval. Beat phase should coast or fade when confidence falls, not jump between tempos on every transient.

Map across three timescales: immediate accents (tens to hundreds of milliseconds), phrasing (seconds), and structural evolution (8–32 confident beats, otherwise seconds). Add bounded envelopes and per-parameter curves. Audio changes target state; the animation system enforces velocity/acceleration limits. Suppress camera impulses during rapid input noise. Silence retains slow autonomous breathing.

| World | Low frequencies | Mid/high features | Onset / phrase |
|---|---|---|---|
| Alien Organism | Body inflation and cavity opening | Tendril articulation / fine specular motion | Traveling anatomical pulse / branch reconfiguration |
| Fractal Temple | Arch spacing and mass | Relief illumination / edge accents | Corridor reveal / symmetry chapter |
| Liquid Dimension | Long surface waves | Ripple spectrum / roughness shift | Traveling fold / reflected palette change |
| Crystal Cave | Cavern light breathing | Facet shimmer / internal emission | Bounded refractive flash / cluster reveal |
| Infinite Mirror | Portal aperture | Recursive texture modulation | History injection / chamber transition |

**Gate.** Use silence, sine sweeps, sparse clicks, bass-heavy music, ambient material, and noisy percussion. Measure capture-to-feature timestamps and camera response. Verify several independently meaningful controls rather than correlated scaling of everything. Keep diagnostics available without forcing them into the performance UI.

## A7. Inputs, image influence, and permission UX

**Research basis.** Browser display capture requires user interaction and permission; available audio sources depend on browser/platform and the selected surface. Requesting audio does not guarantee an audio track. [S8](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getDisplayMedia)

Implement a source state machine: idle → requesting/loading → active → ended/error. After display capture, inspect the returned audio tracks; when absent, explain the result and offer microphone or local file. Listen for track-ended events. Stop every owned track on source replacement or explicit stop. Microphone monitoring defaults off to avoid acoustic feedback. Local playback reaches speakers once; analysis taps it without duplicate routing.

Resume the audio context from a user gesture. Stream longer files via media elements where appropriate instead of decoding unlimited audio into memory. Revoke object URLs and release buffers on replacement. Include loading, cancellation, decoding failure, and unsupported format states.

Decode image input once, respect orientation, bound dimensions to device capability, and distinguish color content from data maps. Build reusable palette, luminance, and edge/mask representations. A flat photo may contribute to a reflection composition, but should not be mislabeled an HDR environment map. Every supported preset has an image influence slider and a before/after check. Preserve subject composition at maximum influence. Uploaded media stays local unless the user explicitly invokes a future export/upload feature.

## A8. Render architecture and ownership

**Research basis.** WebGL2 exposes features such as instancing and transform feedback. Browser capability and extension availability must be checked rather than inferred from a GPU name. [S9](https://developer.mozilla.org/en-US/docs/Web/API/WebGL2RenderingContext)

**Proposed frame graph:** source analysis → feature interpolation → control mapping → fixed-step simulation → opaque mesh/SDF color and depth → transmissive surfaces → bounded volumes → artistic feedback → selective bloom/grading → display output. The implementation may merge passes only when color, depth, and ordering remain correct.

Use one renderer and one frame loop. React/Zustand control user state and preset selection; mutable frame uniforms and simulation arrays do not trigger React updates each frame. The audio pipeline publishes compact snapshots at its own cadence. Shared renderer resources have explicit owners and reference counts; preset resources have lifecycle methods. Abort stale asynchronous loads so a delayed image or shader cannot replace a newer selection.

```ts
// Proposed contract, not an implemented API.
interface VisualEngine {
  initialize(context: EngineContext): Promise<void>;
  resize(resolution: ResolutionState): void;
  update(frame: FrameState, audio: AudioFeatures): void;
  render(graph: FrameGraph): void;
  setQuality(tier: QualityState): void;
  dispose(): void;
}
```

`FrameState` contains monotonic time, bounded delta, seeded evolution state, camera matrices, and a history-reset reason. `ResolutionState` distinguishes CSS size, output pixels, scene pixels, simulation pixels, and per-effect pixels. The engine declares required capabilities, estimated target memory, supported images, and a truthful fallback. Version these contracts before scaling to ten presets.

Raster and raymarched depth must use the same projection convention. Opaque meshes occlude SDF and volume samples; test intersections explicitly. Minimize shader variants and compile a bounded set ahead of visible switching. On unsupported floating-point targets, choose a documented reduced path rather than allowing framebuffer failure to blank the canvas.

## A9. 4K-first rendering and quality policy

**Proposed acceptance targets, subject to hardware profiling:** Ultra renders primary geometry and composition at 3840×2160, aims for 60 fps, and must sustain a documented minimum 30 fps on a declared reference GPU/browser. Balanced targets 60 fps with disclosed internal reconstruction. Do not claim universal 4K60 or measured support until benchmarks exist.

| Mode | Output | Primary scene | Initial SDF / volume step caps | Policy |
|---|---|---|---|---|
| Performance | Selected display size | 0.50–0.67 output dimensions | 64 / 32 | Simplified shadows, minimal history, adaptive scale |
| Balanced | Up to 3840×2160 | 0.67–1.00 output dimensions | 96 / 48 | Bounded reconstruction and independent volume scale |
| Ultra / Quality | 3840×2160 | Native 3840×2160 | 160 / 80 | Native primary scene lock; expensive effects have disclosed scales |

Step caps are seed values for profiling, not quality guarantees. A ray's cost also depends on field complexity and secondary samples. Native Ultra must not silently lower primary resolution; if it misses the frame target, report the measured result and offer Balanced or a lower target frame rate. Lower secondary-effect quality only under a stated policy visible in quality details.

Separate CSS size from drawing-buffer size and avoid multiplying an already-4K target by devicePixelRatio. Keep aspect ratio intentional: 16:9 3840×2160, 9:16 2160×3840, 1:1 2160×2160, and 4:5 2160×2700 are initial output choices; label dimensions instead of calling all of them 4K. Reframe focal distance, field of view, and subject bounds for each composition.

At 4K, 8,294,400 pixels × 8 bytes gives 63.3 MiB for one RGBA16F attachment. Two history attachments cost 126.6 MiB before depth, scene color, temporary targets, textures, driver overhead, and any MSAA. A read plus write of one such full-size target is about 7.96 GB/s at 60 Hz as a theoretical minimum traffic estimate, not measured bandwidth. Budget attachments before enabling full-resolution multipass effects. Multisampling can greatly increase storage and resolve traffic.

A provisional 60 fps GPU budget: primary geometry/shading 8 ms, volume 3 ms, temporal/post 3 ms, headroom about 2.7 ms. CPU update/submission target is below 4 ms, overlapping GPU work where possible. Reallocate by preset after measurement; do not add CPU and GPU numbers as if they were always sequential.

## A10. GPU optimization and measurement

**Research basis.** MDN recommends avoiding synchronous work that stalls the pipeline, batching draw calls, managing VRAM budgets, and adapting backbuffer size where necessary. Timer-query extensions can measure GPU elapsed time asynchronously; disjoint results are invalid. [S10](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices), [S11](https://developer.mozilla.org/en-US/docs/Web/API/EXT_disjoint_timer_query)

**Project optimization order:** measure → identify the dominant pass → reduce invisible work → compare equivalent images → record improvement. Use a low-resolution diagnostic to distinguish fill/shader pressure from CPU pressure, then inspect draw calls, iteration heatmaps, overdraw, and target memory. GPU timers are optional; if unavailable, report end-to-end frame timing and mark GPU time unknown.

Cull before expensive field evaluation. Cache stable transforms and repeated noise coordinates. Avoid evaluating full material noise at every march step when only the surface needs it. Short-circuit distant branches with conservative bounds. Reduce shadow resolution or update cadence where visually safe. Preallocate typed arrays and vectors; update buffers partially; reuse target pools; avoid readback during normal playback.

Avoid uncontrolled transparent layers, full-frame high-frequency noise, and simultaneous reflection/refraction paths. Use independent effect resolution and image-space masks. Query limits at startup, not every frame. Dispose on preset removal, image replacement, shutdown, and cancelled loads. Cap concurrent preset preparation. Crossfades temporarily double rendering and storage: if capacity is insufficient, use a captured outgoing frame or a deliberate dark transition instead of instantiating two full Ultra worlds.

Benchmark fixed seeds and a committed synthetic audio fixture. Record GPU/CPU when available, OS, browser version, power mode, output/internal dimensions, effect scales, refresh rate, duration, and commit. Warm up 30 seconds, measure at least 120 seconds, then run a 10-minute thermal/memory soak. Report median/p95/p99 frame interval, frames over 33.3 ms, valid GPU query statistics, shader stalls, and resource counts. Repeat only after relevant changes.

**Gate.** Native Ultra acceptance requires the p95 frame interval at or below 33.3 ms on the documented reference configuration; 60 fps is a separate achievement. There must be no unexplained resource growth after 50 preset switches and 20 image/source replacements. Context loss and restoration must leave a usable interface. Browser throttling/background tests are reported separately.

## A11. Preset diversity and visual quality bible

Every preset needs a different dominant construction, silhouette, material response, camera grammar, and temporal behavior. Shared utilities are encouraged; sharing one scene shader with alternate palettes is insufficient. The following designs are project proposals, not sourced claims of finished effects.

| Preset | Dominant construction | Material / palette | Camera / musical identity |
|---|---|---|---|
| Fractal Alien Organism | Fused recursive SDF anatomy with bounded tendril meshes | Wet plum-black membrane, ivory ridges | Focal orbit with parallax; bass breathing, traveling pulses |
| Organic Tunnel | Nested displaced tube/rib geometry | Warm tissue, burgundy, dim amber | Forward travel through contracting chambers |
| Fractal Temple | Instanced recursive arch architecture | Obsidian, antique gold, restrained cracks | Slow axial reveal; phrase-driven architectural changes |
| Liquid Dimension | Continuous displaced sheet / implicit liquid folds | Mercury, copper, dark reflected fields | Low grazing glide; long waves and transient ripples |
| Crystal Cave | Faceted instanced crystal clusters | Clear mineral, violet shadows, sparse spectral light | Deliberate dolly between clusters; treble internal glints |
| Infinite Mirror | Actual spatial portal frames plus bounded recursive render targets | Dark chrome, contrasting warm portal cores | Chamber alignment; rhythmic history injection |
| Cosmic Organism | Bounded 3D emission/absorption density field | Inky violet and ember density knots | Slow traversal around a volumetric core; energy expansion |
| Flow Field | GPU-driven connected ribbons and tubes | Pearl filaments against charcoal | Lateral tracking; midrange shear and curling motion |
| Geometric Morph | Parametric surface transformation with stable topology | Ceramic, enamel, selective metal | Stable inspection orbit; tempo-phase shape cycles |
| Impossible Void | Spatially staged incompatible perspectives and SDF negative space | Matte black, bone edges, isolated red | Authored viewpoints and portal transitions; sparse structural events |

Infinite Mirror must maintain spatial frame geometry; screen feedback alone is an echo effect, not physical mirror recursion. Impossible Void is a perceptual scene-construction goal; document viewpoint-dependent illusions instead of claiming non-Euclidean physical simulation.

For each preset, add a compact design card with: silhouette sketch; three depth layers; macro/meso/micro detail; material/light rig; quiet/rise/peak/recovery behavior; image mapping; control ranges; quality knobs; failure cases; and fixed-seed capture instructions. Keep design cards near their engines when implementation starts. Avoid a huge repeated prose bible that wastes model context.

**Diversity review.** Capture the same audio segment at the same timestamps with post disabled, grayscale enabled, and labels hidden. A reviewer should identify presets from geometry and motion. Pairwise compare construction, silhouette, material, camera, and transformation; require differences on at least three axes, including construction or silhouette. This is a project review rubric, not an objective artistic theorem. Reject a new preset that cannot pass before spending time on polish.

## A12. Implementation roadmap and release evidence

| Phase | Bounded deliverable | Dependency | Completion evidence |
|---|---|---|---|
| M0 | Import original brief, append research, initialize repository | None | Original hash/prefix match; remote commit verified |
| M1 | Audit supplied code, or record absence and scaffold agreed stack | M0 | Architecture map, pinned dependencies, build/runtime baseline |
| M2 | Audio/image source state machines and feature bus | M1 | Permission/error tests, tone/click fixtures, visible image influence |
| M3 | Engine lifecycle, frame graph, quality/resolution controls, profiler | M1 | Mesh/SDF depth fixture, resize and disposal checks at 4K |
| M4 | Fractal Alien Organism flagship | M2 + M3 | Quiet/peak clips, matte and final captures, native-4K measurements |
| M5 | Temple, Liquid, Crystal mesh/material worlds | M4 | Three distinct design cards and diversity review |
| M6 | Volume, feedback/portal, and ribbon engines | M4 + M3 history support | Ghosting, bounded memory, temporal reset checks |
| M7 | Remaining presets, image roles, evolution, transitions | M5 + M6 | Ten worlds pass identity and source-control matrix |
| M8 | Responsive framing, thermal optimization, browser release | M7 | Fullscreen/aspect/source switch soak, supported-platform table, HTTPS preview |

M1 is the only point that decides whether the old code is reusable. Do not pre-generate placeholder modules for every filename. M4 is a stop-and-improve quality gate: a weak flagship must not become ten weak effects. Each phase can contain small cohesive commits; avoid making a single file the unit of work when correctness spans adjacent interfaces.

Application browser access is a later deliverable: configure a tested build/deploy path from the repository, keep credentials out of client code, and add a real live URL to README after successful deployment. A GitHub repository URL opens the specification and source, not automatically a running app. No deployment or app success is claimed by this documentation milestone.

## A13. GPT-6 Astra workflow with low unnecessary token use

**Verified guidance.** Official documentation identifies `gpt-6-astra` and describes prompt sensitivity, scoped verification, and reasoning controls. Keep the user's chosen Astra model; do not silently substitute another model. API pricing, cached input, and Codex account credits are different accounting surfaces. This plan promises no fixed credit discount or total token count. [S12](https://developers.openai.com/api/docs/models/gpt-6-astra), [S13](https://developers.openai.com/api/docs/guides/latest-model)

**Project workflow.** Use one concise outcome-oriented task with acceptance evidence. Read the complete handover once for initial orientation, as the original requires. Thereafter use this appendix's stable section IDs, the architecture map, active design card, relevant source files, and compact STATUS.md. This is an explicit refinement of the original broad rereading instruction: inspect dependencies when needed, but do not reread the entire source tree for every small change.

Keep repository guidance short and nonduplicative. Ask Astra to make routine implementation choices within the accepted scope and finish verification, rather than requesting a new plan before every file. Request a compact result with changed files, evidence, and remaining blockers; no repeated specification or full file dumps in chat. Let tools search files and return relevant snippets. Keep raw profiler traces and images as artifacts, with a small index.

Start routine changes with low or medium reasoning where supported; use high for architecture, mathematical rendering bugs, or difficult performance diagnoses. Increase only when failed evidence or task complexity warrants it. Do not use a zero/none reasoning setting for Astra. A shorter prompt is not necessarily cheaper if it causes repeated failed implementations; optimize validated completion, not merely output length.

Avoid agents by default for this project budget. Parallel work should be explicitly requested and have independent, bounded outputs. Run appropriate tests after a coherent change; broaden only for changed risk or failures. Reuse accepted patterns and profiler fixtures. After two failed attempts at the same visual or performance gate, diagnose the failure with evidence before another broad rewrite.

API prompt caching benefits matching prompt prefixes; keep stable project instructions ahead of changing task data if an API harness is later used. Do not pad prompts to obtain caching or assume that cached tokens are free. Inspect actual usage and cached-token metrics when available. Codex UI does not necessarily expose or honor every API control, so use only supported settings. [S14](https://developers.openai.com/api/docs/guides/prompt-caching)

### Reusable bounded task prompt

```text
Use GPT-6 Astra. Work in the lucidXO repository.
Read AGENTS.md, STATUS.md, and HANDOVER.md sections [IDs]; on first
orientation read the complete handover. Complete milestone [ID/outcome].
Inspect the relevant implementation and dependencies before editing.
Preserve the original handover and accepted stack. Make routine choices
within scope. Acceptance: [observable behavior + visual/performance evidence].
Implement the smallest cohesive change that passes those criteria.
Run relevant checks, inspect the visual result, update STATUS.md, and commit
and sync the completed change. If access prevents sync, report the exact state.
Return a concise outcome, evidence, commit, and remaining blockers.
```

### Context and evidence ledger

Keep STATUS.md under roughly 400 words: current milestone, latest accepted behavior, relevant files, measurements, known blocker, and next concrete task. Use short architecture decision records only when a decision changes future work. Record actual model usage if exposed; otherwise mark it unavailable. Never estimate account credit savings from word counts. Use a brief phase-end summary to resume work without replaying the entire chat.

## A14. Primary-source index

Sources establish technical foundations; all project-specific defaults, tables, budgets, and acceptance gates above are recommendations to validate. Historical GPU examples require adaptation to modern browser APIs. Pin actual library versions during M1.

- **S1:** John C. Hart, *Sphere Tracing: A Geometric Method for the Antialiased Ray Tracing of Implicit Surfaces*, author manuscript hosted by Stanford: https://graphics.stanford.edu/courses/cs348b-20-spring-content/uploads/hart.pdf — distance bounds and implicit rendering.
- **S2:** NVIDIA GPU Gems 3, *Generating Complex Procedural Terrains Using the GPU*: https://developer.nvidia.com/gpugems/gpugems3/part-i-geometry/chapter-1-generating-complex-procedural-terrains-using-gpu — procedural density and extracted geometry.
- **S3:** NVIDIA GPU Gems, *Volume Rendering Techniques*: https://developer.nvidia.com/gpugems/gpugems/part-vi-beyond-triangles/chapter-39-volume-rendering-techniques — volume integration and compositing.
- **S4:** Three.js, *RenderTarget*: https://threejs.org/docs/pages/RenderTarget.html — offscreen attachments, resize, disposal.
- **S5:** Three.js, *MeshPhysicalMaterial*: https://threejs.org/docs/pages/MeshPhysicalMaterial.html — advanced surface response and cost.
- **S6:** Meyda, *Audio Features*: https://meyda.js.org/audio-features — feature definitions and ranges.
- **S7:** MDN, *AudioWorklet*: https://developer.mozilla.org/en-US/docs/Web/API/AudioWorklet — audio processing execution model.
- **S8:** MDN, *getDisplayMedia*: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getDisplayMedia — capture permissions and audio limitations.
- **S9:** MDN, *WebGL2RenderingContext*: https://developer.mozilla.org/en-US/docs/Web/API/WebGL2RenderingContext — WebGL2 capabilities.
- **S10:** MDN, *WebGL best practices*: https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices — resource and pipeline performance guidance.
- **S11:** MDN, *EXT_disjoint_timer_query*: https://developer.mozilla.org/en-US/docs/Web/API/EXT_disjoint_timer_query — asynchronous timing principles; select the corresponding WebGL2 extension/API for the actual renderer.
- **S12:** OpenAI, *GPT-6 Astra model*: https://developers.openai.com/api/docs/models/gpt-6-astra — model identity and capabilities.
- **S13:** OpenAI, *Using GPT-6 Astra*: https://developers.openai.com/api/docs/guides/latest-model — prompting, scope, verification, and reasoning guidance.
- **S14:** OpenAI, *Prompt caching*: https://developers.openai.com/api/docs/guides/prompt-caching — reuse of prompt prefixes and usage accounting.

## END OF RESEARCH ADDITIONS

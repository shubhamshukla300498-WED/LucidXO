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

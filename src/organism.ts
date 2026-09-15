import {Journey,worlds} from './journey';
import * as T from 'three';
import {EffectComposer} from 'three/addons/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/addons/postprocessing/RenderPass.js';
import {UnrealBloomPass} from 'three/addons/postprocessing/UnrealBloomPass.js';
import {OutputPass} from 'three/addons/postprocessing/OutputPass.js';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {useControls} from './store';
import {resolution,smooth,emptyFeatures,type AudioFeatures} from './signals';
import {vertex,fragment} from './coreShader';

const palettes={Iridescent:{body:0x655169,rim:0xc77cf5,vein:0xc6a173,fill:0x71bac0,core:0xc7945e},Ember:{body:0x713421,rim:0xff814a,vein:0xe1a45a,fill:0xa06191,core:0xff763d},Verdant:{body:0x354d35,rim:0xb5d997,vein:0xb3c683,fill:0x7b91b7,core:0x7eac7f}};
export function seeded(seed:number){return()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
export interface RenderStats{fps:number;width:number;height:number;triangles:number;calls:number;geometries:number;textures:number;frameMs:number;gpu:string;frames:number;p95:number;}
export class Organism {
  renderer:T.WebGLRenderer;scene=new T.Scene();camera=new T.PerspectiveCamera(38,1,.1,70);orbit:OrbitControls;
  private composer:EffectComposer;private bloom:UnrealBloomPass;
  private imageTexture:T.Texture;private blank:T.DataTexture;private imageGeneration=0;
  private world:T.Mesh;private worldMaterial:T.ShaderMaterial;private travel=0;private pattern=0;private patternTarget=0;private lastBeat=0;private lastKick=0;private kickAge=10;private cameraPhase=0;private cameraMix=0;private cameraEnergy=0;private cameraOffset=new T.Matrix4();private cameraEuler=new T.Euler();private journey=new Journey();
  private resizeObserver:ResizeObserver;private lastSize='';private disposed=false;private lost=false;
  private frame=0;private time=0;private last=0;private lastReport=0;private intervals:number[]=[];private recent:number[]=[];private statsFrames=0;private freezeUntil=0;private unsubscribe:()=>void;private visualFeatures=emptyFeatures();
  onStats:(stats:RenderStats)=>void=()=>{};onError:(message:string)=>void=()=>{};onFeatures:(f:AudioFeatures)=>void=()=>{};
  private contextLost=(event:Event)=>{event.preventDefault();this.lost=true;this.onError('Graphics context lost. Waiting for your GPU to recover…');};
  private contextRestored=()=>{this.lost=false;this.lastSize='';this.resize();this.onError('');};
  constructor(private host:HTMLElement,private audio:{update:(dt:number)=>AudioFeatures}){
    this.renderer=new T.WebGLRenderer({antialias:true,alpha:false,powerPreference:'high-performance'});
    this.renderer.setPixelRatio(1);this.renderer.setClearColor(0x010102);this.renderer.toneMapping=T.ACESFilmicToneMapping;this.renderer.toneMappingExposure=.8;this.renderer.info.autoReset=false;
    host.appendChild(this.renderer.domElement);this.renderer.domElement.setAttribute('aria-label','Immersive recursive organism tunnel. Drag to look around.');
    this.renderer.domElement.addEventListener('webglcontextlost',this.contextLost);this.renderer.domElement.addEventListener('webglcontextrestored',this.contextRestored);
    this.camera.position.set(0,0,12.2);this.orbit=new OrbitControls(this.camera,this.renderer.domElement);this.orbit.enableDamping=true;this.orbit.enablePan=false;this.orbit.minDistance=5;this.orbit.maxDistance=18;this.orbit.rotateSpeed=.35;this.orbit.addEventListener('start',()=>{this.freezeUntil=performance.now()+5000;});
    this.blank=new T.DataTexture(new Uint8Array([150,110,76,255]),1,1);this.blank.needsUpdate=true;this.imageTexture=this.blank;
    this.composer=new EffectComposer(this.renderer);this.composer.addPass(new RenderPass(this.scene,this.camera));this.bloom=new UnrealBloomPass(new T.Vector2(800,600),.3,.6,1.15);this.composer.addPass(this.bloom);this.composer.addPass(new OutputPass());
    this.worldMaterial=new T.ShaderMaterial({vertexShader:vertex,fragmentShader:fragment,depthTest:false,depthWrite:false,uniforms:{uKick:{value:0},uKickAge:{value:10},uPattern:{value:0},uFrom:{value:3},uTo:{value:3},uBlend:{value:1},uTime:{value:0},uBass:{value:0},uMid:{value:0},uHigh:{value:0},uOnset:{value:0},uEnergy:{value:0},uGlow:{value:.35},uImageMix:{value:0},uAspect:{value:1},uZoom:{value:1},uDetail:{value:.7},uSeed:{value:7319},uColor:{value:new T.Color()},uImage:{value:this.blank},uCamera:{value:new T.Matrix4()}}});
    this.world=new T.Mesh(new T.PlaneGeometry(2,2),this.worldMaterial);this.world.frustumCulled=false;this.scene.add(this.world);
    this.resizeObserver=new ResizeObserver(()=>this.resize());this.resizeObserver.observe(host);this.resize();
    this.unsubscribe=useControls.subscribe((s,old)=>{if(s.quality!==old.quality||s.aspect!==old.aspect){this.resize();this.intervals=[];}});
    this.frame=requestAnimationFrame(this.animate);
  }
  private resize(){if(this.disposed)return;const w=this.host.clientWidth,h=this.host.clientHeight;if(!w||!h)return;const [width,height]=resolution(w,h,useControls.getState().quality);const key=`${width}:${height}`;if(key===this.lastSize)return;this.lastSize=key;
    const gl=this.renderer.getContext();const max=gl.getParameter(gl.MAX_RENDERBUFFER_SIZE);if(width>max||height>max){this.onError(`This GPU supports at most ${max}px render targets. Choose Balanced quality.`);return;}
    this.renderer.setSize(width,height,false);this.composer.setSize(width,height);this.camera.aspect=w/h;this.camera.fov=w/h<1?58:38;this.camera.updateProjectionMatrix();
  }
  private animate=(now:number)=>{
    if(this.disposed)return;this.frame=requestAnimationFrame(this.animate);const raw=this.last?now-this.last:16.67;this.last=now;const dt=Math.min(.05,raw/1000);if(this.lost)return;const s=useControls.getState();const incoming=this.audio.update(dt);if(s.playing){
      for(const key of Object.keys(incoming) as (keyof AudioFeatures)[]){
        this.visualFeatures[key]=key==='onset'?incoming[key]:smooth(this.visualFeatures[key],incoming[key],dt,key==='bass'?.10:.025,key==='bass'?.45:.16);
      }
    }const f=this.visualFeatures;
    if(s.playing)this.time+=dt*(.3+s.motion*1.5);const t=this.time;
    this.bloom.strength=s.glow*.65;this.bloom.enabled=s.glow>.01;
    this.orbit.autoRotate=false;
    this.orbit.update(dt);
    if(s.playing){
      this.cameraEnergy=smooth(this.cameraEnergy,f.energy*s.reactivity,dt,.8,1.4);
      this.cameraPhase+=dt*(.13+this.cameraEnergy*.16)*(.4+s.motion);
      this.cameraMix=smooth(this.cameraMix,s.orbit&&now>this.freezeUntil?1:0,dt,1.8,.18);
      this.travel+=dt*(.3+s.motion*1.2+this.cameraEnergy*.7);
      this.kickAge+=dt;
      if(incoming.kick>.8&&this.lastKick<=.8)this.kickAge=0;
      this.lastKick=incoming.kick;
      if(incoming.onset>.6&&this.lastBeat<=.6)this.patternTarget+=.18*s.reactivity;
      this.lastBeat=incoming.onset;
      this.patternTarget+=dt*(.16+this.cameraEnergy*.24);
      this.pattern+=(this.patternTarget-this.pattern)*(1-Math.exp(-dt/.9));
    }
    this.journey.update(dt,worlds.indexOf(s.world),s.journey,f.energy,f.onset,s.playing);
    if(s.journey&&s.playing&&this.journey.ready)useControls.getState().set('world',worlds[(this.journey.to+1)%worlds.length]);
    const w=this.worldMaterial.uniforms;w.uKick.value=f.kick*s.reactivity;w.uKickAge.value=this.kickAge;w.uPattern.value=this.pattern;w.uFrom.value=this.journey.from;w.uTo.value=this.journey.to;w.uBlend.value=this.journey.mix;w.uTime.value=this.travel;w.uBass.value=f.bass*s.reactivity;w.uMid.value=f.mid*s.reactivity;w.uHigh.value=f.hat*s.reactivity;w.uOnset.value=f.snare*s.reactivity;w.uEnergy.value=s.energy;w.uGlow.value=s.glow;w.uImageMix.value=this.imageTexture!==this.blank?s.imageMix:0;w.uImage.value=this.imageTexture;w.uAspect.value=this.camera.aspect;w.uZoom.value=12.2/this.camera.position.length();w.uDetail.value=s.detail;w.uSeed.value=s.seed;w.uColor.value.setHex(palettes[s.palette].core);this.camera.updateMatrixWorld();w.uCamera.value.copy(this.camera.matrixWorld);
    this.cameraEuler.set(Math.sin(this.cameraPhase*.73)*.065*this.cameraMix,Math.sin(this.cameraPhase)*.11*this.cameraMix,Math.sin(this.cameraPhase*.43)*.022*this.cameraMix);
    this.cameraOffset.makeRotationFromEuler(this.cameraEuler);w.uCamera.value.multiply(this.cameraOffset);
    this.renderer.info.reset();this.composer.render();this.statsFrames++;
    if(raw<1000){this.recent.push(raw);if(this.recent.length>120)this.recent.shift();if(this.intervals.length<18000)this.intervals.push(raw);}
    if(now-this.lastReport>500){this.lastReport=now;const avg=this.recent.reduce((a,b)=>a+b,0)/Math.max(1,this.recent.length);const sorted=[...this.intervals].sort((a,b)=>a-b);const gl=this.renderer.getContext();const debug=gl.getExtension('WEBGL_debug_renderer_info');this.onStats({fps:Math.round(1000/avg),width:this.renderer.domElement.width,height:this.renderer.domElement.height,triangles:this.renderer.info.render.triangles,calls:this.renderer.info.render.calls,geometries:this.renderer.info.memory.geometries,textures:this.renderer.info.memory.textures,frameMs:avg,gpu:debug?gl.getParameter(debug.UNMASKED_RENDERER_WEBGL):'GPU name unavailable',frames:this.statsFrames,p95:sorted[Math.floor(sorted.length*.95)]||0});this.onFeatures(f);}
  };
  async setImage(file:File){
    const generation=++this.imageGeneration;
    const bitmap=await createImageBitmap(file);if(this.disposed||generation!==this.imageGeneration){bitmap.close();return;}
    const scale=Math.min(1,2048/Math.max(bitmap.width,bitmap.height));const canvas=document.createElement('canvas');canvas.width=Math.round(bitmap.width*scale);canvas.height=Math.round(bitmap.height*scale);canvas.getContext('2d')!.drawImage(bitmap,0,0,canvas.width,canvas.height);bitmap.close();
    const texture=new T.CanvasTexture(canvas);texture.colorSpace=T.SRGBColorSpace;texture.wrapS=texture.wrapT=T.RepeatWrapping;texture.anisotropy=Math.min(8,this.renderer.capabilities.getMaxAnisotropy());
    if(this.imageTexture!==this.blank)this.imageTexture.dispose();this.imageTexture=texture;

  }
  clearImage(){this.imageGeneration++;if(this.imageTexture!==this.blank)this.imageTexture.dispose();this.imageTexture=this.blank;}
  capture(){this.composer.render();return new Promise<Blob>((resolve,reject)=>this.renderer.domElement.toBlob(blob=>blob?resolve(blob):reject(Error('Frame could not be captured.')),'image/png'));}
  resetCamera(){this.camera.position.set(0,0,12.2);this.orbit.target.set(0,0,0);this.orbit.update();}
  dispose(){this.disposed=true;cancelAnimationFrame(this.frame);this.unsubscribe();this.resizeObserver.disconnect();this.orbit.dispose();this.world.geometry.dispose();this.worldMaterial.dispose();if(this.imageTexture!==this.blank)this.imageTexture.dispose();this.blank.dispose();this.composer.passes.forEach(p=>p.dispose());this.composer.dispose();this.renderer.domElement.removeEventListener('webglcontextlost',this.contextLost);this.renderer.domElement.removeEventListener('webglcontextrestored',this.contextRestored);this.renderer.dispose();this.renderer.domElement.remove();}
}
